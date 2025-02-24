<template>
  <div class="h-dvh flex">
    <Sidebar
      :currentTab="currentTab"
      @updateTab="updateTab"
      @openSophieModal="openSophieModal = true"
    />
    <div class="flex-1 bg-[#FAFAFA] flex flex-col">
      <DashboardNav />
      <div class="flex-1 overflow-hidden">
        <Transition name="fade">
          <div v-if="currentTab === 'home'">home</div>
          <TrackerInformations
            v-else-if="currentTab === 'application_tracker'"
          />
          <SchoolsList v-else-if="currentTab === 'schools_list'" />
          <div v-else-if="currentTab === 'setting'">setting</div>
        </Transition>
      </div>
    </div>
    <component
      v-if="openSophieModal"
      :is="SophieModal"
      @openSophieModal="openSophieModal = false"
    />
  </div>
</template>
<script setup lang="ts">
import type { TabName } from "~/types/dashboard";
import SophieModal from "~/components/dashboard/sophie/SophieModal.vue";

const currentTab = ref<TabName>("application_tracker");
const openSophieModal = ref<boolean>(false);

const updateTab = (value: TabName) => {
  currentTab.value = value;
};
</script>
