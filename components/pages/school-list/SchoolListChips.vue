<template>
  <div
    class="remove-shadow-bg-white flex gap-2.5 items-center lg:flex-wrap overflow-x-auto overflow-y-hidden lg:overflow-y-visible lg:overflow-x-visible no-scrollbar"
  >
    <GpaDropdown
      v-model="gpa"
      @onChange="gpaChanged"
      :openDropdown="openDropdown"
      dropdownName="gpa"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <BaseSelectRadioNew
      :label="t('schoolList_page.study_program')"
      :required="true"
      :options="schoolListStore.programListOptions"
      v-model="studyPrograms"
      @onChange="getLocationsList"
      :disabled="isGpaChange"
      :openDropdown="openDropdown"
      dropdownName="program"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <DestinationsDropdown
      :label="t('schoolList_page.destination')"
      :required="true"
      :loading="isLocationLoading"
      v-model="selectedLocationOptions"
      @onChange="destinationUpdates"
      :disabled="isLocationchange || isGpaChange"
      :openDropdown="openDropdown"
      dropdownName="destination"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <BaseSelectRadioNew
      :label="t('schoolList_page.annual_total_budget')"
      :options="schoolListStore.budgetList"
      v-model="annualBudget"
      :loading="isBudgetLoading"
      :disabled="
        !schoolListStore.locationOptions.length ||
        isLocationchange ||
        isLocationLoading ||
        isGpaChange
      "
      @onChange="getProgramParent"
      :openDropdown="openDropdown"
      dropdownName="budget"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <BaseSelectRadioNew
      :label="t('schoolList_page.area_of_study')"
      :required="true"
      :options="schoolListStore.coursePreferenceOptions"
      v-model="areaOfStudy"
      :disabled="
        !schoolListStore.locationOptions.length ||
        isLocationchange ||
        isLocationLoading ||
        isGpaChange
      "
      :loading="isAreaOfStudyLoading"
      @onChange="onParentProgramChanged"
      :openDropdown="openDropdown"
      dropdownName="areaOfStudy"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <div class="relative">
      <div>
        <MajorsSelection
          :payload="payload"
          :openDropdown="openDropdown"
          dropdownName="majors"
          @open="(value: string) => (openDropdown = value as Dropdowns)"
          @update="updateAuthMajors"
        />
      </div>
      <div
        v-if="
          appStore.firstTimeUser && width > 1024 && appStore.authenticatedUser
        "
        ref="focusDiv"
        class="absolute inset-0 z-30 bg-white rounded-md flex justify-center items-center"
      >
        <div
          class="border-[1.5px] border-[#0000001A] rounded-full py-1 px-2 w-fit transition-colors duration-150 ease-in-out flex justify-between gap-2 items-center"
        >
          <div class="flex-1">
            <p class="text-[#111827] text-left text-sm">Majors</p>
          </div>
          <span class="transition-transform duration-200 ease-in-out">
            <IconChevronDown height="18" width="18" stroke="#4B5563" />
          </span>
        </div>
      </div>
      <Transition name="fade">
        <div
          v-if="
            appStore.firstTimeUser && width > 1024 && appStore.authenticatedUser
          "
          :style="{
            position: 'fixed',
            top: modalPosition.top + 'px',
            left: modalPosition.left + 'px',
            transform: 'translate(-50%, 0)',
            zIndex: 9999,
          }"
          class="bg-white p-4 rounded-lg w-[270px] shadow-lg"
        >
          <div class="flex flex-col gap-2.5 items-end relative">
            <div
              class="absolute -top-6 left-1/2 -translate-x-1/2 size-4 transform rotate-45 bg-white"
            />
            <div>
              <p class="text-[#111827] font-semibold mb-0.5">
                First, select up to 3 majors
              </p>
              <p class="text-[#4B5563] text-sm">
                The more you select, the better we can match you with the right
                colleges
              </p>
            </div>
            <button
              @click="appStore.firstTimeUser = false"
              class="rounded-lg px-6 py-1.5 bg-[#2563EB] text-white font-semibold text-sm"
            >
              Got it
            </button>
          </div>
        </div>
      </Transition>
    </div>
    <SophieRecommendation />
  </div>
  <Transition name="fade">
    <div
      v-if="
        appStore.firstTimeUser && width > 1024 && appStore.authenticatedUser
      "
      class="fixed z-20 inset-0 bg-black/60"
    />
  </Transition>
