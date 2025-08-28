<template>
  <div class="h-dvh flex overflow-hidden relative">
    <component :is="CounselorSideabr" />
    <div class="flex-1 h-full overflow-hidden pb-[70px] lg:pb-0 flex flex-col">
      <CounselorTitleNave :title="pageTitle" />
      <div class="h-full overflow-hidden">
        <slot />
      </div>
    </div>
  </div>
  <Transition name="fade">
    <div
      v-if="counselorStore.isCreateNewStudent"
      @click="counselorStore.isCreateNewStudent = false"
      class="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
    />
  </Transition>
  <Transition name="slideModal">
    <component
      :is="NewStudentModal"
      v-if="counselorStore.isCreateNewStudent"
      @close="counselorStore.isCreateNewStudent = false"
    />
  </Transition>
</template>
<script setup lang="ts">
import CounselorSideabr from "~/components/pages/counselor/CounselorSideabr.vue";
import NewStudentModal from "~/components/pages/counselor/students/NewStudentModal.vue";
import useCounselorStore from "~/stores/counselorStore";

const counselorStore = useCounselorStore();
const { t } = useI18n();
const route = useRoute();

const pageTitle = computed(() => {
  if (route.path.includes("/counselor/student")) {
    return t("counselor_pages.students");
  } else if (route.path.includes("/counselor/schools")) {
    return t("counselor_pages.schools");
  } else if (route.path.includes("/counselor/referral")) {
    return t("counselor_pages.referral_program");
  } else if (route.path.includes("/counselor/student-profile")) {
    return t("counselor_pages.students_details");
  }
});
</script>
