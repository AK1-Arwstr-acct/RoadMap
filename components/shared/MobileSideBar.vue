<template>
  <div
    class="fixed w-[92%] right-0 top-0 z-50 bottom-0 bg-white flex flex-col justify-between gap-6 transition-all transform duration-500 ease-in-out border-r-[1.5px] border-gray-200 overflow-y-auto no-scrollbar"
  >
    <div class="flex flex-col gap-6">
      <div
        class="flex justify-between items-center p-4 border-b border-gray-200"
      >
        <div
          v-if="!appStore.authenticatedUser"
          @click="handleLogo"
          class="flex gap-2 items-center cursor-pointer"
        >
          <IconArrowsterLogo class="size-8 min-w-8" />
          <img
            class="w-24"
            src="/images/logo/logo.svg"
            alt="Logo"
            loading="eager"
          />
        </div>
        <div v-else @click="handleProfile" class="flex items-center gap-2">
          <div class="cursor-pointer rounded-full overflow-hidden size-10">
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
          <p
            class="text-[#414651] font-semibold w-fit border-b border-[#414651]/50 leading-4"
          >
            {{ appStore.userData?.name }}
          </p>
        </div>
        <div class="cursor-pointer" @click="emit('close')">
          <IconCross width="24" height="24" fill="#717680" />
        </div>
      </div>
      <!-- tabs -->
      <div class="flex flex-col gap-1 px-4">
        <div
          v-for="(tab, idx) in tabList"
          :key="idx"
          class="py-2 flex items-center rounded-lg cursor-pointer overflow-hidden px-3 justify-start gap-3"
          :class="[
            tab.name === 'profile'
              ? route.path === '/dashboard/profile'
                ? 'text-[#1570EF] bg-[#EFF8FF]'
                : 'text-[#414651]'
              : tab.name === 'home'
              ? route.path === '/dashboard'
                ? 'text-[#1570EF] bg-[#EFF8FF]'
                : 'text-[#414651]'
              : route.path.includes(tab.route)
              ? 'text-[#1570EF] bg-[#EFF8FF]'
              : 'text-[#414651]',
          ]"
          @click="updateTab(tab.route)"
        >
          <div>
            <component
              :is="tab.icon"
              class="size-6"
              :class="[
                tab.name === 'profile'
                  ? route.path === '/dashboard/profile'
                    ? 'text-[#1570EF]'
                    : 'text-[#717680]'
                  : tab.name === 'home'
                  ? route.path === '/dashboard'
                    ? 'text-[#1570EF]'
                    : 'text-[#717680]'
                  : route.path.includes(tab.route)
                  ? 'text-[#1570EF]'
                  : 'text-[#717680]',
              ]"
            />
          </div>
          <span class="font-medium text-base capitalize text-nowrap">
            {{ tab.name }}
          </span>
        </div>
      </div>
      <!-- AI essay -->
      <!-- <div class="bg-[#EEF4FF] rounded-lg px-4 py-5">
          <div class="flex gap-1.5">
            <h2 class="text-[#181D27] font-semibold text-sm">AI Essay Editor</h2>
          </div>
          <p class="text-[#535862] text-sm mt-2">
            Transform your study abroad essay with AI-powered feedback,
            personalized suggestions, and expert guidance to help your application
            stand out.
          </p>
          <div
            @click="getEssay"
            class="text-sm text-[#444CE7] font-semibold cursor-pointer flex items-center gap-2 mt-4"
          >
            <p>Get Essay Help Now</p>
            <IconArrowRight fill="#444CE7" />
          </div>
        </div> -->
    </div>
    <div class="px-4 pb-6">
      <button
        v-if="appStore.authenticatedUser"
        @click="talkToUs"
        class="bg-[#1570EF] w-full text-white py-2.5 font-semibold rounded-lg"
      >
      {{ t('dashboard.talk_to_us') }}
      </button>
      <div v-else class="flex flex-col gap-3">
        <NuxtLinkLocale :to="'/signup'" class="w-full">
          <button
            class="border border-[#1570EF] bg-[#1570EF] p-2.5 px-3.5 rounded-lg w-full text-white text-sm font-semibold shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
          {{ t("dashboard.signup") }}
          </button>
        </NuxtLinkLocale>
        <NuxtLinkLocale :to="'/login'" class="w-full">
          <button
            class="border border-gray-200 py-2.5 px-3.5 rounded-lg w-full text-[#414651] text-sm font-semibold shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
          {{ t("dashboard.login") }}
          </button>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconTabHome from "~/components/icons/IconTabHome.vue";
import IconTabSophie from "~/components/icons/IconTabSophie.vue";
import IconTabApplication from "~/components/icons/IconTabApplication.vue";
import IconTabSchool from "~/components/icons/IconTabSchool.vue";
import IconTabEssayEditor from "../icons/IconTabEssayEditor.vue";
import IconProfileTab from "../icons/IconProfileTab.vue";
import type { TabList } from "~/types/dashboard";
import useAppStore from "~/stores/AppStore";

const emit = defineEmits(["updateTab", "close"]);

const appStore = useAppStore();
const localePath = useLocalePath();
const route = useRoute();
const { t } = useI18n();

const tabList: TabList[] = [
  // {
  //   name: "profile",
  //   icon: IconProfileTab,
  //   route: "/dashboard/profile",
  // },
  {
    name: t("dashboard.sidebar.menu.home"),
    icon: IconTabHome,
    route: "/dashboard",
  },
  {
    name: t("dashboard.sidebar.menu.roadmap"),
    icon: IconTabApplication,
    route: "/roadmap",
  },
  {
    name: t("dashboard.sidebar.menu.schools_list"),
    icon: IconTabSchool,
    route: "/school-list",
  },
  {
    name: t("dashboard.sidebar.menu.sophie"),
    icon: IconTabSophie,
    route: "/sophie",
  },
  {
    name: t("dashboard.sidebar.menu.ai_essay"),
    icon: IconTabEssayEditor,
    route: "/ai-essay",
  },
];

const updateTab = (item: string) => {
  if (route.path.includes("/demo")) {
    if (item === "/dashboard") {
      emit("updateTab", "home");
    } else if (item === "/roadmap") {
      emit("updateTab", "Roadmap");
    } else if (item === "/school-list") {
      emit("updateTab", "schools_list");
    } else if (item === "/sophie") {
      emit("updateTab", "sophie");
    } else if (item === "/ai-essay") {
      emit("updateTab", "ai_essay_editor");
    }
  } else {
    navigateTo(localePath(item));
  }
  emit("close");
};

const handleLogo = () => {
  navigateTo(localePath("/dashboard"));
  emit("close");
};
const talkToUs = () => {
  navigateTo(localePath("/pricing"));
  emit("close");
};
const handleProfile = () => {
  navigateTo(localePath("/dashboard/profile"));
  emit("close");
};
</script>
