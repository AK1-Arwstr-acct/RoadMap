<template>
  <div class="pt-8 h-full flex flex-col gap-4">
    <div>
      <h1 class="text-[#181D27] text-2xl font-semibold">
        Let's find your perfect school match!
      </h1>
      <div class="flex justify-between items-center">
        <p class="text-[#535862]">
          {{ dashboardStore.totalSchool || 0 }} schools match your profile!
        </p>
        <FilterDropdown
          placeholder="Sort By"
          :options="sortFilters"
          class=""
          @update:modelValue="(value: OptionAttributes | null) => selectFilter(value)"
        />
      </div>
    </div>
    <div class="space-y-6 flex-1 overflow-y-auto custom-scrollbar pb-6">
      <div
        v-if="(dashboardStore.overViews || []).length > 0"
        class="space-y-4"
        v-for="(program, idx) in groupedSchoolsList"
      >
        <p class="text-[#181D27] font-semibold text-xl">
          {{ program }}
        </p>
        <div class="space-y-6">
          <SchoolCard
            v-for="(school, idx) in dashboardStore.schoolsList.filter(
              (item) => item.program_title === program
            )"
            :key="idx"
            :programs="school"
          />
        </div>
      </div>
      <div v-else class="space-y-6">
        <SchoolCard
          v-for="(school, idx) in dashboardStore.schoolsList"
          :key="idx"
          :programs="school"
        />
      </div>
      <div
        v-if="(dashboardStore.recommendedSchoolsPagination?.last_page ?? 0) > 1"
        class="flex justify-center"
      >
        <BasePagination
          :currentPage="
            dashboardStore.recommendedSchoolsPagination?.current_page
          "
          :lastPage="dashboardStore.recommendedSchoolsPagination?.last_page"
          @paginate="(pageNum) => getRecommendations(pageNum)"
        />
      </div>
    </div>
  </div>
  <Transition name="fade">
    <div
      v-if="isDetailModal"
      @click="isDetailModal = false"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm"
    />
  </Transition>
  <Transition name="slideModal">
    <component
      :is="SchoolDetailModal"
      v-if="isDetailModal"
      :isDetailModal="isDetailModal"
      @close="close"
      :schoolData="schoolProfile"
    />
  </Transition>
</template>
<script setup lang="ts">
import SchoolDetailModal from "~/components/dashboard/SchoolsTab/SchoolDetailModal.vue";
import IconRankDown from "~/components/icons/IconRankDown.vue";
import IconRankUp from "~/components/icons/IconRankUp.vue";
import IconPriceDown from "~/components/icons/IconPriceDown.vue";
import IconPriceUp from "~/components/icons/IconPriceUp.vue";
import useDashboardStore from "~/stores/dashboardStore";
import type { OptionAttributes } from "~/types/home";
import type { Program } from "~/types/program";

const emits = defineEmits<{
  (e: "getRecommendations", pageNo: number): void;
}>();

const dashboardStore = useDashboardStore();

const schoolProfile = ref<Program>();
const isDetailModal = ref<boolean>(false);
const sortFilters = ref<OptionAttributes[]>([
  {
    value: "1",
    label: "Rank (High to Low)",
    icon: shallowRef(IconRankDown),
  },
  {
    value: "2",
    label: "Rank (Low to High)",
    icon: shallowRef(IconRankUp),
  },
  {
    value: "3",
    label: "Price (High to Low)",
    icon: shallowRef(IconPriceDown),
  },
  {
    value: "4",
    label: "Price (Low to High)",
    icon: shallowRef(IconPriceUp),
  },
]);

const groupedSchoolsList = computed(() => {
  const uniqueProgramTitles = Array.from(
    new Set(dashboardStore.schoolsList.map((school) => school.program_title))
  );
  return uniqueProgramTitles;
});

const selectFilter = async (filter: OptionAttributes | null) => {
  const filterKey = {
    [`sort_by_${
      filter?.value === "1" || filter?.value === "2" ? "ranking" : "price"
    }`]: filter?.value === "1" || filter?.value === "3" ? "DESC" : "ASC",
  };
  dashboardStore.setSortParam(filterKey);
  if (dashboardStore.enginePosition === "pre") {
    dashboardStore.preRunEngine();
  } else if (dashboardStore.enginePosition === "post") {
    dashboardStore.runEngine();
  } else {
    dashboardStore.runFinalEngine();
  }
};

const openDetail = (item: Program) => {
  isDetailModal.value = true;
  schoolProfile.value = item;
};
const close = () => {
  isDetailModal.value = false;
};

const getRecommendations = async (pageNo: number = 1) => {
  emits("getRecommendations", pageNo);
};
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
