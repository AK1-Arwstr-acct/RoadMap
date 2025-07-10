<template>
  <div
    class="h-full flex justify-center items-center pt-4 md:pt-8 md:px-6 overflow-hidden"
  >
    <div class="overflow-y-auto no-scrollbar pb-6 size-full">
      <div class="w-full mx-auto h-fit max-w-[900px]">
        <div
          class="flex flex-col items-center justify-center md:mt-24 overflow-hidden relative"
        >
          <img
            src="/images/sophie-chat.png"
            alt="sophie"
            class="h-[117px] md:h-[180px] w-[124px] md:w-[190px]"
            loading="eager"
            preload
          />
          <span
            class="text-[#414651] text-xl md:text-[32px] font-semibold mt-4 text-center px-4 md:px-0"
          >
            {{ $t("homepage.hi_i’m_sophie_your_personal_ai_assistant") }}
          </span>
          <!-- mobile layput -->
          <div class="w-full overflow-x-auto no-scrollbar md:hidden">
            <div class="flex mt-6 gap-3 px-4 w-fit">
              <div
                v-for="(question, idx) in preQuestion.slice(0, 3)"
                :key="idx"
              >
                <div
                  @click="handelPreQuestion(question)"
                  class="border-[1.5px] border-[#0000001A] py-1.5 px-3 rounded-full text-[#414651] text-sm font-semibold cursor-pointer text-nowrap"
                >
                  {{ question.question }}
                </div>
              </div>
            </div>
            <div class="flex mt-2 gap-3 px-4 w-fit">
              <div v-for="(question, idx) in preQuestion.slice(3)" :key="idx">
                <div
                  @click="handelPreQuestion(question)"
                  class="border-[1.5px] border-[#0000001A] py-1.5 px-3 rounded-full text-[#414651] text-sm font-semibold cursor-pointer text-nowrap"
                >
                  {{ question.question }}
                </div>
              </div>
            </div>
          </div>
          <!-- desktop layout -->
          <div
            class="w-full hidden md:flex flex-wrap justify-center mt-20 gap-3 overflow-x-auto no-scrollbar"
          >
            <div v-for="(question, idx) in preQuestion" :key="idx">
              <div
                @click="handelPreQuestion(question)"
                class="border-[1.5px] border-[#0000001A] py-2 px-4 rounded-full text-[#414651] text-sm font-semibold cursor-pointer text-nowrap"
              >
                {{ question.question }}
              </div>
            </div>
          </div>
          <div class="relative w-full px-4 md:px-0 mt-6">
            <textarea
              :placeholder="t('homepage.ask_me_anything!')"
              rows="4"
              v-model="inputQuestion"
              @keydown.enter="handleKeydown"
              class="w-full px-3.5 py-2.5 bg-[#F5F5F5] border-[1.5px] border-[#F5F5F5] rounded-xl focus:outline-none resize-none placeholder:font-light min-h-fit"
            />
            <button
              :disabled="inputQuestion.trim().length < 2"
              @click="handelSubmit"
              class="cursor-pointer size-10 min-w-10 flex justify-center items-center rounded-lg bg-[#1570ef] disabled:bg-[#D1D5DB] absolute bottom-5 transform right-8 md:right-4 -rotate-90 p-2 disabled:opacity-40"
            >
              <IconArrowRight
                width="20"
                height="20"
                :fill="inputQuestion.trim().length < 2 ? '#9CA3AF' : '#ffffff'"
              />
            </button>
          </div>
        </div>
        <div class="mt-12 px-4 md:px-0">
          <HomeDashboard />
        </div>
        <div class="md:hidden mt-4 px-4 md:px-0">
          <GetMentorshipBlock />
        </div>
      </div>
    </div>
  </div>
  <Transition name="fade">
    <div
      v-if="sophieStore.openSophieModal"
      class="fixed bg-black/50 inset-0 z-50 isolate backdrop-blur py-10 lg:py-[60px] px-4 lg:px-[68px] flex justify-center items-center"
    >
      <ChatWithSophie
        :isModal="true"
        @openSophieModal="sophieStore.openSophieModal = false"
      />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import useSophieStore from "~/stores/sophieStore";
import useAppStore from "~/stores/AppStore";
import useAppTrackerStore from "~/stores/AppTrackerStore";

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const sophieStore = useSophieStore();
const localePath = useLocalePath();
const appStore = useAppStore();
const appTrackerStore = useAppTrackerStore();
const { t } = useI18n();

definePageMeta({
  layout: "dashboard-layout",
});

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/sophie-chat.png",
        as: "image",
      },
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}`,
        hreflang: "x-default",
      },
    ],
  }))
);

const inputQuestion = ref<string>("");

const preQuestion = ref<{ number: number; question: string }[]>([
  { number: 1, question: `${t("homepage.finding_schools_that_match_me")}` },
  { number: 2, question: `${t("homepage.how_can_i_choose_the_right_major")}` },
  { number: 3, question: `${t("homepage.scholarships_i’m_eligible_for")}` },
  { number: 4, question: `${t("homepage.help_me_to_write_an_essay_draft")}` },
  {
    number: 5,
    question: `${t("homepage.what_can_i_do_for_extracurricular_activities?")}`,
  },
]);

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handelSubmit();
  }
};

const handelSubmit = () => {
  sophieStore.preQuestionSelected = inputQuestion.value;
  sophieStore.openSophieModal = true;
  inputQuestion.value = "";
};

const handelPreQuestion = (question: { number: number; question: string }) => {
  if (question.number === 1) {
    navigateTo(localePath("/school-list"));
  } else if (question.number === 2) {
    appTrackerStore.taskFromHomeQuestion = 4;
    navigateTo(localePath("/sophie"));
  } else if (question.number === 3) {
    sophieStore.preQuestionSelected = question.question;
    navigateTo(localePath("/scholarship"));
  } else if (question.number === 4) {
    navigateTo(localePath("/ai-essay"));
  } else if (question.number === 5) {
    appTrackerStore.taskFromHomeQuestion = 8;
    navigateTo(localePath("/sophie"));
  }
};

onMounted(async () => {
  const tokenExists = useCookie("token");
  if (tokenExists.value) {
    await appStore.getAuthUserData();
  }
});
</script>
