<template>
  <div class="h-full w-full md:w-full relative">
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
          class="w-screen md:w-fit fixed top-20 md:top-0 inset-0 md:relative md:max-w-[380px] transition-all ease-in-out duration-400 overflow-hidden"
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

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/roadmap/${route.params.slug}`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/roadmap/${route.params.slug}`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/roadmap/${route.params.slug}`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/roadmap/${route.params.slug}`,
        hreflang: "x-default",
      },
    ],
  }))
);

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
    await appTrackerStore.getRoadmapData();
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
