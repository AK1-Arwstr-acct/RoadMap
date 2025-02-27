<template>
  <div class="max-w-[752px] px-4 mx-auto pt-8 pb-16">
    <!-- breadcrumbs -->
    <div class="mb-6 text-[#717680] font-medium flex items-center gap-1.5">
      <p
        @click="emit('updateStep', 'profile')"
        class="cursor-pointer font-sans"
      >
        Profile
      </p>
      <IconChevronDown
        class="transform -rotate-90"
        stroke="#717680"
        width="20"
        height="18"
      />
    </div>
    <div>
      <div class="flex justify-between items-center font-semibold mb-5">
        <h3 class="text-2xl text-[#181D27]">All your achievement</h3>
      </div>
      <Achievements :is-detail-page="true" />
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["updateStep"]);
</script>
