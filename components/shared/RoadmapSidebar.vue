<template>
  <div
    class="border-r bg-white transition-all ease-in-out duration-700 flex flex-col absolute z-10 lg:z-0 lg:relative top-0 left-0 h-[calc(100%-16px)] sm:h-full"
    :class="[
      appTrackerStore.isRoadmapSidebarOPen
        ? 'w-full lg:w-[336px] pb-8 lg:pt-8 px-5 '
        : 'w-0',
    ]"
  >
    <div
      class="flex gap-4 relative isolate"
      :class="[
        appTrackerStore.isRoadmapSidebarOPen
          ? 'justify-between'
          : 'justify-center',
      ]"
    >
      <Transition name="sidebar">
        <p
          v-if="appTrackerStore.isRoadmapSidebarOPen"
          class="text-[#181D27] text-xl font-semibold text-nowrap sm:text-nowrap overflow-hidden"
        >
          {{ $t("roadmap_page.your_personalised_application") }} <br />
          {{ $t("roadmap_page.checklist") }}
        </p>
      </Transition>
      <!-- <IconSidebar
        @click="toggleSidebar"
        class="cursor-pointer min-w-fit lg:hidden"
        :class="[appTrackerStore.isRoadmapSidebarOPen ? 'text-[#717680]' : 'text-[#1570EF] hidden']"
      /> -->
      <!-- <Transition name="fade">
        <div
          v-if="!appTrackerStore.isRoadmapSidebarOPen"
          class="fixed lg:hidden z-50 top-28 -left-2 bg-white py-5 px-1 rounded-r-full shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
        >
          <div class="px-1.5 rounded-full">
            <IconSidebar
              @click="toggleSidebar"
              class="cursor-pointer size-5"
              :class="[appTrackerStore.isRoadmapSidebarOPen ? 'text-[#717680]' : 'text-[#1570EF]']"
            />
          </div>
        </div>
      </Transition> -->
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
        v-if="!appTrackerStore.isRoadmapSidebarOPen"
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
import useAppStore from "~/stores/AppStore";
import type { Task } from "~/types/dashboard";

const appTrackerStore = useAppTrackerStore();
const sophieStore = useSophieStore();
const appStore = useAppStore();
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

// const isOpen = ref<boolean>(appTrackerStore.isRoadmapSidebarOPen);
const width = ref<number>(0);

const toggleSidebar = () => {
  appTrackerStore.isRoadmapSidebarOPen = !appTrackerStore.isRoadmapSidebarOPen;
  // appTrackerStore.isSidebarOpen = isOpen.value; // will remove after update school list layout
};

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

let helo = "base";

const onRouteChange = () => {
  Object.keys(appTrackerStore.taskActiveStates).forEach((key) => {
    appTrackerStore.taskActiveStates[Number(key)] = false;
  });
  const applicationListTasks = (appTrackerStore.applicationList ?? []).flatMap(
    (item) => item.tasks ?? []
  );
  const tasksArray = [
    ...(appTrackerStore.preApplication?.tasks ?? []),
    ...applicationListTasks,
    ...(appTrackerStore.postApplication?.tasks ?? []),
  ];
  let matchedTask: Task | undefined;
  if (appTrackerStore.taskFromHomeQuestion) {
    matchedTask = tasksArray.find((item) => {
      return item.id === appTrackerStore.taskFromHomeQuestion;
    });
    appTrackerStore.taskFromHomeQuestion = null;
  } else {
    matchedTask = tasksArray.find((item) => {
      return route.path
        .replace("-", " ")
        .includes(item.feature_state.replace("_", " "));
    });
  }

  if (matchedTask) {
    appTrackerStore.taskActiveStates[Number(matchedTask?.id)] = true;
    sophieStore.roadmapTaskDetail = matchedTask;
  }
};

watch(
  () => route.path,
  () => {
    helo = "route";
    if (appStore.isFeatureChangeFromTasks) {
      appStore.isFeatureChangeFromTasks = false;
      return;
    }
    onRouteChange();
  }
);

watch(
  () => appTrackerStore.roadmapData,
  () => {
    helo = "roadmap";
    onRouteChange();
  },
  { deep: true }
);

watch(
  () => width.value,
  () => {
    if (width.value > 1024) {
      appTrackerStore.isRoadmapSidebarOPen = true;
    } else {
      appTrackerStore.isRoadmapSidebarOPen = false;
    }
  }
);

watch(
  () => sophieStore.roadmapTaskDetail,
  () => {
    if (width.value < 1024) {
      appTrackerStore.isRoadmapSidebarOPen = false;
    }
  }
);

watch(
  () => appTrackerStore.isRoadmapSidebarOPen,
  () => {
    appTrackerStore.isRoadmapSidebarOPen = appTrackerStore.isRoadmapSidebarOPen;
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
