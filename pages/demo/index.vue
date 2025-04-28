<template>
  <div class="h-dvh flex relative overflow-hidden">
    <Sidebar :currentTab="currentTab" @updateTab="updateTab" />
    <div class="flex-1 flex flex-col">
      <DashboardNav @updateTab="updateTab" />
      <div class="flex-1 w-screen lg:w-full overflow-hidden">
        <div
          class="size-full"
          :class="{
            'overflow-y-auto custom-scrollbar': currentTab !== 'Roadmap',
          }"
        >
          <div
            class="h-full w-full"
            :class="{
              'max-w-[1150px] mx-auto':
                currentTab !== 'sophie' &&
                currentTab !== 'Roadmap' &&
                currentTab !== 'user_profile',
            }"
          >
            <Transition name="fade">
              <TrackerInformations v-if="currentTab === 'Roadmap'" />
              <SchoolsList v-else-if="currentTab === 'schools_list'" />
            </Transition>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="currentTab !== 'sophie'"
      @click="openSophieModal = !openSophieModal"
      class="size-14 absolute bottom-5 right-5 rounded-2xl bg-[#ED77FF] flex justify-center items-center shadow-md cursor-pointer"
    >
      <IconTabSophie class="text-white" width="32" height="32" />
    </div>
    <!-- sophie modal -->
    <Transition name="fade">
      <div
        v-if="openSophieModal"
        class="fixed bg-black/50 inset-0 z-50 isolate backdrop-blur py-[60px] px-[68px] flex justify-center items-center"
      >
        <ChatWithSophie
          :isModal="true"
          @openSophieModal="openSophieModal = false"
        />
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";
import type { TabName } from "~/types/dashboard";
import useAppStore from "~/stores/AppStore";
import useDashboardStore from "~/stores/dashboardStore";
import {
  preApplication,
  postApplication,
  applicationList,
  schoolsList,
  pagination,
  programListOptions,
  locationOptions,
  budgetList,
  coursePreferenceOptions,
} from "~/utils/demoData";

const appTrackerStore = useAppTrackerStore();
const dashboardStore = useDashboardStore();

const currentTab = ref<TabName>("schools_list");
const openSophieModal = ref<boolean>(false);

const updateTab = (value: TabName) => {
  currentTab.value = value;
};

watch(
  () => appTrackerStore.ongoingTrack,
  () => {
    currentTab.value = "Roadmap";
  }
);

onBeforeMount(async () => {
  dashboardStore.recommendedSchoolsPagination = pagination;
  dashboardStore.totalSchool = schoolsList.length;
  dashboardStore.programListOptions = programListOptions;
  dashboardStore.locationOptions = locationOptions;
  dashboardStore.budgetList = budgetList;
  dashboardStore.coursePreferenceOptions = coursePreferenceOptions;
  appTrackerStore.preApplication = preApplication;
  appTrackerStore.postApplication = postApplication;
  appTrackerStore.applicationList = applicationList;
});

onBeforeUnmount(() => {
  dashboardStore.schoolsList = [];
  dashboardStore.recommendedSchoolsPagination = null;
  dashboardStore.totalSchool = null;
  dashboardStore.locationOptions = [];
  dashboardStore.budgetList = [];
  dashboardStore.coursePreferenceOptions = [];
  dashboardStore.selectedPublicMajors = [];
  appTrackerStore.preApplication = undefined;
  appTrackerStore.postApplication = undefined;
  appTrackerStore.applicationList = [];
});
</script>
