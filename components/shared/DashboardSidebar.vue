<template>
  <div
    class="group hidden lg:flex flex-col h-full py-8 justify-between gap-6 transition-all transform duration-500 ease-in-out border-r-[1.5px] border-gray-200 overflow-y-auto no-scrollbar"
    :class="[!isOpen ? 'w-[68px] px-3' : 'w-[264px] px-4']"
  >
    <div class="flex flex-col gap-6">
      <div :class="[isOpen ? 'px-1' : 'px-2 flex justify-center']">
        <div class="flex gap-2 items-center cursor-pointer justify-between">
          <Transition name="fade">
            <IconArrowsterLogo
              v-if="!isOpen"
              class="size-[30px] min-w-[30px] group-hover:hidden"
            />
            <NuxtLinkLocale v-else to="/">
              <img
                class="w-[148px]"
                src="/images/logo/logo.svg"
                alt="Logo"
                loading="eager"
              />
            </NuxtLinkLocale>
          </Transition>
          <Transition name="fade">
            <div v-if="isOpen" @click="isOpen = false">
              <IconSidebarClose />
            </div>
            <div v-else class="hidden group-hover:block">
              <div
                @click="isOpen = true"
                class="size-[30px] min-w-[30px] rounded-full bg-[#E5E5E5] flex items-center justify-center"
              >
                <IconSidebarOpen />
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <!-- tabs -->
      <div class="flex flex-col gap-1">
        <NuxtLinkLocale
          :to="tab.route"
          v-for="(tab, idx) in tabList"
          :key="idx"
        >
          <div
            class="py-2 flex items-center rounded-lg cursor-pointer overflow-hidden px-2"
            :class="[
              isOpen ? 'px-3 justify-start gap-4' : 'justify-between',
              (tab.route === '/'
                ? route.path === '/'
                : tab.activeList.some(item => route.path.startsWith(item)))
                ? 'text-[#1570EF] bg-[#EFF8FF]'
                : 'text-[#414651]',
            ]"
          >
            <component
              :is="tab.icon"
              class="size-6 min-w-6"
              :class="[
                (tab.route === '/'
                  ? route.path === '/'
                  : tab.activeList.some(item => route.path.startsWith(item)))
                  ? 'text-[#1570EF]'
                  : 'text-[#717680]',
              ]"
            />
            <span v-if="isOpen" class="font-medium text-base text-nowrap">
              {{ tab.name }}
            </span>
          </div>
        </NuxtLinkLocale>
      </div>
    </div>
    <div class="overflow-hidden">
      <Transition name="fade">
        <button
          @click="clearTaskDetails"
          v-if="isOpen"
          class="mb-3 overflow-hidden text-center px-4 py-2.5 border-[1.5px] border-[#1570EF] rounded-lg font-semibold text-white bg-[#1570EF] cursor-pointer text-sm w-full"
        >
          {{ t("dashboard.scholarships_that_suit_me") }}
        </button>
      </Transition>
      <Transition name="fade">
        <component v-if="isOpen" :is="GetMentorshipBlock" />
      </Transition>
      <div v-if="isOpen" class="w-full mt-4 border-t border-[#E9EAEB]">
        <NuxtLinkLocale
          to="/profile"
          v-if="appStore.authenticatedUser"
          class="pt-[28px] bg-white rounded-xl shadow-sm flex items-center gap-3 cursor-pointer"
        >
          <!-- profile -->
          <div
            v-if="appStore.authenticatedUser || tokenExists"
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
              class="flex items-center justify-center size-10 min-w-10 rounded-full border border-[#00000033] bg-[#22C55E] text-white font-semibold text-lg"
            >
              {{ appStore.userData?.name.charAt(0) }}
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-[#111827] truncate">
              {{ appStore.userData?.name }}
            </div>
            <div class="text-[#4B5563] text-sm truncate">
              {{ appStore.authUserData?.currentPlan.plan_title }}
            </div>
          </div>
          <div>
            <IconChevronDown
              class="transform -rotate-90"
              stroke="#4B5563"
              height="20"
              width="20"
            />
          </div>
        </NuxtLinkLocale>
        <div v-else class="w-full mt-3 flex flex-col gap-3">
          <NuxtLinkLocale
            to="/signup"
            class="w-full bg-[#2563EB] text-white font-semibold rounded-lg py-3 text-center"
          >
            Sign up for free
          </NuxtLinkLocale>
          <NuxtLinkLocale
            to="/login"
            class="w-full bg-[#E5E5E5] text-[#111827] font-semibold rounded-lg py-3 text-center"
          >
            Log in
          </NuxtLinkLocale>
        </div>
      </div>
      <div v-else>
        <div
          @click="handleProfile"
          class="flex items-center justify-center cursor-pointer size-10 min-w-10 rounded-full border border-[#00000033] bg-[F5F5F5]"
        >
          <IconUser />
        </div>
      </div>
    </div>
  </div>

  <!-- mobile bottom bar -->
  <div class="lg:hidden fixed z-20 bottom-0 w-full bg-white px-1.5">
    <div class="flex gap-1 justify-evenly py-1.5 border-t border-[#000000]/20">
      <NuxtLinkLocale
        :to="tab.route"
        v-for="(tab, idx) in tabList"
        :key="idx"
        class="flex-1"
      >
        <div
          class="py-2 flex flex-col gap-0.5 items-center justify-center rounded-lg cursor-pointer overflow-hidden px-2 w-full"
          :class="[
            (tab.route === '/'
              ? route.path === '/'
              : tab.activeList.some(item => route.path.startsWith(item)))
              ? 'text-[#1570EF] bg-[#EFF8FF]'
              : 'text-[#414651]',
          ]"
        >
          <component
            :is="tab.icon"
            class="size-6 min-w-6"
            :class="[
              (tab.route === '/'
                ? route.path === '/'
                : tab.activeList.some(item => route.path.startsWith(item)))
                ? 'text-[#1570EF]'
                : 'text-[#717680]',
            ]"
          />
          <span class="font-semibold text-xs text-nowrap">
            {{ tab.name }}
          </span>
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconTabHome from "~/components/icons/IconTabHome.vue";
import useAppTrackerStore from "~/stores/AppTrackerStore";
import useSophieStore from "~/stores/sophieStore";
import IconTabApplication from "~/components/icons/IconTabApplication.vue";
import type { TabList } from "~/types/dashboard";
import IconBookOpen from "../icons/IconBookOpen.vue";
import useAppStore from "~/stores/AppStore";
import GetMentorshipBlock from "../pages/home/GetMentorshipBlock.vue";

