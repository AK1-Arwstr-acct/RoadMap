<template>
    <div class="h-dvh flex flex-col overflow-hidden bg-[#f5f5f5] relative">
      <DashboardNav />
      <div class="flex-1 m-4 rounded-xl bg-white overflow-hidden">
          <slot />
      </div>
      <!-- Sophie Modal -->
      <SophieModal />
    </div>
  </template>
  