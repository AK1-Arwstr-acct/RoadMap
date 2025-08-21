<template>
  <div class="max-w-[1000px] w-full flex justify-center">
    <div class="flex-1 max-w-[400px] flex flex-col gap-8 md:gap-10">
      <div class="flex flex-col items-center gap-4">
        <img
          src="/images/academic.png"
          alt="academic"
          class="size-20 min-w-20"
        />
        <h1 class="text-text-base text-xl md:text-2xl font-medium text-center">
          {{ $t("onboarding.hey") }} {{ appStore.userData?.name }},
          {{ $t("onboarding.help_us_get_to_know_you") }}
        </h1>
      </div>
      <BaseSelectRadio
        :label="t('onboarding.what_best_describes_your_current_status')"
        :options="classGradeList"
        v-model="academicInfo.grade"
        :disabled="classGradeList.length === 0"
        :loading="isClassGradesLoading"
        :required="true"
      />
      <div class="remove-shadow-bg-white">
        <label class="font-medium text-text-neutral-subtle text-sm"
          >{{ $t("onboarding.whats_your_current_gpa")
          }}<span class="text-text-error font-medium"
            > *</span
          ></label
        >
        <div class="relative">
          <input
            name="gpa"
            type="text"
            v-model="academicInfo.gpa"
            @input="validateNumber"
            :placeholder="t('onboarding.e_g_7_0')"
            class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
            data-hj-allow
          />
          <span class="text-text-neutral-subtle absolute right-[14px] top-1/2 transform -translate-y-1/2">
            /10
          </span>
        </div>
      </div>
      <div class="flex items-center gap-10">
        <button
          @click="onSubmit"
          :disabled="
            academicInfo.grade.value === '' ||
            academicInfo.gpa === '' ||
            isSubmitting
          "
          class="text-text-constant-white font-semibold bg-background-brand rounded-lg flex gap-3 items-center justify-center py-2.5 px-[18px] disabled:opacity-50"
        >
          {{ $t("onboarding.next") }}
        </button>
        <p class="w-fit flex items-center gap-2 text-text-base text-xs">
          {{ $t("onboarding.press_enter") }}
          <IconEnter />
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { ClassGrades, CurrentClassGrade, UserData } from "~/types/home";
import useAppStore from "~/stores/AppStore";
import useOnboardingStore from "~/stores/OnboardingStore";

const emit = defineEmits(["updateStep"]);

const { t } = useI18n();
const { api } = useApi();
const { showToast } = useToast();
const appStore = useAppStore();
const onboardingStore = useOnboardingStore();

const classGradeList = ref<ClassGrades[]>([]);

const academicInfo = ref<{ grade: ClassGrades; gpa: string }>({
  grade: {
    value: "",
    label: "",
  },
  gpa: "",
});
const isSubmitting = ref<boolean>(false);
const isClassGradesLoading = ref<boolean>(false);

const validateNumber = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  const value = input.value;

  const regex = /^(?:[0-9](?:\.\d{0,2})?|10?)$/;
  const cleanedValue = value.replace(/[^0-9.]/g, "");

  if (regex.test(cleanedValue)) {
    input.value = cleanedValue;
    academicInfo.value.gpa = cleanedValue;
  } else {
    input.value = cleanedValue.slice(0, -1);
    academicInfo.value.gpa = input.value;
  }
};

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      current_class_grade: academicInfo.value.grade.value,
      cgpa: outOfFourGpa(academicInfo.value.gpa),
    });
    appStore.getUserData();
    emit("updateStep");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};

const getClassGrades = async () => {
  try {
    isClassGradesLoading.value = true;
    const response = await api.get(`/api/v1/sign-up/get-class-grades`);
    classGradeList.value = response.data.data.map((item: CurrentClassGrade) => {
      return {
        value: item.id,
        label:
          item.class_name === "Others"
            ? item.class_name
            : `I'm in ${item.class_name}`,
      };
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isClassGradesLoading.value = false;
  }
};
const setAcademicInfo = (userData: UserData) => {
  const userGrade = userData?.educational_records.current_class_grade;
  academicInfo.value.grade = {
    value: userGrade ? `${userGrade.id}` : "",
    label: userGrade
      ? userGrade.class_name === "Others"
        ? userGrade.class_name
        : `I'm in ${userGrade.class_name}`
      : "",
  };

  academicInfo.value.gpa = outOfTenGpa(userData?.educational_records.cgpa);
};

const onKeydown = (event: KeyboardEvent) => {
  if (
    event.key === "Enter" &&
    academicInfo.value.gpa &&
    academicInfo.value.grade.value
  ) {
    onSubmit();
  }
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
  onboardingStore.onboardingStep = 1;
  getClassGrades();
  if (appStore.userData) {
    setAcademicInfo(appStore.userData);
  }
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
});
</script>
