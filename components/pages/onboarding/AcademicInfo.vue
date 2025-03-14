<template>
  <div class="max-w-[1000px] w-full flex justify-center gap-12 lg:gap-[84px]">
    <div class="flex-1 hidden md:block">
      <NuxtImg
        src="/images/tell-me-more.png"
        alt="Tell Me More"
        class="w-full size-full object-contain"
        loading="eager"
        preload
      />
    </div>
    <div class="md:flex-1 space-y-5 md:space-y-8 w-[80%]">
      <h1 class="mb-4 text-[#181D27] text-2xl md:text-4xl font-medium">
        {{ $t("onboarding.academic_heading") }}
      </h1>
      <BaseSelectRadio
        :label="t('onboarding.your_grade')"
        :options="classGradeList"
        v-model="academicInfo.grade"
      />
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
            class="mt-1 rounded-lg border-2 shadow-sm border-gray-200 py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
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
          class="mt-1 rounded-lg border-2 shadow-sm border-gray-200 py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
        />
      </div>
      <button
        @click="onSubmit"
        :disabled="academicInfo.grade.value === '' || academicInfo.gpa === '' || isSubmitting"
        class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5 disabled:opacity-70"
      >
        {{ $t("onboarding.continue") }}
        <IconSpinner class="size-5" v-if="isSubmitting" />
        <IconArrowRight v-else fill="#ffffff" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { ClassGrades, CurrentClassGrade, UserData } from "~/types/home";
import useAppStore from "~/stores/AppStore";

const emit = defineEmits(["submitAcademic"]);

const { t } = useI18n();
const { api } = useApi();
const { showToast } = useToast();
const appStore = useAppStore();

const classGradeList = ref<ClassGrades[]>([]);

const academicInfo = ref<{ grade: ClassGrades; gpa: string; ielts: string }>({
  grade: {
    value: "",
    label: "",
  },
  gpa: "",
  ielts: "",
});
const isSubmitting = ref<boolean>(false);

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      current_class_grade: academicInfo.value.grade.value,
      cgpa: academicInfo.value.gpa,
      ielts_score: academicInfo.value.ielts || -1,
    });
    appStore.getUserData();
    emit("submitAcademic");
  } catch (error) {
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};

const getClassGrades = async () => {
  try {
    const response = await api.get(`/api/v1/sign-up/get-class-grades`);
    classGradeList.value = response.data.data.map((item: CurrentClassGrade) => {
      return {
        value: item.id,
        label: item.class_name,
      };
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};
const setAcademicInfo = (userData: UserData) => {
  academicInfo.value.grade = {
    value: userData?.educational_records.current_class_grade
      ? `${userData?.educational_records.current_class_grade.id}`
      : "",
    label: userData?.educational_records.current_class_grade
      ? `${userData?.educational_records.current_class_grade.class_name}`
      : "",
  };
  academicInfo.value.gpa = userData?.educational_records.cgpa
    ? `${userData?.educational_records.cgpa}`
    : "";
  const ieltsScore = userData?.educational_records.test_scores.find(
    (item) => item.title.toLowerCase() === "ielts"
  );
  academicInfo.value.ielts = ieltsScore ? `${ieltsScore.score}` : "";
};

watch(
  () => appStore.userData,
  (newValue) => {
    if (newValue) {
      setAcademicInfo(newValue);
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  getClassGrades();
  if (appStore.userData) {
    setAcademicInfo(appStore.userData);
  }
});
</script>
