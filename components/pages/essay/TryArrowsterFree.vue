<template>
  <div class="w-full h-full flex justify-center items-center px-5">
    <div class="w-fit space-y-8">
      <div class="flex flex-col items-center justify-center">
        <img
          src="/images/lets-go.png"
          alt="Lets Go"
          class="max-w-[300px] sm:max-w-[484px] aspect-square"
          loading="eager"
        />
        <h1
          class="text-2xl md:text-3xl text-center font-medium mt-8 max-w-[750px] w-full"
        >
          We've sent the AI-generated essay to your email. Please check your
          inbox.
        </h1>
      </div>
      <div class="flex justify-center">
        <NuxtLinkLocale
          :to="'/pricing'"
          class="w-full text-white bg-[#1570EF] rounded-lg py-2.5 max-w-[360px] font-semibold"
        >
          Try Arrowster for Free
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";

const essayStore = useEssayStore();
const localePath = useLocalePath();

onUnmounted(() => {
  essayStore.tryFreeArrowster = false;
});
</script>
