<template>
  <section class="flex flex-col gap-2 size-full h-full">
    <div class="flex-1 overflow-hidden no-scrollbar">
      <div class="size-full flex flex-col gap-2 sm:gap-2">
        <!-- chat -->
        <div ref="chatWrapper" class="flex-1 relative overflow-hidden h-full">
          <div
            ref="chatContainer"
            @scroll="updateHasChatScroll"
            class="size-full overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col h-full relative pt-2 max-w-[800px] mx-auto px-5"
            :class="{
              'justify-between':
                majorStore.completeChat.length === 0 && !readOnly && !isModal,
            }"
          >
            <div class="flex flex-col pt-2">
              <!-- initialChat -->
              <div class="mb-6">
                <div
                  v-for="(chat, index) in majorStore.initialChat.filter(
                    (item) => item.text !== ''
                  )"
                  :key="index"
                  class="flex items-start gap-3 relative"
                  :class="{
                    'justify-end': chat.isSender,
                    'mt-6': index > 0,
                  }"
                >
                  <div
                    v-if="!chat.isSender"
                    class="size-8 min-w-8 rounded-full overflow-hidden border border-border-neutral"
                  >
                    <img
                      src="/images/chat-bot.png"
                      alt="chat bot"
                      class="object-cover object-center size-full"
                      loading="eager"
                    />
                  </div>
                  <div
                    class="w-fit max-w-[90%] text-wrap text-[#414651] suggestion-container"
                    :class="{
                      'bg-[#E8E8E880] py-1 px-2 md:px-3 rounded-lg':
                        chat.isSender,
                    }"
                  >
                    <div>
                      <vue-markdown
                        :source="chat.text"
                        :options="options"
                        class="!text-text-base"
                      />
                    </div>
                  </div>
                  <!-- dropdown for public user -->
                  <div
                    v-if="
                      chat.text ===
                        `Cool! What's your current education level?` &&
                      isEducationLevel &&
                      !studyPrograms
                    "
                    class="absolute right-0 top-12"
                  >
                    <BaseSelectRadio
                      :options="educationLevelOption"
                      v-model="studyPrograms"
                      @onChange="handelEducationLevel"
                      class="w-[300px]"
                    />
                    <!-- direction="upward" -->
                  </div>
                </div>
                <!-- quiz button section -->
                <div v-if="majorStore.showQuiz">
                  <div
                    v-if="!majorStore.isQuizStart"
                    class="mt-6 rounded-2xl overflow-hidden border border-border-neutral-subtle bg-background-neutral-subtle flex items-center gap-2"
                  >
                    <div class="size-[100px] md:size-[140px]">
                      <img
                        src="/images/sophieQuiz.png"
                        alt="application"
                        class="size-full object-cover"
                      />
                    </div>
                    <div
                      class="p-2 md:p-6 flex-1 flex flex-col md:flex-row items-start md:justify-between md:items-center gap-3 md:gap-6"
                    >
                      <div class="">
                        <p
                          class="text-text-base text-lg md:text-xl font-semibold"
                        >
                          Career framework quiz
                        </p>
                        <p class="text-text-neutral-subtle text-xs md:text-sm">
                          Identify work cluster, strengths, and career goals
                        </p>
                      </div>
                      <button
                        @click="majorStore.isQuizStart = true"
                        class="rounded-lg px-[18px] text-sm md:text-base py-1 bg-background-brand text-text-constant-white text-nowrap"
                      >
                        Start quiz
                      </button>
                    </div>
                  </div>
                  <div v-else class="mt-6">
                    <QuizSection @submit="quizSubmit" />
                  </div>
                </div>
              </div>
              <!-- complete chat -->
              <div
                v-for="(chat, index) in majorStore.completeChat.filter(
                  (item) => item.text !== ''
                )"
                :key="index"
                class="flex items-start gap-3 relative"
                :class="{
                  'justify-end': chat.isSender,
                  'mt-6': index > 0,
                }"
                :style="{
                  minHeight: `${
                    index + 1 == majorStore.completeChat.length &&
                    !isChatLoading
                      ? `${chatWrapperHeight}px`
                      : 'auto'
                  }`,
                }"
              >
                <div
                  v-if="!chat.isSender"
                  class="size-8 min-w-8 rounded-full overflow-hidden border border-border-neutral"
                >
                  <img
                    src="/images/chat-bot.png"
                    alt="chat bot"
                    class="object-cover object-center size-full"
                    loading="eager"
                  />
                </div>
                <div
                  class="w-fit max-w-[90%] text-wrap text-[#414651] suggestion-container"
                  :class="{
                    'bg-[#E8E8E880] py-1 px-2 md:px-3 rounded-lg':
                      chat.isSender,
                  }"
                >
                  <div>
                    <vue-markdown
                      :source="chat.text"
                      :options="options"
                      class="!text-text-base"
                    />
                  </div>
                  <!-- ReactionThumbs  -->
                  <div v-if="!chat.isSender && !chat.isTyping && chat.message_support_id" class="mt-2 pb-3">
                    <ReactionThumbs :supportId="chat.message_support_id" />
                  </div>
                  <!-- ResourceCard -->
                  <div
                    v-if="!chat.isTyping && chat.showDiscoverMore"
                    class="mt-10 flex flex-col gap-4 pb-5"
                  >
                    <div class="flex items-center gap-3">
                      <IconTelescope />
                      <p class="text-xl font-semibold text-text-base">
                        Discover more
                      </p>
                    </div>
                    <div class="flex gap-3">
                      <ResourceCard
                        v-for="(item, idx) in discoverMoreList"
                        :key="idx"
                        :list="item"
                      />
                    </div>
                  </div>
                </div>
                <!-- dropdown for public user -->
                <div
                  v-if="
                    chat.text ===
                      `Cool! What's your current education level?` &&
                    isEducationLevel &&
                    !studyPrograms
                  "
                  class="absolute right-0 top-12"
                >
                  <BaseSelectRadio
                    :options="educationLevelOption"
                    v-model="studyPrograms"
                    @onChange="handelEducationLevel"
                    class="w-[300px]"
                  />
                  <!-- direction="upward" -->
                </div>
              </div>
              <!-- chat lodding state -->
              <div
                v-if="isChatLoading"
                class="mt-6 h-dvh"
                :style="{
                  minHeight: `${chatWrapperHeight}px`,
                  maxHeight: `${chatWrapperHeight}px`,
                }"
              >
                <SophieMassageSkeleton />
              </div>
            </div>
            <!-- pre question for task chat -->
            <div
              v-if="
                majorStore.completeChat.length === 0 &&
                preQuestion.length > 0 &&
                !isModal &&
                !majorStore.isQuizStart
              "
              class="flex flex-col gap-1 items-end mt-3 overflow-hidden"
              :class="{ 'pointer-events-none': isChatFull }"
            >
              <p class="text-text-neutral-subtle text-xs font-semibold pb-1">
                Ask Sophie to help
              </p>
              <div
                class="flex gap-1 items-end"
                :class="{ 'flex-col': !isModal }"
              >
                <div
                  v-for="(question, idx) in preQuestion"
                  :key="idx"
                  @click="handelPreQuestion(question)"
                  class="py-2 px-4 rounded-full border border-border-neutral-subtle text-xs md:text-sm text-text-base bg-background-base-subtle font-semibold cursor-pointer w-fit flex items-center gap-2"
                >
                  {{ question }}
                </div>
              </div>
            </div>
          </div>
          <!-- scroll to bttom button -->
          <div
            v-if="hasChatScroll"
            @click="scrollDown"
            class="bg-[#E7E5E4] size-10 cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2 rounded-lg flex items-center justify-center shadow-[0_0_2px_2px_#0000,_0_0_3px_0px_#0000,_0px_0px_7px_3px_rgb(0_0_0_/_0.05)]"
          >
            <IconArrowDownBigHead />
          </div>
        </div>
        <!-- input -->
        <div class="flex flex-col gap-4 w-full max-w-[800px] mx-auto px-5">
          <Transition name="fade">
            <div
              v-if="isChatFull"
              class="border-[1.5px] border-[#F5F5F5] bg-[#F5F5F5] py-3 px-3.5 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div class="text-[#414651] text-sm order-1 md:order-none">
                <p class="font-semibold mb-1.5">
                  {{
                    $t(
                      "sophie_page.you_reached_your_daily_limit_for_sophie_interactions"
                    )
                  }}
                </p>
                <p class="">
                  {{
                    $t(
                      "sophie_page.please_find_instructions_to_upgrade_for_more_access_here"
                    )
                  }}
                </p>
              </div>
              <NuxtLinkLocale to="/pricing">
                <button
                  class="border-[1.5px] border-gray-200 bg-white rounded-lg py-2 px-3.5"
                >
                  {{ $t("sophie_page.upgrade_now") }}
                </button>
              </NuxtLinkLocale>
            </div>
          </Transition>
          <div
            class="relative border border-border-neutral-subtle rounded-lg flex flex-col bg-background-neutral-subtle"
            :class="{
              'bg-[#FAFAFA] pointer-events-none':
                isChatFull || isChatLoading || typingInterval !== null,
            }"
          >
            <textarea
              v-if="!readOnly"
              ref="textarea"
              placeholder="Ask Sophie anything"
              v-model="inputQuestion"
              @keydown.enter.exact.prevent="submit"
              @keydown.enter.ctrl.prevent="addNewLine"
              :disabled="
                isChatLoading ||
                isChatFull ||
                isEducationLevel ||
                typingInterval !== null
              "
              rows="1"
              autofocus
              class="placeholder:font-thin w-full h-full focus:outline-none resize-none no-scrollbar p-4 rounded-lg bg-transparent text-text-neutral-subtle"
              data-hj-allow
            />
            <div class="flex justify-between items-center p-4">
              <div class="flex items-center gap-2 pl-2">
                <!-- <div>
                  <IconPlus class="size-6" />
                </div>
                <div>
                  <IconFilterDotLines />
                </div> -->
              </div>
              <button
                :disabled="
                  isChatLoading || isChatFull || inputQuestion.trim().length < 2
                "
                @click="submit"
                class="cursor-pointer rounded-lg bg-background-brand transform -rotate-90 p-2 disabled:opacity-40"
              >
                <IconArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="text-text-neutral-subtle text-xs text-center mb-2">
        <span v-if="!readOnly">
          {{
            $t(
              "sophie_page.sophie_can_make_mistakes_please_check_important_info"
            )
          }}
        </span>
        <span v-else>
          {{
            $t(
              "sophie_page.you_can_review_this_chat_but_replying_or_continuing_the_conversation_is_currently_not_available"
            )
          }}
        </span>
      </p>
    </div>
  </section>
