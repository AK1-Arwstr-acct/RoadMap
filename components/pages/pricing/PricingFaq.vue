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
          class="overflow-hidden transition-all duration-300 ease-in-out text-[#535862]"
          :class="
            isOpen[index]
              ? 'max-h-[300px] opacity-100 mt-2'
              : 'max-h-fit md:max-h-0 md:opacity-0'
          "
        >
          <p v-if="index > 0" class="">{{ faq.answer }}</p>
          <div v-else class="flex flex-col gap-2">
            <p>
              {{ $t('pricing_page.faq.faq0.answer_1') }}
            </p>
            <ul class="pl-6 flex flex-col gap-2">
              <li>
                {{ $t('pricing_page.faq.faq0.answer_2') }}
              </li>
              <li>
                {{ $t('pricing_page.faq.faq0.answer_3') }}
              </li>
              <li>
                {{ $t('pricing_page.faq.faq0.answer_4') }}
              </li>
            </ul>
            <p>
              {{ $t('pricing_page.faq.faq0.more') }}
              <NuxtLinkLocale
                to="https://drive.google.com/file/d/1YcZjI7RgWCQ6TmddSmkbHprdy9PPRU_n/view"
                target="_blank"
              >  
                <span  class="text-[#1570EF] font-semibold cursor-pointer">
                  {{ $t('pricing_page.faq.faq0.here') }}
                </span>
              </NuxtLinkLocale>
            </p>
          </div>
        </div>
      </div>
      <div
        class="cursor-pointer p-px hidden md:block"
        @click="toggleAnswer(index)"
      >
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
