<template>
  <div class="h-screen min-h-fit w-full flex justify-center items-center px-5">
    <div class="w-fit space-y-8">
      <div>
        <NuxtImg 
          src="/images/v-room.png"
          alt="Vroom Vroom"
          loading="eager"
          preload
        />
      </div>
      <div class="px-14">
        <button
          @click="navigateTo(localePath('/onboarding'))"
          class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5"
        >
          Continue
          <IconArrowRight fill="#ffffff" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
</script>
