<template>
  <div
    class="bg-white w-[424px] h-dvh relative z-40 border-l border-[#00000033] flex flex-col"
  >
    <div class="pt-8 pb-4 px-6 flex justify-between items-center border-b border-[#00000033]">
      <div class="font-semibold">
        <p class="text-[#2563EB] text-xs">{{ $t('schoolList_page.ai_smart_filter') }}</p>
        <p class="text-[#111827] text-xl">{{ $t('schoolList_page.why_these_schools') }}</p>
      </div>
      <div class="flex items-center gap-3">
        <div @click="openSophieModal = true" class="cursor-pointer">
          <IconDoubleArrows />
        </div>
        <div @click="schoolListStore.overViews = null" class="cursor-pointer">
          <IconCross fill="#111827" width="24" height="24" />
        </div>
      </div>
    </div>
    <div class="flex-1 px-5 overflow-hidden">
        <SophieChat :isOverviewSidebar="true" />
    </div>
  </div>
  <Transition name="fade">
    <div
      v-if="openSophieModal"
      class="fixed bg-black/50 inset-0 z-50 isolate backdrop-blur py-10 lg:py-[60px] px-4 lg:px-[68px] flex justify-center items-center"
    >
      <ChatWithSophie
        :isModal="true"
        :isSummarizeOverview="true"
        @openSophieModal="openSophieModal = false"
      />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import useSchoolListStore from "~/stores/SchoolListStore";

const schoolListStore = useSchoolListStore();

const openSophieModal = ref<boolean>(false);
</script>