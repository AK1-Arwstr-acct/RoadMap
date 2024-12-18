<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center gap-2 text-xl font-semibold">
      <div class="h-1.5 w-full bg-[#383838] rounded-full overflow-hidden">
        <div :style="{ width: '100px' }" class="bg-[#36C453] h-full" />
      </div>
      <p>30%</p>
    </div>
    <div class="h-[328px] rounded-xl overflow-hidden">
      <NuxtImg src="/images/user.png" class="size-full object-cover" />
    </div>
    <div>
      <h3 class="font-medium text-[#E2E6FF]">Name</h3>
      <p class="text-[#AEAEAE] py-2">Damian Nguyen</p>
    </div>
    <div>
      <h3 class="font-medium text-[#E2E6FF]">Phone number</h3>
      <p class="text-[#AEAEAE] py-2">+84 251 437 663</p>
    </div>
    <div>
      <h3 class="font-medium text-[#E2E6FF]">Current Grade</h3>
      <p class="text-[#AEAEAE] py-2">11</p>
    </div>
</div>
</template>
<script setup lang="ts">
defineProps({
    editMode:{
        type: Boolean,
        default: false
    }
})
</script>