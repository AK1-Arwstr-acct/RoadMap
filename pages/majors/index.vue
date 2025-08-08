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

definePageMeta({
  layout: "home-layout",
});

const majorStore = useMajorStore();

const tabs: Tabs[] = [
  {
    name: "chat",
    label: "Smart help",
    icon: IconMessageSquare,
  },
  {
    name: "guide",
    label: "Guides & Tips",
    icon: IconBookOpen,
  },
];

onUnmounted(() => {
  majorStore.clearStoreData();
});
</script>
