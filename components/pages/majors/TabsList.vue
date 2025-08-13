<template>
  <div
    class="flex gap-3 w-full px-8 pt-1.5 pb-1 overflow-x-auto no-scrollbar border-b border-divider"
  >
    <div
      v-for="tab in tabs"
      :key="tab.name"
      @click="update(tab.name)"
      class="px-1 pb-1.5 flex gap-1.5 items-center font-semibold cursor-pointer transition-all ease-in-out duration-200 relative"
      :class="[activeTab === tab.name ? 'text-text-brand' : 'text-text-base']"
    >
      <div class="text-nowrap flex items-center gap-1.5">
        <component
          :is="tab.icon"
          class="size-6 min-w-6"
          :class="[
            activeTab === tab.name ? '!text-icon-brand' : '!text-icon-neutral-subtle',
          ]"
        />
        {{ $t(tab.label) }}
        <div
          v-if="activeTab === tab.name"
          class="absolute h-[3px] w-full left-0 -bottom-1 bg-background-brand rounded-tl-[4px] rounded-tr-[4px]"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { MajorsTabs, Tabs } from "~/types/home";

const emits = defineEmits(["changeTab"]);

const props = defineProps({
  tabs: {
    type: Array as PropType<Tabs[]>,
    default: () => [],
  },
  activeTab: {
    type: String,
    default: "",
  },
});

const activeTab = ref<typeof props.tabs[number]["name"]>(props.activeTab);

const update = (TabName: string) => {
  emits("changeTab", TabName);
};

watch(
  () => props.activeTab,
  () => {
    activeTab.value = props.activeTab;
  }
);
</script>
