<template>
  <section class="flex flex-col gap-2 size-full overflow-hidden h-full">
    <div class="flex-1 overflow-y-auto no-scrollbar">
      <div class="size-full overflow-hidden flex flex-col gap-2 sm:gap-4">
        <!-- chat -->
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col h-full relative"
        >
          <Transition name="fade">
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
          </Transition>
          <Transition name="fade">
            <component
              :is="TaskDetailChatModal"
              v-if="
                showTaskDetail &&
                sophieStore.roadmapTaskDetail &&
                !readOnly &&
                !isModal
              "
            />
          </Transition>
          <!-- <div
            v-if="
              !sophieStore.isSophiePublic &&
              sophieStore.roadmapTaskDetail &&
              !props.isModal &&
              !isCompleteSophieCalledBefore
            "
            class="sticky bottom-0 flex justify-end"
          >
            <div class="">
              <button
                @click="completeSophie"
                :disabled="isChatLoading"
                class="group relative text-center px-4 py-2.5 border-[1.5px] border-[#1570EF] rounded-lg font-semibold text-white bg-[#1570EF] cursor-pointer text-sm"
              >
                {{ $t("sophie_page.complete_sophie_button.buttonText") }}
                
                <div
                  class="hidden group-hover:block transition-all ease-in-out duration-200 absolute bg-[#f3f1f1] w-[calc(100%+50px)] md:w-[calc(100%+200px)] right-10 md:right-20 bottom-14 rounded-xl px-3 py-2 shadow-[0_8px_13px_0_rgba(16,24,40,0.05),16px_20px_50px_13px_rgba(0,0,0,0.25)]"
                >
                  <div
                    class="size-full relative text-[#181D27] text-xs sm:text-sm text-start"
                  >
                    {{ $t("sophie_page.complete_sophie_button.tooltop_Text") }}
                    <div
                      class="size-4 transform rotate-45 bg-[#f3f1f1] absolute right-5 -bottom-3 shadow-black"
                    />
                  </div>
                </div>
              </button>
            </div>
          </div> -->
          <div
            v-for="(chat, index) in completeChat.filter(
              (item) => item.text !== ''
            )"
            :key="index"
            class="flex items-start gap-3"
            :class="{
              'justify-end': chat.isSender,
              'mt-6': index > 0,
            }"
          >
            <div
              v-if="!chat.isSender"
              class="size-8 min-w-8 rounded-full bg-black overflow-hidden"
            >
              <img
                src="/images/chat-bot.png"
                alt="chat bot"
                class="object-cover object-center size-full"
                loading="eager"
              />
            </div>
            <div
              class="mb-4 md:mb-6 w-fit max-w-[90%] text-wrap text-[#414651] suggestion-container"
              :class="{
                'bg-[#FAFAFA] py-1 px-2 md:px-3 rounded-lg': chat.isSender,
              }"
            >
              <div>
                <vue-markdown :source="chat.text" :options="options" />
              </div>
            </div>
          </div>
          <div v-if="isEducationLevel && !studyPrograms">
            <div class="flex justify-end">
              <BaseSelectRadio
                :options="educationLevelOption"
                v-model="studyPrograms"
                @onChange="handelEducationLevel"
                class="w-[300px]"
                direction="upward"
              />
            </div>
          </div>
          <div
            v-if="isChatLoading"
            class="text-[#A4A7AE] font-thin flex items-center gap-3"
          >
            <div class="size-8 min-w-8 rounded-full bg-black overflow-hidden">
              <img
                src="/images/chat-bot.png"
                alt="chat bot"
                class="object-cover object-center size-full"
                loading="eager"
              />
            </div>
            <span class="flex justify-center items-center">
              <div class="flex space-x-2">
                <div
                  class="size-3 bg-[#A4A7AE] rounded-full animate-pulse [animation-delay:0s] ease-in-out"
                ></div>
                <div
                  class="size-3 bg-[#A4A7AE] rounded-full animate-pulse [animation-delay:200ms] ease-in-out"
                ></div>
                <div
                  class="size-3 bg-[#A4A7AE] rounded-full animate-pulse [animation-delay:400ms] ease-in-out"
                ></div>
              </div>
            </span>
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
          <div
            v-if="
              completeChat.length === 0 &&
              !readOnly &&
              !isModal &&
              sophieStore.roadmapTaskDetail !== null
            "
            class="flex overflow-x-auto custom-scrollbar mt-3 gap-3"
          >
            <div
              v-for="(question, idx) in sophieStore.roadmapTaskDetail
                ?.common_questions_prompt"
              :key="idx"
              @click="handelPreQuestion(question.text)"
              class="border-[1.5px] border-gray-200 py-2 px-3.5 rounded-lg text-[#414651] text-sm font-semibold cursor-pointer text-nowrap w-fit"
            >
              {{ question.text }}
            </div>
          </div>
          <p
            v-if="
              completeChat.length === 0 &&
              !readOnly &&
              !isModal &&
              sophieStore.roadmapTaskDetail == null
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
              'bg-[#FAFAFA] pointer-events-none': isChatFull || isChatLoading,
            }"
          >
            <textarea
              v-if="!readOnly"
              ref="textarea"
              :placeholder="t('sophie_page.message_sophie')"
              v-model="inputQuestion"
              @keydown.enter.exact.prevent="submit"
              @keydown.enter.ctrl.prevent="addNewLine"
              :disabled="isChatLoading || isChatFull || isEducationLevel"
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
import useDashboardStore from "~/stores/dashboardStore";
import useSophieStore from "~/stores/sophieStore";
import useAppStore from "~/stores/AppStore";
import TaskDetailChatModal from "./TaskDetailChatModal.vue";

