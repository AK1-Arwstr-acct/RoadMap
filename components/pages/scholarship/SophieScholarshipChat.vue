<template>
  <section class="flex flex-col gap-2 h-full">
    <div class="flex-1 overflow-hidden">
      <div class="size-full flex flex-col gap-2 sm:gap-2 relative">
        <!-- chat -->
        <div class="flex-1 relative overflow-hidden">
          <div
            ref="chatContainer"
            @scroll="updateHasChatScroll"
            class="size-full no-scrollbar flex flex-col gap-6 h-full relative"
            :class="[
              publicPaywall ? 'overflow-hidden' : 'overflow-y-auto',
              {
                'justify-between':
                  completeChat.length === 0 ||
                  (!appStore.authenticatedUser && completeChat.length === 1),
              },
            ]"
          >
            <div class="flex flex-col gap-6 w-full max-w-[800px] mx-auto">
              <div
                v-for="(chat, index) in completeChat.filter(
                  (item) => item.text !== ''
                )"
                :key="index"
                class="flex items-start gap-3"
                :class="{
                  'justify-end': chat.isSender,
                }"
                :style="{
                  minHeight: `${
                    (index + 1 == completeChat.length &&
                      !isChatLoading &&
                      appStore.authenticatedUser) ||
                    (!appStore.authenticatedUser &&
                      index + 1 == completeChat.length &&
                      index != 0 &&
                      !isChatLoading)
                      ? `${chatWrapperHeight}px`
                      : 'auto'
                  }`,
                }"
              >
                <!-- <div
                  v-if="
                    !chat.isSender &&
                    (index > 0
                      ? completeChat.filter((item) => item.text !== '')[
                          index - 1
                        ].isSender
                      : true)
                  "
                  class="size-8 min-w-8 rounded-full overflow-hidden border border-[#00000033]"
                >
                  <img
                    src="/images/chat-bot.png"
                    alt="chat bot"
                    class="object-cover object-center size-full"
                    loading="eager"
                  />
                </div>
                <div v-else class="w-8" /> -->
                <div
                  class="w-fit max-w-[90%] text-wrap text-[#414651]"
                  :class="{
                    'bg-[#E8E8E880] py-1 px-2 md:px-3 rounded-lg':
                      chat.isSender,
                  }"
                >
                  <div class="suggestion-container">
                    <span
                      v-if="
                        !chat.isSender &&
                        (index > 0
                          ? completeChat.filter((item) => item.text !== '')[
                              index - 1
                            ].isSender
                          : true)
                      "
                      class="size-8 min-w-8 rounded-full overflow-hidden border border-border-neutral inline-block"
                    >
                      <img
                        src="/images/chat-bot.png"
                        alt="chat bot"
                        class="object-cover object-center size-full"
                        loading="eager"
                      />
                    </span>
                    <vue-markdown :source="chat.text" :options="options" />
                  </div>
                  <div
                    v-if="
                      sophieStore.isSophiePublic ? index === 2 : index === 1
                    "
                  >
                    <!-- (button) show my thining -->
                    <div
                      v-if="showLoading"
                      @click="showMyThinking = !showMyThinking"
                      class="flex items-center gap-3 cursor-pointer text-[#4B5563] mt-6"
                    >
                      Show my thinking
                      <IconChevronDown
                        stroke="#4B5563"
                        width="16"
                        height="16"
                        :class="[
                          'transform transition-all ease-in-out duration-200',
                          { 'rotate-180': showMyThinking },
                        ]"
                      />
                    </div>
                    <TransitionGroup
                      name="fade"
                      tag="div"
                      v-if="showLoading && showMyThinking"
                      class="border-l border-[#D1D5DB] px-5 text-[#4B5563] flex flex-col gap-9 mt-6"
                    >
                      <template
                        v-for="(step, idx) in loadingSteps.slice(
                          0,
                          loadingStep
                        )"
                      >
                        <div v-if="idx === 0" :key="`${idx}-div`" class="">
                          <p class="relative -mt-2">
                            {{ step.title }}
                            <span
                              class="size-[9px] rounded-full bg-[#D1D5DB] absolute -left-[25px] top-2"
                            />
                          </p>
                          <div
                            class="text-xs flex flex-col gap-2 mt-3"
                            v-if="step.details"
                          >
                            <p
                              v-for="(detail, dIdx) in step.details.slice(
                                0,
                                childStep
                              )"
                              :key="dIdx"
                            >
                              {{ detail }}
                            </p>
                          </div>
                        </div>
                        <p v-else :key="`${idx}-p`" class="relative -mb-2">
                          {{ step.title }}
                          <span
                            class="size-[9px] rounded-full bg-[#D1D5DB] absolute -left-[25px] top-2"
                          />
                        </p>
                      </template>
                    </TransitionGroup>
                  </div>
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
            <!-- follow up question -->
            <div
              v-if="
                completeChat.length === 0 ||
                (!appStore.authenticatedUser && completeChat.length === 1)
              "
              class="flex flex-col gap-1 items-end mt-3 w-full max-w-[800px] mx-auto"
              :class="{ 'pointer-events-none': isChatFull }"
            >
              <p class="text-[#4B5563] text-xs font-semibold pb-1">
                SUGGESTED FOLLOW UP
              </p>
              <div class="flex gap-1 items-end">
                <p
                  @click="
                    handelPreQuestionOfScholarship(
                      'Chance me with best fit scholarships',
                      appStore.authenticatedUser
                    )
                  "
                  class="py-2 px-4 rounded-full border border-[#0000001A] text-[#111827] font-semibold w-fit cursor-pointer flex items-center gap-2"
                >
                  <IconStar />
                  Chance me with best fit scholarships
                </p>
              </div>
            </div>
          </div>
          <!-- paywall for PUblic user -->
          <Transition name="fade">
            <div
              v-if="publicPaywall"
              class="absolute inset-0 flex flex-col w-full max-w-[800px] mx-auto"
            >
              <!-- shadow bg -->
              <div
                class="flex-1 bg-gradient-to-b from-transparent via-white/60 to-white"
              />
              <div class="bg-white w-full p-4">
                <p class="text-[#111827] font-semibold text-[32px]">
                  Unlock Your
                  <span class="text-[#2563EB]"> Study Abroad Journey </span>
                </p>
                <p class="text-[#4B5563] mt-3">
                  Sign up with Arrowster to unlock all AI-powered study abroad
                  tools and receive 1-on-1 guidance from mentors who are alumni
                  of Harvard, Oxford, Yonsei, and other prestigious
                  universities.
                </p>
                <NuxtLinkLocale
                  :to="appStore.authenticatedUser ? '/pricing' : '/signup'"
                  class="mt-8 block text-white font-semibold py-[13px] px-4 rounded-lg bg-[#2563EB] w-fit"
                >
                  {{
                    appStore.authenticatedUser
                      ? "Get Mentorship"
                      : "Sign up for free"
                  }}
                </NuxtLinkLocale>
              </div>
            </div>
          </Transition>
          <!-- scroll to bttom button -->
          <div
            v-if="hasChatScroll && !publicPaywall"
            @click="scrollDown"
            class="bg-[#E7E5E4] size-10 cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2 rounded-lg flex items-center justify-center shadow-[0_0_2px_2px_#0000,_0_0_3px_0px_#0000,_0px_0px_7px_3px_rgb(0_0_0_/_0.05)]"
          >
            <IconArrowDownBigHead />
          </div>
        </div>
        <!-- input -->
        <div class="flex flex-col gap-4 w-full max-w-[800px] mx-auto">
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
          <!-- textarea -->
          <div
            class="relative border-[1.5px] border-gray-200 rounded-lg flex items-center"
            :class="{
              'bg-[#FAFAFA] pointer-events-none':
                isChatFull ||
                isChatLoading ||
                publicPaywall ||
                typingInterval !== null,
            }"
          >
            <textarea
              ref="textarea"
              :placeholder="t('sophie_page.message_sophie')"
              v-model="inputQuestion"
              @keydown.enter.exact.prevent="submit"
              @keydown.enter.ctrl.prevent="addNewLine"
              :disabled="isChatLoading || isChatFull"
              rows="4"
              autofocus
              class="placeholder:font-thin w-full focus:outline-none resize-none py-2.5 pl-3.5 pr-12 rounded-lg"
              data-hj-allow
            />
            <button
              :disabled="
                isChatLoading || isChatFull || inputQuestion.trim().length < minInputCharacters
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
    <p class="text-[#A4A7AE] text-xs text-center">
      {{
        $t("sophie_page.sophie_can_make_mistakes_please_check_important_info")
      }}
    </p>
  </section>
