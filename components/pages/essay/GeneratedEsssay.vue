<template>
  <div class="size-full flex flex-col items-center">
    <div
      class="flex w-full justify-between items-center py-8 px-28 border-b border-[#E9EAEB]"
    >
      <NuxtLink to="/" class="flex gap-2 items-center">
        <NuxtImg
          src="/images/logo/logo.svg"
          alt="Logo"
          class="w-44 h-7"
          loading="eager"
          preload
        />
      </NuxtLink>
      <button
        class="py-2.5 px-5 text-sm font-semibold text-white bg-[#1570EF] rounded-lg"
      >
        Save to Profile
      </button>
    </div>
    <div
      class="flex-1 w-full flex justify-center overflow-y-auto custom-scrollbar"
    >
      <div class="w-[50%] h-fit py-[42px]">
        <div>
          <h1 class="text-[#181D27] text-3xl font-medium">
            {{ essayStore.finalEssay?.title }}
          </h1>
          <p class="text-[#414651] text-lg mt-8">
            {{ essayStore.finalEssay?.essayText }}
          </p>
        </div>
        <div class="h-px bg-[#E9EAEB] my-[42px]" />
        <div class="flex justify-between gap-6 items-start">
          <div class="flex gap-3">
            <NuxtImg
              src="/images/chatbot.png"
              class="w-[74px] h-[70px] object-contain"
            />
            <div>
              <h3 class="text-[#181D27] font-medium">
                We've also sent this essay to your email.
              </h3>
              <p class="text-[#535862] text-sm mt-1.5">
                This is far from good though. Want to know how to customise it
                even more and make it 10x better?
              </p>
            </div>
          </div>
          <button
            class="text-[#414651] w-fit text-nowrap font-semibold text-sm py-2 px-3.5 border border-[#D5D7DA] rounded-lg shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            Make my essay 10x better
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";

const essayStore = useEssayStore();

const localePath = useLocalePath();
</script>
