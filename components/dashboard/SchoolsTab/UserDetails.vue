<template>
  <section
    class="pt-8 pb-6 h-full flex flex-col gap-6 overflow-y-auto no-scrollbar"
  >
    <UserDataInfo />
    <SophieRecommendation :isActive="sophieRecommendation" />
    <WhyTheseSchool />
    <MajorSelection @setRecommendationStatus="setRecommendationStatus" />
  </section>
</template>
<script setup lang="ts">
const sophieRecommendation = ref<boolean>(false);

const setRecommendationStatus = (value: boolean) => {
  sophieRecommendation.value = value;
};
</script>
