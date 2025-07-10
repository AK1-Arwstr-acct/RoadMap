<template>
  <div class="py-1 h-fit flex flex-col">
    <div class="bg-white">
      <h1 class="text-[#181D27] text-2xl md:text-[32px] font-semibold lg:mb-8">
        {{ $t("schoolList_page.find_your_perfect_school_match") }}
      </h1>
      <div class="my-6">
        <SchoolListChips />
      </div>
      <div
        v-if="
          schoolListStore.allChipsFilled && schoolListStore.schoolsList.length
        "
        class="flex flex-col md:flex-row justify-between md:items-center w-full gap-2 md:gap-0 mb-6 lg:mb-8"
      >
        <p class="text-[#535862]">
          <span
            v-if="schoolListStore.isSchoolsLoading"
            class="text-[#111827] font-semibold"
          >
            {{ $t('schoolList_page.loading_title') }}
          </span>
          <span v-else>
            {{ schoolListStore.totalSchool || 0 }}
            {{ $t("schoolList_page.schools_match_your_profile") }}
          </span>
        </p>
        <FilterDropdown
          :placeholder="t('schoolList_page.sort_by')"
          :options="sortFilters"
          class="self-end hidden md:block"
          :class="{
            'pointer-events-none':
              schoolListStore.isSchoolsLoading || isTokenLoading,
          }"
          :modelValue="schoolListStore.selectedFilter"
          @update:modelValue="(value: OptionAttributes | null) => selectFilter(value)"
        />
      </div>
    </div>
    <RecommendedSchoolSkeleton
      v-if="schoolListStore.isSchoolsLoading || isTokenLoading"
    />
    <!-- <RecommendedSchoolSkeleton v-if="true" /> -->
    <PublicInfo v-else-if="!schoolListStore.allChipsFilled || (schoolListStore.allChipsFilled && !schoolListStore.schoolsList.length)" />
    <div v-else class="flex-1 flex flex-col gap-6 md:pb-6 mr-px">
      <div
        v-if="
          (schoolListStore.overViews || []).length > 0 ||
          schoolListStore.enginePosition === 'final'
        "
        class="flex flex-col gap-4"
        v-for="(program, idx) in groupedSchoolsList"
      >
        <p class="text-[#181D27] font-semibold text-xl">
          {{ program }}
        </p>
        <div class="flex flex-col gap-6">
          <SchoolCard
            v-for="(school, idx) in schoolListStore.schoolsList.filter(
              (item) => item.program_title === program
            )"
            :key="idx"
            :program="school"
            @openDetail="openDetail"
          />
        </div>
      </div>
      <div v-else class="flex flex-col gap-6">
        <div v-for="(school, idx) in schoolListStore.schoolsList" :key="idx">
          <SchoolCard :program="school" @openDetail="openDetail" />
          <OverwhelmedCard v-if="idx === 4" class="mt-6" />
        </div>
      </div>
      <div
        v-if="
          (schoolListStore.recommendedSchoolsPagination?.last_page ?? 0) > 1
        "
        class="flex justify-center"
      >
        <BasePagination
          :currentPage="
            schoolListStore.recommendedSchoolsPagination?.current_page
          "
          :lastPage="schoolListStore.recommendedSchoolsPagination?.last_page"
          @paginate="(pageNum) => getRecommendations(pageNum)"
        />
      </div>
      <Transition name="fade">
        <div
          v-if="
            (schoolListStore.totalSchool || 0) < 6 &&
            schoolListStore.totalSchool !== null &&
            schoolListStore.enginePosition !== 'final'
          "
          class="flex justify-center"
        >
          <NoManySchool />
        </div>
      </Transition>
    </div>
  </div>
  <Transition name="fade">
    <div
      v-if="schoolListStore.isSchoolDetailModal"
      @click="schoolListStore.isSchoolDetailModal = false"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
    />
  </Transition>
  <Transition name="slideModal">
    <component
      :is="SchoolDetailModal"
      v-if="schoolListStore.isSchoolDetailModal"
      :isDetailModal="schoolListStore.isSchoolDetailModal"
      @close="close"
      :schoolData="schoolProfile"
    />
  </Transition>
</template>
<script setup lang="ts">
import SchoolDetailModal from "./SchoolDetailModal.vue";
import IconRankDown from "~/components/icons/IconRankDown.vue";
import IconRankUp from "~/components/icons/IconRankUp.vue";
import IconPriceDown from "~/components/icons/IconPriceDown.vue";
import IconPriceUp from "~/components/icons/IconPriceUp.vue";
import useSchoolListStore from "~/stores/SchoolListStore";
import type { OptionAttributes } from "~/types/home";
import type { Program, SchoolDetail } from "~/types/program";
import axios from "axios";

const emits = defineEmits<{
  (e: "getRecommendations", pageNo: number): void;
}>();

defineProps({
  isTokenLoading: {
    type: Boolean,
    default: false,
  },
});

const schoolListStore = useSchoolListStore();
const { api } = useApi();
const { showToast } = useToast();
const deviceType = useDeviceType();
const { t } = useI18n();
const route = useRoute();

// const mobile = {
//   SchoolListChips: defineAsyncComponent(
//     () => import("~/components/pages/school-list/SchoolListChips.vue")
//   ),
// };

const width = ref<number>(0);
const schoolProfile = ref<SchoolDetail>();
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
    new Set(schoolListStore.schoolsList.map((school) => school.program_title))
  );
  return uniqueProgramTitles;
});

const isMobileOrTablet = computed(() => {
  return width.value < 768 ? true : false;
});

const selectFilter = async (filter: OptionAttributes | null) => {
  schoolListStore.selectedFilter = filter;
  if (filter !== null) {
    const filterKey = {
      [`sort_by_${
        filter?.value === "1" || filter?.value === "2" ? "ranking" : "price"
      }`]: filter?.value === "1" || filter?.value === "3" ? "DESC" : "ASC",
    };
    schoolListStore.setSortParam(filterKey);
  }
  if (schoolListStore.enginePosition === "pre") {
    schoolListStore.preRunEngine();
  } else if (schoolListStore.enginePosition === "post") {
    schoolListStore.runEngine();
  } else {
    schoolListStore.runFinalEngine();
  }
};

const openDetail = async (item: SchoolDetail) => {
  try {
    schoolProfile.value = item;
    schoolListStore.isSchoolDetailModal = true;
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
  schoolListStore.isSchoolDetailModal = false;
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
