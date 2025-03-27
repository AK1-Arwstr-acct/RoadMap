<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="max-w-[752px] px-4 mx-auto pt-8 pb-16">
      <div>
        <div class="flex justify-between items-center font-semibold mb-5">
          <h3 class="text-xl md:text-2xl text-[#181D27]">All your achievement</h3>
        </div>
        <Achievements :is-detail-page="true" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
});
</script>
