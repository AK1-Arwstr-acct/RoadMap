<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="max-w-[752px] py-3 px-4 mx-auto md:mt-8 mb-16">
      <h3 class="text-2xl md:text-3xl font-medium text-[#181D27] my-4 md:my-8">
        {{ essayStore.finalEssay?.title }}
      </h3>
      <div class="md:text-lg text-[#414651] flex flex-col gap-3 rounded-lg">
        <ClientOnly>
          <vue-markdown
            :source="essayStore.finalEssay?.essayText"
            :options="options"
            class="h-fit flex flex-col gap-4"
          />
        </ClientOnly>
      </div>
      <div class="h-px bg-[#E9EAEB] mx-auto my-6 md:my-[42px]"></div>
      <div
        class="flex flex-col md:flex-row justify-between gap-6 items-end md:items-start"
      >
        <div class="flex gap-3">
          <IconTabSophie
            width="56"
            height="56"
            class="text-[#ED77FF] flex-shrink-0"
          />
          <p
            class="text-[#181D27] text-sm md:text-base font-medium text-justify"
          >
            This is far from good though. Want to know how to customise it even
            more and make it 10x better?
          </p>
        </div>
        <button
          @click="navigateTo(localePath('/pricing'))"
          class="text-[#414651] w-full sm:w-fit text-nowrap font-semibold text-sm py-2 px-3.5 border border-[#D5D7DA] rounded-lg shadow-[0px_1px_2px_0px_#0A0D120D]"
        >
          Make my essay 10x better
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";

definePageMeta({
  layout: "dashboard-layout",
});

const essayStore = useEssayStore();
const localePath = useLocalePath();

const options = {
  html: true,
};

onBeforeMount(() => {
  if (!essayStore.finalEssay) {
    navigateTo(localePath("/dashboard/profile/essays"));
  }
});

onUnmounted(() => {
  essayStore.finalEssay = undefined;
});
</script>
