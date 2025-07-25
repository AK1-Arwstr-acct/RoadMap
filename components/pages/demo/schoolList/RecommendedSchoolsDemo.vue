<template>
  <div class="py-1 h-fit flex flex-col">
    <div class="md:sticky top-0 pt-4 pb-3 bg-white">
      <h1 class="text-[#181D27] text-2xl font-semibold">
        {{ $t("schoolList_page.find_your_perfect_school_match") }}
      </h1>
      <div
        v-if="!(demoStore.isSchoolListPublic && !demoStore.schoolsList.length)"
        class="flex flex-col md:flex-row justify-between md:items-center w-full gap-2 md:gap-0"
      >
        <p class="text-[#535862]">
          {{
            demoStore.aiRecommendationList
              ? totalSchoolsAfterAi
              : demoStore.schoolsList.length || 0
          }}
          {{ $t("schoolList_page.schools_match_your_profile") }}
        </p>
        <FilterDropdownDemo
          :placeholder="t('schoolList_page.sort_by')"
          :options="sortFilters"
          class="self-end hidden md:block"
          :modelValue="demoStore.selectedFilter"
          @update:modelValue="(value: OptionAttributes | null) => selectFilter(value)"
        />
      </div>
    </div>
    <div v-if="deviceType === 'mobile' || deviceType === 'tablet'" class="my-6">
      <component
        v-if="demoStore.isSchoolListPublic"
        :is="mobile.PublicUserDataInfoDemo"
      />
    </div>
    <PublicInfoDemo v-if="!demoStore.schoolsList.length" />
    <div v-else class="flex-1 flex flex-col gap-6 md:pb-6 mr-px">
      <div
        v-if="
          (demoStore.overViews || []).length > 0 ||
          demoStore.aiRecommendationList
        "
        class="flex flex-col gap-4"
        v-for="(program, idx) in groupedSchoolsList"
      >
        <p class="text-[#181D27] font-semibold text-xl">
          {{ program }}
        </p>
        <div class="flex flex-col gap-6">
          <SchoolCardDemo
            v-for="(school, idx) in demoStore.schoolsList
              .filter((item) => item.program_title === program)
              .slice(0, 2)"
            :key="idx"
            :program="school"
            @openDetail="openDetail"
          />
        </div>
      </div>
      <div v-else class="flex flex-col gap-6">
        <SchoolCardDemo
          v-for="(school, idx) in demoStore.schoolsList"
          :key="idx"
          :program="school"
          @openDetail="openDetail"
        />
      </div>
      <div
        v-if="(demoStore.recommendedSchoolsPagination?.last_page ?? 0) > 1"
        class="flex justify-center"
      >
        <BasePaginationDemo
          :currentPage="demoStore.recommendedSchoolsPagination?.current_page"
          :lastPage="demoStore.recommendedSchoolsPagination?.last_page"
          @paginate="(pageNum) => getRecommendations(pageNum)"
        />
      </div>
      <Transition name="fade">
        <div
          v-if="
            (demoStore.totalSchool || 0) < 6 &&
            demoStore.totalSchool !== null &&
            demoStore.enginePosition !== 'final'
          "
          class="flex justify-center"
        >
          <NoManySchoolDemo />
        </div>
      </Transition>
    </div>
  </div>
  <Transition name="fade">
    <div
      v-if="isDetailModal"
      @click="isDetailModal = false"
      class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm"
    />
  </Transition>
  <Transition name="slideModal">
    <component
      :is="SchoolDetailModalDemo"
      v-if="isDetailModal"
      :isDetailModal="isDetailModal"
      @close="close"
      :schoolData="schoolProfile"
    />
  </Transition>
</template>
<script setup lang="ts">
import SchoolDetailModalDemo from "./SchoolDetailModalDemo.vue";
import IconRankDown from "~/components/icons/IconRankDown.vue";
import IconRankUp from "~/components/icons/IconRankUp.vue";
import IconPriceDown from "~/components/icons/IconPriceDown.vue";
import IconPriceUp from "~/components/icons/IconPriceUp.vue";
import useDemoStore from "~/stores/demoStore";
import type { OptionAttributes } from "~/types/home";
import type { Program, SchoolDetail } from "~/types/program";
import axios from "axios";

const emits = defineEmits<{
  (e: "getRecommendations", pageNo: number): void;
}>();

const demoStore = useDemoStore();
const { api } = useApi();
const { showToast } = useToast();
const deviceType = useDeviceType();
const { t } = useI18n();
const route = useRoute();

const mobile = {
  PublicUserDataInfoDemo: defineAsyncComponent(
    () =>
      import("~/components/pages/demo/schoolList/PublicUserDataInfoDemo.vue")
  ),
};

const width = ref<number>(0);
const schoolProfile = ref<SchoolDetail>();
const isDetailModal = ref<boolean>(false);
const sortFilters = ref<OptionAttributes[]>([
  {
    value: "1",
    label: `${t("schoolList_page.rank_high_to_low")}`,
    icon: shallowRef(IconRankDown),
  },
  {
    value: "2",
    label: `${t("schoolList_page.rank_low_to_high")}`,
    icon: shallowRef(IconRankUp),
  },
  {
    value: "3",
    label: `${t("schoolList_page.price_high_to_low")}`,
    icon: shallowRef(IconPriceDown),
  },
  {
    value: "4",
    label: `${t("schoolList_page.price_low_to_high")}`,
    icon: shallowRef(IconPriceUp),
  },
]);

const groupedSchoolsList = computed(() => {
  const uniqueProgramTitles = Array.from(
    new Set(demoStore.schoolsList.map((school) => school.program_title))
  );
  return uniqueProgramTitles;
});

const isMobileOrTablet = computed(() => {
  return width.value < 768 ? true : false;
});

const totalSchoolsAfterAi = computed(() => {
  return groupedSchoolsList.value.reduce((total, program) => {
    return (
      total +
      demoStore.schoolsList
        .filter((item) => item.program_title === program)
        .slice(0, 2).length
    );
  }, 0);
});

const selectFilter = async (filter: OptionAttributes | null) => {
  demoStore.selectedFilter = filter;
  if (filter !== null) {
    const filterKey = {
      [`sort_by_${
        filter?.value === "1" || filter?.value === "2" ? "ranking" : "price"
      }`]: filter?.value === "1" || filter?.value === "3" ? "DESC" : "ASC",
    };
    demoStore.setSortParam(filterKey);
  }
};

const openDetail = async (item: SchoolDetail) => {
  try {
    schoolProfile.value = item;
    isDetailModal.value = true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};
const close = () => {
  isDetailModal.value = false;
};

const getRecommendations = async (pageNo: number = 1) => {
  emits("getRecommendations", pageNo);
};

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

onMounted(() => {
  windowSize();
  window.addEventListener("resize", windowSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", windowSize);
});
</script>
<style scoped>
.slideModal-enter-active,
.slideModal-leave-active {
  transition: all 400ms;
  transform: all 400ms;
}

.slideModal-enter-from,
.slideModal-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slideModal-enter-to,
.slideModal-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
