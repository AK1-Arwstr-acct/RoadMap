<template>
  <div class="h-fit w-full flex flex-col gap-10">
    <div class="">
      <h1 class="text-2xl md:text-[32px] font-semibold text-[#181D27]">
        My College List
      </h1>
      <p class="text-[#535862] mt-2 text-sm md:text-base">
        Keep track of all the schools you're interested in. Compare programs,
        deadlines, and requirements in one place.
      </p>
    </div>
    <div v-if="appStore.authenticatedUser" class="flex-1">
      <EmptyChecklist v-if="dashboardStore.userSelectedSchoolsList.length === 0 && !dashboardStore.isSchoolsLoading" />
      <div v-else>
        <RecommendedSchoolSkeleton v-if="dashboardStore.isSchoolsLoading" />
        <div v-else>
          <VueDraggable
            ref="el"
            @start="onStartReorder"
            v-model="dashboardStore.userSelectedSchoolsList"
            class="flex flex-col gap-6"
          >
            <div
              v-for="(school, idx) in dashboardStore.userSelectedSchoolsList"
              :key="school.id"
              class="flex items-center gap-2"
            >
              <div
                :class="isDraggingIdx === idx ? 'cursor-grabbing' : 'cursor-grab'"
                @mousedown="isDraggingIdx = idx"
                @mouseup="isDraggingIdx = null"
                @mouseleave="isDraggingIdx = null"
              >
                <IconDragingDots />
              </div>
              <div class="flex-1">
                <SchoolCard
                  :sequenceId="school.id"
                  :checkListData="checklistSchoolData(school)"
                  :program="school.program"
                  @openDetail="openDetail"
                />
              </div>
            </div>
          </VueDraggable>
          <div
            v-if="(dashboardStore.checklistPagination?.last_page ?? 0) > 1"
            class="flex justify-center mt-6"
          >
            <BasePagination
              :currentPage="dashboardStore.checklistPagination?.currentPage"
              :lastPage="dashboardStore.checklistPagination?.last_page"
              @paginate="(pageNum) => getChecklist(pageNum)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex-1">
      <VueDraggable
        ref="el"
        @start="onStartReorder"
        v-model="dashboardStore.userSelectedSchoolsListPublic"
        v-if="dashboardStore.userSelectedSchoolsListPublic.length > 0"
        class="flex flex-col gap-6"
      >
        <div
          v-for="(school, idx) in dashboardStore.userSelectedSchoolsListPublic"
          :key="school.id"
          class="flex items-center gap-2"
        >
          <div
            :class="isDraggingIdx === idx ? 'cursor-grabbing' : 'cursor-grab'"
            @mousedown="isDraggingIdx = idx"
            @mouseup="isDraggingIdx = null"
            @mouseleave="isDraggingIdx = null"
          >
            <IconDragingDots />
          </div>
          <div class="flex-1">
            <SchoolCard :program="school" @openDetail="openDetail" />
          </div>
        </div>
      </VueDraggable>
      <EmptyChecklist v-else />
    </div>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import useAppStore from "~/stores/AppStore";
import type { checklistProgram, SchoolDetail } from "~/types/program";
import { VueDraggable } from "vue-draggable-plus";

const dashboardStore = useDashboardStore();
const appStore = useAppStore();

const emit = defineEmits(["openDetail"]);

const isDraggingIdx = ref<number | null>(null);
const el = ref<HTMLElement | null>(null);

const openDetail = async (item: SchoolDetail) => {
  emit("openDetail", item);
};

const onStartReorder = () => {
  if (!appStore.authenticatedUser) {
    appStore.featureSoftPaywall = true;
  }
};

const checklistSchoolData = (school: checklistProgram) => {
  const { program, ...rest } = school;
  return rest;
};

const getChecklist = (pageNo: number = 1) => {
  dashboardStore.getChecklistProgram(pageNo);
};
</script>
