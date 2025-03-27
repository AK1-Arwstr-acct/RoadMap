<template>
  <div v-for="(faq, index) in faqList" :key="index" class="">
    <div
      class="flex items-start gap-4 py-2.5 md:py-4 sm:py-8"
      :class="[{ 'md:border-b border-gray-200': index + 1 != faqList.length }]"
    >
      <div class="flex-1">
        <p class="sm:text-lg text-[#181D27] font-medium">
          {{ faq.question }}
        </p>
        <div
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="
            isOpen[index] ? 'max-h-40 opacity-100 mt-2' : 'max-h-fit md:max-h-0 md:opacity-0'
          "
        >
          <p class="text-[#535862]">{{ faq.answer }}</p>
        </div>
      </div>
      <div class="cursor-pointer p-px hidden md:block" @click="toggleAnswer(index)">
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
