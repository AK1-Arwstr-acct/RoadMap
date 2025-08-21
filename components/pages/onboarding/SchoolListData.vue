<template>
  <div class="max-w-[1000px] w-full flex justify-center">
    <div class="flex-1 max-w-[410px] flex flex-col gap-8 md:gap-10">
      <div class="flex flex-col items-center gap-4">
        <img
          src="/images/school-list.png"
          alt="academic"
          class="size-20 min-w-20"
        />
        <h1 class="text-text-base text-xl md:text-2xl font-medium text-center">
          {{ $t("onboarding.tell_us_your_intended_plan") }}
        </h1>
      </div>
      <div class="flex flex-col gap-8 md:gap-10">
        <BaseSelectRadio
          :label="t('onboarding.what_degree_are_you_planning_to_pursue')"
          :options="programListOptions"
          v-model="schoolListData.degreeProgram"
          :disabled="programListOptions.length === 0"
          :loading="isProgramLoading"
          :required="true"
          @onChange="getStudyDestination"
          :openDropdown="openDropdown"
          dropdownName="program_list"
          @open="(value: string) => (openDropdown = value as string)"
        />
        <Transition name="fade">
          <div v-if="locationOptions.length" class="flex flex-col gap-3">
            <p class="font-medium text-text-neutral-subtle text-sm">
              {{ $t("onboarding.where_would_you_like_to_study")
              }}<span class="text-text-error font-medium"> *</span>
            </p>
            <div class="flex flex-wrap gap-3">
              <div v-for="(option, index) in locationOptions" :key="index">
                <label
                  class="w-fit pl-1 pr-[10px] py-1 flex items-center gap-1.5 size-full font-medium rounded-full cursor-pointer relative transition-all ease-in-out duration-200 text-sm border"
                  :class="[
                              option?.value.some((id: number) =>
                                schoolListData.selectedCountries.includes(id)
                              )
                                ? 'border-border-brand bg-background-brand-subtle text-text-brand'
                                : 'border-border-neutral-subtle text-text-base',
                            ]"
                >
                  <input
                    :id="`destination${index}`"
                    type="checkbox"
                    name="countries"
                    :value="option.value"
                    :checked="option.value.some((id: number) =>
                                          schoolListData.selectedCountries.includes(id)
                                      )
                                          "
                    class="hidden peer"
                    @change="toggleSelection(option.value)"
                  />
                  <div
                    class="flex items-center gap-2"
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
        </Transition>
        <BaseSelectRadio
          :label="t('onboarding.when_do_you_plan_to_enroll')"
          :options="enrollPlanOptions"
          v-model="schoolListData.enrollPlan"
          :disabled="enrollPlanOptions.length === 0"
          :loading="enrollPlanOptions.length === 0"
          :required="true"
          :openDropdown="openDropdown"
          dropdownName="enroll_plan"
          @open="(value: string) => (openDropdown = value as string)"
        />
        <BaseSelectRadio
          :label="t('onboarding.what_is_your_estimated_budget_per_year')"
          :options="budgetListOptions"
          v-model="schoolListData.budget"
          :disabled="budgetListOptions.length === 0"
          :loading="isBudgetLoading"
          :required="true"
          direction="upward"
          :openDropdown="openDropdown"
          dropdownName="budget_option"
          @open="(value: string) => (openDropdown = value as string)"
        />
      </div>
      <div class="flex items-center gap-10">
        <button
          @click="onSubmit"
          :disabled="isDisable || isSubmitting"
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
import useOnboardingStore from "~/stores/OnboardingStore";
import useAppStore from "~/stores/AppStore";
import useSchoolListStore from "~/stores/SchoolListStore";
import type {
  CountriesOptionAttributes,
  OptionAttributes,
  UserData,
} from "~/types/home";
import IconUK from "~/components/icons/IconUK.vue";
import IconCanada from "~/components/icons/IconCanada.vue";
import IconAustralia from "~/components/icons/IconAustralia.vue";
import IconUS from "~/components/icons/IconUS.vue";
import IconEurope from "~/components/icons/IconEurope.vue";
import axios from "axios";

const onboardingStore = useOnboardingStore();

const emit = defineEmits(["updateStep"]);
const { showToast } = useToast();
const { api } = useApi();
const appStore = useAppStore();
const { t } = useI18n();
const schoolListStore = useSchoolListStore();

interface SchoolListData {
  degreeProgram: OptionAttributes | null;
  selectedCountries: number[];
  enrollPlan: OptionAttributes | null;
  budget: OptionAttributes | null;
}

const schoolListData = ref<SchoolListData>({
  degreeProgram: null,
  selectedCountries: [],
  enrollPlan: null,
  budget: null,
});

const programListOptions = ref<OptionAttributes[]>([]);
const locationOptions = ref<CountriesOptionAttributes[]>([]);
const budgetListOptions = ref<OptionAttributes[]>([]);
const isProgramLoading = ref<boolean>(false);
const isLocationLoading = ref<boolean>(false);
const isBudgetLoading = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);

