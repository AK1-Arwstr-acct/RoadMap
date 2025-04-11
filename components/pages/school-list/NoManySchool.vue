<template>
  <div class="flex flex-col items-center text-center w-[276px]">
    <IconTabSophie width="56" height="56" class="text-[#ED77FF] mb-5" />
    <p class="text-[#181D27] font-medium mb-2">Not seeing many schools?</p>
    <p class="text-[#535862] text-sm">
      If you'd like more guidance or personalized suggestions, our team is here
      to help!
    </p>
    <div>
      <NuxtLinkLocale
        :to="'/pricing'"
        class="text-sm font-semibold text-white py-2 px-3.5 bg-[#1570EF] rounded-lg mt-5"
      >
        Talk to our team
      </NuxtLinkLocale>
    </div>
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
</script>