const { api } = useApi();
const { showToast } = useToast();
const dashboardStore = useDashboardStore();
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

const preQuestion: string[] = [
  "Which majors suit my personality type?",
  "Can you explain what INFP means?",
  "Which study abroad destinations suit my personality?",
];
// const preQuestion: string[] = [
//   `${t("sophie_page.should_i_take_the_toefl_or_the_ielts")}`,
//   `${t("sophie_page.which_country_will_suit_me_most_for_study_abroad")}`,
//   `${t("sophie_page.should_i_take_the_toefl_or_the_ielts")}`,
//   `${t("sophie_page.what_scholarships_can_i_apply_for")}`,
//   `${t("sophie_page.which_major_should_i_choose")}`,
// ];

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

const handelPreQuestion = (question: string) => {
  inputQuestion.value = question;
  submit();
};

const tempText = ref<string>("");
const handelPreQuestionOfScholarship = (text: string) => {
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
      const localePath = useLocalePath();
      tempText.value = `Please click on the <a href="${localePath(
        "/pricing"
      )}" class="text-[#175CD3] font-semibold tracking-wider">link</a> to speak with your own counselor for a free mentorship and to discuss the 3 scholarships that we’ve curated for you!`;
    }
  };
  pushNext();
};

const completeSophie = async () => {
  try {
    isChatLoading.value = true;
    let sophieCompletedList = useCookie("sophieCompletedList");
    let response = await api.get(
      `/api/v1/roadmap/tasks/${sophieStore.roadmapTaskDetail?.id}/book-oneToOne-meeting`
    );
    if (response?.data.data) {
      if (sophieStore.roadmapTaskDetail) {
        sophieStore.tasksWithCompletedSophie.push(
          sophieStore.roadmapTaskDetail.id
        );
      }
      if (!sophieCompletedList.value) {
        sophieCompletedList = useCookie("sophieCompletedList", {
          maxAge: 604800,
          httpOnly: false,
          secure: true,
        });
      }
      // await nextTick();
      sophieCompletedList.value = JSON.stringify(
        sophieStore.tasksWithCompletedSophie
      );
      completeChat.value.push({
        isSender: false,
        text: "Perfect,<br/> Now let Sophie do the work behind the scenes with our counselors and prepare the checklist for you.<br/> Sophie will come back to you once the list is fully prepared. Hang tight!",
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.message;
      showToast(errorMessage, {
        type: "warning",
      });
    }
  } finally {
    isChatLoading.value = false;
  }
};

// Function to scroll to the bottom
const scrollDown = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop =
        chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
    }
  });
};

const handelEducationLevel = () => {
  inputQuestion.value = studyPrograms.value?.label || "";
  isEducationLevel.value = false;
  submit();
};

const submit = async () => {
  try {
    emit("isChatLoading", true);
    if (!route.query.query) {
      completeChat.value.push({
        isSender: true,
        text: !props.isSummarizeOverview
          ? inputQuestion.value
          : dashboardStore.overViews?.join("\n") || "",
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
          text: response.data.data,
        });
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
      if (!props.isReadOnly) {
        readOnly.value = true;
      }
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

onMounted(async () => {
  uuid.value = uuidv4();
  if (props.isSummarizeOverview) {
    inputQuestion.value = `Please summarize my school list \n  ${dashboardStore.overViews?.join(
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
