<template>
  <div class="size-full px-4 flex flex-col overflow-hidden">
    <!-- tabs -->
    <div class="mt-2 md:mt-10 flex gap-1 w-full max-w-[800px] mx-auto">
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
        class="px-3 pb-1.5 flex flex-wrap gap-1.5 items-center font-semibold cursor-pointer transition-all ease-in-out duration-200"
        :class="[
          activeTab === 'comparison'
            ? 'text-[#2563EB] border-b border-[#2563EB]'
            : 'text-[#111827]',
        ]"
      >
        <div
          class="text-nowrap flex items-center gap-1.5 order-1 md:order-none"
        >
          <IconComparison
            :class="[
              activeTab === 'comparison' ? 'text-[#2563EB]' : 'text-[#4B5563]',
            ]"
          />
          College Comparison
        </div>
        <p class="px-2 rounded-full bg-[#E5E5E5] text-[#4B5563] font-semibold">
          Coming soon
        </p>
      </div>
    </div>
    <div class="flex-1 w-full overflow-y-auto custom-scrollbar mt-8">
      <div class="w-full max-w-[800px] mx-auto mb-8">
        <Transition name="fade">
          <Checklist v-if="activeTab == 'checklist'" @openDetail="openDetail" />
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
import useSchoolListStore from "~/stores/SchoolListStore";
import SchoolDetailModal from "~/components/pages/school-list/SchoolDetailModal.vue";
import type { checklistProgram, SchoolDetail } from "~/types/program";
import useAppStore from "~/stores/AppStore";

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const schoolListStore = useSchoolListStore();
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

const close = () => {
  isDetailModal.value = false;
};

const openDetail = async (item: SchoolDetail) => {
  schoolProfile.value = item;
  isDetailModal.value = true;
};

onMounted(async () => {
  await schoolListStore.getChecklistProgram();
});
</script>
