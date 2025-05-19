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
              We support students throughout every stage of the study abroad
              journey — from planning to paperwork.
            </p>
            <ul class="pl-6 flex flex-col gap-2">
              <li>
                ✨ <span class="font-semibold">Before applying:</span> You’ll
                receive a clear step-by-step roadmap, explore majors and careers
                that fit you, and join exclusive skill-building workshops
                designed just for Arrowster mentees.
              </li>
              <li>
                📄
                <span class="font-semibold">When it’s time to apply:</span> Our
                mentors will help you build a personalized school list through
                tailored reviews, guide you through extracurricular planning and
                scholarship applications, and connect you with a 1-on-1
                counselor for private chats and weekly video calls. You’ll also
                get access to a premium resource library and an AI assistant to
                help you brainstorm, write, and refine your application essays.
              </li>
              <li>
                ✈️ <span class="font-semibold">After applying:</span> We’ll
                continue to support you with visa guidance, financial proof
                paperwork, and help you manage multiple school offers.
              </li>
            </ul>
            <p>
              Learn more about our mentorship program
              <NuxtLinkLocale
                to="https://drive.google.com/file/d/1YcZjI7RgWCQ6TmddSmkbHprdy9PPRU_n/view"
                target="_blank"
              >  
                <span  class="text-[#1570EF] font-semibold cursor-pointer">
                  here
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
