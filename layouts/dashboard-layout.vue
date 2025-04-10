<template>
  <div class="h-dvh w-screen flex relative">
    <component v-if="deviceType === 'desktop' || deviceType === 'tablet'" :is="desktop.DashboardSidebar" />
    <div class="flex-1 overflow-hidden flex flex-col">
      <DashboardNav />
      <div class="flex-1 w-screen md:w-full overflow-hidden">
        <slot />
      </div>
    </div>
    <!-- Sophie Modal -->
    <SophieModal />
  </div>
</template>
<script setup lang="ts">
const deviceType = useDeviceType();

const desktop = {
  DashboardSidebar: defineAsyncComponent(() => import('~/components/shared/DashboardSidebar.vue')),
}
</script>
