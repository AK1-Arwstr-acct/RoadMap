<template>
  <main v-if="stepCount === 1">
    <div class="py-5 px-3 border-b border-gray-200 md:hidden">
      <div class="flex justify-between items-center">
        <NuxtLinkLocale :to="'/dashboard'">
          <div class="cursor-pointer flex items-center gap-2">
            <IconArrowsterLogo class="size-8 min-w-8" />
            <img
              src="/images/logo/logo.svg"
              alt="Logo"
              class="w-full h-5"
              loading="eager"
            />
          </div>
        </NuxtLinkLocale>
        <div
          v-if="appStore.authenticatedUser"
          @click="isMobileSideBarOpen = true"
          class="cursor-pointer rounded-full overflow-hidden size-10"
        >
          <img
            v-if="appStore.userData?.avatar"
            :src="appStore.userImagePreview || appStore.userData?.avatar"
            alt="user-icon"
            class="size-full"
          />
          <div
            v-else
            class="size-full bg-orange-500 flex items-center justify-center text-white font-medium uppercase text-xl"
          >
            <span>{{ appStore.userData?.name.charAt(0) }}</span>
          </div>
        </div>
        <div
          v-else
          @click="isMobileSideBarOpen = true"
          class="cursor-pointer rounded-full overflow-hidden size-10"
        >
          <img
            src="/images/chat-bot.png"
            alt="user-icon"
            class="size-full"
            loading="eager"
          />
        </div>
      </div>
    </div>
    <section class="w-full mx-auto max-w-[1216px] px-0 mt-8 mb-10">
      <div class="px-5">
        <div class="hidden md:flex justify-end">
          <span @click="router.back()" class="cursor-pointer">
            <IconCross fill="#A4A7AE" width="24" height="24" />
          </span>
        </div>
        <h1 class="text-4xl text-[#181D27] font-semibold">
          {{ $t("pricing_page.your_study_abroad_success_starts") }} <br />
          {{ $t("pricing_page.get_the_perfect_plan_for_you") }}
        </h1>
        <p class="md:text-lg text-[#535862] mt-5">
          {{ $t("pricing_page.join") }}
          <span class="text-[#1570EF]">{{
            $t("pricing_page.500+_students")
          }}</span>
          {{
            $t(
              "pricing_page.who_secured_top_university_admissions_with_our_ai_+_expert_mentorship"
            )
          }}
        </p>
      </div>
      <div class="pt-8 overflow-x-auto md:px-5">
        <PricingTable
          @selectPlan="selectPlan"
          :plansList="plansList"
          v-if="deviceType !== 'mobile'"
        />
        <div v-else class="px-5 py-5 flex flex-col gap-3">
          <StarterPlanMobile @selectPlan="selectPlan" :plansList="plansList" />
          <StandardPlanMobile @selectPlan="selectPlan" :plansList="plansList" />
          <AdvancedPlanMobile @selectPlan="selectPlan" :plansList="plansList" />
        </div>
      </div>
    </section>
    <section class="py-5 md:py-[70px] w-full max-w-[876px] mx-auto px-5">
      <p
        class="text-[#181D27] md:text-center text-2xl md:text-4xl font-semibold"
      >
      {{ $t('pricing_page.frequently_asked_questions') }}
      </p>
      <div
        class="md:border-[1.5px] border-gray-200 rounded-2xl md:px-3 sm:px-6 mt-4 md:mt-14"
      >
        <PricingFaq :faqList="faq" />
      </div>
    </section>
    <section class="bg-[#1849A9]">
      <div
        class="w-full mx-auto max-w-[1216px] px-5 py-12 sm:py-16 md:py-24 mt-8 text-white"
      >
        <h2 class="text-2xl sm:text-3xl xl:text-4xl font-semibold mb-5">
          {{ $t('pricing_page.lets_start_your_journey_together!') }}
        </h2>
        <!-- steps -->
        <div class="grid grid-cols-1 lg:grid-cols-8 gap-5 mt-10 sm:mt-16">
          <div class="col-span-4 flex flex-col gap-6">
            <div
              v-for="(setp, idx) in stepsDetail"
              :class="[
                'py-2 md:py-4 px-6 border-l-4 transition-all ease-in-out duration-150',
                stepCount === idx + 1 || stepCount === idx + 2
                  ? 'border-white'
                  : 'border-[#2E90FA]',
              ]"
            >
              <p class="text-xl font-semibold">
                {{ $t('pricing_page.step') }} {{ idx + 1 }} : {{ setp.title }}
              </p>
              <p class="text-[#D1E9FF] mt-2">
                {{ setp.description }}
              </p>
            </div>
          </div>
          <div ref="formWrapper" class="col-span-4 mt-5 lg:mt-0">
            <!-- form -->
            <JourneyForm
              @updateJourney="updateJourney"
              :selectedPlan="selectedPlan"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
  <div
    v-else
    class="bg-[#1849A9] flex justify-center items-center h-dvh w-screen"
  >
    <div
      class="max-w-[484px] mx-auto flex flex-col items-center text-center justify-center"
    >
      <img
        src="/images/countries-application.png"
        class="w-[383px] h-[324px]"
      />
      <p class="font-medium text-lg sm:text-3xl mt-4 text-white">
        {{ $t('pricing_page.thank_you_for_your_submission!') }}
      </p>
      <NuxtLinkLocale :to="'/dashboard'" class="w-full">
        <button
          class="bg-white text-sm sm:text-base text-[#175CD3] py-2.5 w-full rounded-lg font-semibold mt-8 max-w-[330px]"
        >
        {{ $t('pricing_page.back_to_home') }}
        </button>
      </NuxtLinkLocale>
    </div>
  </div>
  <!--  -->
  <Transition name="fade">
    <div
      v-if="isMobileSideBarOpen"
      @click="isMobileSideBarOpen = false"
      class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm"
    />
  </Transition>
  <Transition name="slideModal">
    <component :is="MobileSideBar" v-if="isMobileSideBarOpen" @close="close" />
  </Transition>