</template>
<script setup lang="ts">
import axios from "axios";
import type { OptionAttributes } from "~/types/home";
import { v4 as uuidv4 } from "uuid";
import useSophieStore from "~/stores/sophieStore";
import useAppStore from "~/stores/AppStore";
import useMajorStore from "~/stores/majorStore";
import { list } from "postcss";

const { api } = useApi();
const { showToast } = useToast();
const sophieStore = useSophieStore();
const appStore = useAppStore();
const majorStore = useMajorStore();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const emit = defineEmits(["isChatLoading"]);

const props = defineProps({
  isModal: {
    type: Boolean,
    default: false,
  },
  isReadOnly: {
    type: Boolean,
    default: false,
  },
});

const chatContainer = ref<HTMLElement | null>(null);
const inputQuestion = ref<string>("");
const isChatLoading = ref<boolean>(false);
const isChatFull = ref<boolean>(false);
const readOnly = ref<boolean>(props.isReadOnly);
const uuid = ref<string>();
const textarea = ref<HTMLTextAreaElement | null>(null);
const isEducationLevel = ref<boolean>(false);
const studyPrograms = ref<OptionAttributes>();
const hasChatScroll = ref(false);

// typing animation
const typingInterval = ref<number | null>(null);
const typingIndex = ref(0);
const typingFullText = ref("");

