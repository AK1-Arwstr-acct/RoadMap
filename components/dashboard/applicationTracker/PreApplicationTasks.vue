<template>
  <section>
    <div class="mb-8">
      <h1 class="text-[#181D27] font-semibold text-2xl mb-4">
        {{ application.title }}
      </h1>
      <p class="text-[#717680] font-medium mb-6">
        {{ application.description || tempText }}
      </p>
      <div class="flex items-center">
        <div class="bg-[#E9EAEB] h-2 w-[354px] rounded-full">
          <div
            class="bg-[#1570EF] h-full rounded-full transition-all ease-in-out duration-300"
            :style="{ width: '20%' }"
          />
        </div>
        <span class="text-[#414651] font-medium ml-3 mr-6"> 0% complete </span>
        <span
          class="py-0.5 px-2.5 bg-[#EFF8FF] text-[#175CD3] rounded-full text-sm font-medium"
        >
          13 Steps
        </span>
      </div>
    </div>
    <Transition name="fade">
      <div
        v-if="missDeadline"
        class="mb-8 bg-[#D1E9FF66]/40 py-3.5 px-4 rounded-lg flex gap-2"
      >
        <IconInfoCircle
          width="20"
          height="20"
          stroke="#1570EF"
          strokeWidth="2"
          class="transform rotate-[90]"
        />
        <div class="flex-1">data</div>
        <div @click="missDeadline = false" class="cursor-pointer">
          <IconCross fill="#717680" />
        </div>
      </div>
    </Transition>
    <div>tabs</div>
  </section>
</template>
<script setup lang="ts">
import type { Application } from "~/types/dashboard";

defineProps({
  application: {
    type: Object as PropType<Application>,
    default: () => {},
  },
});

const missDeadline = ref<boolean>(true);

const tempText =
  "Lorem ipsum dolor sit amet consectetur. Parturient leo magna elementum at viverra vel. Libero eu neque egestas at morbi adipiscing tristique sit diam. Nunc pellentesque amet molestie integer turpis elit feugiat.";
</script>
