<template>
  <div class="h-dvh flex relative">
    <Sidebar :currentTab="currentTab" @updateTab="updateTab" />
    <div class="flex-1 bg-[#FAFAFA] flex flex-col">
      <DashboardNav />
      <div class="flex-1 overflow-hidden">
        <Transition name="fade">
          <div v-if="currentTab === 'home'">home</div>
          <ChatWithSophie v-else-if="currentTab === 'sophie'" />
          <TrackerInformations
            v-else-if="currentTab === 'application_tracker'"
          />
          <SchoolsList v-else-if="currentTab === 'schools_list'" />
          <div v-else-if="currentTab === 'setting'">setting</div>
        </Transition>
      </div>
    </div>
    <div
      v-if="currentTab !== 'sophie'"
      @click="openSophieModal = !openSophieModal"
      class="size-14 absolute bottom-5 right-5 rounded-full bg-white flex justify-center items-center shadow-xl cursor-pointer"
    >
      <IconTabSophie class="text-[#1570EF]" width="32" height="32" />
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
import type { TabName } from "~/types/dashboard";

const currentTab = ref<TabName>("application_tracker");
const openSophieModal = ref<boolean>(false);

const updateTab = (value: TabName) => {
  currentTab.value = value;
};
</script>
