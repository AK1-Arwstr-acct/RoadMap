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
      :options="dashboardStore.programListOptions"
      v-model="studyPrograms"
      @onChange="onProgramChanged"
      :disabled="isGpaChange"
      :openDropdown="openDropdown"
      dropdownName="program"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <DestinationsDropdown
      label="Destination"
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
      :options="dashboardStore.budgetList"
      v-model="annualBudget"
      :loading="isBudgetLoading"
      :disabled="
        !dashboardStore.locationOptions.length ||
        isLocationchange ||
        isLocationLoading ||
        isGpaChange
      "
      @onChange="onBudgetDropdownChange"
      :openDropdown="openDropdown"
      dropdownName="budget"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <BaseSelectRadioNew
      :label="t('schoolList_page.area_of_study')"
      :required="true"
      :options="dashboardStore.coursePreferenceOptions"
      v-model="areaOfStudy"
      :disabled="
        !dashboardStore.locationOptions.length ||
        isLocationchange ||
        isLocationLoading ||
        isGpaChange
      "
      :loading="isAreaOfStudyLoading"
      @onChange="updateUserData"
      :openDropdown="openDropdown"
      dropdownName="areaOfStudy"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <div class="relative">
      <div>
        <MajorSelection
          :openDropdown="openDropdown"
          dropdownName="majors"
          @open="(value: string) => (openDropdown = value as Dropdowns)"
        />
      </div>
      <div
        v-if="appStore.firstTimeUser && width > 1024"
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
          v-if="appStore.firstTimeUser && width > 1024"
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
      v-if="appStore.firstTimeUser && width > 1024"
      class="fixed z-20 inset-0 bg-black/60"
    />
  </Transition>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import useAppTrackerStore from "~/stores/AppTrackerStore";
import type { OptionAttributes, UserData } from "~/types/home";
import useAppStore from "~/stores/AppStore";
import axios from "axios";
import type { Dropdowns } from "~/types/dashboard";

const dashboardStore = useDashboardStore();
const appTrackerStore = useAppTrackerStore();
const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();
const { t } = useI18n();

const isSubmitting = ref<boolean>(false);
const isDetailOpen = ref<boolean>(false);
const gpa = ref<string>("");
const annualBudget = ref<OptionAttributes>();
const studyPrograms = ref<OptionAttributes>();
const areaOfStudy = ref<OptionAttributes>();
const selectedLocationOptions = ref<number[]>([]);
const contentHeight = ref(0);
const content = ref<HTMLElement | null>(null);
const isBudgetLoading = ref<boolean>(false);
const isAreaOfStudyLoading = ref<boolean>(false);
const isGpaChange = ref<boolean>(false);
const isLocationchange = ref<boolean>(false);
const isLocationLoading = ref<boolean>(false);
const width = ref<number>(0);

// for dropdowns open
const openDropdown = ref<Dropdowns>("");

// first time user modal
const focusDiv = ref<HTMLElement | null>(null);
const modalPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });
let resizeObserver: ResizeObserver | null = null;

// const isUpdateBtnDisable = computed(() => {
//   return !!(
//     gpa.value &&
//     studyPrograms.value?.value &&
//     selectedLocationOptions.value.length > 0 &&
//     annualBudget.value?.value &&
//     areaOfStudy.value?.value
//   );
// });

// const disabledBtn = computed(() => {
//   let countryCheck =
//     appStore.userData?.educational_records.want_to_study_countries
//       .map((item) => item.id)
//       .every((id) => selectedLocationOptions.value.includes(id));

//   return (
//     Number(gpa.value) === appStore.userData?.educational_records.cgpa &&
//     Number(studyPrograms.value?.value) ===
//       appStore.userData?.educational_records.next_class_grade.id &&
//     Number(annualBudget.value?.value.split("-")[1]) ===
//       appStore.userData?.educational_records.annual_max_budget &&
//     Number(areaOfStudy.value?.value) ===
//       appStore.userData?.educational_records.super_meta_category.id &&
//     appStore.userData?.educational_records.want_to_study_countries.length ===
//       selectedLocationOptions.value.length &&
//     countryCheck
//   );
// });

const convertedCgpa = computed(() => {
  return gpa.value ? ((Number(gpa.value) / 10) * 4).toFixed(2) : "";
});

