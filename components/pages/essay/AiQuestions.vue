<template>
  <section
    class="size-full overflow-hidden flex flex-col items-center"
    :class="{ 'overflow-y-auto pb-4': phase === 'keepGoing' }"
  >
    <div class="md:pt-6 pb-6 px-[24px] flex flex-col gap-6 md:gap-10 w-full">
      <div class="flex items-center gap-6">
        <div
          class="flex-1 w-full rounded-full bg-[#F5F5F5] overflow-hidden h-2 md:h-3"
        >
          <div
            class="h-full bg-[#1570EF] rounded-full transition-all ease-in-out duration-700 w-full"
            :style="{ maxWidth: `${essayStore.essayProgress}%` }"
          />
        </div>
        <div class="w-5 h-[32px] hidden md:block">
          <img
            src="/images/bulb.png"
            class="size-full object-contain"
            loading="eager"
          />
        </div>
      </div>
      <h1
        class="text-[#181D27] text-xl md:text-2xl 2xl:text-3xl font-medium text-center"
      >
        {{
          phase !== "chooseStyle"
            ? `${t("ai_essay_page.lets_get_to_know_you_a_little_bit")}`
            : `${t(
                "ai_essay_page.questions_specific_to_your_chosen_essay_style"
              )}`
        }}
      </h1>
    </div>
    <!-- chat -->
    <div
      v-if="phase === 'keepGoing'"
      class="w-full flex flex-col items-center gap-8 px-5"
    >
      <img
        src="/images/countries-application.png"
        class="w-[200px] md:w-[260px]"
        loading="eager"
      />
      <h1
        class="text-[#181D27] font-semibold text-xl text-center justify-center"
      >
        {{ $t("ai_essay_page.great_progress") }}
      </h1>
      <div class="flex flex-col items-center justify-center gap-5">
        <button
          @click="phase = 'chooseStyle'"
          class="bg-[#1570EF] rounded-lg py-3 px-5 text-white text-sm font-semibold flex justify-center items-center gap-2 w-[260px]"
        >
          {{ $t("ai_essay_page.keep_going") }}
          <IconArrowRight fill="#ffffff" width="20" height="20" />
        </button>
        <p
          @click="phase = 'questionPhase'"
          class="text-[#535862] font-semibold cursor-pointer text-sm"
        >
          {{ $t("ai_essay_page.go_back_and_make_some_changes") }}
        </p>
      </div>
    </div>
    <div v-else class="w-full flex-1 overflow-hidden">
      <div
        v-if="phase === 'questionPhase'"
        class="size-full flex flex-col gap-2 overflow-hidden"
      >
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto no-scrollbar pb-4 px-4 md:px-6"
        >
          <div class="size-full h-fit flex flex-col gap-8">
            <ChatMessage
              :question="
                t(
                  'ai_essay_page.hi_there_can_you_tell_me_about_your_year_of_birth'
                )
              "
              :answer="answersList.birthYear"
              @editAnswer="(value) => (answersList.birthYear = value)"
            />
            <ChatMessage
              v-if="questionStep >= 2"
              :question="
                t('ai_essay_page.what_schools_are_you_planning_to_apply_to')
              "
              :answer="answersList.schoolName"
              @editAnswer="(value) => (answersList.schoolName = value)"
            />
            <ChatMessage
              v-if="questionStep >= 3"
              :question="t('ai_essay_page.whats_your_intended_major')"
              :answer="answersList.major"
              @editAnswer="(value) => (answersList.major = value)"
            />
            <ChatMessage
              v-if="questionStep >= 4"
              :question="
                t('ai_essay_page.whats_the_core_message_you_want_to_convey')
              "
              :answer="answersList.message"
              @editAnswer="(value) => (answersList.message = value)"
            />
            <!--  -->
            <div v-if="questionStep === 5">
              <div class="flex items-center gap-3 mb-3">
                <div class="size-8 min-w-8 rounded-full border border-[#00000033] overflow-hidden">
                  <img
                    src="/images/chat-bot.png"
                    alt="chat bot"
                    class="object-cover object-center size-full"
                    loading="eager"
                  />
                </div>
                <p class="text-[#414651]">
                  {{
                    $t(
                      "ai_essay_page.whats_the_style_of_your_personal_statement"
                    )
                  }}
                </p>
              </div>
              <!-- options -->
              <div class="flex justify-end">
                <div class="flex flex-col gap-3 group w-[95%]">
                  <!--  -->
                  <div v-for="(option, index) in statementList" :key="index">
                    <label
                      :for="option"
                      @click="handelStatement(option)"
                      class="flex items-center justify-between gap-2 size-full font-medium rounded-xl cursor-pointer relative border-[1.5px] p-3 sm:p-4 transition-all ease-in-out duration-200 shadow-[0px_1px_2px_0px_#0A0D120F]"
                      :class="[
                        answersList.personalStatement === option
                          ? 'border-[#84CAFF] bg-[#EFF8FF] text-[#175CD3]'
                          : 'border-gray-200 text-[#414651]',
                      ]"
                    >
                      <input
                        :id="option"
                        type="radio"
                        name="user_input"
                        :value="option"
                        v-model="answersList.personalStatement"
                        class="absolute top-3 right-3 appearance-none"
                        data-hj-allow
                      />
                      {{ option }}
                      <div
                        class="size-5 min-w-5 rounded-full transition-all ease-in-out duration-200 flex justify-center items-center"
                        :class="[
                          answersList.personalStatement === option
                            ? 'bg-[#1570EF]'
                            : 'border-gray-200 border-2',
                        ]"
                      >
                        <IconTick width="16" height="16" stroke="#ffffff" />
                      </div>
                    </label>
                  </div>
                  <!--  -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-5">
          <div
            v-if="questionStep < 5 && phase === 'questionPhase'"
            class="border-[1.5px] border-[#E9EAEB] py-1.5 pr-1.5 pl-3.5 rounded-xl flex items-start gap-2 shadow-[0px_1px_2px_0px_#0A0D120F]"
          >
            <textarea
              ref="textarea"
              type="text"
              :placeholder="
                questionStep === 1 ? `${t('ai_essay_page.e_g_2007')}` : ''
              "
              class="w-full outline-none resize-none custom-scrollbar my-auto"
              v-model="inputText"
              @input="adjustHeight"
              @keydown.enter.exact.prevent="
                inputText.trim().length >= 2 && handleNext()
              "
              @keydown.enter.ctrl.prevent="addNewLine"
              rows="1"
              autofocus
              data-hj-allow
            />
            <button
              @click="handleNext"
              :disabled="inputText.trim().length < 2"
              class="flex items-center gap-2 text-white text-sm sm:text-base py-2 px-3.5 bg-[#1570EF] rounded-lg disabled:opacity-40 text-nowrap"
            >
              {{ $t("ai_essay_page.next") }}
              <IconArrowRight fill="#ffffff" />
            </button>
          </div>
          <p class="text-xs sm:text-sm text-[#A4A7AE] text-center py-4">
            {{
              $t("ai_essay_page.no_need_to_rush_here_take_your_time_to_think")
            }}
          </p>
        </div>
      </div>
      <EssayStyle v-else :basicAnswersList="answersList" />
    </div>
  </section>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";

