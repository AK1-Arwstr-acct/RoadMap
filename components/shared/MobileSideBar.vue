<template>
  <div
    class="fixed w-[92%] right-0 top-0 z-50 bottom-0 bg-white flex flex-col justify-between gap-6 transition-all transform duration-500 ease-in-out border-r-[1.5px] border-gray-200 overflow-y-auto no-scrollbar"
  >
    <div class="flex flex-col gap-6">
      <div
        class="flex justify-between items-center p-4 border-b border-gray-200"
      >
        <div @click="handleLogo" class="flex gap-2 items-center cursor-pointer">
          <IconArrowsterLogo class="size-8 min-w-8" />
          <NuxtImg
            class="w-24"
            src="/images/logo/logo.svg"
            alt="Logo"
            loading="eager"
            preload
          />
        </div>
        <div class="" @click="emit('close')">
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
  </div>
</template>
<script setup lang="ts">
import IconTabHome from "~/components/icons/IconTabHome.vue";
import IconTabSophie from "~/components/icons/IconTabSophie.vue";
import IconTabApplication from "~/components/icons/IconTabApplication.vue";
import IconTabSchool from "~/components/icons/IconTabSchool.vue";
import IconTabEssayEditor from "../icons/IconTabEssayEditor.vue";
import IconProfileTab from "../icons/IconProfileTab.vue";
import IconTabSetting from "~/components/icons/IconTabSetting.vue";
import type { TabList, TabName } from "~/types/dashboard";

const emit = defineEmits(["updateTab", "close"]);

const localePath = useLocalePath();
const route = useRoute();

const tabList: TabList[] = [
  {
    name: "profile",
    icon: IconProfileTab,
    route: "/dashboard/profile",
  },
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
  emit("close");
};

const handleLogo = () => {
  navigateTo(localePath("/dashboard"));
  emit("close");
};
</script>