const emit = defineEmits(["updateTab"]);

const route = useRoute();
const { t } = useI18n();
const appStore = useAppStore();
const localePath = useLocalePath();
const appTrackerStore = useAppTrackerStore();
const sophieStore = useSophieStore();

const tokenExists = useCookie("token");

const isOpen = ref<boolean>(true);
const tabList = ref<TabList[]>([
  {
    name: t("dashboard.sidebar.menu.home"),
    icon: shallowRef(IconTabHome),
    route: "/",
    activeList: ["/"],
  },
  // {
  //   name: "Your checklist",
  //   icon: shallowRef(IconTabApplication),
  //   route: "/sophie",
  //   activeList: ['/sophie', '/school-list', '/ai-essay']
  // },
  {
    name: "Your checklist",
    icon: shallowRef(IconTabApplication),
    route: "/checklist",
    activeList: ["/checklist", "/sophie", "/school-list", "/ai-essay"],
  },
  {
    name: "Resources",
    icon: shallowRef(IconBookOpen),
    route: "/resources",
    activeList: ["/resources"],
  },
]);

const handleProfile = () => {
  if (appStore.authenticatedUser || tokenExists) {
    navigateTo(localePath("/profile"));
  }
};

const clearTaskDetails = () => {
  // sophieStore.scholarshipSophieModal = true;
  // if (appStore.authUserData) {
  //   sophieStore.openSophieModal = true;
  // }
  // appStore.isFeatureChangeFromTasks = true;
  navigateTo(localePath('/scholarship'));
};
</script>
