<template>
  <div v-for="(faq, index) in faqList" :key="index" class="">
    <div class="flex items-start gap-4 py-8" :class="[{'border-b border-gray-200' : index+1 != faqList.length}]">
      <NuxtImg
        v-if="isOpen[index]"
        src="/images/visa.png"
        class="size-[52px] min-w-[52px]"
        loading="eager"
        preload
      />
      <div class="flex-1">
        <p class="text-lg text-[#181D27] font-semibold">
          {{ faq.question }}
        </p>
        <div
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="
            isOpen[index] ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
          "
        >
          <p class="text-[#535862]">{{ faq.answer }}</p>
        </div>
      </div>
      <div class="cursor-pointer" @click="toggleAnswer(index)">
        <IconMinusCircle v-if="isOpen[index]" />
        <IconPlusCircle v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  faqList: {
    type: Array as PropType<Array<{ question: string; answer: string }>>,
    required: true,
  },
});

// Reactive state for open/closed answers
const isOpen = ref<boolean[]>(props.faqList.map(() => false));

const toggleAnswer = (index: number) => {
  isOpen.value[index] = !isOpen.value[index];
};
</script>
