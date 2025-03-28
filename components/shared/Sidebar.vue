<template>
  <div
    class="h-full py-6 flex flex-col justify-between gap-6 transition-all transform duration-500 ease-in-out border-r-[1.5px] border-gray-200 overflow-y-auto no-scrollbar"
    :class="[
      route.path.includes('/sophie')
        ? 'w-[64px] px-3'
        : 'w-[64px] px-3 lg:w-[224px] lg:min-w-[224px] lg:px-4',
    ]"
  >
    <div class="flex flex-col gap-6">
      <div
        :class="[
          !route.path.includes('/sophie')
            ? 'px-1 lg:px-2'
            : 'px-2 flex justify-center',
        ]"
      >
        <div @click="handleLogo" class="flex gap-2 items-center cursor-pointer">
          <IconArrowsterLogo class="size-8 min-w-8" />
          <NuxtImg
            v-if="!route.path.includes('/sophie')"
            class="w-24"
            :class="{ 'hidden lg:block': !route.path.includes('/sophie') }"
            src="/images/logo/logo.svg"
            alt="Logo"
            loading="eager"
            preload
          />
        </div>
      </div>
      <!-- tabs -->
      <div class="flex flex-col gap-1">
        <div
          v-for="(tab, idx) in tabList"
          :key="idx"
          class="py-2 flex items-center rounded-lg cursor-pointer overflow-hidden"
          :class="[
            route.path.includes(tab.route) && !route.path.includes('/profile')
              ? 'text-[#1570EF] bg-[#EFF8FF]'
              : 'text-[#414651]',

            route.path.includes('/sophie')
              ? 'px-2 justify-between'
              : 'px-2 justify-between lg:px-3 lg:justify-start lg:gap-3',
          ]"
          @click="updateTab(tab.route)"
        >
          <div>
            <component
              :is="tab.icon"
              class="size-6"
              :class="[
                route.path.includes(tab.route) &&
                !route.path.includes('/profile')
                  ? 'text-[#1570EF]'
                  : 'text-[#717680]',
              ]"
            />
          </div>
          <span
            v-if="!route.path.includes('/sophie')"
            class="font-medium text-base capitalize text-nowrap hidden lg:block"
          >
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
  </div>
</template>
<script setup lang="ts">
import IconTabHome from "~/components/icons/IconTabHome.vue";
import IconTabSophie from "~/components/icons/IconTabSophie.vue";
import IconTabApplication from "~/components/icons/IconTabApplication.vue";
import IconTabSchool from "~/components/icons/IconTabSchool.vue";
import IconTabEssayEditor from "../icons/IconTabEssayEditor.vue";
import IconTabSetting from "~/components/icons/IconTabSetting.vue";
import type { TabList, TabName } from "~/types/dashboard";

const emit = defineEmits(["updateTab"]);

const localePath = useLocalePath();
const route = useRoute();

const tabList: TabList[] = [
  {
    name: "home",
    icon: IconTabHome,
    route: "/dashboard",
  },
  {
    name: "roadmap",
    icon: IconTabApplication,
    route: "/roadmap",
  },
  {
    name: "schools list",
    icon: IconTabSchool,
    route: "/school-list",
  },
  {
    name: "sophie",
    icon: IconTabSophie,
    route: "/sophie",
  },
  {
    name: "ai essay editor",
    icon: IconTabEssayEditor,
    route: "/ai-essay",
  },
  // {
  //   name: "setting",
  //   icon: IconTabSetting,
  // },
];

const updateTab = (item: string) => {
  navigateTo(localePath(item));
};

const handleLogo = () => {
  navigateTo(localePath("/dashboard"));
};
</script>