const preQuestion = ref<string[]>([
  "Compare majors",
  `Explore ${appStore.userMajors} in more detail`,
  `What do students say about ${appStore.userMajors}`,
  "Recommend majors I’m most suited for",
]);

const educationLevelOption: OptionAttributes[] = [
  {
    value: "1",
    label: `${t("sophie_page.high_school")}`,
  },
  {
    value: "2",
    label: `${t("sophie_page.undergraduate")}`,
  },
  {
    value: "3",
    label: `${t("sophie_page.graduate")}`,
  },
  {
    value: "4",
    label: `${t("sophie_page.masters")}`,
  },
];

const discoverMoreList: { title: string; detail: string; link: string }[] = [
  {
    title: "16personalities",
    detail:
      "Matches MBTI types to careers based on personality values and strengths.",
    link: "https://www.16personalities.com/articles/our-theory",
  },
  {
    title: "O*NET Interest Profiler",
    detail:
      "Helps match interests (Holland Codes) to careers and majors, backed by real-world labor market data.",
    link: "https://www.mynextmove.org/explore/ip",
  },
  {
    title: "Truity’s Personality-Career Match Tools",
    detail:
      "Explains how MBTI types like INFP align with certain careers and fields of study",
    link: "https://www.truity.com/test/career-personality-profiler-test",
  },
];

// const preQuestionOptionOne = ref<string[]>([
//   "I want similar tables for other majors",
//   "Help me understand more about Human-Computer Interaction major",
//   "Can you share a quote or insight from current students studying one of the majors?",
// ]);
// const preQuestionOptiontwo = ref<string[]>([
//   "Can you give me more trusted sites to explore these fields?",
//   "Which majors offer solid job prospects and what’s a typical starting salary for each?",
//   "Help me compare two of these majors to understand the key differences?",
// ]);
// const preQuestionOptionThree = ref<string[]>([
//   "Can you share a quote or insight from current students studying one of the majors?",
//   "Help me compare some these majors to understand the key differences?",
// ]);

