<template>
  <section class="flex h-full">
    <div class="size-full flex justify-center overflow-y-auto no-scrollbar">
      <div
        v-if="trackeSteps === 'application_tabs'"
        class="space-y-14 h-fit max-w-[772px] px-10 lg:px-0 py-10"
      >
        <PreAppCard @updateStep="updateStep('pre_application')" />
        <CountriesAppCard @updateStep="updateStep('countries_application')" />
        <PostAppCard @updateStep="updateStep('post_application')" />
      </div>
      <div v-else class="w-full max-w-[768px] px-5 py-8 h-fit">
        <!-- breadcrumbs -->
        <div class="mb-6 text-[#717680] font-medium flex items-center gap-1.5">
          <p @click="updateStep('application_tabs')" class="cursor-pointer">
            Application tracker
          </p>
          <IconChevronDown
            class="transform -rotate-90"
            stroke="#717680"
            width="20"
            height="20"
          />
        </div>
        <!-- application detail -->
        <div v-if="trackeSteps === 'pre_application'">
          <ApplicationTasks
            :application="appTrackerStore.preApplication"
            @openTaskDetail="openTaskDetail"
          />
        </div>
        <div v-if="trackeSteps === 'countries_application'">
          <ApplicationTasks
            :application="appTrackerStore.applicationList"
            @openTaskDetail="openTaskDetail"
          />
        </div>
        <div v-if="trackeSteps === 'post_application'">
          <ApplicationTasks
            :application="appTrackerStore.postApplication"
            @openTaskDetail="openTaskDetail"
          />
        </div>
      </div>
    </div>
    <Transition name="taskSlide">
      <div
        v-if="trackeSteps !== 'application_tabs' && openDetailModal"
        class="w-fit max-w-[440px] transition-all ease-in-out duration-500 overflow-hidden"
      >
        <component
          :is="TaskDetailSidebar"
          :taskDetail="taskDetail"
          @clearDetails="clearDetails"
        />
      </div>
    </Transition>
  </section>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import TaskDetailSidebar from "./TaskDetailSidebar.vue";
import type { Task } from "~/types/dashboard";

const appTrackerStore = useAppTrackerStore();

type TrackerSteps =
  | "application_tabs"
  | "pre_application"
  | "countries_application"
  | "post_application";

const trackeSteps = ref<TrackerSteps>("application_tabs");
const taskDetail = ref<Task>();
const openDetailModal = ref<boolean>(false);

const updateStep = (step: TrackerSteps) => {
  trackeSteps.value = step;
};

const openTaskDetail = (task: Task) => {
  if (task) {
    taskDetail.value = task;
    openDetailModal.value = true;
  } else {
    openDetailModal.value = false;
  }
};

const clearDetails = () => {
  openDetailModal.value = false;
};

onMounted(async () => {
  if (
    !appTrackerStore.preApplication &&
    !appTrackerStore.applicationList.length &&
    !appTrackerStore.postApplication
  ) {
    appTrackerStore.getRoadmapData();
  }
  if (appTrackerStore.categoriesGroup !== null) {
    if (appTrackerStore.categoriesGroup === "pre") {
      trackeSteps.value = "pre_application";
    } else if (appTrackerStore.categoriesGroup === "post") {
      trackeSteps.value = "post_application";
    } else {
      trackeSteps.value = "countries_application";
    }
  }
});

onUnmounted(() => {
  appTrackerStore.categoriesGroup = null;
});
</script>
<style scoped>
.taskSlide-enter-active,
.taskSlide-leave-active {
  transition: width 800ms ease-in-out;
}

.taskSlide-enter-from,
.taskSlide-leave-to {
  width: 0;
}

.taskSlide-enter-to,
.taskSlide-leave-from {
  width: 100%;
}
</style>
