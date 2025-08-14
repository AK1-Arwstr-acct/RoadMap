<template>
  <section>
    <div class="overflow-hidden transition-all ease-in-out duration-500">
      <div
        v-for="(task, idx) in filteredTask(category)"
        :key="idx"
        @click.stop="handelTaskDetail(task)"
        :ref="(el) => setTaskRef(el, task.id)"
      >
        <label
          class="flex items-center gap-3 size-full rounded-lg cursor-pointer p-2 transition-all ease-in-out duration-200"
          :class="[
            appTrackerStore.taskActiveStates[task.id]
              ? 'bg-background-brand-subtle text-text-brand'
              : 'text-text-base',
          ]"
        >
          <div class="size-10 min-w-10">
            <img
              :src="imageSrc(task)"
              alt="task logo"
              class="size-full object-contain"
              loading="eager"
            />
          </div>
          <div class="flex-1 font-semibold text-sm">
            {{ task.title }}
          </div>
        </label>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { Application, Task } from "~/types/dashboard";
import useAppTrackerStore from "~/stores/AppTrackerStore";
import useAppStore from "~/stores/AppStore";
import useSophieStore from "~/stores/sophieStore";

const emit = defineEmits(["openTaskDetail", "hightChanged", "scrollDown"]);

const appTrackerStore = useAppTrackerStore();
const localePath = useLocalePath();
const appStore = useAppStore();
const sophieStore = useSophieStore();
const route = useRoute();
const { api } = useApi();
const { t } = useI18n();

const props = defineProps({
  application: {
    type: Object as PropType<Application>,
    default: () => {},
  },
  category: {
    type: String,
    default: "",
  },
});

const isOpen = ref<boolean>(true); // default open
const taskRefs = ref<Record<number, HTMLElement | null>>({});

const imageSrc = (task: Task) => {
  return task.title?.toLowerCase().includes("major")
    ? "/images/decision.png"
    : task.title?.toLowerCase().includes("college")
    ? "/images/school-list.png"
    : task.title?.toLowerCase().includes("scholarship")
    ? "/images/application-post.png"
    : task.title?.toLowerCase().includes("extracurricular")
    ? "/images/extracurricular.png"
    : task.title?.toLowerCase().includes("tests")
    ? "/images/application.png"
    : task.title?.toLowerCase().includes("mentor")
    ? "/images/career.png"
    : task.title?.toLowerCase().includes("statement")
    ? "/images/academic.png"
    : task.title?.toLowerCase().includes("visa")
    ? "/images/visa.png"
    : "/images/application.png";
};

const setTaskRef = (el: HTMLElement | null, id: number) => {
  taskRefs.value[id] = el;
};

const handelTaskDetail = async (task: Task) => {
  // if (appStore.authenticatedUser && task.feature_state === "scholarship") {
  //   sophieStore.openSophieModal = true;
  //   sophieStore.scholarshipSophieModal = true;
  //   appStore.isFeatureChangeFromTasks = true;
  //   return;
  // }
  const taskId = task.id;
  appTrackerStore.taskActiveStates[taskId] = true;
  Object.keys(appTrackerStore.taskActiveStates).forEach((key) => {
    if (Number(key) !== taskId) {
      appTrackerStore.taskActiveStates[Number(key)] = false;
    }
  });

  sophieStore.roadmapTaskDetail = task;
  let routeName: string = "";
  if (task.feature_state?.toLowerCase().includes("sophie")) {
    routeName = "/sophie";
  } else if (task.feature_state?.toLowerCase().includes("essay")) {
    routeName = "/ai-essay";
  } else if (task.feature_state?.toLowerCase().includes("school")) {
    routeName = "/school-list";
  } else if (task.feature_state?.toLowerCase().includes("checklist")) {
    routeName = "/checklist";
  } else if (task.feature_state?.toLowerCase().includes("scholarship")) {
    routeName = "/scholarship";
  } else if (task.feature_state?.toLowerCase().includes("major")) {
    routeName = "/majors";
  } else if (task.feature_state?.toLowerCase().includes("mentor")) {
    routeName = "/pricing";
  }
  if (route.fullPath.includes(routeName)) {
    return;
  }
  appStore.isFeatureChangeFromTasks = true;
  navigateTo(localePath(routeName));
};

const filteredTask = (category: string) => {
  const tasks = props.application.tasks.filter((item) =>
    item.category.title.includes(category)
  );
  return tasks;
};

watch(
  () => appTrackerStore.taskActiveStates,
  async (states) => {
    const activeId = Number(Object.entries(states).find(([_, v]) => v)?.[0]);
    if (
      isOpen.value &&
      activeId &&
      filteredTask(props.category).some((task) => task.id === activeId)
    ) {
      await nextTick();
      const el = taskRefs.value[activeId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  },
  { deep: true }
);
</script>
