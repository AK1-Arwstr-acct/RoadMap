<template>
  <div class="max-w-[1000px] w-full flex justify-center gap-12 lg:gap-[84px]">
    <div class="flex-1 hidden md:block">
      <img
        src="/images/adventures.png"
        alt="Good Things Coming"
        class="w-full size-full object-contain"
      />
    </div>
    <div class="md:flex-1 space-y-5 md:space-y-8 w-[80%]">
      <h1 class="mb-4 text-[#181D27] text-2xl md:text-4xl font-medium">
        {{ $t("onboarding.academic_heading") }}
      </h1>
      <div class="remove-shadow-bg-white">
        <label class="font-medium text-[#414651] text-sm">{{
          $t("onboarding.your_grade")
        }}</label>
        <input
          name="grade"
          type="text"
          v-model="academicInfo.grade"
          :placeholder="t('onboarding.e_g_11')"
          class="mt-1 rounded-lg border-2 shadow-sm border-[#E1E1E1] py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
        />
      </div>
      <div class="remove-shadow-bg-white">
        <label class="font-medium text-[#414651] text-sm">{{
          $t("onboarding.gpa")
        }}</label>
        <div class="relative">
          <input
            name="gpa"
            type="text"
            v-model="academicInfo.gpa"
            :placeholder="t('onboarding.e_g_7_0')"
            class="mt-1 rounded-lg border-2 shadow-sm border-[#E1E1E1] py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
          />
          <div
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <IconHelpCircle />
          </div>
        </div>
      </div>
      <div class="remove-shadow-bg-white">
        <label class="font-medium text-[#414651] text-sm">{{
          $t("onboarding.ielts_optional")
        }}</label>
        <input
          name="ielts"
          type="text"
          v-model="academicInfo.ielts"
          :placeholder="t('onboarding.e_g_7_0')"
          class="mt-1 rounded-lg border-2 shadow-sm border-[#E1E1E1] py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
        />
      </div>
      <button
        @click="onSubmit"
        :disabled="academicInfo.grade === '' || academicInfo.gpa === ''"
        class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5 disabled:opacity-70"
      >
        {{ $t("onboarding.continue") }}
        <BaseSpinner v-if="isSubmitting" color="#FFFFFF" />
        <IconArrowRight v-else fill="#ffffff" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["submitAcademic"]);

const { t } = useI18n();
const { api } = useApi();

const academicInfo = ref({
  grade: "",
  gpa: "",
  ielts: "",
});
const isSubmitting = ref<boolean>(false);

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    api.post("/api/v1/student/update-profile-basic-info", {
      current_class_grade: academicInfo.value.grade,
      cgpa: academicInfo.value.gpa,
      ielts_score: academicInfo.value.ielts,
    });
    emit("submitAcademic");
  } catch (error) {
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
