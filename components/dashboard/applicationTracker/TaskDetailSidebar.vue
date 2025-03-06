<template>
  <div
    class="min-w-[440px] h-full bg-white flex flex-col border-l-[1.5px] border-gray-200"
  >
    <div class="m-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
      <div class="flex justify-between items-start gap-3">
        <h3 class="text-[#414651] font-semibold text-xl">
          {{ taskDetail?.title }}
        </h3>
        <div @click="emit('clearDetails')" class="cursor-pointer">
          <IconCross fill="#414651" width="20" height="20" />
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <a
          v-for="(resource, idx) in taskDetail.resources"
          :key="idx"
          :href="resource.link"
          target="_blank"
          class="border-[1.5px] border-gray-200 rounded-2xl py-3 pl-4 pr-[27px] flex items-center gap-4 cursor-pointer"
          :class="{ hidden: !resource.link }"
        >
          <div class="flex-1 space-y-2">
            <span class="bg-[#EFF8FF] py-0.5 px-2 rounded-full text-[#175CD3]">
              Website / Resources
            </span>
            <p class="text-[#414651] font-semibold">{{ resource.text }}</p>
          </div>
          <IconLink />
        </a>
      </div>
      <div v-if="taskDetail.description" class="text-[#181D27]">
        <ClientOnly>
          <vue-markdown
            :source="taskDetail?.description"
            :options="options"
            class="h-fit flex flex-col gap-4 pb-6"
          />
          <!-- <p>Take this MBTI test to discover your true self!</p>
                    <ul class="flex flex-col gap-1 list-inside list-disc">
                      <li class="-indent-6 pl-6 marker:content-['-']">
                        One of the most important elements of a compelling college
                        application is authentic self-reflection. The ability to
                        understand and convey your true identity shapes every
                        aspect of your application.
                      </li>
                      <li class="-indent-6 pl-6 marker:content-['+']">
                        This test serves as a starting point for deeper
                        self-exploration. Rather than accepting the results at
                        face value, use them as a catalyst to examine who you are
                        and what you aspire to achieve. These insights will not
                        only strengthen your college applications but also guide
                        your broader life journey.
                      </li>
                    </ul> -->
        </ClientOnly>
      </div>
    </div>
    <div class="border-t-[1.5px] border-gray-200 p-6 space-y-4">
      <button
        @click="handelClick"
        class="rounded-lg py-2.5 px-4 flex justify-center items-center gap-2 text-sm font-semibold w-full"
        :class="[
          taskDetail?.checked
            ? 'bg-[#EFF8FF] text-[#175CD3]'
            : 'bg-[#1570EF] text-white',
        ]"
      >
        <span>
          Mark as {{ taskDetail?.checked ? "Incomplete" : "Complete" }}
        </span>
        <IconTick stroke="#ffffff" />
      </button>
      <button
        @click="navigateTo(localePath('/pricing'))"
        class="border-[1.5px] border-gray-200 rounded-lg py-2.5 px-4 text-sm text-[#414651] font-semibold w-full"
      >
        {{ taskDetail.button_text }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Task } from "~/types/dashboard";
import useAppTrackerStore from "~/stores/AppTrackerStore";

const emit = defineEmits(["clearDetails"]);

const appTrackerStore = useAppTrackerStore();
const { api } = useApi();
const localePath = useLocalePath();

const props = defineProps({
  taskDetail: {
    type: Object as PropType<Task> | null,
    default: () => {},
  },
});

const options = {
  html: true,
};

const handelClick = async () => {
  try {
    props.taskDetail.checked = !props.taskDetail?.checked;
    await api.post("/api/v1/roadmap/tasks", {
      task_id: props.taskDetail?.id,
      is_complete: props.taskDetail?.checked,
    });
  } catch (error) {
    console.error(error);
  }
};

onUnmounted(() => {
  Object.keys(appTrackerStore.taskActiveStates).forEach((key) => {
    appTrackerStore.taskActiveStates[Number(key)] = false;
  });
});
</script>
