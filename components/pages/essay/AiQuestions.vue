<template>
  <section
    class="size-full overflow-hidden flex flex-col items-center"
    :class="{ 'overflow-y-auto pb-4': phase === 'keepGoing' }"
  >
    <div
      class="py-5 md:py-7 px-5 sm:px-20 xl:px-[170px] flex flex-col gap-6 md:gap-10 w-full"
    >
      <div class="flex items-center gap-6">
        <div
          v-if="phase !== 'chooseStyle'"
          @click="emit('goBack')"
          class="cursor-pointer hidden md:block"
        >
          <IconCross fill="#717680" class="size-6 md:size-8" />
        </div>
        <div v-else @click="phase = 'keepGoing'" class="cursor-pointer hidden md:block">
          <IconArrowDownThick
            stroke="#717680"
            class="transform rotate-90 size-6 md:size-8"
          />
        </div>
        <div
          class="flex-1 w-full rounded-full bg-[#F5F5F5] overflow-hidden h-2 md:h-3"
        >
          <div
            class="h-full bg-[#1570EF] rounded-full transition-all ease-in-out duration-700 w-full"
            :style="{ maxWidth: `${essayStore.essayProgress}%` }"
          />
        </div>
        <div class="w-5 md:w-7 h-[34px] md:h-[42px] hidden md:block">
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
            ? `Let's Get to Know You a Little Bit`
            : "Questions specific to your chosen essay style!"
        }}
      </h1>
    </div>
    <!-- chat -->
    <div
      v-if="phase === 'keepGoing'"
      class="w-full max-w-[592px] flex flex-col items-center gap-8 px-5"
    >
      <img
        src="/images/countries-application.png"
        class="w-[300px] md:w-[536px]"
        loading="eager"
      />
      <h1
        class="text-[#181D27] font-semibold text-xl text-center justify-center sm:text-[34px]"
      >
        Great progress! We're starting to build a picture of your unique voice.
      </h1>
      <div class="flex flex-col items-center justify-center gap-5">
        <button
          @click="phase = 'chooseStyle'"
          class="bg-[#1570EF] rounded-lg py-3 px-5 text-white font-semibold flex justify-center items-center gap-2 w-[360px]"
        >
          Keep going
          <IconArrowRight fill="#ffffff" width="20" height="20" />
        </button>
        <p
          @click="phase = 'questionPhase'"
          class="text-[#535862] font-semibold cursor-pointer"
        >
          Go back and make some changes
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
          class="flex-1 overflow-y-auto no-scrollbar pb-4 px-5 sm:px-20 md:px-40 2xl:px-96"
        >
          <div class="size-full h-fit flex flex-col gap-8">
            <ChatMessage
              question="Hi there, can you tell me about your year of birth?"
              :answer="answersList.birthYear"
              @editAnswer="(value) => (answersList.birthYear = value)"
            />
            <ChatMessage
              v-if="questionStep >= 2"
              question="What school(s) are you planning to apply to? If you don't have one yet, just write N/A for this question <3"
              :answer="answersList.schoolName"
              @editAnswer="(value) => (answersList.schoolName = value)"
            />
            <ChatMessage
              v-if="questionStep >= 3"
              question="What's your (intended) major?"
              :answer="answersList.major"
              @editAnswer="(value) => (answersList.major = value)"
            />
            <ChatMessage
              v-if="questionStep >= 4"
              question="What's the core message you want to convey?"
              :answer="answersList.message"
              @editAnswer="(value) => (answersList.message = value)"
            />
            <!--  -->
            <div v-if="questionStep === 5">
              <div class="flex items-center gap-3 mb-3">
                <div class="size-8 rounded-full bg-black overflow-hidden">
                  <img
                    src="/images/chat-bot.png"
                    alt="chat bot"
                    class="object-cover object-center size-full"
                    loading="eager"
                  />
                </div>
                <p class="text-[#414651]">
                  What's the style of your personal statement
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
                        name="user_input_statement"
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
        <div class="px-5 sm:px-20 md:px-40 2xl:px-96">
          <div
            v-if="questionStep < 5 && phase === 'questionPhase'"
            class="border-[1.5px] border-[#E9EAEB] py-1.5 pr-1.5 pl-3.5 rounded-xl flex items-start gap-2 shadow-[0px_1px_2px_0px_#0A0D120F]"
          >
            <textarea
              ref="textarea"
              type="text"
              :placeholder="questionStep === 1 ? '2.g. 2007' : ''"
              class="w-full outline-none resize-none custom-scrollbar my-auto"
              v-model="inputText"
              @input="adjustHeight"
              @keydown.enter.exact.prevent="handleNext"
              @keydown.enter.ctrl.prevent="addNewLine"
              rows="1"
              autofocus
              data-hj-allow
            />
            <button
              @click="handleNext"
              :disabled="!inputText"
              class="flex items-center gap-2 text-white text-sm sm:text-base py-2 px-3.5 bg-[#1570EF] rounded-lg disabled:opacity-40"
            >
              Next
              <IconArrowRight fill="#ffffff" />
            </button>
          </div>
          <p class="text-xs sm:text-sm text-[#A4A7AE] text-center py-4">
            No need to rush here, take your time to think
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

const emit = defineEmits(["goBack"]);

const chatContainer = ref<HTMLElement | null>(null);
const inputText = ref<string>("");
const textarea = ref<HTMLTextAreaElement | null>(null);
const questionStep = ref<number>(1);
const phase = ref<"questionPhase" | "keepGoing" | "chooseStyle">(
  "questionPhase"
);
const statementList = [
  "Narrative-Driven: Sharing vivid, immersive stories from your life",
  "Reflective-Philosophical: Drawing thoughtful lessons from your experiences",
  "Metaphorical/Symbolic: Using meaningful objects or skills to tell your story",
  "Growth and Transformation: Before-and-after snapshots of the soul",
  "Cultural Identity/Family Dynamic: Exploring how your childhood shaped you",
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
