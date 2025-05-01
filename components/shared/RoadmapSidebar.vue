<template>
  <div class="bg-white rounded-xl transition-all ease-in-out duration-700 overflow-hidden flex flex-col"
    :class="[isOpen ? 'w-[380px] p-5' : 'w-[72px] py-5']">
    <div class="flex gap-4" :class="[isOpen ? 'justify-between' : 'justify-center']">
      <p v-if="isOpen" class="text-[#181D27] text-xl font-semibold text-nowrap overflow-hidden">
        Your Personalised Application <br />
        Checklist
      </p>
      <IconSidebar @click="isOpen = !isOpen" class="cursor-pointer"
        :class="[isOpen ? 'text-[#717680]' : 'text-[#1570EF]']" />
    </div>
    <!-- for open sidebar -->
    <div v-if="isOpen" class="flex-1 overflow-y-auto no-scrollbar">
      <div class="h-px bg-[#E9EAEB] my-6" />
      <ApplicationsList heading="Pre-Application" :application="appTrackerStore.preApplication" />
      <div class="h-px bg-[#E9EAEB] my-6" />
      <ApplicationsList heading="Application" :application="appTrackerStore.applicationList" />
      <div class="h-px bg-[#E9EAEB] my-6" />
      <ApplicationsList heading="Post-Application" :application="appTrackerStore.postApplication" />
    </div>
    <!-- close sidebar -->
    <div v-else class="flex-1 overflow-y-auto no-scrollbar w-full flex flex-col gap-14 mt-8">
      <CompleteTaskList :application="appTrackerStore.preApplication" />
      <CompleteTaskList :application="appTrackerStore.applicationList" />
      <CompleteTaskList :application="appTrackerStore.postApplication" />
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";

const appTrackerStore = useAppTrackerStore();

const isOpen = ref<boolean>(false);

onMounted(async () => {
  if (
    !appTrackerStore.preApplication &&
    !appTrackerStore.applicationList.length &&
    !appTrackerStore.postApplication
  ) {
    appTrackerStore.getRoadmapData();
  }
});
</script>
