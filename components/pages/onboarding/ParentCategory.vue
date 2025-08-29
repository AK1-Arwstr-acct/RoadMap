<template>
  <div class="max-w-[1000px] w-full flex justify-center">
    <div class="flex-1 max-w-[400px] flex flex-col gap-8 md:gap-10">
      <div class="flex flex-col items-center gap-4">
        <img
          src="/images/academic.png"
          alt="academic"
          class="size-20 min-w-20"
        />
        <div>
          <h1
            class="text-text-base text-xl md:text-2xl font-medium text-center"
          >
            {{ $t("onboarding.lastly_tell_us_your_area_of_interest") }}
          </h1>
          <p class="text-text-neutral-subtle text-center mt-1">
            {{
              $t("onboarding.you_can_always_update_it_later_in_your_profile")
            }}
          </p>
        </div>
      </div>
      <!--  -->
      <BaseSelectRadio
        :label="t('onboarding.area_of_study')"
        :options="coursePreferenceOptions"
        v-model="selectedCourse"
        :loading="iscoursePreferenceOptionsLoading"
        :disabled="coursePreferenceOptions.length === 0"
        @onChange="onCourseChange"
        :required="true"
        :openDropdown="openDropdown"
        dropdownName="parent_program"
        @open="(value: string) => (openDropdown = value as string)"
      />
      <MultiMajorsDropdown
        :label="`${t('onboarding.majors')}`"
        :options="majorProgramsList"
        v-model="selectedMajors"
        :loading="isLoadingMajors"
        :required="isMajorsRequired"
        :openDropdown="openDropdown"
        dropdownName="majors"
        @open="(value: string) => (openDropdown = value as string)"
      />
      <!--  -->
      <div class="flex items-center gap-10">
        <button
          @click="onSubmit"
          :disabled="!selectedCourse || (!selectedMajors.length && isMajorsRequired) || isSubmitting"
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
import useAppStore from "~/stores/AppStore";
import type { OptionAttributes } from "~/types/home";
import useOnboardingStore from "~/stores/OnboardingStore";
import useSchoolListStore from "~/stores/SchoolListStore";

const { t } = useI18n();
const { api } = useApi();
const { showToast } = useToast();
const appStore = useAppStore();
const localePath = useLocalePath();
const onboardingStore = useOnboardingStore();
const schoolListStore = useSchoolListStore();

const coursePreferenceOptions = ref<OptionAttributes[]>([]);
const majorProgramsList = ref<OptionAttributes[]>([]);
const iscoursePreferenceOptionsLoading = ref<boolean>(false);
const isLoadingMajors = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);
const selectedCourse = ref<OptionAttributes>();
const selectedMajors = ref<number[]>([]);

// for dropdown open
const openDropdown = ref<string>("");

const getAreaofStudies = async () => {
  try {
    iscoursePreferenceOptionsLoading.value = true;
    const payload = {
      min_budget: null,
      max_budget: appStore.userData?.educational_records.annual_max_budget,
    };
    coursePreferenceOptions.value =
      await schoolListStore.setCoursePreferenceOptions(payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    iscoursePreferenceOptionsLoading.value = false;
  }
};

const onCourseChange = async () => {
  try {
    isLoadingMajors.value = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      super_meta_category_id: selectedCourse.value?.value,
    });
    // await appStore.getUserData();
    selectedMajors.value = [];
    getMajors();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const checkPublicToken = async () => {
  const publicToken = useCookie("publicToken");
  if (!publicToken.value) {
    await schoolListStore.setPublicToken();
    await nextTick();
  }
};

const getMajors = async () => {
  try {
    isLoadingMajors.value = true;
    await checkPublicToken();
    majorProgramsList.value = await schoolListStore.getMajors();
    if (appStore.userData?.educational_records.next_program_titles.length) {
      selectedMajors.value =
        appStore.userData?.educational_records.next_program_titles.map(
          (item) => item.id
        );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isLoadingMajors.value = false;
  }
};

const isMajorsRequired = computed(() => {
  const userSelection = [
    "I have a few majors in mind but need help choosing",
    "I know what I want to study, but I still have some concerns",
    "I've decided on my major and am now looking for schools"
  ];
  return userSelection.some((item) =>
    item.includes(appStore.userData?.current_situation || "")
  );
});

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      super_meta_category_id: selectedCourse.value?.value,
      next_program_title_ids: selectedMajors.value.length
        ? selectedMajors.value
        : -1,
    });
    await appStore.getUserData();
    const userSelection = [
      "I'm unsure about what major to pursue",
      "I have a few majors in mind but need help choosing",
      "I know what I want to study, but I still have some concerns",
    ];
    if (
      userSelection.some((item) =>
        item.includes(appStore.userData?.current_situation || "")
      )
    ) {
      navigateTo(localePath("/majors"));
    } else if (
      appStore.userData?.current_situation === "I'm just browsing for now"
    ) {
      navigateTo(localePath("/"));
    } else {
      navigateTo(localePath("/school-list"));
    }
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

const onKeydown = (event: KeyboardEvent) => {
  if (
    event.key === "Enter" &&
    selectedCourse.value &&
    selectedMajors.value.length
  ) {
    onSubmit();
  }
};

watch(
  () => coursePreferenceOptions.value,
  () => {
    if (
      appStore.userData &&
      appStore.userData.educational_records.super_meta_category
    ) {
      selectedCourse.value = coursePreferenceOptions.value.find(
        (item) =>
          Number(item.value) ===
          appStore.userData?.educational_records.super_meta_category?.id
      );
      if (selectedCourse.value) {
        getMajors();
      }
    }
  }
);

onMounted(() => {
  onboardingStore.onboardingStep = 4;
  document.addEventListener("keydown", onKeydown);
  getAreaofStudies();
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
});
</script>
