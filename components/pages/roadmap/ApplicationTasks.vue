<template>
  <section class="">
    <div class="mb-8">
      <h1 class="text-[#181D27] font-semibold text-2xl mb-4 capitalize">
        {{
          Array.isArray(application)
            ? "Application"
            : application?.title?.toLocaleLowerCase() || "Application"
        }}
      </h1>
      <p class="text-[#717680] font-medium mb-6">
        {{
          Array.isArray(application)
            ? countriesDescription
            : application?.description || ""
        }}
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
        <span class="text-[#414651] font-medium ml-3 mr-6 text-nowrap">
          {{ checkCompletedTask }} complete
        </span>
        <span
          class="py-0.5 px-2.5 bg-[#EFF8FF] text-[#175CD3] rounded-full text-sm font-medium text-nowrap"
        >
          {{
            Array.isArray(application)
              ? countriesTaskLength
              : application?.tasks?.length || "0"
          }}
          Steps
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
            <NuxtLinkLocale to="/pricing">
              <span class="text-[#1570EF] cursor-pointer">
                Contact our counselors
              </span>
            </NuxtLinkLocale>
            <span>
              to see how we can create a new plan just for you. You’re still in
              the game!
            </span>
          </p>
        </div>
        <div @click="missDeadline = false" class="cursor-pointer">
          <IconCross fill="#717680" />
        </div>
      </div>
    </Transition>
    <!--  -->
    <div class="flex flex-col gap-6">
      <div v-for="(category, index) in categoryList" :key="index">
        <AppCategoryTask
          v-if="Array.isArray(application) && filterByCountry(category)"
          :application="filterByCountry(category)[0]"
          category="country"
          @openTaskDetail="openDetail"
        />
        <AppCategoryTask
          v-else-if="!Array.isArray(application)"
          :application="application"
          :category="category || ''"
          @openTaskDetail="openDetail"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { Application, Task } from "~/types/dashboard";

const emit = defineEmits(["openTaskDetail"]);

const props = defineProps({
  application: {
    type: Object as PropType<Application | Application[]>,
    default: () => {},
  },
});

const missDeadline = ref<boolean>(true);
const countriesTaskLength = ref<number>(0);
const countriesDescription =
  "Complete your application package by writing an engaging personal statement, gathering strong recommendations and transcripts, preparing financial aid materials if needed, and submitting everything before deadlines.";

const checkCompletedTask = computed(() => {
  if (Array.isArray(props.application)) {
    let totalTasks = 0;
    let checkedTasks = 0;
    props.application.forEach((app) => {
      totalTasks += app.tasks?.length;
      checkedTasks += app.tasks?.filter((item) => item.checked === true).length;
    });
    countriesTaskLength.value = totalTasks;
    let taskProgress = (checkedTasks / totalTasks) * 100;
    return `${taskProgress.toFixed(0)}%`;
  } else {
    if (!props.application?.tasks) return "0%";
    const completedTasks =
      props.application.tasks.filter((task) => task.checked === true).length ||
      0;
    let taskProgress =
      (completedTasks / (props.application.tasks.length || 1)) * 100;
    return `${taskProgress.toFixed(0)}%`;
  }
});

const categoryList = computed(() => {
  if (Array.isArray(props.application)) {
    const countries = props.application.map((item) => item.country_title);
    return [...new Set(countries)];
  } else if (props.application?.tasks) {
    const categories = props.application.tasks.map(
      (item) => item.category?.title || ""
    );
    return [...new Set(categories)];
  }
  return [];
});

const openDetail = (task: Task) => {
  emit("openTaskDetail", task);
};

const filterByCountry = (name: string | null): Application[] => {
  if (Array.isArray(props.application)) {
    return (
      props.application.filter((item) =>
        item.country_title?.includes(name || "")
      ) || []
    );
  }
  return [];
};
</script>
