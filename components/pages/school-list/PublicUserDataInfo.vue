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
      @onChange="programChanged"
      :disabled="isGpaChange || !gpa"
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
      :disabled="
        isLocationchange ||
        isGpaChange ||
        !dashboardStore.locationOptions.length
      "
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
        !route.path.includes('/demo') &&
        (!dashboardStore.budgetList.length || isBudgetLoading)
      "
      @onChange="getProgramParent"
      :openDropdown="openDropdown"
      dropdownName="budget"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <!-- <div class="mt-5">
      <BaseSelectRadio
        :label="t('schoolList_page.area_of_study')"
        :required="true"
        :options="dashboardStore.coursePreferenceOptions"
        v-model="areaOfStudy"
        direction="upward"
        :disabled="
          !route.path.includes('/demo') &&
          (!dashboardStore.coursePreferenceOptions.length ||
            isAreaOfStudyLoading)
        "
        :loading="isAreaOfStudyLoading"
      />
    </div> -->
    <BaseSelectRadioNew
      :label="t('schoolList_page.area_of_study')"
      :required="true"
      :options="dashboardStore.coursePreferenceOptions"
      v-model="areaOfStudy"
      :disabled="
        !route.path.includes('/demo') &&
        (!dashboardStore.coursePreferenceOptions.length || isAreaOfStudyLoading)
      "
      :loading="isAreaOfStudyLoading"
      @onChange="updateSchools"
      :openDropdown="openDropdown"
      dropdownName="areaOfStudy"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <PublicMajorsSelection
      :openDropdown="openDropdown"
      dropdownName="majors"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <SophieRecommendation />
    <!-- <div class="mt-6 flex gap-3 border-b-8 border-transparent">
      <button
        @click="resetUserData"
        class="p-2.5 border-[1.5px] border-gray-200 w-full rounded-lg font-semibold text-sm text-[#414651]"
      >
        {{ $t("schoolList_page.reset_all") }}
      </button>
      <button
        @click="updateUserData"
        :disabled="!isUpdateBtnDisable"
        class="p-2.5 bg-[#1570EF] disabled:bg-[#84CAFF] w-full rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2"
      >
        {{ $t("schoolList_page.update") }}
        <IconSpinner v-if="isSubmitting" class="size-3.5" bgColor="#ffffff00" />
      </button>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import type { OptionAttributes, UserData } from "~/types/home";
import axios from "axios";
import type { Dropdowns } from "~/types/dashboard";

const dashboardStore = useDashboardStore();
const { api } = useApi();
const { showToast } = useToast();
const { t } = useI18n();
const route = useRoute();

const isSubmitting = ref<boolean>(false);
const isDetailOpen = ref<boolean>(false);
const gpa = ref<string>("9");
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

// for dropdowns open
const openDropdown = ref<Dropdowns>("");

const updateUserData = async () => {
  try {
    isSubmitting.value = true;
    const token = useCookie("publicUserData", {
      maxAge: 604800,
      httpOnly: false,
      secure: true,
    });
    const { min, max } = getMinMax();
    const cgpaOutOf4 = gpa.value ? ((Number(gpa.value) / 10) * 4).toFixed(2) : "";
    const payload = {
      cgpa: cgpaOutOf4,
      class_grade_ids: studyPrograms.value?.value,
      min_budget: min,
      max_budget: max,
      country_ids: selectedLocationOptions.value,
      program_title_parent_id: areaOfStudy.value?.value,
    };
    token.value = JSON.stringify(payload);
    dashboardStore.programTitleParentId = areaOfStudy.value?.value || "";
    await dashboardStore.preRunEngine();
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

const destinationUpdates = async () => {
  isLocationchange.value = true;
  await getBudgets();
  updateSchools();
  // await getProgramParent();
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
//   gpa.value = "";
//   studyPrograms.value = undefined;
//   selectedLocationOptions.value = [];
//   annualBudget.value = undefined;
//   areaOfStudy.value = undefined;
//   dashboardStore.locationOptions = [];
//   dashboardStore.budgetList = [];
//   dashboardStore.coursePreferenceOptions = [];
//   dashboardStore.selectedPublicMajors = [];
//   dashboardStore.isPublicMajorEnable = false;
// };

const programChanged = async () => {
  try {
    if (!gpa.value || !studyPrograms.value?.value) {
      return;
    }
    selectedLocationOptions.value = [];
    annualBudget.value = undefined;
    areaOfStudy.value = undefined;
    dashboardStore.locationOptions = [];
    dashboardStore.budgetList = [];
    dashboardStore.coursePreferenceOptions = [];
    isLocationLoading.value = true;
    const publicToken = useCookie("publicToken");
    const response = await api.post(
      "/api/v2/session-based-journey/school-recommended/countries",
      {
        cgpa: gpa.value,
        class_grade_ids: [studyPrograms.value?.value],
        // uniqueId: appStore.userData?.uuid,
      },
      {
        headers: {
          "X-auth-token": publicToken.value,
        },
      }
    );
    if (response.data.data) {
      dashboardStore.locationOptions = response.data.data?.map(
        (item: { country_ids: number[]; title: string }) => {
          return {
            value: item.country_ids,
            label: item.title,
          };
        }
      );
      await nextTick();
      calculateHeight();
      isLocationLoading.value = false;
    }
    updateSchools();
  } catch (error) {}
};

const getProgramParent = async () => {
  try {
    isAreaOfStudyLoading.value = true;
    const publicToken = useCookie("publicToken");
    const response = await api.post(
      "/api/v2/session-based-journey/school-recommended/get-super-meta-categories",
      {
        min_budget: null,
        max_budget: (annualBudget.value as { max?: number }).max,
      },
      {
        headers: {
          "X-auth-token": publicToken.value,
        },
      }
    );
    dashboardStore.coursePreferenceOptions = response.data.data.map(
      (item: { id: number; title: string }) => {
        return {
          value: item?.id,
          label: item?.title,
        };
      }
    );
    isAreaOfStudyLoading.value = false;
    updateSchools();
  } catch (error) {
    console.error(error);
  }
};

const getBudgets = async () => {
  try {
    isBudgetLoading.value = true;
    const publicToken = useCookie("publicToken");
    const response = await api.post(
      "/api/v2/session-based-journey/school-recommended/budget-range",
      {
        country_ids: selectedLocationOptions.value || [],
      },
      {
        headers: {
          "X-auth-token": publicToken.value,
        },
      }
    );
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
    isBudgetLoading.value = false;
  } catch (error) {
    isBudgetLoading.value = false;
    dashboardStore.budgetList = [];
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const gpaChanged = async () => {
  isGpaChange.value = true;
  await programChanged();
  isGpaChange.value = false;
  updateSchools();
};

const calculateHeight = () => {
  if (content.value) {
    contentHeight.value = isDetailOpen.value ? content.value.scrollHeight : 0;
  }
};

watch(() => isDetailOpen.value, calculateHeight);

onMounted(() => {
  calculateHeight();
});
</script>
