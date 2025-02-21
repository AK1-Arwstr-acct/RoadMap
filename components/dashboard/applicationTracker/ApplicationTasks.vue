<template>
  <section>
    <div class="">
      <div class="mb-8">
        <h1 class="text-[#181D27] font-semibold text-2xl mb-4">
          {{ application.title }}
        </h1>
        <p class="text-[#717680] font-medium mb-6">
          {{ application.description }}
        </p>
        <div class="flex items-center">
          <div class="bg-[#E9EAEB] h-2 w-[354px] rounded-full">
            <div
              class="bg-[#1570EF] h-full rounded-full transition-all ease-in-out duration-300"
              :style="{
                width: checkCompletedTask === '0%' ? '3%' : checkCompletedTask,
              }"
            />
          </div>
          <span class="text-[#414651] font-medium ml-3 mr-6">
            {{ checkCompletedTask }} complete
          </span>
          <span
            class="py-0.5 px-2.5 bg-[#EFF8FF] text-[#175CD3] rounded-full text-sm font-medium"
          >
            {{ application.tasks.length || 0 }} Steps
          </span>
        </div>
      </div>
      <Transition name="fade">
        <div
          v-if="missDeadline"
          class="mb-8 bg-[#D1E9FF66]/40 py-3.5 px-4 rounded-lg flex gap-2 items-start"
        >
          <IconInfoCircle
            width="20"
            height="20"
            stroke="#1570EF"
            strokeWidth="2"
            class="transform rotate-[90]"
          />
          <div class="flex-1 text-[#181D27]">
            <p class="font-semibold mb-1.5">Missed the Deadline? No Worries!</p>
            <p class="font-medium text-sm">
              <span class="text-[#1570EF]"> Contact our counselors </span>
              <span>
                to see how we can create a new plan just for you. You’re still
                in the game!
              </span>
            </p>
          </div>
          <div @click="missDeadline = false" class="cursor-pointer">
            <IconCross fill="#717680" />
          </div>
        </div>
      </Transition>
      <!--  -->
      <div class="space-y-6">
        <div v-for="(category, index) in categoryList" :key="index">
          <AppCategoryTask
            :application="application"
            :category="category"
            @openTaskDetail="openDetail"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { Application, Task } from "~/types/dashboard";

const props = defineProps({
  application: {
    type: Object as PropType<Application>,
    default: () => {},
  },
});

const missDeadline = ref<boolean>(true);

const checkCompletedTask = computed(() => {
  const completedTasks =
    props.application.tasks?.filter((task) => task.checked === true).length ||
    0;
  let taskProgress =
    (completedTasks / (props.application.tasks?.length ?? 1)) * 100;
  return `${taskProgress.toFixed(0)}%`;
});

const categoryList = computed(() => {
  const categories = props.application.tasks.map((item) => item.category.title);
  return [...new Set(categories)];
});

const openDetail = (task: Task) => {
  // open side modal
};
</script>
