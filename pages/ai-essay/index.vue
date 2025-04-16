<template>
  <main class="h-dvh flex flex-col">
    <div
      v-if="deviceType === 'mobile'"
      class="py-5 px-3 border-b border-gray-200"
    >
      <div class="flex justify-between items-center">
        <NuxtLinkLocale :to="'/dashboard'">
          <div class="cursor-pointer flex items-center gap-1">
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
    <div
      v-if="!essayStore.finalEssay && !essayStore.tryFreeArrowster"
      class="flex-1 overflow-hidden"
    >
      <div
        v-if="!isAiQuestionStart"
        class="size-full p-4 md:p-8 flex flex-col overflow-y-auto no-scrollbar"
      >
        <div
          v-if="deviceType !== 'mobile'"
          class="flex justify-between items-start"
        >
          <NuxtLinkLocale :to="'/dashboard'">
            <div class="cursor-pointer">
              <img
                src="/images/logo/logo.svg"
                alt="Logo"
                class="w-40 md:w-44 h-6 md:h-7"
                loading="eager"
              />
            </div>
          </NuxtLinkLocale>
          <NuxtLinkLocale :to="'/dashboard'">
            <div v-if="!getUserInfo" class="cursor-pointer">
              <IconCross fill="#717680" class="size-6 md:size-8" />
            </div>
          </NuxtLinkLocale>
        </div>
        <div class="flex-1 md:p-6 flex justify-center items-center">
          <PublicUserInfo v-if="getUserInfo" @submit="startQuestions" />
          <div v-else class="flex flex-col gap-8 items-center max-w-[668px]">
            <img
              src="/images/pre-application.png"
              class="w-[300px] md:w-[536px]"
              loading="eager"
            />
            <div>
              <h1
                class="text-[#181D27] font-semibold text-xl text-center sm:text-[34px]"
              >
                Welcome to Your Personal Essay Journey!
              </h1>
              <p class="text-center text-[#535862] md:text-lg mt-4">
                Take a deep breath - you're in the right place. We're here to
                help you craft your best essay, whether you're just starting or
                polishing your final draft. Take your time to think and explore
                - your unique voice matters.
              </p>
            </div>
            <div class="flex flex-col items-center justify-center gap-5 w-full">
              <button
                @click="handelNext"
                class="bg-[#1570EF] rounded-lg py-3 px-5 text-white font-semibold w-full sm:max-w-48 flex justify-center"
              >
                <span class="flex justify-center items-center gap-2 w-max">
                  Okay, let's begin
                  <IconArrowRight fill="#ffffff" width="20" height="20" />
                </span>
              </button>
              <NuxtLinkLocale :to="'/dashboard'">
                <p class="text-[#535862] font-semibold cursor-pointer">
                  Go back
                </p>
              </NuxtLinkLocale>
            </div>
            <!-- upgrade popup -->
            <!-- <div
              class="bg-[#F5F5F5] rounded-lg py-3 px-3.5 w-full flex items-center justify-between gap-3 mt-5 text-sm"
            >
              <div>
                <p class="text-[#414651] font-semibold">
                  You've reached your daily limit for AI Essay Editor.
                </p>
                <p class="text-[#414651] mt-1.5">
                  Please find instructions to upgrade for more access here.
                </p>
              </div>
              <button
                class="text-[#414651] font-semibold py-2 px-3.5 rounded-lg border border-gray-200 bg-white shadow[0px_1px_2px_0px_#0A0D120D]"
              >
                Upgrade now
              </button>
            </div> -->
          </div>
        </div>
      </div>
      <AiQuestions v-else @goBack="goBack" />
    </div>
    <div v-else class="size-full">
      <TryArrowsterFree v-if="essayStore.isPublic" />
      <GeneratedEsssay v-else />
    </div>
  </main>
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
import useEssayStore from "~/stores/essayStore";
import useAppStore from "~/stores/AppStore";
import MobileSideBar from "~/components/shared/MobileSideBar.vue";

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const deviceType = useDeviceType();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/ai-essay`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/pre-application.png",
        as: "image",
      },
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/ai-essay`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/ai-essay`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/ai-essay`,
        hreflang: "x-default",
      },
    ],
  }))
);

const appStore = useAppStore();
const essayStore = useEssayStore();

const localePath = useLocalePath();

const isAiQuestionStart = ref<boolean>(false);
const getUserInfo = ref<boolean>(false);
const isMobileSideBarOpen = ref<boolean>(false);

const goBack = () => {
  isAiQuestionStart.value = false;
};
const close = () => {
  isMobileSideBarOpen.value = false;
};

const handelNext = () => {
  if (essayStore.isPublic && !getUserInfo.value) {
    getUserInfo.value = true;
  } else {
    isAiQuestionStart.value = true;
  }
};

const startQuestions = () => {
  getUserInfo.value = false;
  isAiQuestionStart.value = true;
};
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
