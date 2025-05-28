<template>
  <section>
    <div
      @click="isOpen = !isOpen"
      class="py-4 px-5 border-[1.5px] border-gray-200 rounded-2xl shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A] bg-[#FFFEFC] flex items-center gap-2 cursor-pointer"
    >
      <IconChevronDown
        stroke="#717680"
        strokeWidth="2"
        class="transform transition-all ease-in-out duration-300"
        :class="{ '-rotate-90': !isOpen }"
        width="20"
        height="20"
      />
      <p class="text-[#111827] font-medium flex-1 capitalize">
        <span v-if="category !== 'country'">
          {{
            category === "extracurricular"
              ? "extracurricular activity"
              : category
          }}
        </span>
        <span v-else>
          {{ application.country_title?.split("_").join(" ") }}
        </span>
      </p>
      <div
        class="py-0.5 px-3 rounded-full font-semibold tracking-wider text-sm"
        :class="[
          category === 'country'
            ? 'bg-[#F5F5F5] text-[#414651]'
            : categoryClass(category),
        ]"
      >
        {{
          filteredTask(category).filter((item) => item.checked == true).length
        }}/{{ filteredTask(category).length }}
      </div>
      <Transition name="fade">
        <IconAward
          v-if="
            filteredTask(category).filter((item) => item.checked == true)
              .length === filteredTask(category).length
          "
          width="20"
          height="20"
        />
      </Transition>
    </div>
    <!-- tasks -->
    <div
      ref="content"
      :style="{ maxHeight: isOpen ? contentHeight + 'px' : '0px' }"
      class="overflow-hidden transition-all ease-in-out duration-500 pb-1.5"
    >
      <div
        v-for="(task, idx) in filteredTask(category)"
        :key="idx"
        @click.stop="handelTaskDetail(task)"
        :ref="(el) => setTaskRef(el, task.id)"
      >
        <label
          class="mt-6 flex items-center gap-4 size-full rounded-2xl cursor-pointer pl-4 pr-5 py-3 transition-all ease-in-out duration-200"
          :class="[
            appTrackerStore.taskActiveStates[task.id]
              ? 'border-2 border-[#2E90FA] bg-[#F5FAFF]'
              : 'border-[1.5px] border-gray-200 bg-[#FFFFFF]',
          ]"
        >
          <div class="size-[64px]">
            <img
              :src="imageSrc"
              alt="task logo"
              class="size-full object-contain"
              loading="eager"
            />
          </div>
          <div class="flex-1 space-y-2">
            <p class="text-[#414651] font-semibold">
              {{ task.title }}
            </p>
            <div class="flex items-center gap-1.5 text-[#414651] text-sm">
              <IconClock />
              <span> {{ task.estimated_time }} </span>
            </div>
          </div>
          <div
            @click.stop="
              task.checked = !task.checked;
              handelClick(task);
            "
            class="size-5 rounded-[4px] border-[1.5px] flex justify-center items-center"
            :class="[
              task.checked
                ? 'bg-[#1570EF] border-[#1570EF]'
                : 'bg-white border-gray-200',
            ]"
          >
            <IconTick stroke="#ffffff" width="15" height="15" />
          </div>
        </label>
      </div>
    </div>
    <!-- paywall -->

    <!-- <Transition name="fade">
      <div
        v-if="progressSoftPaywall"
        class="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm flex justify-center items-center"
      >
        <div
          class="bg-white p-6 flex flex-col gap-8 rounded-xl w-full max-w-[400px]"
        >
          <div class="flex flex-col items-center">
            <IconTabSophie width="48" height="48" class="text-[#ED77FF] mb-5" />
            <p class="text-[#181D27] text-lg font-semibold text-center">
              {{ $t("roadmap_page.paywall_progress.heading") }}
            </p>
            <p class="text-[#535862] text-sm text-center mt-2">
              {{ $t("roadmap_page.paywall_progress.detail") }}
            </p>
          </div>
          <div class="flex gap-3">
            <button
              @click="progressSoftPaywall = false"
              class="border border-gray-200 py-2.5 w-full rounded-lg text-[#414651] font-semibold"
            >
              {{ $t("roadmap_page.paywall_progress.cancel") }}
            </button>
            <NuxtLinkLocale
              :to="'/signup'"
              class="border border-[#1570EF] text-center bg-[#1570EF] py-2.5 w-full rounded-lg text-white font-semibold"
            >
              {{ $t("roadmap_page.paywall_progress.sign_up_for_free") }}
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </Transition> -->
  </section>
