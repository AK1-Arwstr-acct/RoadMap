<template>
  <section class="flex flex-col gap-2 size-full h-full">
    <div class="flex-1 overflow-hidden no-scrollbar">
      <div class="size-full flex flex-col gap-2 sm:gap-2">
        <!-- chat -->
        <div ref="chatWrapper" class="flex-1 relative overflow-hidden">
          <div
            ref="chatContainer"
            @scroll="updateHasChatScroll"
            class="size-full overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col h-full relative"
            :class="{
              'justify-between':
                completeChat.length === 0 &&
                !readOnly &&
                !isModal &&
                sophieStore.roadmapTaskDetail !== null,
            }"
          >
            <!-- <Transition name="fade">
              <div
                v-if="welcomeMessage && appStore.authenticatedUser && !readOnly"
                class="mb-8 bg-[#D1E9FF66]/40 py-3.5 px-4 rounded-lg flex gap-2 items-start"
              >
                <div class="flex-1 text-[#181D27]">
                  <p class="font-semibold text-lg mb-1.5 text-[#175CD3]">
                    {{ $t("sophie_page.welcome.welcome") }}
                    {{ appStore.userData?.name }} 👋
                  </p>
                  <p class="font-medium text-[#181D27]">
                    {{ $t("sophie_page.welcome.intro") }}
                  </p>
                </div>
                <div
                  @click="welcomeMessage = !welcomeMessage"
                  class="cursor-pointer"
                >
                  <IconCross fill="#717680" />
                </div>
              </div>
            </Transition> -->
            <Transition name="fade">
              <component
                :is="TaskDetailChatModal"
                v-if="
                  showTaskDetail &&
                  sophieStore.roadmapTaskDetail &&
                  !readOnly &&
                  !isModal &&
                  !isOverviewSidebar
                "
              />
            </Transition>
            <div class="flex flex-col">
              <div
                v-for="(chat, index) in completeChat.filter(
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
                    index + 1 == completeChat.length && !isChatLoading
                      ? `${chatWrapperHeight}px`
                      : 'auto'
                  }`,
                }"
              >
                <div
                  v-if="!chat.isSender"
                  class="size-8 min-w-8 rounded-full overflow-hidden border border-[#00000033]"
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
                    <vue-markdown :source="chat.text" :options="options" />
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
            <!-- pre question for overview sidebar -->
            <div
              v-if="
                (isSummarizeOverview || isOverviewSidebar) &&
                completeChat.length === 2
              "
              class="flex flex-col gap-1 items-end mt-3"
              :class="{ 'pointer-events-none': isChatFull }"
            >
              <p class="text-[#4B5563] text-xs font-semibold pb-1">
                SUGGESTED FOLLOW UP
              </p>
              <div
                class="flex gap-1 items-end"
                :class="{ 'flex-col': !isModal }"
              >
                <div
                  v-for="(question, idx) in OverviewPreQuestion"
                  :key="idx"
                  @click="handelPreQuestion(question)"
                  class="py-2 px-4 rounded-full border border-[#0000001A] text-[#111827] font-semibold w-fit cursor-pointer"
                >
                  {{ question }}
                </div>
              </div>
            </div>
            <!-- pre question for task chat -->
            <div
              v-if="
                completeChat.length === 0 &&
                !readOnly &&
                !isModal &&
                sophieStore.roadmapTaskDetail !== null
              "
              class="mt-3 flex flex-col items-end"
            >
              <p class="text-[#4B5563] text-xs font-semibold pb-1">
                SUGGESTED FOLLOW UP
              </p>
              <div class="flex gap-3 justify-end flex-wrap custom-scrollbar">
                <div
                  v-for="(question, idx) in sophieStore.roadmapTaskDetail
                    ?.common_questions_prompt"
                  :key="idx"
                  @click="handelPreQuestion(question.text)"
                  class="py-2 px-4 rounded-full border border-[#0000001A] text-sm text-[#111827] font-semibold cursor-pointer text-nowrap w-fit flex items-center gap-2"
                >
                  <IconStar v-if="question.text.includes('[star]')" />
                  {{ question.text.replace("[star]", "") }}
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
        <div class="flex flex-col gap-4">
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
          <p
            v-if="
              completeChat.length === 0 &&
              !readOnly &&
              sophieStore.scholarshipSophieModal
            "
            @click="
              handelPreQuestionOfScholarship(
                'Chance me with highly curated individualized scholarships that are best matched for me ONLY'
              )
            "
            class="border-[1.5px] border-gray-200 py-2 px-3.5 rounded-lg text-[#414651] text-sm font-semibold cursor-pointer text-nowrap w-fit"
          >
            {{ t("dashboard.pre_question") }}
          </p>
          <div
            class="relative border-[1.5px] border-gray-200 rounded-lg flex items-center"
            :class="{
              'bg-[#FAFAFA] pointer-events-none':
                isChatFull ||
                isChatLoading ||
                scholarshipResponse ||
                typingInterval !== null,
            }"
          >
            <textarea
              v-if="!readOnly"
              ref="textarea"
              :placeholder="t('sophie_page.message_sophie')"
              v-model="inputQuestion"
              @keydown.enter.exact.prevent="submit"
              @keydown.enter.ctrl.prevent="addNewLine"
              :disabled="
                isChatLoading ||
                isChatFull ||
                isEducationLevel ||
                typingInterval !== null
              "
              rows="4"
              autofocus
              class="placeholder:font-thin w-full focus:outline-none resize-none py-2.5 pl-3.5 pr-12 rounded-lg"
              data-hj-allow
            />
            <button
              :disabled="
                isChatLoading || isChatFull || inputQuestion.trim().length < 2
              "
              @click="submit"
              class="cursor-pointer rounded-lg bg-[#1570EF] absolute top-1.5 transform right-2 -rotate-90 p-2 disabled:opacity-40"
            >
              <IconArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="completeChat.length !== 0 || readOnly">
      <p class="text-[#A4A7AE] text-xs text-center">
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
import type { ChatDetail, OptionAttributes, SophieChat } from "~/types/home";
import { v4 as uuidv4 } from "uuid";
import useSchoolListStore from "~/stores/SchoolListStore";
import useSophieStore from "~/stores/sophieStore";
import useAppStore from "~/stores/AppStore";
import TaskDetailChatModal from "./TaskDetailChatModal.vue";

const { api } = useApi();
const { showToast } = useToast();
const schoolListStore = useSchoolListStore();
const sophieStore = useSophieStore();
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const emit = defineEmits(["isChatLoading"]);

const props = defineProps({
  isNewChat: {
    type: Boolean,
    default: false,
  },
  singleChatDetail: {
    type: Array as PropType<ChatDetail[]>,
    default: () => [],
  },
  isModal: {
    type: Boolean,
    default: false,
  },
  isSummarizeOverview: {
    type: Boolean,
    default: false,
  },
  isTokenLoaded: {
    type: Boolean,
    default: false,
  },
  isReadOnly: {
    type: Boolean,
    default: false,
  },
  isOverviewSidebar: {
    type: Boolean,
    default: false,
  },
});

const chatContainer = ref<HTMLElement | null>(null);
const completeChat = ref<SophieChat[]>([]);
const inputQuestion = ref<string>("");
const isChatLoading = ref<boolean>(false);
const isChatFull = ref<boolean>(false);
const readOnly = ref<boolean>(props.isReadOnly);
const welcomeMessage = ref<boolean>(true);
const showTaskDetail = ref<boolean>(true);
const uuid = ref<string>();
const textarea = ref<HTMLTextAreaElement | null>(null);
const isEducationLevel = ref<boolean>(false);
const studyPrograms = ref<OptionAttributes>();
const hasChatScroll = ref(false);

// const tempHeightDiv = ref<number>()

const scholarshipResponse = ref<boolean>(false);

// typing animation
const typingInterval = ref<number | null>(null);
const typingIndex = ref(0);
const typingFullText = ref("");

// const preQuestion: string[] = [
//   "Which majors suit my personality type?",
//   "Can you explain what INFP means?",
//   "Which study abroad destinations suit my personality?",
// ];
const OverviewPreQuestion: string[] = [
  "Compare these schools",
  "Show me job prospects for these schools",
  "Describe campus life",
];

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

const options = {
  html: true,
};

const isCompleteSophieCalledBefore = computed(() => {
  return sophieStore.tasksWithCompletedSophie.find(
    (item) => item === sophieStore.roadmapTaskDetail?.id
  );
});

const adjustHeight = () => {
  const el = textarea.value;
  if (el) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  }
};

const addNewLine = async () => {
  inputQuestion.value += "\n";
  await nextTick();
  adjustHeight();
};

const handelPreQuestion = async (question: string) => {
  if (question.includes("[star]")) {
    inputQuestion.value = question.replace("[star]", "");
    submit();
    if (!sophieStore.isSophiePublic) {
      await api.get(
        `/api/v1/roadmap/tasks/${sophieStore.roadmapTaskDetail?.id}/book-oneToOne-meeting`
      );
    }
  } else {
    inputQuestion.value = question;
    submit();
  }
};

const tempText = ref<string>("");
const handelPreQuestionOfScholarship = (text: string) => {
  scholarshipResponse.value = true;
  completeChat.value.push({
    isSender: true,
    text: text,
  });
  const list = [
    `Gathering your profile details <span class="inline-block animate-bounce text-3xl [animation-delay:0ms]">.</span><span class="inline-block animate-bounce text-3xl [animation-delay:200ms]">.</span><span class="inline-block animate-bounce text-3xl [animation-delay:400ms]">.</span>`,
    `Crunching numbers in our database <span class="inline-block animate-bounce text-3xl [animation-delay:0ms]">.</span><span class="inline-block animate-bounce text-3xl [animation-delay:200ms]">.</span><span class="inline-block animate-bounce text-3xl [animation-delay:400ms]">.</span>`,
    `Searching deeply for Vietnamese scholarships that best match your profile <span class="inline-block animate-bounce text-3xl [animation-delay:0ms]">.</span><span class="inline-block animate-bounce text-3xl [animation-delay:200ms]">.</span><span class="inline-block animate-bounce text-3xl [animation-delay:400ms]">.</span>`,
    `Updating your personalized results <span class="inline-block animate-bounce text-3xl [animation-delay:0ms]">.</span><span class="inline-block animate-bounce text-3xl [animation-delay:200ms]">.</span><span class="inline-block animate-bounce text-3xl [animation-delay:400ms]">.</span>`,
  ];
  completeChat.value.push({
    isSender: false,
    get text() {
      return tempText.value;
    },
  });
  let i = 0;
  const pushNext = () => {
    if (i < list.length) {
      tempText.value = list[i];
      i++;
      setTimeout(pushNext, 4000);
    } else {
      scholarshipResponse.value = false;
      const localePath = useLocalePath();
      tempText.value = `Please click on the <a href="${localePath(
        "/pricing"
      )}" class="text-[#175CD3] font-semibold tracking-wider">link</a> to speak with your own counselor for a free mentorship and to discuss the 3 scholarships that we’ve curated for you!`;
    }
  };
  pushNext();
  sophieStore.scholarshipSophieModal = false;
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
  typingInterval.value = window.setInterval(() => {
    const lastBotMsg = completeChat.value.findLast((c) => !c.isSender);
    if (!lastBotMsg) return;
    if (typingIndex.value === 3) scrollDown(); 
    if (typingIndex.value < typingFullText.value.length) {
      lastBotMsg.text += typingFullText.value[typingIndex.value];
      typingIndex.value++;
    } else {
      clearInterval(typingInterval.value!);
      typingInterval.value = null;
    }
  }, 0); // Adjust speed as needed
};

