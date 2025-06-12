<template>
  <div
    class="bg-white rounded-xl transition-all ease-in-out duration-700  flex flex-col absolute lg:relative top-2 left-2 lg:top-0 lg:left-0 h-[calc(100%-16px)] sm:h-full"
    :class="[
      isOpen ? 'w-[calc(100%-16px)] lg:w-[336px] p-5 ' : 'w-0',
    ]"
  >
    <div
      class="flex gap-4 relative isolate"
      :class="[isOpen ? 'justify-between' : 'justify-center']"
    >
      <Transition name="sidebar">
        <p
          v-if="isOpen"
          class="text-[#181D27] text-xl font-semibold text-nowrap sm:text-nowrap overflow-hidden"
        >
          {{ $t("roadmap_page.your_personalised_application") }} <br />
          {{ $t("roadmap_page.checklist") }}
        </p>
      </Transition>
      <IconSidebar
        @click="toggleSidebar"
        class="cursor-pointer min-w-fit lg:hidden"
        :class="[isOpen ? 'text-[#717680]' : 'text-[#1570EF] hidden']"
      />
      <Transition name="fade">
        <div
          v-if="!isOpen"
          class="fixed lg:hidden z-50 top-28 -left-2 bg-white py-5 px-1 rounded-r-full shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
        >
          <div class="px-1.5 rounded-full">
            <IconSidebar
              @click="toggleSidebar"
              class="cursor-pointer size-5"
              :class="[isOpen ? 'text-[#717680]' : 'text-[#1570EF]']"
            />
          </div>
        </div>
      </Transition>
    </div>
    <!-- for open sidebar -->
    <Transition name="sidebar">
      <div class="flex-1 overflow-y-auto no-scrollbar">
        <div class="h-px bg-[#E9EAEB] my-6" />
        <ApplicationsList
          :heading="t('roadmap_page.pre_application')"
          :application="appTrackerStore.preApplication"
        />
        <div class="h-px bg-[#E9EAEB] my-6" />
        <ApplicationsList
          :heading="t('roadmap_page.application')"
          :application="appTrackerStore.applicationList"
        />
        <div class="h-px bg-[#E9EAEB] my-6" />
        <ApplicationsList
          :heading="t('roadmap_page.post_application')"
          :application="appTrackerStore.postApplication"
        />
      </div>
    </Transition>
    <!-- close sidebar -->
    <!-- <Transition name="fade">
      <div
        v-if="!isOpen"
        class="flex-1 overflow-y-auto no-scrollbar w-full hidden sm:flex flex-col gap-14 mt-8"
      >
        <CompleteTaskList :application="appTrackerStore.preApplication" />
        <CompleteTaskList :application="appTrackerStore.applicationList" />
        <CompleteTaskList :application="appTrackerStore.postApplication" />
      </div>
    </Transition> -->
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import useSophieStore from "~/stores/sophieStore";

const appTrackerStore = useAppTrackerStore();
const sophieStore = useSophieStore();
const { t } = useI18n();

const isOpen = ref<boolean>(true);
const width = ref<number>(0);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
  appTrackerStore.isSidebarOpen = isOpen.value;
};

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

watch(
  () => width.value,
  () => {
    if (width.value > 1024) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  }
);

watch(
  () => sophieStore.roadmapTaskDetail,
  () => {
    if (width.value < 1024) {
      isOpen.value = false;
    }
  }
);

onMounted(async () => {
  windowSize();
  window.addEventListener("resize", windowSize);
  if (
    !appTrackerStore.preApplication &&
    !appTrackerStore.applicationList.length &&
    !appTrackerStore.postApplication
  ) {
    appTrackerStore.getRoadmapData();
  }
});

onUnmounted(() => {
  window.addEventListener("resize", windowSize);
});
</script>
<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 500ms;
  transform: all 500ms;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: scaleX(0.5);
}

.sidebar-enter-to,
.sidebar-leave-from {
  opacity: 1;
  transform: scaleX(1);
}
</style>