const updateUserData = async () => {
  try {
    const { min, max } = getMinMax();
    isSubmitting.value = true;
    const cgpaOutOf4 = convertedCgpa.value;
    const payload = {
      cgpa: cgpaOutOf4,
      annual_min_budget: min,
      annual_max_budget: max,
      destination_country_ids: selectedLocationOptions.value,
      next_educational_class_grade_id: studyPrograms.value?.value,
      super_meta_category_id: areaOfStudy.value?.value,
    };
    await api.post("/api/v1/student/update-profile-basic-info", payload);
    showToast("Profile updated successfully", {
      type: "success",
    });
    const countries =
      appStore.userData?.educational_records.want_to_study_countries.map(
        (item) => item.id
      );
    if (
      countries?.length !== selectedLocationOptions.value.length ||
      !countries?.every((item) =>
        selectedLocationOptions.value.includes(item)
      ) ||
      !selectedLocationOptions.value.every((item) => countries?.includes(item))
    ) {
      await appTrackerStore.getRoadmapData();
    }
    await appStore.getUserData();
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

const destinationUpdates = async () => {
  dashboardStore.isSchoolsLoading = true;
  await updateUserData();
  isLocationchange.value = true;
  await getBudgets();
  await getProgramParent();
  isLocationchange.value = false;
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

// const resetUserData = () => {
//   if (appStore.userData) {
//     setInitialValues(appStore.userData);
//     gpaChanged();
//   }
// };

const setInitialValues = (newValue: UserData) => {
  gpa.value =
    `${(
      (parseFloat(String(newValue?.educational_records.cgpa)) / 4) *
      10
    ).toFixed(0)}` || "";
  studyPrograms.value = dashboardStore.programListOptions.find(
    (item) =>
      Number(item.value) == newValue?.educational_records.next_class_grade.id
  );
  selectedLocationOptions.value =
    appStore.userData?.educational_records.want_to_study_countries.map(
      (item) => item.id
    ) || [];
  //
  annualBudget.value =
    dashboardStore.budgetList?.find((item) =>
      item.value.includes(`${newValue?.educational_records.annual_max_budget}`)
    ) || undefined;
  areaOfStudy.value = dashboardStore.coursePreferenceOptions?.find(
    (item) =>
      Number(item.value) == newValue?.educational_records.super_meta_category.id
  );
};

const onProgramChanged = async () => {
  dashboardStore.isSchoolsLoading = true;
  await updateUserData();
   programChanged();
   getBudgets();
   getProgramParent();
};

const programChanged = async () => {
  try {
    if (!gpa.value || !studyPrograms.value?.value) {
      return;
    }
    isLocationLoading.value = true;
    const response = await api.get(`/api/v1/school/recommended/countries`);
    if (response.data.data) {
      dashboardStore.locationOptions = response.data.data?.map(
        (item: { country_ids: number[]; title: string }) => {
          return {
            value: item.country_ids,
            label: item.title,
          };
        }
      );
      if (!dashboardStore.locationOptions.length) {
        areaOfStudy.value = undefined;
        annualBudget.value = undefined;
      }
      isLocationLoading.value = false;
    }
  } catch (error) {}
};

const onBudgetDropdownChange = async () => {
  dashboardStore.isSchoolsLoading = true;
  await updateUserData();
  getProgramParent();
};

const getProgramParent = async () => {
  try {
    if (
      !gpa.value ||
      !annualBudget.value ||
      selectedLocationOptions.value.length <= 0 ||
      !studyPrograms.value?.value
    ) {
      return;
    }
    isAreaOfStudyLoading.value = true;
    const response = await api.get(
      "/api/v1/school/recommended/get-super-meta-categories"
    );
    if (response.data.data) {
      dashboardStore.coursePreferenceOptions = response.data.data.map(
        (item: { id: number; title: string }) => {
          return {
            value: item?.id,
            label: item?.title,
          };
        }
      );
    }
    isAreaOfStudyLoading.value = false;
    // await updateUserData();
    getRecommendations();
  } catch (error) {
    console.error(error);
  }
};

const getBudgets = async () => {
  try {
    isBudgetLoading.value = true;
    const response = await api.get(`/api/v1/school/recommended/budget-range`);
    if (response.data.data.length) {
      dashboardStore.budgetList = response.data.data.map(
        (item: [string | number, string | number]) => {
          const min =
            typeof item[0] === "string"
              ? Number(item[0].replace(/\+/g, ""))
              : item[0];
          const max =
            typeof item[1] === "string"
              ? Number(item[1].replace(/\+/g, ""))
              : item[1];
          return {
            value: `${item[0]}-${!!item[1] ? item[1] : ""}`,
            label: `${budgetWithComma(item[0])}  ${
              !!item[1] ? " - " + budgetWithComma(item[1]) : ""
            }`,
            min: min,
            max: max,
          };
        }
      );
    } else {
      dashboardStore.budgetList = [];
      dashboardStore.coursePreferenceOptions = [];
    }
    isBudgetLoading.value = false;
  } catch (error) {
    isBudgetLoading.value = false;
    dashboardStore.budgetList = [];
    dashboardStore.coursePreferenceOptions = [];
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const gpaChanged = async () => {
  dashboardStore.isSchoolsLoading = true;
  await updateUserData();
  isGpaChange.value = true;
  await programChanged();
  await getBudgets();
  await getProgramParent();
  isGpaChange.value = false;
};

const getRecommendations = async () => {
  if (appStore.userData) {
    if (appStore.userData.educational_records.next_program_titles.length > 0) {
      await dashboardStore.runEngine();
    } else {
      await dashboardStore.preRunEngine();
    }
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

watch(
  () => appStore.userData,
  () => {
    if (appStore.userData) {
      setInitialValues(appStore.userData);
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => dashboardStore.programListOptions,
  () => {
    studyPrograms.value = dashboardStore.programListOptions.find(
      (item) =>
        Number(item.value) ==
        appStore.userData?.educational_records.next_class_grade.id
    );
  }
);
watch(
  () => dashboardStore.budgetList,
  () => {
    annualBudget.value =
      dashboardStore.budgetList?.find((item) =>
        item.value.includes(
          `${appStore.userData?.educational_records.annual_max_budget}`
        )
      ) || undefined;
  }
);
watch(
  () => dashboardStore.coursePreferenceOptions,
  () => {
    areaOfStudy.value =
      dashboardStore.coursePreferenceOptions?.find(
        (item) => Number(item.value) == Number(areaOfStudy.value?.value)
      ) || undefined;

    if (areaOfStudy.value?.value) {
      return;
    }

    areaOfStudy.value =
      dashboardStore.coursePreferenceOptions?.find(
        (item) =>
          Number(item.value) ==
          appStore.userData?.educational_records.super_meta_category.id
      ) || undefined;
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

watch(() => isDetailOpen.value, calculateHeight);

onMounted(() => {
  calculateHeight();
  if (!dashboardStore.locationOptions.length) {
    areaOfStudy.value = undefined;
    annualBudget.value = undefined;
  }
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
