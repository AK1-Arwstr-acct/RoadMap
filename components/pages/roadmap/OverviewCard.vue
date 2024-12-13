<template>
  <div class="bg-[#383838] rounded-xl overflow-hidden">
    <div class="p-2 bg-[#4D4D4D]">
      <h2 class="text-lg 2xl:text-xl font-semibold">Overview</h2>
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
