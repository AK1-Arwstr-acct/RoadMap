<template>
  <section class="flex flex-col gap-2 size-full overflow-hidden h-full">
    <div class="flex-1 overflow-y-auto no-scrollbar">
      <div class="size-full overflow-hidden flex flex-col gap-2 sm:gap-2">
        <!-- chat -->
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col h-full relative"
        >
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
                'bg-[#E8E8E880] py-1 px-2 md:px-3 rounded-lg': chat.isSender,
              }"
            >
              <div>
                <vue-markdown :source="chat.text" :options="options" />
              </div>
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
            class="relative border-[1.5px] border-gray-200 rounded-lg flex items-center"
            :class="{
              'bg-[#FAFAFA] pointer-events-none': isChatFull || isChatLoading,
            }"
          >
            <textarea
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
import useDashboardStore from "~/stores/dashboardStore";
import useSophieStore from "~/stores/sophieStore";
import useAppStore from "~/stores/AppStore";

const { api } = useApi();
const { showToast } = useToast();
const dashboardStore = useDashboardStore();
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
const isEducationLevel = ref<boolean>(false);

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

const submit = async () => {
  try {
    completeChat.value.push({
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
    await nextTick();
    if (textarea.value) {
      textarea.value?.focus();
    }
  }
};

onMounted(async () => {
  uuid.value = uuidv4();
  const sophieInfo = `<p class="text-[#181D27] text-2xl font-semibold">Nice to meet you!</p> <div class="mt-2 text-[#181D27]"> <p>Let’s find scholarships that are the perfect match for you 🎓</p> <p>Just fill in a few quick details below so I can recommend the best options:</p> <ul class="flex flex-col list-disc"> <li>Study program (e.g., Bachelor’s, Master’s)</li> <li>Preferred study destination</li> <li>Your GPA</li> <li>Field of study (e.g., Engineering, Business, Arts)</li> </ul> </div>`;
  completeChat.value.push({
    isSender: false,
    text: sophieInfo,
  });
});
</script>
