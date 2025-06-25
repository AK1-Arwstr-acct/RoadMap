<template>
  <div class="remove-shadow-bg-white flex gap-2.5 items-center lg:flex-wrap overflow-x-auto overflow-y-hidden lg:overflow-y-visible lg:overflow-x-visible no-scrollbar">
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
    <!-- <Transition name="fade">
      <div class="mt-5" v-if="dashboardStore.locationOptions.length">
        <div
          class="flex flex-col gap-3"
          :class="[
            { 'pointer-events-none': isLocationchange || isGpaChange },
            { 'animate-pulse': isLocationLoading },
          ]"
        >
          <p class="font-medium text-[#414651] text-sm">
            {{ $t("schoolList_page.study_destination")
            }}<span class="text-[#D92D20] font-medium">*</span>
          </p>
          <div class="flex flex-col gap-4">
            <div
              v-for="(option, index) in dashboardStore.locationOptions"
              :key="index"
            >
              <label
                class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200"
              >
                <input
                  :id="`destination${index}`"
                  type="checkbox"
                  name="countries"
                  :value="option.value"
                  :checked="
                    option.value.some((id: number) =>
                      selectedLocationOptions.includes(id)
                    )
                  "
                  class="hidden peer"
                  @change="toggleSelection(option.value)"
                />
                <div
                  class="size-5 flex justify-center items-center border-2 rounded-md transition-all"
                  :class="[
                    option?.value.some((id: number) =>
                      selectedLocationOptions.includes(id)
                    )
                      ? 'border-[#1570EF] bg-[#1570EF]'
                      : 'border-gray-200',
                  ]"
                >
                  <IconTick
                    v-if="
                      option?.value.some((id: number) =>
                        selectedLocationOptions.includes(id)
                      )
                    "
                    stroke="#ffffff"
                  />
                </div>
                <div
                  class="flex items-center gap-2 text-[#414651]"
                  :for="`destination${index}`"
                >
                  <component
                    :is="
                      option.label.toLowerCase().includes('kingdom')
                        ? IconUK
                        : option.label.toLowerCase().includes('canada')
                        ? IconCanada
                        : option.label.toLowerCase().includes('australia')
                        ? IconAustralia
                        : option.label.toLowerCase().includes('states')
                        ? IconUS
                        : IconEurope
                    "
                    class="w-6 h-6"
                  />
                  {{ option.label }}
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Transition> -->
    <DestinationsDropdown
      label="Destination"
      :required="true"
      :loading="isLocationLoading"
      v-model="selectedLocationOptions"
      @onChange="destinationUpdates"
      :disabled="isLocationchange || isGpaChange || !dashboardStore.locationOptions.length"
      :openDropdown="openDropdown"
      dropdownName="destination"
      @open="(value: string) => (openDropdown = value as Dropdowns)"
    />
    <!-- <div class="mt-5">
      <BaseSelectRadio
        :label="t('schoolList_page.annual_total_budget')"
        :options="dashboardStore.budgetList"
        v-model="annualBudget"
        direction="upward"
        :loading="isBudgetLoading"
        :disabled="
          !route.path.includes('/demo') &&
          (!dashboardStore.budgetList.length || isBudgetLoading)
        "
        @onChange="getProgramParent"
      />
    </div> -->
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
          (!dashboardStore.coursePreferenceOptions.length ||
            isAreaOfStudyLoading)
        "
      :loading="isAreaOfStudyLoading"
      @onChange="updateUserData"
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
import IconUK from "../../icons/IconUK.vue";
import IconCanada from "../../icons/IconCanada.vue";
import IconAustralia from "../../icons/IconAustralia.vue";
import IconUS from "../../icons/IconUS.vue";
import IconEurope from "../../icons/IconEurope.vue";
import type { Dropdowns } from "~/types/dashboard";

const dashboardStore = useDashboardStore();
const { api } = useApi();
const { showToast } = useToast();
const { t } = useI18n();
const route = useRoute();

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

// for dropdowns open
const openDropdown = ref<Dropdowns>("");

const isUpdateBtnDisable = computed(() => {
  return !!(
    gpa.value &&
    studyPrograms.value?.value &&
    selectedLocationOptions.value.length > 0 &&
    annualBudget.value?.value &&
    areaOfStudy.value?.value
  );
});

// const toggleSelection = async (ids: number[]) => {
//   const allSelected = ids.every((id) =>
//     selectedLocationOptions.value.includes(id)
//   );
//   if (allSelected) {
//     selectedLocationOptions.value = selectedLocationOptions.value.filter(
//       (id) => !ids.includes(id)
//     );
//   } else {
//     selectedLocationOptions.value = [
//       ...new Set([...selectedLocationOptions.value, ...ids]),
//     ];
//   }
//   isLocationchange.value = true;
//   await getBudgets();
//   isLocationchange.value = false;
// };

const destinationUpdates = async () => {
  isLocationchange.value = true;
  await getBudgets();
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

const resetUserData = () => {
  gpa.value = "";
  studyPrograms.value = undefined;
  selectedLocationOptions.value = [];
  annualBudget.value = undefined;
  areaOfStudy.value = undefined;
  dashboardStore.locationOptions = [];
  dashboardStore.budgetList = [];
  dashboardStore.coursePreferenceOptions = [];
  dashboardStore.selectedPublicMajors = [];
  dashboardStore.isPublicMajorEnable = false;
};

const updateUserData = async () => {
  try {
    isSubmitting.value = true;
    const token = useCookie("publicUserData", {
      maxAge: 604800,
      httpOnly: false,
      secure: true,
    });
    const { min, max } = getMinMax();
    const payload = {
      cgpa: gpa.value,
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

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const gpaChanged = async () => {
  isGpaChange.value = true;
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(async () => {
    await programChanged();
    isGpaChange.value = false;
  }, 1000);
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