const essayStore = useEssayStore();
const { t } = useI18n();

const emit = defineEmits(["goBack"]);

const chatContainer = ref<HTMLElement | null>(null);
const inputText = ref<string>("");
const textarea = ref<HTMLTextAreaElement | null>(null);
const questionStep = ref<number>(1);
const phase = ref<"questionPhase" | "keepGoing" | "chooseStyle">(
  "questionPhase"
);
const statementList = [
  `${t("ai_essay_page.narrative_driven")}`,
  `${t("ai_essay_page.reflective_philosophical")}`,
  `${t("ai_essay_page.metaphorical_symbolic")}`,
  `${t("ai_essay_page.growth_and_transformation")}`,
  `${t("ai_essay_page.cultural_identity_family_dynamic")}`,
];

const answersList = ref({
  birthYear: "",
  schoolName: "",
  major: "",
  message: "",
  personalStatement: "",
});

const scrollDown = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop =
        chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
    }
  });
};

const handleNext = async () => {
  if (questionStep.value === 1) {
    answersList.value.birthYear = inputText.value;
  } else if (questionStep.value === 2) {
    answersList.value.schoolName = inputText.value;
    essayStore.essayProgress += 10;
  } else if (questionStep.value === 3) {
    answersList.value.major = inputText.value;
    essayStore.essayProgress += 10;
  } else if (questionStep.value === 4) {
    answersList.value.message = inputText.value;
    essayStore.essayProgress += 10;
  }
  inputText.value = "";
  questionStep.value += 1;
  if (questionStep.value === 5) {
    essayStore.essayProgress += 10;
  }
  scrollDown();
  await nextTick();
  adjustHeight();
};

const adjustHeight = () => {
  const el = textarea.value;
  if (el) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  }
};
const addNewLine = async () => {
  inputText.value += "\n";
  await nextTick();
  adjustHeight();
};

const handelStatement = (value: string) => {
  phase.value = "keepGoing";
  answersList.value.personalStatement = value;
};

onMounted(() => {
  adjustHeight();
  essayStore.essayProgress += 10;
});
onUnmounted(() => {
  essayStore.essayProgress = 0;
});
</script>