</template>
<script setup lang="ts">
import useSchoolListStore from "~/stores/SchoolListStore";
import useAppTrackerStore from "~/stores/AppTrackerStore";
import type { OptionAttributes, UserData } from "~/types/home";
import useAppStore from "~/stores/AppStore";
import axios from "axios";
import type { Dropdowns } from "~/types/dashboard";

const schoolListStore = useSchoolListStore();
const appTrackerStore = useAppTrackerStore();
const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();
const { t } = useI18n();

const isSubmitting = ref<boolean>(false);
const isDetailOpen = ref<boolean>(false);
const gpa = ref<string>(schoolListStore.isSchoolListPublic ? "9" : "");
const annualBudget = ref<OptionAttributes | null>();
const checkBudgetSelection = ref<boolean>(true); // To check whether the list has a selected budget.
const studyPrograms = ref<OptionAttributes>();
const areaOfStudy = ref<OptionAttributes | null>();
const selectedLocationOptions = ref<number[]>([]);
const contentHeight = ref(0);
const content = ref<HTMLElement | null>(null);
const isBudgetLoading = ref<boolean>(false);
const isAreaOfStudyLoading = ref<boolean>(false);
const isGpaChange = ref<boolean>(false);
const isLocationchange = ref<boolean>(false);
const isLocationLoading = ref<boolean>(false);
const width = ref<number>(0);
const payload = ref();

// for dropdowns open
const openDropdown = ref<Dropdowns>("");

// first time user modal
const focusDiv = ref<HTMLElement | null>(null);
const modalPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });
let resizeObserver: ResizeObserver | null = null;

const convertedCgpa = computed(() => {
  return gpa.value ? ((Number(gpa.value) / 10) * 4).toFixed(2) : "";
});

