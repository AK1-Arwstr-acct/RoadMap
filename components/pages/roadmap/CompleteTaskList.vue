<template>
  <div class="flex flex-col gap-14 items-center">
    <div v-for="(category, index) in categoryList" :key="index">
      <CompletedTasks
        v-if="Array.isArray(application) && filterByCountry(category)"
        :application="filterByCountry(category)[0]"
        category="country"
      />
      <CompletedTasks
        v-else-if="!Array.isArray(application)"
        :application="application"
        :category="category || ''"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Application } from "~/types/dashboard";

const props = defineProps({
  heading: {
    type: String,
    default: "",
  },
  application: {
    type: Object as PropType<Application | Application[]>,
    default: () => {},
  },
});

const categoryList = computed(() => {
  if (Array.isArray(props.application)) {
    const countries = props.application.map((item) => item.country_title);
    return [...new Set(countries)];
  } else if (props.application?.tasks) {
    const categories = props.application.tasks.map(
      (item) => item.category?.title || ""
    );
    return [...new Set(categories)];
  }
  return [];
});

const filterByCountry = (name: string | null): Application[] => {
  if (Array.isArray(props.application)) {
    return (
      props.application.filter((item) =>
        item.country_title?.includes(name || "")
      ) || []
    );
  }
  return [];
};
</script>
