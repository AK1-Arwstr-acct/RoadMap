<template>
  <section class="flex flex-col gap-6">
    <AchievementCard
      v-for="(category, idx) in categoryList(
        appTrackerStore.preApplication || []
      )"
      :key="idx"
      :category="category || ''"
      :application="appTrackerStore.preApplication"
      :isOngoingBehaviour="isOngoingBehaviour"
    />
    <div v-if="isDetailPage" class="flex flex-col gap-6">
      <AchievementCard
        v-for="(category, idx) in categoryList(
          appTrackerStore.applicationList || []
        )"
        :key="idx"
        :category="category || ''"
        :application="appTrackerStore.applicationList"
        :isOngoingBehaviour="isOngoingBehaviour"
      />
      <AchievementCard
        v-for="(category, idx) in categoryList(
          appTrackerStore.postApplication || []
        )"
        :key="idx"
        :category="category || ''"
        :application="appTrackerStore.postApplication"
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
