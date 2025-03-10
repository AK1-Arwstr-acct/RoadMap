<template>
  <section class="size-full flex flex-col gap-2">
    <div ref="chatContainer" class="flex-1 flex flex-col gap-2 overflow-hidden">
      <div
        class="pb-4 overflow-y-auto no-scrollbar h-full flex flex-col gap-8"
        :class="{ 'justify-end': questionStep === 1 }"
      >
        <ChatMessage
          question="What happened? Consider a time when things didn’t go as expected, like failing a test or losing a role."
          :answer="answersList.answerFist"
          @editAnswer="(value) => (answersList.answerFist = value)"
        />
        <ChatMessage
          v-if="questionStep >= 2"
          question="How has this experience impacted you? Did you learn something, gain confidence, or change your mindset?"
          :answer="answersList.answerSecond"
          @editAnswer="(value) => (answersList.answerSecond = value)"
        />
      </div>
    </div>
    <div>
      <div
        v-if="questionStep < 3"
        class="border-[1.5px] border-[#E9EAEB] py-1.5 pr-1.5 pl-3.5 rounded-xl flex items-start gap-2 shadow-[0px_1px_2px_0px_#0A0D120F]"
      >
        <textarea
          type="text"
          placeholder="e.g. losing debate team leadership position..."
          class="flex-1 outline-none resize-none custom-scrollbar placeholder:font-thin"
          rows="4"
          v-model="inputText"
        />
        <button
          @click="handleNext"
          :disabled="!inputText"
          class="flex items-center gap-2 text-white py-2 px-3.5 bg-[#1570EF] rounded-lg disabled:opacity-40"
        >
          Next
          <IconArrowRight fill="#ffffff" />
        </button>
      </div>
      <div v-else class="flex justify-center">
        <button
          @click="handleSubmit"
          class="flex items-center gap-2 text-white py-2.5 px-4 bg-[#1570EF] rounded-lg font-semibold"
        >
          Submit
          <IconArrowRight fill="#ffffff" width="20" height="20" />
        </button>
      </div>
      <Transition name="fade">
        <p
          v-if="questionStep < 3"
          class="text-sm text-[#A4A7AE] text-center pt-4 pb-6"
        >
          No need to rush here, take your time to think
        </p>
        <p v-else class="text-sm text-[#A4A7AE] text-center pt-4 pb-6">
          Great job! Thanks for sharing all these details. We'll now craft the
          perfect essay just for you. Sit back and relax - your essay will be
          ready shortly!
        </p>
      </Transition>
    </div>
  </section>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";

const essayStore = useEssayStore();

const inputText = ref<string>("");
const questionStep = ref<number>(1);

const answersList = ref({
  answerFist: "",
  answerSecond: "",
});

const handleNext = () => {
  if (questionStep.value === 1) {
    answersList.value.answerFist = inputText.value;
  } else if (questionStep.value === 2) {
    answersList.value.answerSecond = inputText.value;
  }
  questionStep.value += 1;
  inputText.value = "";
};

const handleSubmit = () => {
  essayStore.setFinalEssay();
};
</script>