const updateUserData = async () => {
  try {
    isSubmitting.value = true;
    if (schoolListStore.isSchoolListPublic) {
      const publicUserData = useCookie("publicUserData", {
        maxAge: 604800,
        httpOnly: false,
        secure: true,
      });
      const { min, max } = getMinMax();
      const payload = {
        cgpa: convertedCgpa.value,
        next_educational_class_grade_id: studyPrograms.value?.value,
        annual_min_budget: min,
        annual_max_budget: max,
        destination_country_ids: selectedLocationOptions.value,
        super_meta_category_id: areaOfStudy.value?.value,
      };
      publicUserData.value = JSON.stringify(payload);
    }
    schoolListStore.programTitleParentId = areaOfStudy.value?.value || "";
    schoolListStore.isPublicMajorEnable = false;
    await schoolListStore.preRunEngine();
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

const updateModalPosition = () => {
  if (focusDiv.value) {
    const rect = focusDiv.value.getBoundingClientRect();

    modalPosition.value = {
      top: rect.bottom + 20, // 20px below
      left: rect.left + rect.width / 2, // center horizontally
    };
  }
};

const setInitialValues = async (newValue: UserData) => {
  const cgpa = parseFloat(String(newValue?.educational_records.cgpa));
  const value = (cgpa / 4) * 10;
  const decimal = value - Math.floor(value);
  gpa.value = decimal > 0 ? value.toFixed(1) : value.toFixed(0);
  await gpaChanged();

  if (!schoolListStore.programListOptions.length) {
    schoolListStore.isSchoolsLoading = false;
    return;
  }

  studyPrograms.value = schoolListStore.programListOptions.find(
    (item) =>
      Number(item.value) == newValue?.educational_records.next_class_grade.id
  );

  if (!gpa.value || !studyPrograms.value) {
    schoolListStore.isSchoolsLoading = false;
    return;
  }

  await getLocationsList();

  if (!schoolListStore.locationOptions.length) {
    schoolListStore.isSchoolsLoading = false;
    return;
  }

  selectedLocationOptions.value =
    appStore.userData?.educational_records.want_to_study_countries.map(
      (item) => item.id
    ) || [];

  if (!selectedLocationOptions.value.length) {
    schoolListStore.isSchoolsLoading = false;
    return;
  }

  await destinationUpdates();

  if (!schoolListStore.budgetList.length) {
    schoolListStore.isSchoolsLoading = false;
    return;
  }

  annualBudget.value =
    schoolListStore.budgetList?.find((item) =>
      item.value.includes(`${newValue?.educational_records.annual_max_budget}`)
    ) || undefined;

  if (!annualBudget.value) {
    schoolListStore.isSchoolsLoading = false;
    return;
  }

  await getProgramParent();

  if (!schoolListStore.coursePreferenceOptions.length) {
    schoolListStore.isSchoolsLoading = false;
    return;
  }

  areaOfStudy.value = schoolListStore.coursePreferenceOptions?.find(
    (item) =>
      Number(item.value) == newValue?.educational_records.super_meta_category.id
  );
  if (!areaOfStudy.value) {
    schoolListStore.isSchoolsLoading = false;
    return;
  }

  schoolListStore.programTitleParentId = areaOfStudy.value?.value || "";
  schoolListStore.isPublicMajorEnable = true;
  if (appStore.userData?.educational_records.next_program_titles.length) {
    const selectedMajors =
      appStore.userData?.educational_records.next_program_titles.map(
        (item) => item.id
      );
    schoolListStore.selectedPublicMajors = selectedMajors;
    await schoolListStore.runEngine();
  } else {
    await schoolListStore.preRunEngine();
  }
};

const getMinMax = () => {
  if (annualBudget.value) {
    const matches = annualBudget.value.value.match(/\d+,\d+|\d+/g);
    if (matches) {
      const budgetSelected = {
        min: parseInt(matches[0].replace(/,/g, ""), 10),
        max: parseInt(matches[1].replace(/,/g, ""), 10),
      };
      return budgetSelected;
    }
  }
  return {
    min: 0,
    max: 0,
  };
};

const updateSchools = () => {
  if (
    gpa.value &&
    studyPrograms.value?.value &&
    selectedLocationOptions.value.length > 0 &&
    annualBudget.value?.value &&
    areaOfStudy.value?.value
  ) {
    updateUserData();
  }
};

const gpaChanged = async () => {
  if (!schoolListStore.programListOptions.length) {
    schoolListStore.setProgramListOptions();
  }
  isGpaChange.value = true;
  await getLocationsList();
  isGpaChange.value = false;
  updateSchools();
};

const getLocationsList = async () => {
  try {
    if (!gpa.value || !studyPrograms.value?.value) {
      return;
    }
    selectedLocationOptions.value = [];
    annualBudget.value = undefined;
    areaOfStudy.value = undefined;
    schoolListStore.locationOptions = [];
    schoolListStore.budgetList = [];
    schoolListStore.coursePreferenceOptions = [];
    isLocationLoading.value = true;
    schoolListStore.isPublicMajorEnable = false;

    const response = await schoolListStore.setLocationOptions({
      cgpa: convertedCgpa.value,
      class_grade_ids: [Number(studyPrograms.value?.value)],
    });
    if (response) {
      await nextTick();
      calculateHeight();
    }
    isLocationLoading.value = false;
    updateSchools();
  } catch (error) {}
};

const destinationUpdates = async () => {
  isLocationchange.value = true;
  await getBudgets();
  isLocationchange.value = false;
};

const getBudgets = async () => {
  try {
    isBudgetLoading.value = true;

    annualBudget.value = undefined;
    areaOfStudy.value = undefined;
    schoolListStore.budgetList = [];
    schoolListStore.coursePreferenceOptions = [];
    schoolListStore.isPublicMajorEnable = false;

    const response = await schoolListStore.setBudgetList({
      country_ids: selectedLocationOptions.value || [],
    });
    if (response) {
      const hasBUdget = !!response.find(
        (item) => item.value === annualBudget.value?.value
      );
      if (!hasBUdget) {
        annualBudget.value = undefined;
        areaOfStudy.value = undefined;
        schoolListStore.coursePreferenceOptions = [];
        schoolListStore.isPublicMajorEnable = false;
      } else {
        updateSchools();
      }
    }
    isBudgetLoading.value = false;
  } catch (error) {
    isBudgetLoading.value = false;
    schoolListStore.budgetList = [];
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const getProgramParent = async () => {
  try {
    isAreaOfStudyLoading.value = true;

    areaOfStudy.value = undefined;
    schoolListStore.coursePreferenceOptions = [];
    schoolListStore.isPublicMajorEnable = false;

    const response = await schoolListStore.setCoursePreferenceOptions({
      min_budget: null,
      max_budget: (annualBudget.value as { max?: number }).max,
    });
    if (response) {
      const hasCourse = !!response.find(
        (item) => item.value === areaOfStudy.value?.value
      );
      if (!hasCourse) {
        areaOfStudy.value = undefined;
        schoolListStore.isPublicMajorEnable = false;
      }
    }
    isAreaOfStudyLoading.value = false;
    updateSchools();
  } catch (error) {
    console.error(error);
  }
};

const updateAuthMajors = async () => {
  try {
    const payload = {
      cgpa: convertedCgpa.value,
      next_program_title_ids: schoolListStore.selectedPublicMajors.length
        ? schoolListStore.selectedPublicMajors
        : -1,
    };
    await api.post("/api/v1/student/update-profile-basic-info", payload);
    showToast("Profile updated successfully", {
      type: "success",
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
const updateAuthUserData = async () => {
  try {
    const { min, max } = getMinMax();
    const payload = {
      cgpa: convertedCgpa.value,
      next_educational_class_grade_id: studyPrograms.value?.value,
      annual_min_budget: min,
      annual_max_budget: max,
      destination_country_ids: selectedLocationOptions.value,
      super_meta_category_id: areaOfStudy.value?.value,
      next_program_title_ids: -1,
    };
    await api.post("/api/v1/student/update-profile-basic-info", payload);
    showToast("Profile updated successfully", {
      type: "success",
    });
    schoolListStore.isAllowwedOnUserDadaChange = false;
    appStore.getUserData();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const onParentProgramChanged = async () => {
  if (schoolListStore.isSchoolListPublic) {
    updateUserData();
  } else {
    await updateAuthUserData();
    updateUserData();
  }
};

watch(
  () => appStore.firstTimeUser,
  (val) => {
    if (val) {
      nextTick(() => {
        updateModalPosition();
      });
    }
  }
);

// watcher to track chips and shows (fill in) info screen
watch(
  () => [
    gpa.value,
    studyPrograms.value?.value,
    selectedLocationOptions.value.length,
    annualBudget.value?.value,
    areaOfStudy.value?.value,
  ],
  () => {
    if (
      gpa.value &&
      studyPrograms.value?.value &&
      selectedLocationOptions.value.length > 0 &&
      annualBudget.value?.value &&
      areaOfStudy.value?.value
    ) {
      schoolListStore.allChipsFilled = true;
    } else {
      schoolListStore.allChipsFilled = false;
    }
  }
);

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

const calculateHeight = () => {
  if (content.value) {
    contentHeight.value = isDetailOpen.value ? content.value.scrollHeight : 0;
  }
};

watch(
  () => [schoolListStore.programListOptions, appStore.userData],
  () => {
    if (appStore.userData && schoolListStore.isAllowwedOnUserDadaChange) {
      setInitialValues(appStore.userData);
    } else {
      schoolListStore.isAllowwedOnUserDadaChange = true;
    }
  }
);

watch(() => isDetailOpen.value, calculateHeight);

onMounted(async () => {
  calculateHeight();
  if (focusDiv.value) {
    resizeObserver = new ResizeObserver(() => {
      updateModalPosition();
    });
    resizeObserver.observe(focusDiv.value);
  }
  if (appStore.firstTimeUser) {
    updateModalPosition();
  }
  window.addEventListener("resize", updateModalPosition);
  window.addEventListener("resize", windowSize);
});

onUnmounted(() => {
  if (resizeObserver && focusDiv.value) {
    resizeObserver.unobserve(focusDiv.value);
    resizeObserver.disconnect();
  }
  window.removeEventListener("resize", updateModalPosition);
  window.removeEventListener("resize", windowSize);
});
</script>