const submit = async () => {
  try {
    emit("isChatLoading", true);
    if (!route.query.query) {
      completeChat.value.push({
        isSender: true,
        text: !props.isSummarizeOverview
          ? inputQuestion.value
          : schoolListStore.overViews?.join("\n") || "",
      });
    }
    scrollDown();
    isChatLoading.value = true;
    const userQuery = inputQuestion.value;
    inputQuestion.value = "";
    await nextTick();
    adjustHeight();
    let response;
    if (sophieStore.isSophiePublic) {
      const publicToken = useCookie("publicToken");
      response = await api.post(
        `/api/v1/session-based-journey/ai-conversation/sophie`,
        {
          query: userQuery,
          sophieSessionId: uuid.value,
          ...(!props.isModal && {
            roadmap_task_id: sophieStore.roadmapTaskDetail?.id,
          }),
        },
        {
          headers: {
            "X-auth-token": publicToken.value,
          },
        }
      );
    } else {
      response = await api.post(`/api/v1/ai-conversation/sophie`, {
        query: userQuery,
        sophieSessionId: uuid.value,
        ...(!props.isModal && {
          roadmap_task_id: sophieStore.roadmapTaskDetail?.id,
        }),
      });
    }
    if (response) {
      if (response.data.data) {
        completeChat.value.push({
          isSender: false,
          text: "",
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
        completeChat.value.push({
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

watch(
  () => [props.isNewChat, sophieStore.roadmapTaskDetail],
  () => {
    completeChat.value = [];
    uuid.value = uuidv4();
    if (!props.isReadOnly) {
      readOnly.value = false;
    }
  }
);

watch(
  () => props.singleChatDetail,
  () => {
    if (props.singleChatDetail) {
      let transformChat: SophieChat[] = props.singleChatDetail.map((item) => {
        if (item.me) {
          return {
            isSender: true,
            text: item.me.replace("Please summarize my school list \n  ", ""),
          };
        } else {
          return {
            isSender: false,
            text: item.sophie,
          };
        }
      });
      completeChat.value = transformChat;
      // if (!props.isReadOnly) {
      //   readOnly.value = true;
      // }
    }
  }
);

watch(
  () => props.isTokenLoaded,
  (newValue) => {
    if (newValue) {
      submit();
    }
  }
);

watch(
  () => props.isReadOnly,
  () => {
    readOnly.value = props.isReadOnly;
  }
);

// for overViews in final api call
watch(
  () => schoolListStore.overViews,
  () => {
    if (
      props.isOverviewSidebar &&
      (schoolListStore.overViews ?? []).length > 0
    ) {
      inputQuestion.value = `Please summarize my school list \n  ${(
        schoolListStore.overViews ?? []
      ).join("\n")}`;
      submit();
    }
  }
);

watch(
  () => completeChat.value,
  () => {
    updateHasChatScroll();
  },
  { deep: true }
);

onMounted(async () => {
  updateHasChatScroll();
  uuid.value = uuidv4();
  if (sophieStore.preQuestionSelected) {
    inputQuestion.value = sophieStore.preQuestionSelected;
    submit();
    sophieStore.preQuestionSelected = "";
  }
  if (
    props.isSummarizeOverview ||
    (props.isOverviewSidebar && (schoolListStore.overViews ?? []).length > 0)
  ) {
    inputQuestion.value = `Please summarize my school list \n  ${schoolListStore.overViews?.join(
      "\n"
    )}`;
    submit();
  }
  if (route.query.query) {
    completeChat.value.push({
      isSender: true,
      text: `${route.query.query}`,
    });
    isChatLoading.value = true;
    inputQuestion.value = `${route.query.query}`;
  }
  const sophieCompletedList = useCookie("sophieCompletedList");
  sophieStore.tasksWithCompletedSophie =
    (sophieCompletedList.value as any) || [];
  const token = useCookie("token");
  if (!token.value) {
    sophieCompletedList.value = null;
  }
});
</script>
