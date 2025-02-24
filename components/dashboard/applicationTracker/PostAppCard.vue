<template>
  <div
    class="rounded-[32px] grid grid-cols-1 lg:grid-cols-2 items-center gap-4 pt-6 px-7 pb-7"
    :class="[checkCompletedTask ? 'bg-[#FD853A]' : 'bg-[#F5F5F5]']"
  >
    <div class="flex justify-center items-center">
      <img
        src="/public/images/post-application.png"
        alt="Post - Application"
        class="w-full h-full max-h-[274px] object-contain"
      />
    </div>
    <div class="">
      <div class="flex justify-between items-center">
        <h3
          class="text-2xl font-semibold capitalize"
          :class="[checkCompletedTask ? 'text-white' : 'text-[#181D27]']"
        >
          Post - Application
        </h3>
        <p
          class="rounded-2xl px-3 font-semibold py-1 text-[#414651] text-sm"
          :class="[checkCompletedTask ? 'bg-[#F5F5F5]' : 'bg-[#ebebeb]']"
        >
          <span v-if="taskProgress !== '100%'">
            {{ checkCompletedTask }} /
            {{ appTrackerStore.postApplication?.tasks?.length }}
          </span>
          <span v-else> Completed! </span>
        </p>
      </div>
      <div
        class="mt-5 mb-6"
        :class="[checkCompletedTask ? 'text-white' : 'text-[#717680]']"
      >
        <p class="truncate-paragraph">
          {{ appTrackerStore.postApplication?.description }}
        </p>
      </div>
      <div
        v-if="
          checkCompletedTask !== 0 &&
          checkCompletedTask !== appTrackerStore.postApplication?.tasks?.length
        "
        class="flex justify-between items-center gap-3 mb-7"
      >
        <div class="w-full bg-white rounded-full h-4">
          <div
            class="bg-[#EC4A0A] h-full rounded-full transition-all ease-in-out duration-300"
            :style="{ width: taskProgress }"
          ></div>
        </div>
        <IconTabSophie class="invert" />
      </div>
      <button
        @click="emit('updateStep')"
        class="bg-white text-[#1570EF] font-semibold border border-white rounded-xl px-5 py-3 w-full"
      >
        <span
          class="text-[#DC6803]"
          v-if="
            checkCompletedTask ===
            appTrackerStore.postApplication?.tasks?.length
          "
          >Review</span
        >
        <span v-else-if="checkCompletedTask > 0" class="text-[#DC6803]"
          >Continue</span
        >
        <span v-else>Jump to Post - Application</span>
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
    appTrackerStore.postApplication?.tasks?.filter(
      (task) => task.checked === true
    ).length || 0;
  taskProgress.value = `${
    (completedTasks / (appTrackerStore.postApplication?.tasks?.length ?? 1)) *
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
