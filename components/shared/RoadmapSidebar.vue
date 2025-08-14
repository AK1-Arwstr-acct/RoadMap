<template>
  <div
    class="border-r border-divider bg-surface transition-all ease-in-out duration-700 flex flex-col gap-8 absolute z-20 lg:z-0 lg:relative top-0 left-0 h-[calc(100%-16px)] sm:h-full"
    :class="[
      appTrackerStore.isRoadmapSidebarOPen
        ? 'w-full lg:w-[256px] md:pb-4 lg:pt-6'
        : 'w-0',
    ]"
  >
    <div class="px-4">
      <Transition name="sidebar">
        <p
          v-if="appTrackerStore.isRoadmapSidebarOPen"
          class="text-text-base text-xl font-semibold text-nowrap sm:text-nowrap overflow-hidden"
        >
          Application toolkit
        </p>
      </Transition>
    </div>
    <!-- for open sidebar -->
    <Transition name="sidebar">
      <div
        v-if="appTrackerStore.isRoadmapSidebarOPen"
        ref="appListContainer"
        class="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6 px-2"
      >
        <ApplicationsList
          :heading="t('roadmap_page.pre_application')"
          :application="appTrackerStore.preApplication"
        />
        <ApplicationsList
          :heading="t('roadmap_page.application')"
          :application="appTrackerStore.applicationList"
        />
        <ApplicationsList
          :heading="t('roadmap_page.post_application')"
          :application="appTrackerStore.postApplication"
          @scrollDown="scrollDown"
        />
      </div>
    </Transition>
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

const width = ref<number>(0);
const appListContainer = ref<HTMLElement | null>(null);

function scrollDown() {
  if (appListContainer.value) {
    appListContainer.value.scrollTo({
      top: appListContainer.value.scrollHeight,
      behavior: "smooth",
    });
  }
}

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
  const tasksArray = [
    ...(appTrackerStore.preApplication?.tasks ?? []),
    ...(appTrackerStore.applicationList?.tasks ?? []),
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
    !appTrackerStore.applicationList &&
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