<template>
  <div class="size-full">
    <section class="flex h-full bg-white">
      <div class="w-full flex justify-center overflow-y-auto no-scrollbar">
        <div class="h-fit max-w-[772px] px-10 lg:px-0 py-10 w-full">
          <div
            class="flex flex-col gap-14"
            v-if="
              !appTrackerStore.preApplication &&
              !appTrackerStore.applicationList.length &&
              !appTrackerStore.postApplication
            "
          >
            <RoadmapSkeleton v-for="a in 3" />
          </div>
          <div v-else class="flex flex-col gap-14">
            <PreAppCard />
            <CountriesAppCard />
            <PostAppCard />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";

definePageMeta({
  layout: "dashboard-layout",
});

const appTrackerStore = useAppTrackerStore();

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
