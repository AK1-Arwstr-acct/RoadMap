<template>
  <main v-if="stepCount === 1" class="bg-white">
    <div class="py-5 px-3 border-b border-gray-200 md:hidden">
      <div class="flex justify-between items-center">
        <NuxtLinkLocale :to="'/school-list'">
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
    <section class="w-full mx-auto max-w-[1220px] px-0 mt-8">
      <div class="px-5">
        <div class="hidden md:flex justify-end">
          <span @click="router.back()" class="cursor-pointer">
            <IconCross fill="#A4A7AE" width="24" height="24" />
          </span>
        </div>
        <h1 class="text-4xl text-[#181D27] font-semibold">
          {{ $t("pricing_page.heading") }}
        </h1>
        <p class="md:text-lg text-[#535862] mt-5">
          {{ $t("pricing_page.details") }}
        </p>
      </div>
    </section>
    <section class="my-10 md:my-20 px-5 sm:px-5 xl:px-28">
      <div
        class="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10"
      >
        <div class="w-full lg:w-1/2 rounded-xl overflow-hidden">
          <ImageSlider :slides="slides" :autoSlideInterval="4000" />
        </div>
        <div class="w-full lg:w-1/2 md:px-4 py-6">
          <JourneyForm
            @updateJourney="updateJourney"
            :selectedPlan="selectedPlan"
          />
        </div>
      </div>
    </section>
    <section class="bg-[#FAFAFA] px-5 sm:px-10 py-10 md:px-28 md:py-28">
      <div class="w-full max-w-[1200px] mx-auto">
        <p
          class="text-[#181D27] md:text-center text-2xl md:text-4xl font-semibold"
        >
          {{ $t("pricing_page.frequently_asked_questions") }}
        </p>
        <div
          class="border-[1.5px] border-gray-200 rounded-2xl px-3 sm:px-6 mt-4 md:mt-14 bg-white"
        >
          <PricingFaq :faqList="faq" />
        </div>
      </div>
    </section>
  </main>
  <div
    v-else
    class="bg-[#1849A9] flex justify-center items-center h-dvh w-full"
  >
    <div
      class=" mx-auto flex flex-col items-center text-center justify-center px-5"
    >
      <img
        src="/images/countries-application.png"
        class="w-full max-w-[383px] h-[324px]"
      />
      <p class="font-medium text-lg sm:text-3xl mt-4 text-white">
        {{ $t("pricing_page.thank_you_for_your_submission!") }}
      </p>
      <p class="text-2xl text-[#FFFFFF] mt-2">
        {{ $t("pricing_page.keep_your_phone_close") }}
      </p>
      <NuxtLinkLocale :to="'/school-list'" class="mt-8 w-full max-w-[330px]">
        <button
          class="bg-white text-sm sm:text-base text-[#175CD3] py-2.5 w-full rounded-lg font-semibold"
        >
          {{ $t("pricing_page.back_to_home") }}
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
import useAppStore from "~/stores/AppStore";
import MobileSideBar from "~/components/shared/MobileSideBar.vue";

const appStore = useAppStore();
const localePath = useLocalePath();

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const { api } = useApi();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/pricing`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/pricing/group-photo.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/pricing/mentor1.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/pricing/mentor2.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/pricing/mentor3.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/pricing/mentor4.png",
        as: "image",
      },
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
const isMobileSideBarOpen = ref<boolean>(false);

const faq = [
  {
    question: `${t("pricing_page.faq.faq0.question")}`,
    answer: ``,
  },
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

const slides = [
  {
    image: "/images/pricing/group-photo.png",
    overlayText: {
      name: "",
      position: "",
      details: "",
    },
  },
  {
    image: "/images/pricing/mentor1.png",
    overlayText: {
      name: "Hoàng Hoài Thanh",
      position: "Arrowster mentor",
      details: t("pricing_page.carousel.thanh_description"),
    },
  },
  {
    image: "/images/pricing/mentor2.png",
    overlayText: {
      name: "Kenneth Chong",
      position: "Arrowster mentor",
      details: t("pricing_page.carousel.ken_description"),
    },
  },
  {
    image: "/images/pricing/mentor3.png",
    overlayText: {
      name: "Hayden Vũ",
      position: "Arrowster mentor",
      details: t("pricing_page.carousel.hayden_description"),
    },
  },
  {
    image: "/images/pricing/mentor4.png",
    overlayText: {
      name: "Thái Nguyễn",
      position: "Arrowster mentor",
      details: t("pricing_page.carousel.thai_description"),
    },
  },
];

const updateJourney = () => {
  stepCount.value = 2;
};
const close = () => {
  isMobileSideBarOpen.value = false;
};

onMounted(async () => {
  const tokenExists = useCookie("token");
  if(tokenExists.value) {
    await api.get("/api/v1/user", {
      headers: {
        "X-Client-Route": `${window.location.origin}${route.fullPath}`,
      },
    });
  }
});
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
