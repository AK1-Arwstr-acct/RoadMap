<template>
  <div class="w-full flex justify-center items-center px-5">
    <div class="w-fit space-y-8">
      <div class="flex flex-col items-center justify-center">
        <img 
          src="/images/lets-go.png" alt="Lets Go"
          class="max-w-[300px] sm:max-w-[450px]"
          loading="eager"
        />
        <h1
          class="text-2xl md:text-3xl text-center font-medium mt-8 max-w-[486px] w-full"
        >
          {{ $t("onboarding.start_your_journey_heading") }}
        </h1>
      </div>
      <div class="px-14">
        <NuxtLinkLocale
          :to="'/dashboard'"
          class="w-full text-white bg-[#1570EF] rounded-lg py-2.5"
        >
          {{ $t("onboarding.start_your_journey") }}
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
</script>