const options = {
  html: true,
};

const adjustHeight = () => {
  const el = textarea.value;
  if (el) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 50) + "px";
  }
};

const addNewLine = async () => {
  inputQuestion.value += "\n";
  await nextTick();
  adjustHeight();
};

const handelPreQuestion = async (question: string) => {
  if (question === "Recommend majors I’m most suited for") {
    majorStore.showQuiz = true;
    majorStore.isQuizStart = true;
    return;
  }
  if (question.includes("[star]")) {
    inputQuestion.value = question.replace("[star]", "");
    submit();
    // if (!sophieStore.isSophiePublic) {
    //   await api.get(
    //     `/api/v1/roadmap/tasks/${sophieStore.roadmapTaskDetail?.id}/book-oneToOne-meeting`
    //   );
    // }
  } else {
    inputQuestion.value = question;
    submit();
  }
};

const chatWrapperHeight = computed(() => {
  if (chatContainer.value) {
    return chatContainer.value.clientHeight - 90;
  }
});

// Function to scroll to the bottom
const scrollDown = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTo({
        top:
          chatContainer.value.scrollHeight - chatContainer.value.clientHeight,
        behavior: "smooth",
      });
    }
  });
};

const handelEducationLevel = () => {
  inputQuestion.value = studyPrograms.value?.label || "";
  isEducationLevel.value = false;
  submit();
};

const updateHasChatScroll = () => {
  nextTick(() => {
    const el = chatContainer.value;
    if (el) {
      const isOverflow = el.scrollHeight > el.clientHeight;
      const isAtBottom =
        Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 2;
      hasChatScroll.value = isOverflow && !isAtBottom;
    } else {
      hasChatScroll.value = false;
    }
  });
};

const startTypingAnimation = () => {
  if (typingInterval.value) clearInterval(typingInterval.value);

  const lastBotMsg = majorStore.completeChat.findLast((c) => !c.isSender);
  if (!lastBotMsg) return;

  typingInterval.value = window.setInterval(() => {
    if (typingIndex.value === 3) scrollDown();
    if (typingIndex.value < typingFullText.value.length) {
      lastBotMsg.text += typingFullText.value[typingIndex.value];
      typingIndex.value++;
    } else {
      clearInterval(typingInterval.value!);
      typingInterval.value = null;
      lastBotMsg.isTyping = false; // ✅ Typing complete
    }
  }, 0);
};


