<template>
  <div
    class="w-screen md:w-auto md:min-w-[380px] h-full bg-white flex flex-col border-l-[1.5px] border-gray-200"
  >
    <div
      class="px-6 pt-6 mb-6 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar"
    >
      <div class="flex justify-between items-start gap-3">
        <p class="text-[#414651] font-semibold text-xl">
          {{ taskDetail?.title }}
        </p>
        <div @click="emit('clearDetails')" class="cursor-pointer">
          <IconCross fill="#414651" width="20" height="20" />
        </div>
      </div>
      <NuxtLinkLocale
        v-if="
          taskDetail?.title
            .toLocaleLowerCase()
            .includes('write personal statement') ||
          taskDetail?.title
            .toLocaleLowerCase()
            .includes('write supplemental essays')
        "
        :to="'/ai-essay'"
        class="rounded-xl bg-[#2E90FA] py-3 px-4 flex justify-between items-center gap-2 shadow-[0px_0px_0px_4px_#EFF8FF] cursor-pointer"
      >
        <div class="font-semibold text-white flex items-center gap-2">
          <IconTabSophie />
          Sophie AI Essay Editor
        </div>
        <IconArrowRight fill="#ffffff" width="24" height="24" />
      </NuxtLinkLocale>
      <div class="flex flex-col gap-6">
        <div
          v-for="(resource, idx) in taskDetail.resources"
          :key="idx"
          @click="handelResources(resource.link)"
          class="border-[1.5px] border-gray-200 rounded-2xl py-3 pl-4 pr-[27px] flex items-center gap-4 cursor-pointer"
          :class="{ hidden: !resource.link }"
        >
          <p class="text-[#414651] font-semibold flex-1">{{ resource.text }}</p>
          <IconLink />
        </div>
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
    <div class="border-t-[1.5px] border-gray-200 p-3 md:p-6">
      <button
        @click="handelClick"
        class="border border-[#1570EF] mb-4 rounded-lg shadow-[0px_1px_2px_0px_#0A0D120D] py-2.5 px-4 flex justify-center items-center gap-2 text-sm font-semibold w-full"
        :class="[
          taskDetail?.checked
            ? 'bg-[#EFF8FF] text-[#175CD3]'
            : 'bg-[#1570EF] text-white',
        ]"
      >
        <span>
          Mark as {{ taskDetail?.checked ? "Incomplete" : "Complete" }}
        </span>
        <IconTick v-if="!taskDetail?.checked" stroke="#ffffff" />
      </button>
      <NuxtLinkLocale :to="'/pricing'">
        <button
          class="border border-gray-300 rounded-lg shadow-[0px_1px_2px_0px_#0A0D120D] py-2.5 px-4 text-sm text-[#414651] font-semibold w-full text-center"
        >
          {{ taskDetail.button_text }}
        </button>
      </NuxtLinkLocale>
    </div>
  </div>

  <!-- paywall -->

  <Transition name="fade">
    <div
      v-if="progressSoftPaywall"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        class="bg-white p-6 flex flex-col gap-8 rounded-xl w-full max-w-[400px]"
      >
        <div class="flex flex-col items-center">
          <IconTabSophie width="48" height="48" class="text-[#ED77FF] mb-5" />
          <p class="text-[#181D27] text-lg font-semibold text-center">
            Sign up to track your progress!
          </p>
          <p class="text-[#535862] text-sm text-center mt-2">
            Mark tasks as complete and keep track of your journey toward your
            dream school. Sign up now to save your progress!
          </p>
        </div>
        <div class="flex gap-3">
          <button
            @click="progressSoftPaywall = false"
            class="border border-gray-200 py-2.5 w-full rounded-lg text-[#414651] font-semibold"
          >
            Cancel
          </button>
          <NuxtLinkLocale
            :to="'/signup'"
            class="border border-[#1570EF] text-center bg-[#1570EF] py-2.5 w-full rounded-lg text-white font-semibold"
          >
            Sign up for free
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </Transition>
  <Transition name="fade">
    <div
      v-if="resourcesSoftPaywall"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-5"
    >
      <div
        class="bg-white p-6 flex flex-col gap-8 rounded-xl w-full max-w-[400px]"
      >
        <div class="flex flex-col items-center">
          <IconTabSophie width="48" height="48" class="text-[#ED77FF] mb-5" />
          <p class="text-[#181D27] text-lg font-semibold text-center">
            Sign up to access all resources
          </p>
          <p class="text-[#535862] text-sm text-center mt-2">
            Save your progress, track your journey, and unlock all the resources
            you need to reach your dream school!
          </p>
        </div>
        <div class="flex gap-3">
          <button
            @click="resourcesSoftPaywall = false"
            class="border border-gray-200 py-2.5 w-full rounded-lg text-[#414651] font-semibold"
          >
            Cancel
          </button>
          <NuxtLinkLocale
            :to="'/signup'"
            class="border border-[#1570EF] text-center bg-[#1570EF] py-2.5 w-full rounded-lg text-white font-semibold"
          >
            Sign up for free
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import type { Task } from "~/types/dashboard";
import useAppTrackerStore from "~/stores/AppTrackerStore";

const emit = defineEmits(["clearDetails"]);

const appTrackerStore = useAppTrackerStore();

const props = defineProps({
  taskDetail: {
    type: Object as PropType<Task> | null,
    default: () => {},
  },
});

const progressSoftPaywall = ref<boolean>(false);
const resourcesSoftPaywall = ref<boolean>(false);

const options = {
  html: true,
};

const handelClick = async () => {
  props.taskDetail.checked = !props.taskDetail?.checked;
};

const handelResources = (link: string) => {
  window.open(link, "_blank");
};

onUnmounted(() => {
  emit("clearDetails");
  Object.keys(appTrackerStore.taskActiveStates).forEach((key) => {
    appTrackerStore.taskActiveStates[Number(key)] = false;
  });
});
</script>
