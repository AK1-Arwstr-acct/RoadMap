<template>
  <div
    class="hidden lg:flex flex-col h-full py-6 justify-between gap-6 transition-all transform duration-500 ease-in-out border-r-[1.5px] border-gray-200 overflow-y-auto no-scrollbar"
    :class="[
      currentTab === 'sophie'
        ? 'w-[64px] px-3'
        : 'w-[64px] px-3 xl:w-[224px] xl:min-w-[224px] xl:px-4',
    ]"
  >
    <div class="flex flex-col gap-6">
      <div
        :class="[
          activeTab !== 'sophie' ? 'px-1 xl:px-2' : 'px-2 flex justify-center',
        ]"
      >
        <div @click="handleLogo" class="flex gap-2 items-center cursor-pointer">
          <IconArrowsterLogo class="size-8 min-w-8" />
          <img
            v-if="currentTab !== 'sophie'"
            class="w-24 hidden xl:block"
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
            activeTab === tab.name
              ? 'text-[#1570EF] bg-[#EFF8FF]'
              : 'text-[#414651]',

            activeTab === 'sophie'
              ? 'px-2 justify-between'
              : 'px-2  justify-between xl:px-3 xl:justify-start xl:gap-3',
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
            class="font-medium text-base text-nowrap hidden xl:block"
          >
            {{
              tab.name === "ai_essay_editor"
                ? "AI Essay Editor"
                : tab.name.split("_").join(" ")
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconTabHome from "~/components/icons/IconTabHome.vue";
import IconTabSophie from "~/components/icons/IconTabSophie.vue";
import IconTabApplication from "~/components/icons/IconTabApplication.vue";
import IconTabSchool from "~/components/icons/IconTabSchool.vue";
import IconTabEssayEditor from "~/components/icons/IconTabEssayEditor.vue";
// import IconTabSetting from "~/components/icons/IconTabSetting.vue";
import type { DemoTabList, TabName } from "~/types/dashboard";

const emit = defineEmits(["updateTab"]);

const localePath = useLocalePath();

const props = defineProps({
  currentTab: {
    type: String as PropType<TabName>,
    default: "home",
  },
});

const tabList: DemoTabList[] = [
  {
    name: "home",
    icon: IconTabHome,
  },
  {
    name: "Roadmap",
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
  {
    name: "ai_essay_editor",
    icon: IconTabEssayEditor,
  },
  // {
  //   name: "setting",
  //   icon: IconTabSetting,
  // },
];
const activeTab = ref<string>(props.currentTab);

const updateTab = (item: string) => {
  //   if (item !== "ai_essay_editor") {
  activeTab.value = item;
  emit("updateTab", item);
  //   } else {
  //     navigateTo(localePath("/essay"));
  //   }
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
