<template>
  <div
    class="flex items-center gap-6 border-[1.5px] border-gray-200 rounded-2xl bg-[#FFFFFF] px-6 py-3"
    :class="[
      isOngoingBehaviour
        ? 'shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]'
        : '',
    ]"
  >
    <div
      :class="[isOngoingBehaviour ? 'min-w-[118px] w-[118px]' : 'size-[90px]']"
    >
      <NuxtImg
        :src="imageSrc"
        alt="Achievements career image"
        class="object-contain size-full"
        loading="eager"
        preload
      />
    </div>
    <div class="w-full py-4">
      <div
        class="flex justify-between"
        :class="[isOngoingBehaviour ? 'mb-2' : 'mb-[15px]']"
      >
        <h4 class="text-xl text-[#181D27] font-semibold capitalize">
          {{
            category?.includes("extracurricular")
              ? "extracurricular activity"
              : category
          }}
        </h4>
        <span
          class="text-[18px] font-medium"
          :class="[isOngoingBehaviour ? 'text-[#535862]' : 'text-[#A4A7AE]']"
          >{{ `${completedTasksNumber} / ${totalTasksNumber}` }}</span
        >
      </div>
      <div
        class="flex items-center justify-between gap-3"
        :class="{ 'mb-5': isOngoingBehaviour }"
      >
        <div
          class="w-full bg-[#F5F5F5] rounded-xl overflow-hidden"
          :class="[isOngoingBehaviour ? 'h-2.5' : 'h-4']"
        >
          <div
            class="bg-[#FDB022] h-full rounded-xl"
            :style="{
              width: checkCompletedTask,
            }"
          />
        </div>
        <p v-if="isOngoingBehaviour" class="text-nowrap w-fit text-[#535862]">
          {{ checkCompletedTask }} complete
        </p>
      </div>
      <div v-if="isOngoingBehaviour" class="flex justify-end">
        <button
          @click="handleContinue"
          class="bg-[#1570EF] border border-[#1570EF] rounded-lg shadow-[0px_1px_2px_0px_#0A0D120D] py-2 px-3.5 text-white text-sm font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import type { Application } from "~/types/dashboard";

const appTrackerStore = useAppTrackerStore();

const props = defineProps({
  category: {
    type: String,
    default: "",
  },
  application: {
    type: Object as PropType<Application | Application[]>,
    default: () => {},
  },
  isOngoingBehaviour: {
    type: Boolean,
    default: false,
  },
});

const totalTasksNumber = ref<number>(0);
const completedTasksNumber = ref<number>(0);

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

const handleContinue = () => {
  const preCategories = appTrackerStore.preApplication?.tasks.map(
    (item) => item.category.title
  );
  const preCategoriesFilter = [...new Set(preCategories)];
  const postCategories = appTrackerStore.postApplication?.tasks.map(
    (item) => item.category.title
  );
  const postCategoriesFilter = [...new Set(postCategories)];
  if (preCategoriesFilter.includes(props.category)) {
    appTrackerStore.categoriesGroup = "pre";
  } else if (postCategoriesFilter.includes(props.category)) {
    appTrackerStore.categoriesGroup = "post";
  } else {
    appTrackerStore.categoriesGroup = "country";
  }

  appTrackerStore.ongoingTrack = !appTrackerStore.ongoingTrack;
};
</script>
