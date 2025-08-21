<template>
  <section class="size-full flex flex-col gap-2">
    <div ref="chatContainer" class="flex-1 flex flex-col gap-2 overflow-hidden">
      <div
        class="pb-4 overflow-y-auto no-scrollbar h-full flex flex-col gap-8 p-6"
        :class="{ 'justify-end': questionStep === 1 }"
      >
        <ChatMessage
          :question="t('ai_essay_page.what_happened')"
          :answer="answersList.answerFist"
          @editAnswer="(value : string) => (answersList.answerFist = value)"
        />
        <ChatMessage
          v-if="questionStep >= 2"
          :question="t('ai_essay_page.how_has_this_experience_impacted_you')"
          :answer="answersList.answerSecond"
          @editAnswer="(value : string) => (answersList.answerSecond = value)"
        />
      </div>
    </div>
    <div class="px-6">
      <div
        v-if="questionStep < 3"
        class="border-[1.5px] border-[#E9EAEB] py-1.5 pr-1.5 pl-3.5 rounded-xl flex items-start gap-2 shadow-[0px_1px_2px_0px_#0A0D120F]"
      >
        <textarea
          ref="textarea"
          @input="adjustHeight"
          @keydown.enter.exact.prevent="
            inputText.trim().length >= 2 && handleNext()
          "
          @keydown.enter.ctrl.prevent="addNewLine"
          type="text"
          :placeholder="
            questionStep === 1
              ? `${t(
                  'ai_essay_page.e_g_losing_debate_team_leadership_position'
                )}`
              : ''
          "
          class="flex-1 outline-none resize-none custom-scrollbar placeholder:font-thin"
          rows="4"
          v-model="inputText"
          data-hj-allow
        />
        <button
          @click="handleNext"
          :disabled="inputText.trim().length < 2"
          class="flex items-center gap-2 text-white py-2 px-3.5 bg-[#1570EF] rounded-lg disabled:opacity-40"
        >
          {{ $t("ai_essay_page.next") }}
          <IconArrowRight fill="#ffffff" />
        </button>
      </div>
      <div v-else class="flex justify-center">
        <button
          @click="handleSubmit"
          :disabled="isSubmitting"
          class="flex items-center gap-2 text-white text-sm sm:text-base py-2.5 px-4 bg-[#1570EF] rounded-lg font-semibold disabled:opacity-60"
        >
          {{ $t("ai_essay_page.submit") }}
          <IconArrowRight
            v-if="!isSubmitting"
            fill="#ffffff"
            width="20"
            height="20"
          />
          <IconSpinner v-else class="size-3.5" bgColor="#ffffff00" />
        </button>
      </div>
      <p
        v-if="questionStep < 3"
        class="text-xs sm:text-sm text-[#A4A7AE] text-center pt-4 pb-1"
      >
        {{ $t("ai_essay_page.no_need_to_rush_here_take_your_time_to_think") }}
      </p>
      <p v-else class="text-xs sm:text-sm text-[#A4A7AE] text-center pt-4 pb-1">
        {{ $t("ai_essay_page.great_job") }}
      </p>
    </div>
  </section>
</template>
<script setup lang="ts">
import axios from "axios";
import useEssayStore from "~/stores/essayStore";

const essayStore = useEssayStore();
const { api } = useApi();
const { showToast } = useToast();
const { t } = useI18n();

const props = defineProps({
  basicAnswersList: {
    type: Object,
    default: () => {},
  },
});

const textarea = ref<HTMLTextAreaElement | null>(null);
const inputText = ref<string>("");
const questionStep = ref<number>(1);
const isSubmitting = ref<boolean>(false);

const answersList = ref({
  answerFist: "",
  answerSecond: "",
});

const adjustHeight = () => {
  const el = textarea.value;
  if (el) {
    el.style.height = "auto";
    el.style.height =
      Math.min(el.scrollHeight, questionStep.value === 1 ? 100 : 250) + "px";
  }
};
const addNewLine = async () => {
  inputText.value += "\n";
  await nextTick();
  adjustHeight();
};

const handleNext = async () => {
  if (questionStep.value === 1) {
    answersList.value.answerFist = inputText.value;
    essayStore.essayProgress += 25;
  } else if (questionStep.value === 2) {
    answersList.value.answerSecond = inputText.value;
    essayStore.essayProgress += 25;
  }
  questionStep.value += 1;
  inputText.value = "";
  await nextTick();
  adjustHeight();
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const payload: {
      dob: string;
      dream_school: string;
      major: string;
      core_message: string;
      personal_statement: string;
      any_regrets: string;
      lesson_from_regrets: string;
      future_goals?: string;
      generated_essay?: string;
    } = {
      dob: props.basicAnswersList.birthYear,
      dream_school: props.basicAnswersList.schoolName,
      major: props.basicAnswersList.major,
      core_message: props.basicAnswersList.message,
      personal_statement: props.basicAnswersList.personalStatement,
      any_regrets: answersList.value.answerFist,
      lesson_from_regrets: answersList.value.answerSecond,
      future_goals:
        "I aspire to become a software engineer specializing in AI, developing solutions that enhance accessibility and efficiency in underserved communities",
    };

    if (essayStore.isPublic) {
      await api.post(
        "/api/v1/session-based-journey/generate_an_essay",
        payload,
        {
          headers: {
            "X-auth-token": essayStore.publicUserToken,
          },
        }
      );
      essayStore.tryFreeArrowster = true;
    } else {
      const response = await api.post(
        "/api/v1/ai-conversation/generate_an_essay",
        payload
      );
      const details = filterEssay(response.data.data);
      essayStore.setFinalEssay(details);
      const { future_goals, ...newPayload } = payload;
      newPayload.generated_essay = response.data.data;
      essayStore.essayPayload = newPayload;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  adjustHeight();
});
</script>