// for dropdown open
const openDropdown = ref<string>("");

const enrollPlanOptions: OptionAttributes[] = [
  {
    value: "Fall 2025",
    label: "Fall 2025",
  },
  {
    value: "Spring 2026",
    label: "Spring 2026",
  },
  {
    value: "Fall 2026",
    label: "Fall 2026",
  },
  {
    value: "Spring 2027",
    label: "Spring 2027",
  },
  {
    value: "Fall 2027",
    label: "Fall 2027",
  },
  {
    value: "Spring 2028",
    label: "Spring 2028",
  },
  {
    value: "Fall 2028",
    label: "Fall 2028",
  },
  {
    value: "Spring 2029",
    label: "Spring 2029",
  },
  {
    value: "Fall 2029",
    label: "Fall 2029",
  },
];

const isDisable = computed(() => {
  return !(
    schoolListData.value.budget &&
    schoolListData.value.degreeProgram &&
    schoolListData.value.selectedCountries.length &&
    schoolListData.value.enrollPlan
  );
});

const toggleSelection = async (ids: number[]) => {
  schoolListData.value.budget = null;
  budgetListOptions.value = [];
  const allSelected = ids.every((id) =>
    schoolListData.value.selectedCountries.includes(id)
  );
  if (allSelected) {
    schoolListData.value.selectedCountries =
      schoolListData.value.selectedCountries.filter((id) => !ids.includes(id));
  } else {
    schoolListData.value.selectedCountries = [
      ...new Set([...schoolListData.value.selectedCountries, ...ids]),
    ];
  }
  getBudgets();
};

const getStudyPrograms = async () => {
  isProgramLoading.value = true;
  programListOptions.value = await schoolListStore.setProgramListOptions();
  isProgramLoading.value = false;
};

const getStudyDestination = async () => {
  try {
    isLocationLoading.value = true;
    schoolListData.value.selectedCountries = [];
    schoolListData.value.budget = null;
    budgetListOptions.value = [];
    const payload = {
      cgpa: String(appStore.userData?.educational_records.cgpa || 0),
      class_grade_ids: [Number(schoolListData.value.degreeProgram?.value)],
    };
    const response = await schoolListStore.setLocationOptions(payload);
    if (response) {
      locationOptions.value = response.map(
        (item: CountriesOptionAttributes) => {
          let name = item.label.toLowerCase().split(" ").join("_");
          return {
            value: item.value,
            label: item.label,
            icon: name.includes("united_kingdom")
              ? shallowRef(IconUK)
              : name.includes("canada")
              ? shallowRef(IconCanada)
              : name.includes("australia")
              ? shallowRef(IconAustralia)
              : name.includes("united_states")
              ? shallowRef(IconUS)
              : shallowRef(IconEurope),
          };
        }
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
    isLocationLoading.value = false;
  }
};

const getBudgets = async () => {
  try {
    isBudgetLoading.value = true;
    budgetListOptions.value = await schoolListStore.setBudgetList({
      country_ids: schoolListData.value.selectedCountries,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isBudgetLoading.value = false;
  }
};

const getMinMax = () => {
  if (schoolListData.value.budget) {
    const matches = schoolListData.value.budget.value.match(/\d+,\d+|\d+/g);
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

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    const { min, max } = getMinMax();
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      next_educational_class_grade_id:
        Number(schoolListData.value.degreeProgram?.value) || null,
      destination_country_ids: schoolListData.value.selectedCountries,
      annual_min_budget: min,
      annual_max_budget: max,
    });
    await api.post("/api/v1/student/update-profile-partial-info", {
      enroll_year: schoolListData.value.enrollPlan?.value,
    });
    await appStore.getUserData();
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

const onKeydown = (event: KeyboardEvent) => {
  if (
    event.key === "Enter" &&
    schoolListData.value.budget &&
    schoolListData.value.degreeProgram &&
    schoolListData.value.selectedCountries.length &&
    schoolListData.value.budget
  ) {
    onSubmit();
  }
};

const setInitialValues = async (newValue: UserData) => {
  schoolListData.value.degreeProgram =
    programListOptions.value.find(
      (item) =>
        Number(item.value) === newValue?.educational_records.next_class_grade.id
    ) ?? null;

  await getStudyDestination();
  schoolListData.value.selectedCountries =
    appStore.userData?.educational_records.want_to_study_countries.map(
      (item) => item.id
    ) || [];

  schoolListData.value.enrollPlan =
    enrollPlanOptions.find(
      (item) => item.value == appStore.userData?.enroll_year
    ) ?? null;
  await getBudgets();
  schoolListData.value.budget =
    budgetListOptions.value.find((item) =>
      item.value.includes(`${newValue?.educational_records.annual_max_budget}`)
    ) || null;
};

onMounted(async () => {
  onboardingStore.onboardingStep = 3;
  await getStudyPrograms();
  if (appStore.userData?.onboarded) {
    setInitialValues(appStore.userData);
  }
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
});
</script>
