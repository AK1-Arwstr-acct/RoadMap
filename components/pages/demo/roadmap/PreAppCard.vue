<template>
  <div
    class="bg-[#2E90FA] rounded-[32px] grid grid-cols-1 lg:grid-cols-2 items-center gap-4 pt-6 px-6 md:px-7 pb-7"
  >
    <div class="flex justify-center items-center">
      <img
        src="/images/pre-application.png"
        :alt="t('roadmap_page.pre_application')"
        class="w-full h-full max-h-[274px] object-contain"
        loading="eager"
      />
    </div>
    <div class="">
      <div class="flex justify-between items-center">
        <p class="text-white text-2xl font-semibold capitalize">
          {{ $t("roadmap_page.pre_application") }}
        </p>
        <p
          class="bg-[#F5F5F5] rounded-2xl text-sm px-3 font-semibold py-1 text-[#414651] text-nowrap"
        >
          <span v-if="taskProgress !== '100%'">
            {{ checkCompletedTask }} /
            {{ appTrackerStore.preApplication?.tasks?.length }}
          </span>
          <span v-else> {{ $t("roadmap_page.completed") }} </span>
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
      <div
        @click="navigation"
        class="bg-white text-[#1570EF] text-center font-semibold border border-gray-300 rounded-xl shadow-[0px_1px_2px_0px_#0A0D120D] px-5 py-3 w-full cursor-pointer"
      >
        <span v-if="checkCompletedTask === 0">{{
          $t("roadmap_page.start_here")
        }}</span>
        <span
          v-else-if="
            checkCompletedTask === appTrackerStore.preApplication?.tasks?.length
          "
          >{{ $t("roadmap_page.review") }}</span
        >
        <span v-else>{{ $t("roadmap_page.continue") }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";

const emit = defineEmits(["updateStep"]);

const localePath = useLocalePath();
const appTrackerStore = useAppTrackerStore();
const route = useRoute();
const { t } = useI18n();

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
