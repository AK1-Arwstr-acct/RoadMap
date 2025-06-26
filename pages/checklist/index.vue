<template>
  <div class="size-full px-5 flex flex-col overflow-hidden">
    <!-- tabs -->
    <div class="mt-10 flex gap-1 w-full max-w-[800px] mx-auto">
      <div
        @click="activeTab = 'checklist'"
        class="px-3 pb-1.5 flex gap-1.5 items-center font-semibold cursor-pointer transition-all ease-in-out duration-200 text-nowrap"
        :class="[
          activeTab === 'checklist'
            ? 'text-[#2563EB] border-b border-[#2563EB]'
            : 'text-[#111827]',
        ]"
      >
        <IconSchool
          :class="[
            activeTab === 'checklist' ? 'text-[#2563EB]' : 'text-[#4B5563]',
          ]"
        />
        My College List
      </div>
      <!-- @click="activeTab = 'comparison'" -->
      <div
        @click="navigateTo(localePath('/pricing'))"
        class="px-3 pb-1.5 flex gap-1.5 items-center font-semibold cursor-pointer transition-all ease-in-out duration-200 text-nowrap"
        :class="[
          activeTab === 'comparison'
            ? 'text-[#2563EB] border-b border-[#2563EB]'
            : 'text-[#111827]',
        ]"
      >
        <IconComparison
          :class="[
            activeTab === 'comparison' ? 'text-[#2563EB]' : 'text-[#4B5563]',
          ]"
        />
        My College List
        <p class="px-2 rounded-full bg-[#E5E5E5] text-[#4B5563] font-semibold">
          Coming soon
        </p>
      </div>
    </div>
    <div class="flex-1 w-full overflow-y-auto custom-scrollbar mt-8">
      <div class="w-full max-w-[800px] mx-auto mb-8">
        <Transition name="fade">
          <div
            v-if="activeTab == 'checklist'"
            class="h-fit w-full flex flex-col gap-10"
          >
            <div class="">
              <h1 class="text-[32px] font-semibold text-[#181D27]">
                My College List
              </h1>
              <p class="text-[#535862] mt-2">
                Keep track of all the schools you're interested in. Compare
                programs, deadlines, and requirements in one place.
              </p>
            </div>
            <div v-if="appStore.authenticatedUser" class="flex-1">
              <VueDraggable
                ref="el"
                @start="onStartReorder"
                v-model="dashboardStore.userSelectedSchoolsList"
                v-if="dashboardStore.userSelectedSchoolsList.length > 0"
                class="flex flex-col gap-6"
              >
                <div
                  v-for="(
                    school, idx
                  ) in dashboardStore.userSelectedSchoolsList"
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
                      :sequenceId="school.id"
                      :checkListData="checklistSchoolData(school)"
                      :program="school.program"
                      @openDetail="openDetail"
                    />
                  </div>
                </div>
              </VueDraggable>
              <EmptyChecklist v-else />
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
                  v-for="(
                    school, idx
                  ) in dashboardStore.userSelectedSchoolsListPublic"
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
                    <SchoolCard :program="school" @openDetail="openDetail" />
                  </div>
                </div>
              </VueDraggable>
              <EmptyChecklist v-else />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
  <Transition name="fade">
    <div
      v-if="isDetailModal"
      @click="isDetailModal = false"
      class="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
    />
  </Transition>
  <Transition name="slideModal">
    <component
      :is="SchoolDetailModal"
      v-if="isDetailModal"
      :isDetailModal="isDetailModal"
      @close="close"
      :schoolData="schoolProfile"
    />
  </Transition>
</template>
<script setup lang="ts">
import axios from "axios";
import useDashboardStore from "~/stores/dashboardStore";
import SchoolDetailModal from "~/components/pages/school-list/SchoolDetailModal.vue";
import type { checklistProgram, SchoolDetail } from "~/types/program";
import { VueDraggable } from "vue-draggable-plus";
import useAppStore from "~/stores/AppStore";

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const dashboardStore = useDashboardStore();
const appStore = useAppStore();
const { showToast } = useToast();
const localePath = useLocalePath();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/checklist`;
useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/lets-go.png",
        as: "image",
      },
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/checklist`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/checklist`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/checklist`,
        hreflang: "x-default",
      },
    ],
  }))
);

definePageMeta({
  layout: "home-layout",
});

const activeTab = ref<"checklist" | "comparison">("checklist");
const schoolProfile = ref<SchoolDetail>();
const isDetailModal = ref<boolean>(false);
const isDraggingIdx = ref<number | null>(null);
const el = ref<HTMLElement | null>(null);

const close = () => {
  isDetailModal.value = false;
};

const openDetail = async (item: SchoolDetail) => {
  try {
    schoolProfile.value = item;
    isDetailModal.value = true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
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
</script>
