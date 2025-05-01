<template>
  <div class="h-dvh flex flex-col border border-black overflow-hidden bg-[#f5f5f5] relative">
    <DashboardNav />
    <div class="flex-1 p-4 w-full overflow-hidden flex gap-4">
      <RoadmapSidebar/>
      <div class="border flex-1 bg-white rounded-xl overflow-hidden">
          <slot />
      </div>
    </div>
    <!-- Sophie Modal -->
    <SophieModal />
  </div>
</template>
