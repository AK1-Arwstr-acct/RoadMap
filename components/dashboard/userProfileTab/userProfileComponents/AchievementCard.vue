<template>
  <div
    class="flex items-center gap-6 border border-[#D5D7DA] rounded-2xl bg-[#FFFFFF] px-6 py-3"
  >
    <div>
      <img
        src="/images/career.png"
        alt="Achievements career image"
        class="object-contain"
      />
    </div>
    <div class="w-full py-4">
      <div class="flex justify-between mb-[15px]">
        <h4 class="text-xl text-[#181D27] font-semibold capitalize">
          {{
            category?.includes("extracurricular")
              ? "extracurricular actiivity"
              : category
          }}
        </h4>
        <span class="text-[18px] font-medium text-[#A4A7AE]">{{
          `${completedTasksNumber} / ${totalTasksNumber}`
        }}</span>
      </div>
      <div class="w-full bg-[#F5F5F5] rounded-xl h-4 overflow-hidden">
        <div
          class="bg-[#FDB022] h-full rounded-xl"
          :style="{
            width: checkCompletedTask,
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Application } from "~/types/dashboard";

const props = defineProps({
  category: {
    type: String,
    default: "",
  },
  application: {
    type: Object as PropType<Application | Application[]>,
    default: () => {},
  },
});

const totalTasksNumber = ref<number>(0);
const completedTasksNumber = ref<number>(0);

const checkCompletedTask = computed(() => {
  if (Array.isArray(props.application)) {
    const filteredApplication = props.application?.find((app) =>
      app.country_title?.includes(props.category)
    ) as Application | undefined;
    completedTasksNumber.value =
      filteredApplication?.tasks.filter((task) => task.checked === true)
        .length || 0;
    totalTasksNumber.value = filteredApplication?.tasks.length || 0;
    let taskProgress =
      (completedTasksNumber.value / (totalTasksNumber.value ?? 1)) * 100;
    return `${taskProgress.toFixed(0)}%`;
  } else {
    const filteredApplication = props.application?.tasks.filter((task) =>
      task.category.title.includes(props.category)
    );
    completedTasksNumber.value =
      filteredApplication.filter((task) => task.checked === true).length || 0;
    totalTasksNumber.value = filteredApplication.length;
    let taskProgress =
      (completedTasksNumber.value / (totalTasksNumber.value ?? 1)) * 100;
    return `${taskProgress.toFixed(0)}%`;
  }
});
</script>
