<template>
  <section class="flex flex-col gap-6">
    <div v-if="isDetailPage" class="flex flex-col gap-6">
      <AchievementCard
        v-for="(item, idx) in selectedCategoriesAll"
        :key="idx"
        :category="item.category"
        :application="appTrackerStore[item.source as 'preApplication' | 'applicationList' | 'postApplication']"
        :isOngoingBehaviour="isOngoingBehaviour"
      />
    </div>
    <div v-else class="flex flex-col gap-6">
      <AchievementCard
        v-for="(item, idx) in selectedCategories"
        :key="idx"
        :category="item.category"
        :application="appTrackerStore[item.source as 'preApplication' | 'applicationList' | 'postApplication']"
        :isOngoingBehaviour="isOngoingBehaviour"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import type { Application } from "~/types/dashboard";

const emits = defineEmits(["remainingTask"]);

const props = defineProps({
  isDetailPage: {
    type: Boolean,
    default: false,
  },
  isOngoingBehaviour: {
    type: Boolean,
    default: false,
  },
});

const appTrackerStore = useAppTrackerStore();

const categoryLists = ref([
  { list: appTrackerStore.preApplication || [], source: "preApplication" },
  { list: appTrackerStore.applicationList || [], source: "applicationList" },
  { list: appTrackerStore.postApplication || [], source: "postApplication" },
]);

const selectedCategories = computed(() => {
  let result: { category: string; source: string }[] = [];
  let totalNeeded = 4;

  for (const { list, source } of categoryLists.value) {
    const categories = categoryList(list);
    if (categories.length > 0) {
      const takeCount = Math.min(totalNeeded, categories.length);
      result.push(
        ...categories
          .slice(0, takeCount)
          .map((cat) => ({ category: cat, source }))
      );
      totalNeeded -= takeCount;
      if (totalNeeded <= 0) break;
    }
  }

  return result;
});

const selectedCategoriesAll = computed(() => {
  let result: { category: string; source: string }[] = [];

  for (const { list, source } of categoryLists.value) {
    const categories = categoryList(list);
    if (categories.length > 0) {
      result.push(...categories.map((cat) => ({ category: cat, source })));
    }
  }
  return result;
});

const checkIfAppCompleted = (application: Application, category: string) => {
  const filteredApplication = application?.tasks.filter((task) =>
    task.category.title.includes(category)
  );
  let completedTasksNumber =
    filteredApplication.filter((task) => task.checked === true).length || 0;
  let totalTasksNumber = filteredApplication.length;
  let taskProgress = (completedTasksNumber / (totalTasksNumber ?? 1)) * 100;
  if (!props.isOngoingBehaviour) {
    return taskProgress === 0 ? false : true;
  }
  return taskProgress === 100 || taskProgress === 0 ? false : true;
};
const checkIfCountryCompleted = (
  application: Application[],
  category: string
) => {
  const filteredApplication = application?.find((app) =>
    app.country_title?.includes(category)
  ) as Application | undefined;
  let completedTasksNumber =
    filteredApplication?.tasks.filter((task) => task.checked === true).length ||
    0;
  let totalTasksNumber = filteredApplication?.tasks.length || 0;
  let taskProgress = (completedTasksNumber / (totalTasksNumber ?? 1)) * 100;
  if (!props.isOngoingBehaviour) {
    return taskProgress === 0 ? false : true;
  }
  return taskProgress === 100 || taskProgress === 0 ? false : true;
};

const categoryList = (application: Application | Application[]) => {
  if (Array.isArray(application)) {
    const countries = application.map((item) => item.country_title);
    // if (!props.isOngoingBehaviour) {
    //   return [...new Set(countries)];
    // }
    let countriesArray = [...new Set(countries)];
    let filtredArray: string[] = [];
    countriesArray.forEach((item) => {
      if (item && checkIfCountryCompleted(application, item)) {
        filtredArray.push(item);
      }
    });
    return filtredArray;
  } else {
    const categories = application.tasks.map((item) => item.category.title);
    // if (!props.isOngoingBehaviour) {
    //   return [...new Set(categories)];
    // }
    let categoryArray = [...new Set(categories)];
    let filtredArray: string[] = [];
    categoryArray.forEach((item: string) => {
      if (checkIfAppCompleted(application, item)) {
        filtredArray.push(item);
      }
    });
    return filtredArray;
  }
};

watch(
  () => [
    appTrackerStore.preApplication,
    appTrackerStore.applicationList.length,
    appTrackerStore.postApplication,
  ],
  () => {
    categoryLists.value = [
      { list: appTrackerStore.preApplication || [], source: "preApplication" },
      {
        list: appTrackerStore.applicationList || [],
        source: "applicationList",
      },
      {
        list: appTrackerStore.postApplication || [],
        source: "postApplication",
      },
    ];
  }
);

onMounted(async () => {
  if (
    !appTrackerStore.preApplication &&
    !appTrackerStore.applicationList.length &&
    !appTrackerStore.postApplication
  ) {
    await appTrackerStore.getRoadmapData();
  }

  if (
    categoryList(appTrackerStore.preApplication || []).length ||
    categoryList(appTrackerStore.applicationList || []).length ||
    categoryList(appTrackerStore.postApplication || []).length
  ) {
    emits("remainingTask", true);
  } else {
    emits("remainingTask", false);
  }
});
</script>
