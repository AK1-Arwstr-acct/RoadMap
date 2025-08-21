<template>
  <div
    class="group hidden lg:flex flex-col h-full pt-6 pb-5 justify-between gap-6 transition-all transform duration-500 ease-in-out border-r-[1.5px] border-divider overflow-y-auto no-scrollbar"
    :class="[!isOpen ? 'w-[72px] px-2' : 'w-[264px] px-2']"
  >
    <div class="flex flex-col gap-6">
      <div :class="[isOpen ? 'px-4' : 'px-2 flex justify-center']">
        <div class="flex gap-2 items-center cursor-pointer justify-between">
          <Transition name="fade">
            <IconArrowsterLogo
              v-if="!isOpen"
              class="size-[30px] min-w-[30px] group-hover:hidden"
            />
            <NuxtLinkLocale v-else to="/">
              <img
                class="w-[148px]"
                :class="{ invert: appStore.theme === 'theme-dark' }"
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
            class="p-4 flex items-center rounded-lg cursor-pointer overflow-hidden"
            :class="[
              isOpen ? 'justify-start gap-4' : 'justify-between',
              (
                tab.route === '/'
                  ? route.path === '/' || route.path === '/vi'
                  : tab.activeList.some((item) => route.path.startsWith(item))
              )
                ? 'text-text-brand bg-background-brand-subtle'
                : 'text-text-base',
            ]"
          >
            <component
              :is="tab.icon"
              class="size-6 min-w-6"
              :class="[
                (
                  tab.route === '/'
                    ? route.path === '/'
                    : tab.activeList.some((item) => route.path.startsWith(item))
                )
                  ? 'text-icon-brand'
                  : 'text-icon-neutral-subtle',
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
          class="mb-3 overflow-hidden text-center px-4 py-2.5 rounded-lg font-semibold text-text-constant-white bg-background-brand cursor-pointer text-sm w-full"
        >
          {{ t("dashboard.best_fit_scholarships") }}
        </button>
      </Transition>
      <Transition name="fade">
        <component v-if="isOpen" :is="GetMentorshipBlock" />
      </Transition>
      <!-- <div v-if="!route.path.includes('/majors')">
        <div v-if="isOpen" class="w-full mt-4 border-t border-[#E9EAEB]">
          <NuxtLinkLocale
            to="/profile"
            v-if="appStore.authenticatedUser"
            class="pt-[28px] bg-white rounded-xl shadow-sm flex items-center gap-3 cursor-pointer"
          >
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
              {{ $t("dashboard.sign_up_for_free") }}
            </NuxtLinkLocale>
            <NuxtLinkLocale
              to="/login"
              class="w-full bg-[#E5E5E5] text-[#111827] font-semibold rounded-lg py-3 text-center"
            >
              {{ $t("dashboard.login") }}
            </NuxtLinkLocale>
          </div>
        </div>
        <div v-else class="flex justify-center">
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
          <div
            v-else
            @click="handleProfile"
            class="flex items-center justify-center cursor-pointer size-10 min-w-10 rounded-full border border-[#00000033] bg-[F5F5F5]"
          >
            <IconUser />
          </div>
        </div>
      </div> -->
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
            (
              tab.route === '/'
                ? route.path === '/'
                : tab.activeList.some((item) => route.path.startsWith(item))
            )
              ? 'text-[#1570EF] bg-[#EFF8FF]'
              : 'text-[#414651]',
          ]"
        >
          <component
            :is="tab.icon"
            class="size-6 min-w-6"
            :class="[
              (
                tab.route === '/'
                  ? route.path === '/'
                  : tab.activeList.some((item) => route.path.startsWith(item))
              )
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
import type { TabList } from "~/types/dashboard";
import IconBookOpen from "../icons/IconBookOpen.vue";
import useAppStore from "~/stores/AppStore";
import GetMentorshipBlock from "../pages/home/GetMentorshipBlock.vue";
import useSchoolListStore from "~/stores/SchoolListStore";
import { NuxtLinkLocale } from "#components";
import IconStarOutline from "../icons/IconStarOutline.vue";

const emit = defineEmits(["updateTab"]);

const route = useRoute();
const { t } = useI18n();
const appStore = useAppStore();
const localePath = useLocalePath();
const schoolListStore = useSchoolListStore();

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
    // name: "Application toolkit",
    name: t("dashboard.sidebar.menu.application_toolkit"),
    icon: shallowRef(IconStarOutline),
    route: "/majors",
    activeList: [
      "/majors",
      "/vi/majors",
      "/sophie",
      "/sophie",
      "/school-list",
      "/vi/school-list",
      "/vi/ai-essay",
      "/ai-essay",
    ],
  },
  {
    name: t("dashboard.sidebar.menu.resources"),
    icon: shallowRef(IconBookOpen),
    route: "/resources",
    activeList: ["/resources", "/vi/resources"],
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
  navigateTo(localePath("/scholarship"));
};

watch(
  () => schoolListStore.overViews,
  (newValue) => {
    if (newValue?.length) {
      isOpen.value = false;
    }
  }
);

watch(
  () => appStore.autoCloseSidebar,
  () => {
    if (appStore.autoCloseSidebar) {
      isOpen.value = false;
      appStore.autoCloseSidebar = false;
    }
  }
);
</script>
