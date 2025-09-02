<template>
  <div
    class="group hidden lg:flex flex-col h-full pt-6 pb-5 justify-between gap-6 transition-all transform duration-500 ease-in-out border-r-[1.5px] border-divider overflow-y-auto no-scrollbar"
    :class="[!isOpen ? 'w-[72px] px-2' : 'w-[264px] px-2']"
  >
    <div class="flex flex-col gap-6">
      <div :class="[isOpen ? 'px-4' : 'px-2 flex justify-center']">
        <div class="flex gap-2 items-center cursor-pointer justify-between">
          <IconArrowsterLogo
            v-if="!isOpen"
            class="size-[30px] min-w-[30px] group-hover:hidden"
            :class="{ invert: appStore.theme === 'theme-dark' }"
          />
          <img
            v-else
            class="w-[148px]"
            :class="{ invert: appStore.theme === 'theme-dark' }"
            src="/images/logo/logo.svg"
            alt="Logo"
            loading="eager"
          />
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
  </div>

  <!-- mobile bottom bar -->
  <div class="lg:hidden bg-surface fixed z-20 bottom-0 w-full px-1.5">
    <div class="flex gap-1 justify-evenly py-1.5 border-t border-divider">
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
          <span class="font-semibold text-xs text-nowrap">
            {{ tab.name }}
          </span>
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TabList } from "~/types/dashboard";
import IconSchoolBuilding from "~/components/icons/IconSchoolBuilding.vue";
import IconGift from "~/components/icons/IconGift.vue";
import useAppStore from "~/stores/AppStore";
import useCounselorStore from "~/stores/counselorStore";
import IconUserSquare from "~/components/icons/IconUserSquare.vue";

const emit = defineEmits(["updateTab"]);

const route = useRoute();
const { t } = useI18n();
const appStore = useAppStore();
const counselorStore = useCounselorStore();

const isOpen = ref<boolean>(true);
const tabList = ref<TabList[]>([
  //   {
  //     name: t("dashboard.sidebar.menu.home"),
  //     icon: shallowRef(IconTabHome),
  //     route: "/",
  //     activeList: ["/"],
  //   },
  {
    name: t("counselor_pages.students"),
    icon: shallowRef(IconUserSquare),
    route: "/counselor/students",
    activeList: [
      "/counselor/students",
      "/vi/counselor/students",
      "/counselor/student-profile",
      "/vi/counselor/student-profile",
    ],
  },
  {
    name: t("counselor_pages.schools"),
    icon: shallowRef(IconSchoolBuilding),
    route: "/counselor/schools",
    activeList: ["/counselor/schools", "/vi/counselor/schools"],
  },
  {
    name: t("counselor_pages.referral_program"),
    icon: shallowRef(IconGift),
    route: "/counselor/referral",
    activeList: ["/counselor/referral", "/vi/counselor/referral"],
  },
]);

// watch(
//   () => counselorStore.autoCloseSidebar,
//   () => {
//     if (counselorStore.autoCloseSidebar) {
//       isOpen.value = false;
//       counselorStore.autoCloseSidebar = false;
//     }
//   }
// );
</script>
