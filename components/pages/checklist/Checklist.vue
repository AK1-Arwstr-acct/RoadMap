<template>
  <div class="h-fit w-full flex flex-col gap-10">
    <div class="">
      <h1 class="text-2xl md:text-[32px] font-semibold text-[#181D27]">
        {{ $t("checklist_page.my_college_list") }}
      </h1>
      <p class="text-[#535862] mt-2 text-sm md:text-base">
        {{ $t("checklist_page.checklist_detail") }}
      </p>
    </div>
    <div v-if="appStore.authenticatedUser" class="flex-1">
      <EmptyChecklist
        v-if="
          schoolListStore.userSelectedSchoolsList.length === 0 &&
          !schoolListStore.isSchoolsLoading
        "
      />
      <div v-else>
        <RecommendedSchoolSkeleton v-if="schoolListStore.isSchoolsLoading" />
        <div v-else>
          <!-- @start="onStartReorder" -->
          <!-- @change="onStartReorder" -->
          <VueDraggable
            ref="el"
            @end="onEndReorder"
            v-model="schoolListStore.userSelectedSchoolsList"
            class="flex flex-col gap-6"
            ghostClass="parent"
            >
            <!-- dragClass="dragClass" -->
            <div
              v-for="(school, idx) in schoolListStore.userSelectedSchoolsList"
              :key="school.id"
              class="flex items-center gap-2"
            >
              <div
                :class="
                  isDraggingIdx === idx ? 'cursor-grabbing' : 'cursor-grab'
                "
                @mousedown="isDraggingIdx = idx"
                @mouseup="isDraggingIdx = null"
                @mouseleave="isDraggingIdx = null"
              >
                <IconDragingDots />
              </div>
              <div class="flex-1">
                <SchoolCard
                  :checkListData="checklistSchoolData(school)"
                  :program="school.program"
                  @openDetail="openDetail"
                />
              </div>
            </div>
          </VueDraggable>
          <div
            v-if="(schoolListStore.checklistPagination?.last_page ?? 0) > 1"
            class="flex justify-center mt-6"
          >
            <BasePagination
              :currentPage="schoolListStore.checklistPagination?.currentPage"
              :lastPage="schoolListStore.checklistPagination?.last_page"
              @paginate="(pageNum: number) => getChecklist(pageNum)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex-1">
      <VueDraggable
        ref="el"
        @start="onStartReorderPyblic"
        v-model="schoolListStore.userSelectedSchoolsListPublic"
        v-if="schoolListStore.userSelectedSchoolsListPublic.length > 0"
        class="flex flex-col gap-6"
      >
        <div
          v-for="(school, idx) in schoolListStore.userSelectedSchoolsListPublic"
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
import useSchoolListStore from "~/stores/SchoolListStore";
import useAppStore from "~/stores/AppStore";
import type { checklistProgram, SchoolDetail } from "~/types/program";
import { VueDraggable } from "vue-draggable-plus";
import axios from "axios";

const schoolListStore = useSchoolListStore();
const appStore = useAppStore();

const emit = defineEmits(["openDetail"]);
const { api } = useApi();
const { showToast } = useToast();

const isDraggingIdx = ref<number | null>(null);
const el = ref<HTMLElement | null>(null);

const openDetail = async (item: SchoolDetail) => {
  emit("openDetail", item);
};

const onEndReorder = async (evt: any) => {
  try {
    if (evt.newIndex !== evt.oldIndex) {
      const movedItem = schoolListStore.userSelectedSchoolsList[evt.newIndex];

      await api.post("/api/v1/bookmark/program/reorder", {
        id: movedItem.id,
        order_no: evt.newIndex + 1,
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const onStartReorderPyblic = () => {
  appStore.featureSoftPaywall = true;
};

const checklistSchoolData = (school: checklistProgram) => {
  const { program, ...rest } = school;
  return rest;
};

const getChecklist = (pageNo: number = 1) => {
  schoolListStore.getChecklistProgram(pageNo);
};


</script>
<style>
.parent {
  opacity: 0 !important;
}

/* .dragClass {
  opacity: 1 !important;
} */
</style>
