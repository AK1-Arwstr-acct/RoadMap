<template>
  <div class="bg-[#383838] rounded-xl overflow-hidden">
    <div
      class="p-2 border-b border-[#686868] flex justify-between items-center gap-2"
    >
      <!-- <h2 class="text-lg 2xl:text-xl font-semibold">Overview</h2> -->
      <div class="h-1.5 w-full bg-[#292929] rounded-full overflow-hidden">
        <div :style="{ width: '100px' }" class="bg-[#36C453] h-full" />
      </div>
      <p>30%</p>
    </div>
    <div class="p-3 flex flex-col gap-4">
      <div v-for="(data, idx) in appStore.DashboardData">
        <OverviewTask :key="idx" :task="data" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
</script>
