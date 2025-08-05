<template>
  <div
    v-if="!majorStore.isStepperSubmitted"
    class="border border-border-neutral-subtle bg-background-neutral-subtle rounded-2xl p-6"
  >
    <div class="flex flex-col gap-6">
      <!-- question -->
      <div class="text-xl font-semibold text-text-base">
        <span v-if="majorStore.currentStep < majorStore.quiz.length">
          {{ majorStore.currentStep + 1 }}.
          {{ majorStore.quiz[majorStore.currentStep].question }}
        </span>
        <span v-else>
          {{ majorStore.quiz.length + 1 }}. Tell us more about you
        </span>
      </div>
      <!-- option -->
      <div v-if="majorStore.currentStep < majorStore.quiz.length">
        <div
          v-for="(option, idx) in majorStore.quiz[majorStore.currentStep]
            .options"
          :key="idx"
          class="mb-2"
        >
          <button
            class="w-full flex items-center gap-5 px-4 py-2.5 rounded-lg border transition-all"
            :class="
              majorStore.answers[majorStore.currentStep] === option
                ? 'bg-background-brand-subtle text-text-brand border-border-brand'
                : 'bg-background-neutral text-text-base border-border-neutral-subtle'
            "
            @click="selectOption(option)"
          >
            <span
              class="font-bold mr-2 size-10 min-w-10 rounded-lg flex justify-center items-center text-text-constant-white"
              :class="
                majorStore.answers[majorStore.currentStep] === option
                  ? 'bg-background-brand'
                  : 'bg-background-neutral-bolder'
              "
              >{{ String.fromCharCode(65 + idx) }}</span
            >
            {{ option }}
          </button>
        </div>
      </div>
      <div v-else>
        <div class="mb-8">
          <label class="block font-semibold mb-1 text-text-base"
            >Your MBTI</label
          >
          <p class="mb-4 text-text-neutral-subtle">
            Take 15 minutes to do the MBTI test
            <a href="#" target="_blank" class="text-link">here</a>
            to have more in-depth answer from us
          </p>
          <input
            v-model="majorStore.extraQuestion.mbti"
            placeholder="INFJ, ESFP, etc."
            class="w-full placeholder:text-text-disabled pb-2 border-b outline-none bg-transparent border-border-neutral text-text-base"
          />
        </div>
        <div class="">
          <label class="block mb-4 text-text-base font-semibold"
            >Any particular extracurricular activities you enjoy doing?</label
          >
          <input
            v-model="majorStore.extraQuestion.activities"
            placeholder="Join math competition, music club."
            class="w-full placeholder:text-text-disabled pb-2 border-b outline-none bg-transparent border-border-neutral text-text-base"
          />
        </div>
      </div>
      <!-- buttons -->
      <div class="flex justify-between items-center">
        <button
          :disabled="majorStore.currentStep < 1 || majorStore.isQuizSubmitting"
          @click="prevStep"
          class="transform rotate-90"
        >
          <IconChevronDown />
        </button>
        <span class="text-xs font-semibold text-text-base"
          >{{ majorStore.currentStep + 1 }} of
          {{ majorStore.quiz.length + 1 }}</span
        >
        <button
          @click="nextStep"
          :disabled="
            isDisable(majorStore.currentStep) || majorStore.isQuizSubmitting
          "
          class="bg-background-brand text-text-constant-white px-7 py-2.5 rounded-lg leading-5 hover:bg-background-brand-hovered disabled:bg-background-disabled disabled:text-text-disabled"
        >
          {{
            majorStore.currentStep + 1 === majorStore.quiz.length + 1
              ? "Submit"
              : "Next"
          }}
        </button>
      </div>
    </div>
  </div>
  <!-- redo quiz -->
  <div
    v-else
    class="border border-border-neutral-subtle bg-background-neutral-subtle rounded-2xl p-6 flex flex-col items-center text-center text-text-base"
  >
    <img
      src="/images//lets-go.png"
      alt="Rocket"
      class="min-w-[156px] size-[156px] mb-4"
    />
    <div class="text-xl font-semibold mb-1.5">
      You're a fit for the
      <span class="text-text-brand">{{ majorStore.cluster.heading }}</span>
      cluster.
    </div>
    <div class="mb-12 text-text-neutral-subtle">
      <vue-markdown :source="majorStore.cluster.summary" :options="options" />
    </div>
    <div class="flex gap-1 leading-7 font-semibold">
      <button
        @click="redoQuiz"
        class="bg-transparent border border-border-neutral px-5 py-1.5 rounded-lg"
      >
        Redo quiz
      </button>
      <button
        @click="learnMore"
        class="bg-background-brand text-text-constant-white px-5 py-1.5 rounded-lg"
      >
        Learn more
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useMajorStore from "~/stores/majorStore";

const majorStore = useMajorStore();

const emit = defineEmits(["submit"]);

const options = {
  html: true,
};

const isDisable = (currentStep: number) => {
  return currentStep + 1 === majorStore.quiz.length + 1
    ? !(
        majorStore.extraQuestion.mbti !== "" &&
        majorStore.extraQuestion.activities !== ""
      )
    : majorStore.answers[currentStep] === "";
};

const selectOption = (option: string) => {
  majorStore.answers[majorStore.currentStep] = option;
};

const nextStep = () => {
  if (majorStore.currentStep + 1 === majorStore.quiz.length + 1) {
    submitQuiz();
  }
  if (majorStore.currentStep < majorStore.quiz.length) majorStore.currentStep++;
};

const prevStep = () => {
  if (majorStore.currentStep > 0) majorStore.currentStep--;
};

const submitQuiz = () => {
  // const result = {
  //   answers: majorStore.answers,
  //   mbti: majorStore.extraQuestion.mbti,
  //   activities: majorStore.extraQuestion.activities,
  // };
  // console.log("Quiz submitted:", result);
  majorStore.isQuizSubmitting = true;
  emit("submit");
};

const redoQuiz = () => {
  majorStore.currentStep = 0;
  majorStore.answers = Array(majorStore.quiz.length).fill("");
  majorStore.extraQuestion.mbti = "";
  majorStore.extraQuestion.activities = "";
  majorStore.isStepperSubmitted = false;
};

const learnMore = () => {
  majorStore.navigateFromTabInside = true;
  majorStore.activeTab = "guide";
};
</script>
