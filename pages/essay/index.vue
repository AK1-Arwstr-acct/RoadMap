<template>
  <main class="h-dvh">
    <div
      v-if="!isAiQuestionStart"
      class="size-full p-8 flex flex-col overflow-y-auto no-scrollbar"
    >
      <div class="flex justify-between items-start">
        <NuxtLink to="/" class="flex gap-2 items-center">
          <NuxtImg loading="eager" class="w-44 h-7" src="/images/logo/logo.svg" alt="Logo" />
        </NuxtLink>
        <div @click="navigateTo(localePath('/dashboard'))" class="cursor-pointer">
          <IconCross fill="#717680" width="32" height="32" />
        </div>
      </div>
      <div class="flex-1 md:p-6 flex justify-center items-center">
        <div class="flex flex-col gap-8 items-center max-w-[668px]">
          <NuxtImg loading="eager" src="/images/pre-application.png" class="w-[536px]" />
          <div class="">
            <h1 class="text-[#181D27] font-semibold text-2xl text-center sm:text-[34px]">
              Welcome to Your Personal Essay Journey!
            </h1>
            <p class="text-center text-[#535862] text-lg mt-4">
              Take a deep breath - you're in the right place. We're here to help
              you craft your best essay, whether you're just starting or
              polishing your final draft. Take your time to think and explore -
              your unique voice matters.
            </p>
          </div>
          <div class="flex flex-col items-center justify-center gap-5">
            <button
              @click="isAiQuestionStart = true"
              class="bg-[#1570EF] rounded-lg py-3 px-5 text-white font-semibold flex items-center gap-2"
            >
              Okay, let's begin
              <IconArrowRight fill="#ffffff" width="20" height="20" />
            </button>
            <p class="text-[#535862] font-semibold cursor-pointer">Go back</p>
          </div>
          <!-- upgrade popup -->
          <!-- <div
            class="bg-[#F5F5F5] rounded-lg py-3 px-3.5 w-full flex items-center justify-between gap-3 mt-5 text-sm"
          >
            <div>
              <p class="text-[#414651] font-semibold">
                You've reached your daily limit for AI Essay Editor.
              </p>
              <p class="text-[#414651] mt-1.5">
                Please find instructions to upgrade for more access here.
              </p>
            </div>
            <button
              class="text-[#414651] font-semibold py-2 px-3.5 rounded-lg border border-gray-200 bg-white shadow[0px_1px_2px_0px_#0A0D120D]"
            >
              Upgrade now
            </button>
          </div> -->
        </div>
      </div>
    </div>
    <AiQuestions v-else @goBack="goBack" />
  </main>
</template>
<script setup lang="ts">

const localePath = useLocalePath();

const isAiQuestionStart = ref<boolean>(false);

const goBack = () => {
  isAiQuestionStart.value = false;
};
</script>
