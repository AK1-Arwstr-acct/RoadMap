<template>
  <!-- loading screen -->
  <div
    v-if="majorStore.isQuizSubmitting"
    class="min-h-[430px] border border-border-neutral-subtle bg-background-neutral-subtle rounded-2xl px-6 py-[124px] flex flex-col items-center text-center text-text-base"
  >
    <lottie-player
      autoplay
      loop
      background="transparent"
      preserveAspectRatio="xMidYMid slice"
      src="/animations/book-blue.json"
      style="
        width: 200px;
        height: 200px;
        transform: scale(2);
        transform-origin: center;
      "
    />
    <!-- style="width: 200px; height: 200px" -->
    <p class="font-semibold text-xl animate-pulse text-text-base">
      {{ $t('majors_page.chat.cooking_up_your_perfect_match') }}
    </p>
  </div>
  <!-- quiz -->
  <div
    v-else-if="!majorStore.isStepperSubmitted"
    class="border border-border-neutral-subtle bg-background-neutral-subtle rounded-2xl p-6"
  >
    <div class="flex flex-col gap-6 justify-between min-h-[410px]">
      <div class="flex flex-col gap-6">
        <!-- question -->
        <div class="text-lg md:text-xl font-semibold text-text-base">
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
                isSelected(option)
                  ? 'bg-background-brand-subtle text-text-brand border-border-brand'
                  : 'bg-background-neutral text-text-base border-border-neutral-subtle'
              "
              @click="handleOptionClick(option)"
              type="button"
            >
              <span
                class="font-bold mr-2 size-10 min-w-10 rounded-lg flex justify-center items-center text-text-constant-white"
                :class="
                  isSelected(option)
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
              <a
                href="https://www.16personalities.com/"
                target="_blank"
                class="text-link"
                >here</a
              >
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
              ? t('majors_page.chat.submit')
              : t('majors_page.chat.next')
          }}
        </button>
      </div>
    </div>
  </div>
  <!-- redo quiz -->
  <div
    v-else
    class="min-h-[430px] border border-border-neutral-subtle bg-background-neutral-subtle rounded-2xl p-6 flex flex-col items-center text-center text-text-base"
  >
    <img
      src="/images/lets-go.png"
      alt="Rocket"
      class="min-w-[120px] size-[120px] md:min-w-[156px] md:size-[156px] mb-4"
    />
    <div class="text-lg md:text-xl font-semibold mb-1.5">
      You're a fit for the
      <span class="text-text-brand">{{ majorStore.cluster.heading }}</span>
      cluster.
    </div>
    <div
      v-if="majorStore.cluster.summary != ''"
      class="mb-12 text-text-neutral-subtle"
    >
      <vue-markdown :source="majorStore.cluster.summary" :options="options" />
    </div>
    <div class="flex gap-1 leading-7 font-semibold">
      <button
        @click="redoQuiz"
        class="bg-transparent border border-border-neutral px-5 py-1.5 rounded-lg"
      >
        {{ $t('majors_page.chat.redo_quiz') }}
      </button>
      <button
        @click="learnMore"
        class="bg-background-brand text-text-constant-white px-5 py-1.5 rounded-lg"
      >
        {{ $t('majors_page.chat.learn_more') }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useMajorStore from "~/stores/majorStore";

const majorStore = useMajorStore();
const { t } = useI18n();

const emit = defineEmits(["submit", "redoQuiz"]);

const multiSelectFirst = ref<string[]>([]);

const options = {
  html: true,
};

const isSelected = (option: string) => {
  if (majorStore.currentStep === 0) {
    return multiSelectFirst.value.includes(option);
  }
  return majorStore.answers[majorStore.currentStep] === option;
};

// Handle option click for multi/single select
const handleOptionClick = (option: string) => {
  if (majorStore.currentStep === 0) {
    const idx = multiSelectFirst.value.indexOf(option);
    if (idx > -1) {
      multiSelectFirst.value.splice(idx, 1);
    } else {
      multiSelectFirst.value.push(option);
    }
    // No need to update majorStore.answers[0] here, will do on nextStep/submit
  } else {
    majorStore.answers[majorStore.currentStep] = option;
  }
};

const isDisable = (currentStep: number) => {
  if (currentStep + 1 === majorStore.quiz.length + 1) {
    return !(
      majorStore.extraQuestion.mbti !== "" &&
      majorStore.extraQuestion.activities !== ""
    );
  }
  if (currentStep === 0) {
    return multiSelectFirst.value.length === 0;
  }
  return majorStore.answers[currentStep] === "";
};

const nextStep = () => {
  if (majorStore.currentStep === 0) {
    majorStore.answers[0] = multiSelectFirst.value.join(".");
  }
  if (majorStore.currentStep + 1 === majorStore.quiz.length + 1) {
    submitQuiz();
  }
  if (majorStore.currentStep < majorStore.quiz.length) majorStore.currentStep++;
};

const prevStep = () => {
  if (majorStore.currentStep > 0) majorStore.currentStep--;
};

const submitQuiz = () => {
  if (majorStore.currentStep === 0) {
    majorStore.answers[0] = multiSelectFirst.value.join(".");
  }
  majorStore.isQuizSubmitting = true;
  if (!majorStore.isQuizSubmitted) {
    majorStore.isQuizSubmitted = true;
  }
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

watch(
  () => majorStore.currentStep,
  (step) => {
    if (step === 0) {
      // Restore selection from store if coming back
      multiSelectFirst.value = majorStore.answers[0]
        ? majorStore.answers[0].split(".").filter(Boolean)
        : [];
    }
  },
  { immediate: true }
);
</script>
