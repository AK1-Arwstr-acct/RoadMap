<template>
  <div class="size-full">
    <section class="flex h-full bg-white">
      <div class="w-full flex justify-center overflow-y-auto no-scrollbar">
        <div class="w-full max-w-[768px] px-5 py-8 h-fit">
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
          v-if="openDetailModal"
          class="w-fit max-w-[380px] transition-all ease-in-out duration-400 overflow-hidden"
        >
          <component
            :is="TaskDetailSidebar"
            :taskDetail="taskDetail"
            @clearDetails="clearDetails"
          />
        </div>
      </Transition>
    </section>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import TaskDetailSidebar from "~/components/pages/roadmap/TaskDetailSidebar.vue";
import type { Task } from "~/types/dashboard";

definePageMeta({
  layout: "dashboard-layout",
});

const appTrackerStore = useAppTrackerStore();
const route = useRoute();

type TrackerSteps =
  | "pre_application"
  | "countries_application"
  | "post_application";

const trackeSteps = ref<TrackerSteps>("pre_application");
const taskDetail = ref<Task>();
const openDetailModal = ref<boolean>(false);

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
  if (route.params.slug === "pre-application") {
    trackeSteps.value = "pre_application";
  } else if (route.params.slug === "post-application") {
    trackeSteps.value = "post_application";
  } else {
    trackeSteps.value = "countries_application";
  }
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
