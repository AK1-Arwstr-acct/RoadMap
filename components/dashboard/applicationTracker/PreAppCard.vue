<template>
  <div
    class="bg-[#2E90FABF]/75 rounded-[32px] grid grid-cols-1 lg:grid-cols-2 items-center gap-4 pt-6 px-7 pb-7"
  >
    <div class="flex justify-center items-center">
      <img
        src="/public/images/pre-application.png"
        alt="Pre - Application"
        class="w-full h-full max-h-[274px] object-contain"
      />
    </div>
    <div class="">
      <div class="flex justify-between items-center">
        <h3 class="text-white text-3xl font-semibold capitalize">
          Pre - Application
        </h3>
        <p
          class="bg-[#F5F5F5] rounded-2xl px-3 font-semibold py-1 text-[#414651]"
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
        v-if="checkCompletedTask > 0"
        class="flex justify-between items-center gap-3 mb-7"
      >
        <div class="w-full bg-white rounded-full h-4">
          <div
            class="bg-[#1570EFD9]/85 h-full rounded-full transition-all ease-in-out duration-300"
            :style="{ width: taskProgress }"
          ></div>
        </div>
        <IconTrophy />
      </div>
      <button
        @click="emit('updateStep')"
        class="bg-white text-[#1570EF] font-semibold border border-white rounded-xl px-5 py-3 w-full"
      >
        <span
          v-if="
            checkCompletedTask === appTrackerStore.preApplication?.tasks?.length
          "
          >Review</span
        >
        <span v-else>Start here</span>
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
