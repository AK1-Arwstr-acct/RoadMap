<template>
  <div class="flex gap-10 xl:gap-14 px-6 size-full">
    <div class="flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-14 w-full">
      <div class="flex-1">
        <RecommendedSchools />
      </div>
      <div class="w-full md:w-[312px]">
        <UserDetails />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const dashboardStore = useDashboardStore();

</script>