</template>
<script setup lang="ts">
import type { Application, Task } from "~/types/dashboard";
import useAppTrackerStore from "~/stores/AppTrackerStore";
import useAppStore from "~/stores/AppStore";
import useSophieStore from "~/stores/sophieStore";

const emit = defineEmits(["openTaskDetail", "hightChanged"]);

const appTrackerStore = useAppTrackerStore();
const localePath = useLocalePath();
const appStore = useAppStore();
const sophieStore = useSophieStore();
const route = useRoute();
const { api } = useApi();

const props = defineProps({
  application: {
    type: Object as PropType<Application>,
    default: () => {},
  },
  category: {
    type: String,
    default: "",
  },
  forceOpen: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref<boolean>(false);
const content = ref<HTMLElement | null>(null);
const contentHeight = ref(0);
const taskRefs = ref<Record<number, HTMLElement | null>>({});
// const progressSoftPaywall = ref<boolean>(false);

const imageSrc = computed(() => {
  return props.category?.includes("career")
    ? "/images/career.png"
    : props.category?.includes("academics")
    ? "/images/academic.png"
    : props.category?.includes("extracurricular")
    ? "/images/extracurricular.png"
    : props.category?.includes("school")
    ? "/images/school-list.png"
    : props.category?.includes("application")
    ? "/images/application-post.png"
    : props.category?.includes("decision")
    ? "/images/decision.png"
    : props.category?.includes("visa")
    ? "/images/visa.png"
    : "/images/application.png";
});

const setTaskRef = (el: HTMLElement | null, id: number) => {
  taskRefs.value[id] = el;
};

const categoryClass = (category: string) => {
  if (category.includes("career") || category.includes("application")) {
    return "bg-[#FFFAEB] text-[#B54708]";
  } else if (category.includes("academics") || category.includes("decision")) {
    return "bg-[#EFF8FF] text-[#175CD3]";
  } else if (
    category.includes("extracurricular") ||
    category.includes("finances") ||
    category.includes("scholarships")
  ) {
    return "bg-[#ECFDF3] text-[#027A48]";
  } else if (category.includes("school")) {
    return "bg-[#FDF2FA] text-[#C11574]";
  } else if (category.includes("decision")) {
    return "bg-[#EEF4FF] text-[#3538CD]";
  } else {
    return "bg-[#F0F9FF] text-[#026AA2]";
  }
};

const handelTaskDetail = async (task: Task) => {
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
  } else {
    routeName = "/school-list";
  }
  if (route.fullPath.includes(routeName)) {
    return;
  }
  appStore.isFeatureChangeFromTasks = true;
  navigateTo(localePath(routeName));
};

const filteredTask = (category: string) => {
  if (props.category === "country") {
    return props.application.tasks;
  }
  const tasks = props.application.tasks.filter((item) =>
    item.category.title.includes(category)
  );
  return tasks;
};

const handelClick = async (task: Task) => {
  try {
    if (!appStore.authenticatedUser) {
      // progressSoftPaywall.value = true;
      return;
    }
    await api.post("/api/v1/roadmap/tasks", {
      task_id: task?.id,
      is_complete: task?.checked,
    });
  } catch (error) {
    console.error(error);
  }
};

const calculateHeight = () => {
  if (content.value) {
    contentHeight.value = isOpen.value ? content.value.scrollHeight : 0;
  }
};

watch(
  () => isOpen.value,
  () => {
    emit("hightChanged");
    calculateHeight();
  }
);

watch(
  () => props.forceOpen,
  async (newValue) => {
    if (newValue) {
      isOpen.value = true;
      await nextTick();
      const activeId = Number(
        Object.entries(appTrackerStore.taskActiveStates).find(
          ([_, v]) => v
        )?.[0]
      );
      if (
        activeId &&
        filteredTask(props.category).some((task) => task.id === activeId)
      ) {
        const el = taskRefs.value[activeId];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    } else {
      isOpen.value = false;
    }
  },
  { immediate: true }
);

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

onMounted(() => {
  calculateHeight();
  window.addEventListener("resize", calculateHeight);

  const resizeObserver = new ResizeObserver(calculateHeight);
  if (content.value) resizeObserver.observe(content.value);

  onUnmounted(() => {
    window.removeEventListener("resize", calculateHeight);
    resizeObserver.disconnect();
  });
});
</script>