</template>
<script setup lang="ts">
import axios from "axios";
import type { SophieChat } from "~/types/home";
import { v4 as uuidv4 } from "uuid";
import useSophieStore from "~/stores/sophieStore";
import useAppStore from "~/stores/AppStore";
import IconStar from "~/components/icons/IconStar.vue";

const { api } = useApi();
const { showToast } = useToast();
const sophieStore = useSophieStore();
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const chatContainer = ref<HTMLElement | null>(null);
const completeChat = ref<SophieChat[]>([]);
const inputQuestion = ref<string>("");
const isChatLoading = ref<boolean>(false);
const isChatFull = ref<boolean>(false);
const uuid = ref<string>();
const textarea = ref<HTMLTextAreaElement | null>(null);
const showLoading = ref<boolean>(false);
const showMyThinking = ref<boolean>(true);
const publicPaywall = ref<boolean>(false);
const hasChatScroll = ref(false);
const minInputCharacters = ref<number>(1);

// for public paywall
const isIntroductionCompleted = ref(false);

// for step animation
const isStart = ref<boolean>(false);
const animationTimer = ref<number>(400);

// typing animation
const typingInterval = ref<number | null>(null);
const typingIndex = ref(0);
const typingFullText = ref("");

const loadingStep = ref(0);
const childStep = ref(0);
const loadingSteps = [
  {
    title: "Gathering information on your profile",
    details: [
      `Searching ${
        appStore.userData
          ? appStore.userData?.educational_records?.next_class_grade?.class_name || "bachelor’s"
          : "bachelor’s"
      } program in the ${
        appStore.userData
          ? (() => {
              const countries =
                appStore.userData.educational_records.want_to_study_countries.map(
                  (item) => item.title
                );
              if (countries.length > 2) {
                return (
                  countries.slice(0, -2).join(", ") +
                  ", " +
                  countries.slice(-2).join(" and ")
                );
              } else {
                return countries.join(" and ");
              }
            })()
          : "United States and United Kingdom"
      }`,
      `Searching schools has ${
        appStore.userData
          ? (() => {
              const countries =
                appStore.userData.educational_records.next_program_titles.map(
                  (item) => item.title
                );
              if (countries.length > 2) {
                return (
                  countries.slice(0, -2).join(", ") +
                  ", " +
                  countries.slice(-2).join(" and ")
                );
              } else {
                return countries.join(" and ");
              }
            })()
          : "Music and Film Production"
      } major`,
      "Searching schools by scholarship",
    ],
  },
  { title: "Wrapping up analysis" },
  { title: "Combining recommendation" },
  { title: "Finished" },
];

