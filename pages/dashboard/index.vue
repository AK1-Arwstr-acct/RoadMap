<template>
  <div class="h-dvh flex relative">
    <Sidebar :currentTab="currentTab" @updateTab="updateTab" />
    <div class="flex-1 bg-[#FAFAFA] flex flex-col">
      <DashboardNav @updateTab="updateTab" />
      <div class="flex-1 overflow-hidden">
        <Transition name="fade">
          <DashboardHome v-if="currentTab === 'home'" />
          <ChatWithSophie v-else-if="currentTab === 'sophie'" />
          <TrackerInformations
            v-else-if="currentTab === 'application_tracker'"
          />
          <SchoolsList v-else-if="currentTab === 'schools_list'" />
          <div v-else-if="currentTab === 'setting'">setting</div>
          <UserProfile v-else />
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import type { TabName } from "~/types/dashboard";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const appTrackerStore = useAppTrackerStore();

const currentTab = ref<TabName>("home");

const updateTab = (value: TabName) => {
  currentTab.value = value;
};

watch(
  () => appTrackerStore.ongoingTrack,
  () => {
    currentTab.value = "application_tracker";
  }
);

onBeforeMount(async () => {
  if (!appStore.userData) {
    await appStore.getUserData();
  }
});
</script>
