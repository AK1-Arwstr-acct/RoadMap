<template>
  <div class="h-dvh hidden lg:flex relative">
    <Sidebar :currentTab="currentTab" @updateTab="updateTab" />
    <div class="flex-1 flex flex-col">
      <DashboardNav @updateTab="updateTab" />
      <div class="flex-1 overflow-hidden">
        <div
          class="size-full"
          :class="{
            'overflow-y-auto custom-scrollbar':
              currentTab !== 'application_tracker',
          }"
        >
          <div
            class="h-full w-full"
            :class="{
              'max-w-[1150px] mx-auto':
                currentTab !== 'sophie' &&
                currentTab !== 'application_tracker' &&
                currentTab !== 'user_profile',
            }"
          >
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
        class="fixed bg-black/50 inset-0 backdrop-blur py-[60px] px-[68px] flex justify-center items-center"
      >
        <ChatWithSophie
          :isModal="true"
          @openSophieModal="openSophieModal = false"
        />
      </div>
    </Transition>
  </div>
  <div
    class="lg:hidden flex flex-col items-center gap-4 h-dvh bg-[#f5faff] overflow-hidden w-screen"
  >
    <div class="mt-16">
      <NuxtImg src="/images/logo/logo.svg" class="w-[130px] h-[22px]" />
    </div>
    <div class="flex-1 w-full flex justify-center items-center px-5">
      <div class="flex flex-col items-center">
        <NuxtImg src="/images/v-room.png" class="max-w-[310px]" />
        <p class="font-medium text-[#181D27] text-center w-[80%]">
          To fully experience our website, we recommend accessing it via a
          desktop or larger device.
        </p>
      </div>
    </div>
    <div>
      <p class="text-[#EE46BC] text-sm font-medium pb-4">
        {{ `Thank you <3` }}
      </p>
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
