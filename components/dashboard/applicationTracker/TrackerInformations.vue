<template>
  <div
    class="px-10 lg:px-20 py-10 flex justify-center size-full overflow-y-auto no-scrollbar"
  >
    <div class="space-y-14 h-fit">
      <!-- <PreAppCard :application="appTrackerStore.preApplication" />
      <PostAppCard :application="appTrackerStore.postApplication" /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";

const appTrackerStore = useAppTrackerStore();

onMounted(async () => {
  appTrackerStore.getRoadmapData();
});
</script>
