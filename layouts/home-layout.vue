<template>
  <div class="h-dvh flex flex-col overflow-hidden md:bg-[#f5f5f5] relative">
    <DashboardNav />
    <div class="flex-1 p-2 sm:p-4 w-full overflow-hidden flex gap-4 relative">
      <RoadmapSidebar/>
      <div class="flex-1 md:bg-white rounded-xl overflow-hidden">
          <slot />
      </div>
    </div>
    <!-- Sophie Modal -->
    <SophieModal />
  </div>
</template>
