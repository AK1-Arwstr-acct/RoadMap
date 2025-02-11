<template>
  <div
    class="h-full w-[310px] px-4 py-6 flex flex-col justify-between gap-6 transition-all transform duration-500 ease-in-out border-r border-[#E9EAEB] overflow-y-auto no-scrollbar"
  >
    <div class="flex flex-col gap-6">
      <div>
        <NuxtLink to="/" class="flex gap-2.5 items-center">
          <IconArrowsterLogo />
          <NuxtImg
            class="w-[164px] h-[26px] invert"
            src="/images/logo/logo.svg"
            alt="Logo"
          />
        </NuxtLink>
      </div>
      <!-- tabs -->
      <div class="space-y-1">
        <div
          v-for="(tab, idx) in tabList"
          :key="idx"
          class="px-3 py-2 flex gap-3 items-center justify-start rounded-lg cursor-pointer overflow-hidden"
          :class="[
            activeTab === tab.name
              ? 'text-[#1570EF] bg-[#EFF8FF]'
              : 'text-[#414651]',
          ]"
          @click="updateTab(tab.name)"
        >
          <div>
            <component
              :is="tab.icon"
              :class="[
                activeTab === tab.name ? 'text-[#1570EF]' : 'text-[#717680]',
              ]"
            />
          </div>
          <span class="text-xl font-semibold capitalize">
            {{ tab.name.split("_").join(" ") }}
          </span>
        </div>
      </div>
      <!-- AI essay -->
      <div class="bg-[#EEF4FF] rounded-lg px-4 py-5">
        <div class="flex gap-1.5">
          <IconStar />
          <h2 class="text-[#181D27] font-semibold">AI Essay Editor</h2>
        </div>
        <p class="text-[#535862] text-sm mt-2">
          Transform your study abroad essay with AI-powered feedback,
          personalized suggestions, and expert guidance to help your application
          stand out.
        </p>
        <div
          class="text-sm text-[#444CE7] font-semibold cursor-pointer flex items-center gap-2 mt-4"
        >
          <p>Get Essay Help Now</p>
          <IconArrowRight fill="#444CE7" />
        </div>
      </div>
    </div>
    <!-- your journy -->
    <div class="bg-[#FAFAFA] rounded-lg px-4 py-5 text-sm">
      <img src="/public/images/journey.png" alt="journey" />
      <h4 class="font-semibold text-[#181D27] mt-4">
        Your World, Your Journey
      </h4>
      <p class="text-[#535862]">
        Don't let fear of the unknown stop you; let curiosity guide you to new
        horizons.
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconTabHome from "../icons/IconTabHome.vue";
import IconTabSophie from "../icons/IconTabSophie.vue";
import IconTabApplication from "../icons/IconTabApplication.vue";
import IconTabSchool from "../icons/IconTabSchool.vue";
import IconTabSetting from "../icons/IconTabSetting.vue";
import type { TabList, TabName } from "~/types/dashboard";

const emit = defineEmits(["updateTab"]);

const props = defineProps({
  currentTab: {
    type: String as PropType<TabName>,
    default: "home",
  },
});

const tabList: TabList[] = [
  {
    name: "home",
    icon: IconTabHome,
  },
  {
    name: "sophie",
    icon: IconTabSophie,
  },
  {
    name: "application_tracker",
    icon: IconTabApplication,
  },
  {
    name: "schools_list",
    icon: IconTabSchool,
  },
  {
    name: "setting",
    icon: IconTabSetting,
  },
];
const activeTab = ref<TabName>(props.currentTab);

const updateTab = (item: TabName) => {
  activeTab.value = item;
  emit("updateTab", item);
};
</script>
