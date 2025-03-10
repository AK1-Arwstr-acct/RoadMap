<template>
  <div
    class="bg-[#2E90FA] rounded-[32px] grid grid-cols-1 lg:grid-cols-2 items-center gap-4 pt-6 px-7 pb-7"
  >
    <div class="flex justify-center items-center">
      <NuxtImg
        src="/images/pre-application.png"
        alt="Pre - Application"
        class="w-full h-full max-h-[274px] object-contain"
        preload
      />
    </div>
    <div class="">
      <div class="flex justify-between items-center">
        <h3 class="text-white text-2xl font-semibold capitalize">
          Pre - Application
        </h3>
        <p
          class="bg-[#F5F5F5] rounded-2xl text-sm px-3 font-semibold py-1 text-[#414651]"
        >
          <span v-if="taskProgress !== '100%'">
            {{ checkCompletedTask }} /
            {{ appTrackerStore.preApplication?.tasks?.length }}
          </span>
          <span v-else> Completed! </span>
        </p>
      </div>
      <div class="text-white mt-5 mb-6">
        <p class="truncate-paragraph">
          {{ appTrackerStore.preApplication?.description }}
        </p>
      </div>
      <div
        v-if="
          checkCompletedTask !== 0 &&
          checkCompletedTask !== appTrackerStore.preApplication?.tasks?.length
        "
        class="flex justify-between items-center gap-3 mb-7"
      >
        <div class="w-full bg-white rounded-full h-4">
          <div
            class="bg-[#1570EF] h-full rounded-full transition-all ease-in-out duration-300"
            :style="{ width: taskProgress }"
          ></div>
        </div>
        <IconTabSophie class="invert" />
      </div>
      <button
        @click="emit('updateStep')"
        class="bg-white text-[#1570EF] font-semibold border border-gray-300 rounded-xl shadow-[0px_1px_2px_0px_#0A0D120D] px-5 py-3 w-full"
      >
        <span v-if="checkCompletedTask === 0">Start here</span>
        <span
          v-else-if="
            checkCompletedTask === appTrackerStore.preApplication?.tasks?.length
          "
          >Review</span
        >
        <span v-else>Continue</span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";

const emit = defineEmits(["updateStep"]);

const appTrackerStore = useAppTrackerStore();

const taskProgress = ref<string>("");

const checkCompletedTask = computed(() => {
  const completedTasks =
    appTrackerStore.preApplication?.tasks?.filter(
      (task) => task.checked === true
    ).length || 0;
  taskProgress.value = `${
    (completedTasks / (appTrackerStore.preApplication?.tasks?.length ?? 1)) *
    100
  }%`;
  return completedTasks;
});
</script>
<style scoped>
.truncate-paragraph {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
