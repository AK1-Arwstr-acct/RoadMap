<template>
  <section class="flex flex-col gap-2 size-full overflow-hidden h-full">
    <div class="flex-1 overflow-y-auto no-scrollbar">
      <div
        class="size-full overflow-hidden flex flex-col gap-2 sm:gap-2 relative"
      >
        <!-- chat -->
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col gap-6 h-full relative"
        >
          <div
            v-for="(chat, index) in completeChat.filter(
              (item) => item.text !== ''
            )"
            :key="index"
            class="flex items-start gap-3"
            :class="{
              'justify-end': chat.isSender,
            }"
          >
            <div
              v-if="
                !chat.isSender &&
                (index > 0
                  ? completeChat.filter((item) => item.text !== '')[index - 1]
                      .isSender
                  : true)
              "
              class="size-8 min-w-8 rounded-full bg-black overflow-hidden"
            >
              <img
                src="/images/chat-bot.png"
                alt="chat bot"
                class="object-cover object-center size-full"
                loading="eager"
              />
            </div>
            <div v-else class="w-8" />
            <div
              class="w-fit max-w-[90%] text-wrap text-[#414651] suggestion-container"
              :class="{
                'bg-[#E8E8E880] py-1 px-2 md:px-3 rounded-lg': chat.isSender,
              }"
            >
              <div>
                <vue-markdown :source="chat.text" :options="options" />
              </div>
            </div>
          </div>
          <TransitionGroup
            name="fade"
            tag="div"
            v-if="showLoading"
            class="ml-[32px] border-l border-[#D1D5DB] px-5 text-[#4B5563] flex flex-col gap-9"
          >
            <template v-for="(step, idx) in loadingSteps.slice(0, loadingStep)">
              <div v-if="idx === 0" :key="`${idx}-div`">
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
                  <p v-for="(detail, dIdx) in step.details" :key="dIdx">
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
          <!-- paywall for PUblic user -->
          <Transition name="fade">
            <div v-if="publicPaywall" class="absolute inset-0 flex flex-col">
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
                  to="/signup"
                  class="mt-8 block text-white font-semibold py-[13px] px-4 rounded-lg bg-[#2563EB] w-fit"
                >
                  Sign up for free
                </NuxtLinkLocale>
              </div>
            </div>
          </Transition>
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
            v-if="completeChat.length === 0 && appStore.authenticatedUser"
            @click="
              handelPreQuestionOfScholarship(
                'Chance me with highly curated individualized scholarships that are best matched for me ONLY'
              )
            "
            class="border-[1.5px] border-gray-200 py-2 px-3.5 rounded-lg text-[#414651] text-sm font-semibold cursor-pointer w-fit"
          >
            {{ t("dashboard.pre_question") }}
          </p>
          <div
            class="relative border-[1.5px] border-gray-200 rounded-lg flex items-center"
            :class="{
              'bg-[#FAFAFA] pointer-events-none':
                isChatFull || isChatLoading || publicPaywall,
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
const publicPaywall = ref<boolean>(false);

// for step animation
const isStart = ref<boolean>(false);
const animationTimer = ref<number>(400);

const loadingStep = ref(0);
const loadingSteps = [
  {
    title: "Gathering information on your profile",
    details: [
      "Searching bachelor’s program in the United States and United Kingdom",
      "Searching schools has Music and Film Production major",
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

// Function to scroll to the bottom
const scrollDown = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop =
        chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
    }
  });
};

const handelPreQuestionOfScholarship = (question: string) => {
  inputQuestion.value = question;
  submit();
};

const submit = async () => {
  try {
    completeChat.value.push({
      isSender: true,
      text: inputQuestion.value,
    });
    if (completeChat.value.length <= 2) {
      completeChat.value.push({
        isSender: false,
        text: "Got it! Hang tight, I am looking into our database...",
      });
      showLoading.value = true;
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
    } else {
      response = await api.post(`/api/v1/ai-conversation/sophie`, {
        query: userQuery,
        sophieSessionId: uuid.value,
        // ...(!props.isModal && {
        //   roadmap_task_id: sophieStore.roadmapTaskDetail?.id,
        // }),
      });
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
        completeChat.value.push({
          isSender: false,
          text: response.data.data,
        });
      } else {
        completeChat.value.push({
          isSender: false,
          text: "type again",
        });
      }
    }
    scrollDown();
    setTimeout(() => {
      publicPaywall.value = true;
      textarea.value?.blur();
    }, 2000);
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

watch(
  () => showLoading.value,
  (val) => {
    if (val) {
      loadingStep.value = 0;
      stepAnimation();
    }
  }
);

onMounted(async () => {
  uuid.value = uuidv4();
  if (!appStore.authenticatedUser) {
    const sophieInfo = `<p class="text-[#181D27] text-2xl font-semibold">Nice to meet you!</p> <div class="mt-2 text-[#181D27]"> <p>Let’s find scholarships that are the perfect match for you 🎓</p> <p>Just fill in a few quick details below so I can recommend the best options:</p> <ul class="flex flex-col list-disc"> <li>Study program (e.g., Bachelor’s, Master’s)</li> <li>Preferred study destination</li> <li>Your GPA</li> <li>Field of study (e.g., Engineering, Business, Arts)</li> </ul> </div>`;
    completeChat.value.push({
      isSender: false,
      text: sophieInfo,
    });
  }
});
</script>
