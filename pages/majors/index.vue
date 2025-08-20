<template>
  <div class="h-full flex flex-col">
    <div class="h-fit">
      <TabsList
        :tabs="tabs"
        :activeTab="majorStore.activeTab"
        @changeTab="(value) => (majorStore.activeTab = value)"
      />
    </div>
    <div class="flex-1 overflow-hidden">
      <MajorsSelectionChat v-if="majorStore.activeTab === 'chat'" />
      <GuidesAndTips v-else-if="majorStore.activeTab === 'guide'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useMajorStore from "~/stores/majorStore";
import type { Tabs } from "~/types/home";
import IconBookOpen from "~/components/icons/IconBookOpen.vue";
import IconMessageSquare from "~/components/icons/IconMessageSquare.vue";
import useAppStore from "~/stores/AppStore";

definePageMeta({
  layout: "home-layout",
});

const majorStore = useMajorStore();
const appStore = useAppStore();
const { t } = useI18n();

const tabs: Tabs[] = [
  {
    name: "chat",
    label: `${t('majors_page.tabs.smart_help')}`,
    icon: IconMessageSquare,
  },
  {
    name: "guide",
    label: `${t('majors_page.tabs.guides_tips')}`,
    icon: IconBookOpen,
  },
];

onMounted(() => {
  appStore.autoCloseSidebar = true;
});
onUnmounted(() => {
  // majorStore.clearStoreData();
});
</script>