const quizSubmit = async () => {
  try {
    const messages = [
      {
        role: "assistant",
        content: majorStore.quiz[0].question,
      },
      {
        role: "user",
        content: majorStore.answers[0],
      },
      {
        role: "assistant",
        content: majorStore.quiz[1].question,
      },
      {
        role: "user",
        content: majorStore.answers[1],
      },
      {
        role: "assistant",
        content: "Your MBTI",
      },
      {
        role: "user",
        content: majorStore.extraQuestion.mbti,
      },
      {
        role: "assistant",
        content: "Any particular extracurricular activities you enjoy doing?",
      },
      {
        role: "user",
        content: majorStore.extraQuestion.activities,
      },
    ];
    const response = await api.post("/api/v1/ai-conversation/determine-major", {
      roadmap_task_id: 11,
      sophieSessionId: uuid.value,
      messages: messages,
    });
    if (response.data.data) {
      if (
        response.data.data.cluster != null &&
        response.data.data.cluster_summary != null
      ) {
        majorStore.cluster.heading = response.data.data.cluster;
        majorStore.cluster.summary = response.data.data.cluster_summary;
      }
      majorStore.isStepperSubmitted = true;
      scrollDown();
      majorStore.completeChat.push({
        isSender: false,
        text: "",
        isTyping: true,
        showDiscoverMore: true,
        message_support_id: response.data.message_support_id,
      });
      typingFullText.value = response.data.data.response;
      typingIndex.value = 0;
      startTypingAnimation();
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    majorStore.isQuizSubmitting = false;
  }
};

const submit = async () => {
  try {
    emit("isChatLoading", true);
    majorStore.completeChat.push({
      isSender: true,
      text: inputQuestion.value,
    });
    scrollDown();
    isChatLoading.value = true;
    const userQuery = inputQuestion.value;
    inputQuestion.value = "";
    await nextTick();
    adjustHeight();
    let response;
    // if (sophieStore.isSophiePublic) {
    //   const publicToken = useCookie("publicToken");
    //   response = await api.post(
    //     `/api/v1/session-based-journey/ai-conversation/sophie`,
    //     {
    //       query: userQuery,
    //       sophieSessionId: uuid.value,
    //       ...(!props.isModal && {
    //         roadmap_task_id: sophieStore.roadmapTaskDetail?.id,
    //       }),
    //     },
    //     {
    //       headers: {
    //         "X-auth-token": publicToken.value,
    //       },
    //     }
    //   );
    // } else {
    response = await api.post(`/api/v1/ai-conversation/analysis-major`, {
      query: userQuery,
      sophieSessionId: uuid.value,
      roadmap_task_id: "11",
    });
    // }
    if (response) {
      if (response.data.data) {
        majorStore.completeChat.push({
          isSender: false,
          text: "",
          isTyping: true,
          message_support_id: response.data.message_support_id,
        });
        typingFullText.value = response.data.data;
        typingIndex.value = 0;
        startTypingAnimation();
        if (
          response.data.data === "Cool! What's your current education level?"
        ) {
          isEducationLevel.value = true;
        } else {
          isEducationLevel.value = false;
        }
      } else {
        majorStore.completeChat.push({
          isSender: false,
          text: "type again",
        });
      }
    }
    await nextTick();
    scrollDown();
    if (route.query.query) {
      router.replace({
        query: undefined,
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.status === 423) {
        isChatFull.value = true;
        return;
      }
      const errorMessage = error.message;
      showToast(errorMessage, {
        type: "warning",
      });
    }
  } finally {
    isChatLoading.value = false;
    emit("isChatLoading", false);
    await nextTick();
    if (textarea.value) {
      textarea.value?.focus();
    }
  }
};

const checkInitialContent = () => {
  if (appStore.authenticatedUser) {
    if (appStore.userData) {
      if (
        appStore.userData.current_situation ===
        "I'm unsure about what major to pursue"
      ) {
        preQuestion.value = preQuestion.value.slice(0, -1);
        majorStore.initialChat.push({
          isSender: false,
          text: `<p class="!m-0 text-lg md:text-2xl font-semibold">Hey ${appStore.userData.name} 👋 Not sure where to start with major selection?</p><p class="pt-2 leading-7">This short quiz will help you uncover the right majors for you:</p>`,
        });
        majorStore.showQuiz = true;
      } else if (
        appStore.userData.current_situation ===
        "I have a few majors in mind but need help choosing"
      ) {
        majorStore.initialChat.push({
          isSender: false,
          text: `<p class="!m-0 text-lg md:text-2xl font-semibold">Hey ${appStore.userData.name} 👋  I noticed you're deciding between a few majors.</p><p class="pt-2 leading-7">Tell me the majors you're considering, and I'll help you compare them by career paths, daily tasks, job demand, salary, and even immigration or hiring trends in different countries.</p>`,
        });
      } else if (
        appStore.userData.current_situation ===
        "I know what I want to study, but I still have some concerns"
      ) {
        majorStore.initialChat.push({
          isSender: false,
          text: `<p class="!m-0 text-lg md:text-2xl font-semibold">Hey ${appStore.userData.name} 👋  you are planning to study ${appStore.userMajors}</p><p class="pt-2 leading-7">That’s great! Let’s chat about what’s on your mind so I can help you feel more confident.</p><p class="pt-4 leading-7">I've got tons of tools to help you explore any major - from what it's like day to day, to career paths, salary, job demand, and even hiring or immigration trends by country.</p>`,
        });
      }
    } else return;
  }
  // further code for public if require
};

watch(
  () => appStore.userData,
  () => {
    if (appStore.userData) {
      preQuestion.value = [
        "Compare majors",
        `Explore ${appStore.userMajors} in more detail`,
        `What do students say about ${appStore.userMajors}`,
        "Recommend majors I’m most suited for",
      ];
      checkInitialContent();
    }
  }
);

watch(
  () => props.isReadOnly,
  () => {
    readOnly.value = props.isReadOnly;
  }
);

watch(
  () => majorStore.completeChat,
  () => {
    updateHasChatScroll();
  },
  { deep: true }
);

onMounted(async () => {
  updateHasChatScroll();
  uuid.value = uuidv4();

  if (majorStore.firstRun) {
    checkInitialContent();
    majorStore.firstRun = false;
  }
  if (majorStore.navigateFromTabInside) {
    inputQuestion.value = majorStore.inputText;
    majorStore.navigateFromTabInside = false;
    majorStore.inputText = "";
  }
});
</script>
