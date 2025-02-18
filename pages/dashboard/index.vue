<template>
  <div class="h-dvh flex">
    <Sidebar :currentTab="currentTab" @updateTab="updateTab" />
    <div class="flex-1 bg-[#FAFAFA] flex flex-col">
      <DashboardNav />
      <div class="flex-1 overflow-hidden">
        <Transition name="fade">
          <div v-if="currentTab === 'home'">home</div>
          <div v-else-if="currentTab === 'sophie'">sophie</div>
          <TrackerInformations v-else-if="currentTab === 'application_tracker'" />
          <SchoolsList v-else-if="currentTab === 'schools_list'" />
          <div v-else>setting</div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TabName } from "~/types/dashboard";

const currentTab = ref<TabName>("schools_list");

const updateTab = (value: TabName) => {
  currentTab.value = value;
};
</script>
