<template>
  <section class="flex flex-col gap-6">
    <AchievementCard
      v-for="(category, idx) in categoryList(
        appTrackerStore.preApplication || []
      )"
      :key="idx"
      :category="category || ''"
      :application="appTrackerStore.preApplication"
    />
    <div v-if="isDetailPage" class="flex flex-col gap-6">
      <AchievementCard
        v-for="(category, idx) in categoryList(
          appTrackerStore.applicationList || []
        )"
        :key="idx"
        :category="category || ''"
        :application="appTrackerStore.applicationList"
      />
      <AchievementCard
        v-for="(category, idx) in categoryList(
          appTrackerStore.postApplication || []
        )"
        :key="idx"
        :category="category || ''"
        :application="appTrackerStore.postApplication"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import type { Application } from "~/types/dashboard";

defineProps({
  isDetailPage: {
    type: Boolean,
    default: false,
  },
});

const appTrackerStore = useAppTrackerStore();

const categoryList = (application: Application | Application[]) => {
  if (Array.isArray(application)) {
    const countries = application.map((item) => item.country_title);
    return [...new Set(countries)];
  } else {
    const categories = application.tasks.map((item) => item.category.title);
    return [...new Set(categories)];
  }
};
</script>
