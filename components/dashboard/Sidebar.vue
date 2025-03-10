<template>
  <div
    class="h-full py-6 flex flex-col justify-between gap-6 transition-all transform duration-500 ease-in-out border-r-[1.5px] border-gray-200 overflow-y-auto no-scrollbar"
    :class="[currentTab === 'sophie' ? 'w-[64px] px-3' : 'w-[224px] px-4']"
  >
    <div class="flex flex-col gap-6">
      <div :class="[activeTab !== 'sophie' ? 'px-2' : 'flex justify-center']">
        <div @click="handleLogo" class="flex gap-2 items-center cursor-pointer">
          <IconArrowsterLogo class="size-8 min-w-8" />
          <NuxtImg
            v-if="currentTab !== 'sophie'"
            class="w-24"
            src="/images/logo/logo.svg"
            alt="Logo"
            preload
          />
        </div>
      </div>
      <!-- tabs -->
      <div class="space-y-1">
        <div
          v-for="(tab, idx) in tabList"
          :key="idx"
          class="py-2 flex items-center rounded-lg cursor-pointer overflow-hidden"
          :class="[
            activeTab === tab.name
              ? 'text-[#1570EF] bg-[#EFF8FF]'
              : 'text-[#414651]',

            activeTab === 'sophie'
              ? 'px-2 justify-between'
              : 'px-3 justify-start gap-3',
          ]"
          @click="updateTab(tab.name)"
        >
          <div>
            <component
              :is="tab.icon"
              class="size-6"
              :class="[
                activeTab === tab.name ? 'text-[#1570EF]' : 'text-[#717680]',
              ]"
            />
          </div>
          <span
            v-if="currentTab !== 'sophie'"
            class="font-medium text-base capitalize text-nowrap"
          >
            {{
              tab.name === "application_tracker"
                ? "Roadmap"
                : tab.name.split("_").join(" ")
            }}
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
import IconTabSetting from "~/components/icons/IconTabSetting.vue";
import type { TabList, TabName } from "~/types/dashboard";

const emit = defineEmits(["updateTab"]);

const localePath = useLocalePath();

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
    name: "application_tracker",
    icon: IconTabApplication,
  },
  {
    name: "schools_list",
    icon: IconTabSchool,
  },
  {
    name: "sophie",
    icon: IconTabSophie,
  },
  // {
  //   name: "setting",
  //   icon: IconTabSetting,
  // },
];
const activeTab = ref<TabName>(props.currentTab);

const updateTab = (item: TabName) => {
  activeTab.value = item;
  emit("updateTab", item);
};

const handleLogo = () => {
  if (activeTab.value === "home") {
    navigateTo(localePath("/dashboard"));
  } else {
    emit("updateTab", "home");
  }
};

watch(
  () => props.currentTab,
  () => {
    activeTab.value = props.currentTab;
  }
);
</script>
