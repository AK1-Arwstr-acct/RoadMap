<template>
  <section>
    <div
      @click="isOpen = !isOpen"
      class="py-4 px-5 border-[1.5px] border-gray-200 rounded-2xl shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A] bg-[#FFFEFC] flex items-center gap-2 cursor-pointer"
    >
      <IconChevronDown
        stroke="#717680"
        class="transform transition-all ease-in-out duration-300"
        :class="{ '-rotate-90': !isOpen }"
      />
      <p class="text-[#111827] text-xl font-semibold flex-1 capitalize">
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
        class="py-0.5 px-3 rounded-full font-semibold tracking-wider"
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
        />
      </Transition>
    </div>
    <!-- tasks -->
    <div
      ref="content"
      :style="{ maxHeight: isOpen ? contentHeight + 'px' : '0px' }"
      class="overflow-hidden transition-all ease-in-out duration-500"
    >
      <div
        v-for="(task, idx) in filteredTask(category)"
        :key="idx"
        @click.prevent="handelTaskDetail(task)"
      >
        <label
          :for="`task-${task.id}`"
          class="mt-6 flex items-center gap-6 size-full rounded-2xl cursor-pointer p-4 transition-all ease-in-out duration-200"
          :class="[
            appTrackerStore.taskActiveStates[task.id]
              ? 'border-2 border-[#2E90FA] bg-[#F5FAFF]'
              : 'border-[1.5px] border-gray-200 bg-[#FFFFFF]',
          ]"
        >
          <input
            :id="`task-${task.id}`"
            type="checkbox"
            name="countries"
            :checked="task.checked"
            class="absolute top-3 right-3 appearance-none"
          />
          <div class="size-[90px]">
            <img
              :src="imageSrc"
              alt="task logo"
              class="size-full object-contain"
            />
          </div>
          <div class="flex-1 space-y-2">
            <p
              class="font-medium text-sm py-0.5 px-2.5 rounded-full capitalize w-fit"
              :class="[
                category === 'country'
                  ? categoryClass(task.category.title)
                  : categoryClass(category),
              ]"
            >
              <span v-if="category !== 'country'">
                {{ category.includes("extracurricular") ? "EC" : category }}
              </span>
              <span v-else>
                {{ task.category.title }}
              </span>
            </p>
            <p class="text-xl text-[#414651] font-semibold">
              {{ task.title }}
            </p>
            <div class="flex items-center gap-1.5 text-[#414651] text-sm">
              <IconClock />
              <span> {{ task.estimated_time }} </span>
            </div>
          </div>
          <div
            class="size-6 rounded-full border-[1.5px] flex justify-center items-center"
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
  </section>
</template>
<script setup lang="ts">
import type { Application, Task } from "~/types/dashboard";
import useAppTrackerStore from "~/stores/AppTrackerStore";

const emit = defineEmits(["openTaskDetail"]);

const appTrackerStore = useAppTrackerStore();

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

const isOpen = ref<boolean>(false);
const content = ref<HTMLElement | null>(null);
const contentHeight = ref(0);

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
  emit("openTaskDetail", task);
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

const calculateHeight = () => {
  if (content.value) {
    contentHeight.value = isOpen.value ? content.value.scrollHeight : 0;
  }
};

watch(() => isOpen.value, calculateHeight);

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
