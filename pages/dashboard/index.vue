<template>
  <div class="h-dvh flex relative">
    <Sidebar :currentTab="currentTab" @updateTab="updateTab" />
    <div class="flex-1 flex flex-col">
      <DashboardNav @updateTab="updateTab" />
      <div class="flex-1 overflow-hidden">
        <div class="size-full overflow-y-auto custom-scrollbar">
          <div class="h-full w-full" :class="{'max-w-[1150px] mx-auto': currentTab !== 'sophie'}">
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
    </div>
    <div
      v-if="currentTab !== 'sophie'"
      @click="openSophieModal = !openSophieModal"
      class="size-14 absolute bottom-5 right-5 rounded-2xl bg-[#ED77FF] flex justify-center items-center shadow-md cursor-pointer"
    >
      <IconTabSophie class="text-white" width="32" height="32" />
    </div>
    <!-- sophie modal -->
    <Transition name="fade">
      <div
        v-if="openSophieModal"
        class="fixed bg-black/50 inset-0 backdrop-blur py-[60px] px-[68px]"
      >
        <ChatWithSophie
          :isModal="true"
          @openSophieModal="openSophieModal = false"
        />
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import type { TabName } from "~/types/dashboard";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const appTrackerStore = useAppTrackerStore();

const currentTab = ref<TabName>("home");
const openSophieModal = ref<boolean>(false);

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
