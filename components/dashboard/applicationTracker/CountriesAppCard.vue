<template>
  <div
    class="rounded-[32px] grid grid-cols-1 lg:grid-cols-2 items-center gap-4 pt-6 px-7 pb-7"
    :class="[checkCompletedTask ? 'bg-[#12B76A]' : 'bg-[#F5F5F5]']"
  >
    <div class="flex justify-center items-center">
      <NuxtImg
        src="/images/countries-application.png"
        alt="Application"
        class="w-full h-full max-h-[274px] object-contain"
        :class="{ grayscale: !checkCompletedTask }"
        loading="eager"
      />
    </div>
    <div class="">
      <div class="flex justify-between items-center">
        <h3
          class="text-2xl font-semibold capitalize"
          :class="[checkCompletedTask ? 'text-white' : 'text-[#181D27]']"
        >
          Application
        </h3>
        <p
          class="rounded-2xl px-3 font-semibold py-1 text-[#414651] text-sm"
          :class="[checkCompletedTask ? 'bg-[#F5F5F5]' : 'bg-[#ebebeb]']"
        >
          <span v-if="taskProgress !== '100%'">
            {{ checkCompletedTask }} /
            {{ totalTasks }}
          </span>
          <span v-else> Completed! </span>
        </p>
      </div>
      <div
        class="mt-5 mb-6"
        :class="[checkCompletedTask ? 'text-white' : 'text-[#717680]']"
      >
        <p class="truncate-paragraph">
          After submitting, send final transcripts, confirm enrolment with
          deposits if accepted, handle visa requirements for international
          students, and prepare for university while tracking all deadlines.
        </p>
      </div>
      <div
        v-if="checkCompletedTask !== 0 && checkCompletedTask !== totalTasks"
        class="flex justify-between items-center gap-3 mb-7"
      >
        <div class="w-full bg-white rounded-full h-4">
          <div
            class="bg-[#039855] h-full rounded-full transition-all ease-in-out duration-300"
            :style="{ width: taskProgress }"
          ></div>
        </div>
        <IconTabSophie class="invert" />
      </div>
      <button
        @click="emit('updateStep')"
        class="bg-white text-[#1570EF] font-semibold border border-gray-300 rounded-xl px-5 py-3 w-full"
        :class="[
          checkCompletedTask
            ? 'shadow-[0px_1px_2px_0px_#0A0D120D]'
            : 'shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]',
        ]"
      >
        <span class="text-[#039855]" v-if="checkCompletedTask === totalTasks"
          >Review</span
        >
        <span v-else-if="checkCompletedTask > 0" class="text-[#039855]"
          >Continue</span
        >
        <span v-else>Jump to Application</span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import type { Application } from "~/types/dashboard";

const emit = defineEmits(["updateStep"]);

const appTrackerStore = useAppTrackerStore();

const taskProgress = ref<string>("");
const totalTasks = ref<number>(0);

const checkCompletedTask = computed(() => {
  let total = 0;
  let count = 0;
  appTrackerStore.applicationList.forEach((item: Application) => {
    total += item.tasks.length || 0;
    count += item.tasks.filter((task) => task.checked === true).length || 0;
  });
  taskProgress.value = `${(count / total) * 100}%`;
  totalTasks.value = total;
  return count;
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
