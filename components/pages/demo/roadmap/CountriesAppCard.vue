<template>
  <div
    class="rounded-[32px] grid grid-cols-1 lg:grid-cols-2 items-center gap-4 pt-6 px-6 md:px-7 pb-7"
    :class="[checkCompletedTask ? 'bg-[#12B76A]' : 'bg-[#F5F5F5]']"
  >
    <div class="flex justify-center items-center">
      <img
        src="/images/countries-application.png"
        :alt="t('roadmap_page.application')"
        class="w-full h-full max-h-[274px] object-contain"
        :class="{ grayscale: !checkCompletedTask }"
        loading="eager"
      />
    </div>
    <div class="">
      <div class="flex justify-between items-center">
        <p
          class="text-2xl font-semibold capitalize"
          :class="[checkCompletedTask ? 'text-white' : 'text-[#181D27]']"
        >
          {{ $t("roadmap_page.application") }}
        </p>
        <p
          class="rounded-2xl px-3 font-semibold py-1 text-[#414651] text-sm text-nowrap"
          :class="[checkCompletedTask ? 'bg-[#F5F5F5]' : 'bg-[#ebebeb]']"
        >
          <span v-if="taskProgress !== '100%'">
            {{ checkCompletedTask }} /
            {{ totalTasks }}
          </span>
          <span v-else> {{ $t("roadmap_page.completed") }} </span>
        </p>
      </div>
      <div
        class="mt-5 mb-6"
        :class="[checkCompletedTask ? 'text-white' : 'text-[#717680]']"
      >
        <p class="truncate-paragraph">
          {{ $t("roadmap_page.countries_app_detail") }}
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
      <div
        @click="navigation"
        class="bg-white text-[#1570EF] text-center font-semibold border border-gray-300 rounded-xl px-5 py-3 w-full cursor-pointer"
        :class="[
          checkCompletedTask
            ? 'shadow-[0px_1px_2px_0px_#0A0D120D]'
            : 'shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]',
        ]"
      >
        <span class="text-[#039855]" v-if="checkCompletedTask === totalTasks">{{
          $t("roadmap_page.review")
        }}</span>
        <span v-else-if="checkCompletedTask > 0" class="text-[#039855]">{{
          $t("roadmap_page.continue")
        }}</span>
        <span v-else>{{ $t("roadmap_page.jump_to_application") }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import type { Application } from "~/types/dashboard";

const emit = defineEmits(["updateStep"]);

const localePath = useLocalePath();
const appTrackerStore = useAppTrackerStore();
const route = useRoute();
const { t } = useI18n();

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

const navigation = () => {
  emit("updateStep");
};
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