</template>
<script setup lang="ts">
import type { Plan } from "~/types/home";
import useAppStore from "~/stores/AppStore";
import MobileSideBar from "~/components/shared/MobileSideBar.vue";

const appStore = useAppStore();
const localePath = useLocalePath();

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const deviceType = useDeviceType();
const router = useRouter();
const { t } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/pricing`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/pricing`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/pricing`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/pricing`,
        hreflang: "x-default",
      },
    ],
  }))
);

const stepCount = ref<number>(1);
const selectedPlan = ref<number>(3);
const formWrapper = ref<HTMLElement | null>(null);
const isMobileSideBarOpen = ref<boolean>(false);

const stepsDetail = [
  {
    title: `${t("pricing_page.stepsDetail.stepsDetail_1.title")}`,
    description: `${t("pricing_page.stepsDetail.stepsDetail_1.description")}`,
  },
  {
    title: `${t("pricing_page.stepsDetail.stepsDetail_2.title")}`,
    description: `${t("pricing_page.stepsDetail.stepsDetail_2.description")}`,
  },
  {
    title: `${t("pricing_page.stepsDetail.stepsDetail_3.title")}`,
    description: `${t("pricing_page.stepsDetail.stepsDetail_3.description")}`,
  },
  {
    title: `${t("pricing_page.stepsDetail.stepsDetail_4.title")}`,
    description: `${t("pricing_page.stepsDetail.stepsDetail_4.description")}`,
  },
];

const faq = [
  {
    question: `${t("pricing_page.faq.faq1.question")}`,
    answer: `${t("pricing_page.faq.faq1.answer")}`,
  },
  {
    question: `${t("pricing_page.faq.faq2.question")}`,
    answer: `${t("pricing_page.faq.faq2.answer")}`,
  },
  {
    question: `${t("pricing_page.faq.faq3.question")}`,
    answer: `${t("pricing_page.faq.faq3.answer")}`,
  },
  {
    question: `${t("pricing_page.faq.faq4.question")}`,
    answer: `${t("pricing_page.faq.faq4.answer")}`,
  },
  {
    question: `${t("pricing_page.faq.faq5.question")}`,
    answer: `${t("pricing_page.faq.faq5.answer")}`,
  },
];

const plansList: Plan[] = [
  {
    title: `${t("pricing_page.plansList.titles.title_1")}`,
    starterPlan: "",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: `${t("pricing_page.plansList.titles.title_2")}`,
    starterPlan: "available",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: `${t("pricing_page.plansList.titles.title_3")}`,
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: `${t("pricing_page.plansList.titles.title_4")}`,
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: `${t("pricing_page.plansList.titles.title_5")}`,
    starterPlan: "",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: `${t("pricing_page.plansList.titles.title_6")}`,
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: `${t("pricing_page.plansList.titles.title_7")}`,
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: `${t("pricing_page.plansList.titles.title_8")}`,
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: `${t("pricing_page.plansList.titles.title_9")}`,
    starterPlan: `${t("pricing_page.plansList.limited_access")}`,
    standardPlan: `${t("pricing_page.plansList.full_access")}`,
    advancedPlan: `${t("pricing_page.plansList.full_access")}`,
  },
  {
    title: `${t("pricing_page.plansList.titles.title_10")}`,
    starterPlan: `${t(
      "pricing_page.plansList.3_essays_per_month_no_feedback"
    )}`,
    standardPlan: `${t(
      "pricing_page.plansList.unlimited_1_1_mentor_feedback"
    )}`,
    advancedPlan: `${t(
      "pricing_page.plansList.unlimited_1_1_mentor_feedback"
    )}`,
  },
  {
    title: `${t("pricing_page.plansList.titles.title_11")}`,
    starterPlan: "",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: `${t("pricing_page.plansList.titles.title_12")}`,
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: `${t("pricing_page.plansList.titles.title_13")}`,
    starterPlan: "N/A",
    standardPlan: `${t(
      "pricing_page.plansList.5_partner_schools_of_arrowster"
    )}`,
    advancedPlan: `${t(
      "pricing_page.plansList.10_schools_not_limited_to_partner_schools"
    )}`,
  },
  {
    title: "",
    starterPlan: "",
    standardPlan: `${t(
      "pricing_page.plansList.5_000_000_vnd_refundable_deposit_for_slot_reservation"
    )}`,
    advancedPlan: `${t(
      "pricing_page.plansList.requires_sat_1500+_limited_slots"
    )}`,
  },
];

const updateJourney = () => {
  stepCount.value = 2;
};
const close = () => {
  isMobileSideBarOpen.value = false;
};

const selectPlan = (id: number) => {
  selectedPlan.value = id;
  nextTick(() => {
    formWrapper.value?.scrollIntoView({ behavior: "smooth" });
  });
};
// onMounted( async()=>{
//   await api.get('/api/v1/plans/bundle')
// })
</script>
<style scoped>
.slideModal-enter-active,
.slideModal-leave-active {
  transition: all 400ms;
  transform: all 400ms;
}

.slideModal-enter-from,
.slideModal-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slideModal-enter-to,
.slideModal-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