const options = {
  html: true,
};

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

const chatWrapperHeight = computed(() => {
  if (chatContainer.value) {
    return chatContainer.value.clientHeight - 70;
  }
});

// Function to scroll to the bottom
const scrollDown = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTo({
        top:
          chatContainer.value.scrollHeight - chatContainer.value.clientHeight,
        behavior: "instant",
      });
    }
  });
};

const handelPreQuestionOfScholarship = async (
  question: string,
  sendEmail: boolean
) => {
  try {
    inputQuestion.value = question;
    await submit();
    if (sendEmail) {
      await api.get(
        `/api/v1/roadmap/tasks/${sophieStore.roadmapTaskDetail?.id}/book-oneToOne-meeting`
      );
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
  }
};

const submit = async () => {
  try {
    if (inputQuestion.value.trim().length < minInputCharacters.value) {
      return;
    }
    completeChat.value.push({
      isSender: true,
      text: inputQuestion.value,
    });
    if (completeChat.value.length <= 2) {
      completeChat.value.push({
        isSender: false,
        text: "",
      });
      (typingFullText.value =
        "Got it! Hang tight, I am looking into our database..."),
        (typingIndex.value = 0);
      startTypingAnimation();
      showLoading.value = true;
      runChildSteps();
    }
    scrollDown();
    if (!showLoading.value) {
      isChatLoading.value = true;
    }
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
          roadmap_task_id: sophieStore.roadmapTaskDetail?.id,
          //   ...(!props.isModal && {
          //     roadmap_task_id: sophieStore.roadmapTaskDetail?.id,
          //   }),
        },
        {
          headers: {
            "X-auth-token": publicToken.value,
          },
        }
      );
      if (response.data) {
        isIntroductionCompleted.value =
          response.data.isIntroductionCompleted || false;
      }
    } else {
      response = await api.post(`/api/v1/ai-conversation/sophie`, {
        query: userQuery,
        sophieSessionId: uuid.value,
        roadmap_task_id: sophieStore.roadmapTaskDetail?.id,
        // ...(!props.isModal && {
        //   roadmap_task_id: sophieStore.roadmapTaskDetail?.id,
        // }),
      });
      isIntroductionCompleted.value = true;
    }
    if (response) {
      if (completeChat.value.length <= 3) {
        isStart.value = true;
        stepAnimation();
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      if (showLoading.value) {
        await new Promise((resolve) => setTimeout(resolve, 2200));
        showLoading.value = false;
      }
      if (response.data.data) {
        showMyThinking.value = false;
        completeChat.value.push({
          isSender: false,
          text: "",
        });
        typingFullText.value = response.data.data;
        typingIndex.value = 0;
        startTypingAnimation(true);
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
    if (showLoading.value) {
      await new Promise((resolve) => setTimeout(resolve, 2200));
      showLoading.value = false;
    }
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
    await nextTick();
    if (textarea.value) {
      textarea.value?.focus();
    }
  }
};

const stepAnimation = () => {
  if (loadingStep.value < loadingSteps.length) {
    if (loadingStep.value === 1) {
      animationTimer.value = 500;
    } else if (loadingStep.value === 2) {
      animationTimer.value = 600;
    } else if (loadingStep.value === 3) {
      animationTimer.value = 700;
    }
    if (loadingStep.value === 0 || isStart.value) {
      setTimeout(() => {
        loadingStep.value++;
        stepAnimation();
      }, animationTimer.value); // Adjust delay as needed
    }
  }
};

const runChildSteps = () => {
  if (childStep.value < 3) {
    setTimeout(() => {
      childStep.value++;
      runChildSteps();
    }, 400);
  }
};

const startTypingAnimation = (isPaywall: boolean = false) => {
  if (typingInterval.value) clearInterval(typingInterval.value);
  typingInterval.value = window.setInterval(() => {
    const lastBotMsg = completeChat.value.findLast((c) => !c.isSender);
    if (!lastBotMsg) return;
    if (typingIndex.value === 1) scrollDown();
    if (typingIndex.value < typingFullText.value.length) {
      lastBotMsg.text += typingFullText.value[typingIndex.value];
      typingIndex.value++;
    } else {
      clearInterval(typingInterval.value!);
      typingInterval.value = null;
      if (isPaywall && isIntroductionCompleted.value) {
        setTimeout(() => {
          publicPaywall.value = true;
          textarea.value?.blur();
        }, 2000);
      }
    }
  }, 0); // Adjust speed as needed
};

watch(
  () => showLoading.value,
  (val) => {
    if (val) {
      loadingStep.value = 0;
      stepAnimation();
    }
  }
);

watch(() => completeChat.value, updateHasChatScroll, { deep: true });
watch(() => showLoading.value, updateHasChatScroll);

onMounted(async () => {
  updateHasChatScroll();
  uuid.value = uuidv4();
  if (!appStore.authenticatedUser) {
    const sophieInfo = `<p class="text-[#181D27] text-2xl font-semibold">Nice to meet you!</p> <div class="mt-2 text-[#181D27]"> <p>Let’s find scholarships that are the perfect match for you 🎓</p> <p>Just fill in a few quick details below so I can recommend the best options:</p></div>`;
    // <ul class="flex flex-col list-disc"> <li>Study program (e.g., Bachelor’s, Master’s)</li> <li>Preferred study destination</li> <li>Your GPA</li> <li>Field of study (e.g., Engineering, Business, Arts)</li> </ul>
    completeChat.value.push({
      isSender: false,
      text: sophieInfo,
    });
  }
  if (sophieStore.preQuestionSelected) {
    inputQuestion.value = sophieStore.preQuestionSelected;
    submit();
    sophieStore.preQuestionSelected = "";
  }
});
</script>
