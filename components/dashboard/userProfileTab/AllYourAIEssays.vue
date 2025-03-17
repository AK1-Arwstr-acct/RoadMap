<template>
  <div class="max-w-[752px] py-3 px-4 mx-auto mt-8 mb-16">
    <div class="text-[#717680] font-medium flex items-center gap-1.5 mb-8">
      <p @click="emit('updateStep', 'essay')" class="cursor-pointer">
        All your AI Essay
      </p>
      <IconChevronDown
        class="transform -rotate-90"
        stroke="#717680"
        width="20"
        height="20"
      />
    </div>
    <h3 class="text-3xl font-medium text-[#181D27] my-8">
      {{ essayStore.finalEssay?.title }}
    </h3>
    <div class="text-lg text-[#414651] flex flex-col gap-3 rounded-lg">
      <ClientOnly>
        <vue-markdown
          :source="essayStore.finalEssay?.essayText"
          :options="options"
          class="h-fit flex flex-col gap-4"
        />
      </ClientOnly>
    </div>
    <div class="h-px bg-[#E9EAEB] mx-auto my-[42px]"></div>
    <div class="flex items-start gap-6 pb-16">
      <div class="flex gap-4">
        <IconTabSophie
          width="56"
          height="56"
          class="text-[#ED77FF] flex-shrink-0"
        />
        <p class="text-[#181D27] font-medium text-justify">
          This is far from good though. Want to know how to customise it even
          more and make it 10x better?
        </p>
      </div>
      <button
        @click="navigateTo(localePath('/pricing'))"
        class="border-[1.5px] border-gray-200 rounded-lg text-sm text-[#414651] font-semibold px-3.5 py-2 flex-shrink-0"
      >
        Make my essay 10x better
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";

const essayStore = useEssayStore();
const localePath = useLocalePath();

const emit = defineEmits(["updateStep"]);

const options = {
  html: true,
};

onUnmounted(() => {
  essayStore.finalEssay = undefined;
});
</script>
