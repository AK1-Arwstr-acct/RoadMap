<template>
  <div class="size-full flex justify-center overflow-y-auto no-scrollbar">
    <div
      v-if="trackeSteps === 'application_tabs'"
      class="space-y-14 h-fit max-w-[772px] px-10 lg:px-0 py-10"
    >
      <PreAppCard @updateStep="updateStep('pre_application')" />
      <CountriesAppCard @updateStep="updateStep('countries_application')" />
      <PostAppCard @updateStep="updateStep('post_application')" />
    </div>
    <div v-else class="w-full max-w-[768px] px-8 py-8">
      <!-- breadcrumbs -->
      <div class="mb-6 text-[#717680] font-medium flex items-center gap-1.5">
        <p @click="updateStep('application_tabs')" class="cursor-pointer">
          Application tracker
        </p>
        <IconChevronDown
          class="transform -rotate-90"
          stroke="#717680"
          width="20"
          height="20"
        />
      </div>
      <!-- application detail -->
      <div v-if="trackeSteps === 'pre_application'">
        <ApplicationTasks :application="appTrackerStore.preApplication" />
      </div>
      <div v-if="trackeSteps === 'countries_application'">
        <CountriesApplicationTasks />
      </div>
      <div v-if="trackeSteps === 'post_application'">
        <ApplicationTasks :application="appTrackerStore.postApplication" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";

const appTrackerStore = useAppTrackerStore();

type TrackerSteps =
  | "application_tabs"
  | "pre_application"
  | "countries_application"
  | "post_application";

const trackeSteps = ref<TrackerSteps>("application_tabs");

const updateStep = (step: TrackerSteps) => {
  trackeSteps.value = step;
};

onMounted(async () => {
  appTrackerStore.getRoadmapData();
});
</script>
