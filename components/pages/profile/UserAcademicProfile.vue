<template>
  <section>
    <div class="mb-6">
      <h2 class="text-[#181D27] text-sm md:text-lg font-semibold">
        {{ $t("profile_page.edit_profile_page.academic_details_info") }}
      </h2>
      <p class="text-[#535862] text-sm">
        {{ $t("profile_page.edit_profile_page.update_academic_info") }}
      </p>
    </div>
    <div
      class="remove-shadow-bg-white bg-white border-[1.5px] border-gray-200 rounded-2xl"
    >
      <div class="p-6 flex flex-col md:grid md:grid-cols-2 gap-6">
        <div class="">
          <label class="font-medium text-[#414651] text-sm"
            >{{ $t("profile_page.gpa")
            }}<span class="text-[#D92D20] font-medium">*</span></label
          >
          <input
            name="ielts"
            type="text"
            v-model="gpa"
            :placeholder="t('profile_page.edit_profile_page.enter_gpa')"
            class="mt-1 rounded-lg border-2 shadow-sm border-gray-200 py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
            @input="gpaChanged"
            data-hj-allow
          />
        </div>
        <div class="">
          <BaseSelectRadio
            :label="t('profile_page.study_program')"
            :required="true"
            :options="schoolListStore.programListOptions"
            v-model="studyPrograms"
            @onChange="getLocationsList"
          />
        </div>
        <div class="col-span-2">
          <div
            class="flex flex-col gap-3 w-fit"
            :class="[
              { 'pointer-events-none': isLocationchange },
              { 'animate-pulse': isLocationLoading },
            ]"
          >
            <p class="font-medium text-[#414651] text-sm">
              {{ $t("profile_page.study_destination")
              }}<span class="text-[#D92D20] font-medium">*</span>
            </p>
            <div class="flex flex-col gap-4">
              <div
                v-for="(option, index) in schoolListStore.locationOptions"
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
        <div class="">
          <BaseSelectRadio
            :label="t('profile_page.annual_total_budget')"
            :options="schoolListStore.budgetList"
            v-model="annualBudget"
            direction="upward"
            :loading="isBudgetLoading"
            @onChange="getProgramParent"
            :disabled="
              !schoolListStore.locationOptions.length ||
              !schoolListStore.budgetList.length ||
              isLocationchange ||
              isLocationLoading ||
              isGpaChange
            "
          />
        </div>
        <div class="">
          <BaseSelectRadio
            :label="t('profile_page.area_of_study')"
            :required="true"
            :options="schoolListStore.coursePreferenceOptions"
            v-model="areaOfStudy"
            direction="upward"
            :loading="isAreaOfStudyLoading"
            :disabled="
              !schoolListStore.locationOptions.length ||
              !schoolListStore.coursePreferenceOptions.length ||
              isLocationchange ||
              isLocationLoading ||
              isGpaChange
            "
          />
        </div>
      </div>
      <div
        class="flex justify-end gap-3 border-t-[1.5px] border-gray-200 py-4 px-6"
      >
        <button
          @click="resetUserData"
          :disabled="disabledBtn"
          class="py-2.5 px-4 border-[1.5px] border-gray-200 w-fit rounded-lg font-semibold text-sm text-[#414651]"
        >
          {{ $t("profile_page.edit_profile_page.cancel") }}
        </button>
        <button
          @click="updateAuthUserData"
          :disabled="
            !isUpdateBtnDisable ||
            disabledBtn ||
            isBudgetLoading ||
            isAreaOfStudyLoading ||
            isLocationLoading ||
            isGpaChange ||
            isSubmitting
          "
          class="py-2.5 px-4 bg-[#1570EF] disabled:bg-[#84CAFF] w-fit rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2"
        >
          {{ $t("profile_page.edit_profile_page.save_changes") }}
          <IconSpinner
            v-if="isSubmitting"
            width="14"
            height="14"
            bgColor="#ffffff00"
          />
        </button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import useSchoolListStore from "~/stores/SchoolListStore";
import type { OptionAttributes, UserData } from "~/types/home";
import useAppStore from "~/stores/AppStore";
import axios from "axios";
import IconUK from "~/components/icons/IconUK.vue";
import IconUS from "~/components/icons/IconUS.vue";
import IconAustralia from "~/components/icons/IconAustralia.vue";
import IconEurope from "~/components/icons/IconEurope.vue";
import IconCanada from "~/components/icons/IconCanada.vue";

const schoolListStore = useSchoolListStore();
const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();
const { t } = useI18n();

const isSubmitting = ref<boolean>(false);
const gpa = ref<string>("");
const annualBudget = ref<OptionAttributes | null>();
const studyPrograms = ref<OptionAttributes>();
const areaOfStudy = ref<OptionAttributes | null>();
const selectedLocationOptions = ref<number[]>([]);
const isBudgetLoading = ref<boolean>(false);
const isAreaOfStudyLoading = ref<boolean>(false);
const isGpaChange = ref<boolean>(false);
const isLocationchange = ref<boolean>(false);
const isLocationLoading = ref<boolean>(false);

const isUpdateBtnDisable = computed(() => {
  return !!(
    gpa.value &&
    studyPrograms.value?.value &&
    selectedLocationOptions.value.length > 0 &&
    annualBudget.value?.value &&
    areaOfStudy.value?.value
  );
});

const disabledBtn = computed(() => {
  let countryCheck =
    appStore.userData?.educational_records.want_to_study_countries
      .map((item) => item.id)
      .every((id) => selectedLocationOptions.value.includes(id));

  return (
    Number(gpa.value) ===
      Number(outOfTenGpa(appStore.userData?.educational_records.cgpa ?? 0)) &&
    Number(studyPrograms.value?.value) ===
      appStore.userData?.educational_records.next_class_grade.id &&
    Number(annualBudget.value?.value.split("-")[1]) ===
      appStore.userData?.educational_records.annual_max_budget &&
    Number(areaOfStudy.value?.value) ===
      appStore.userData?.educational_records.super_meta_category.id &&
    appStore.userData?.educational_records.want_to_study_countries.length ===
      selectedLocationOptions.value.length &&
    countryCheck
  );
});

const toggleSelection = async (ids: number[]) => {
  const allSelected = ids.every((id) =>
    selectedLocationOptions.value.includes(id)
  );
  if (allSelected) {
    selectedLocationOptions.value = selectedLocationOptions.value.filter(
      (id) => !ids.includes(id)
    );
  } else {
    selectedLocationOptions.value = [
      ...new Set([...selectedLocationOptions.value, ...ids]),
    ];
  }
  destinationUpdates();
};

const resetUserData = () => {
  if (appStore.userData) {
    setInitialValues(appStore.userData);
  }
};

const setInitialValues = async (newValue: UserData) => {
  gpa.value = outOfTenGpa(newValue?.educational_records.cgpa);
  await gpaChangedForInitial();

  if (!schoolListStore.programListOptions.length) {
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

  if (!schoolListStore.locationOptions.length) {
    await schoolListStore.setLocationOptions({
      cgpa: outOfFourGpa(gpa.value),
      class_grade_ids: [Number(studyPrograms.value?.value)],
    });
  }

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

  if (!schoolListStore.budgetList.length) {
    // await destinationUpdates();
    await schoolListStore.setBudgetList({
      country_ids: selectedLocationOptions.value || [],
    });
  }

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

  if (!schoolListStore.coursePreferenceOptions.length) {
    await schoolListStore.setCoursePreferenceOptions({
      min_budget: null,
      max_budget: (annualBudget.value as { max?: number }).max,
    });
  }

  if (!schoolListStore.coursePreferenceOptions.length) {
    schoolListStore.isSchoolsLoading = false;
    return;
  }

  areaOfStudy.value = schoolListStore.coursePreferenceOptions?.find(
    (item) =>
      Number(item.value) == newValue?.educational_records.super_meta_category.id
  );
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

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const gpaChanged = async () => {
  isGpaChange.value = true;
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(async () => {
    await getLocationsList();
    isGpaChange.value = false;
  }, 1000);
};
const gpaChangedForInitial = async () => {
  isGpaChange.value = true;
  await getLocationsList();
  isGpaChange.value = false;
};

const getLocationsList = async () => {
  try {
    if (!gpa.value || !studyPrograms.value?.value) {
      return;
    }
    selectedLocationOptions.value = [];
    annualBudget.value = undefined;
    areaOfStudy.value = undefined;
    schoolListStore.budgetList = [];
    schoolListStore.coursePreferenceOptions = [];
    isLocationLoading.value = true;
    schoolListStore.isPublicMajorEnable = false;

    await schoolListStore.setLocationOptions({
      cgpa: outOfFourGpa(gpa.value),
      class_grade_ids: [Number(studyPrograms.value?.value)],
    });
    isLocationLoading.value = false;
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
  } catch (error) {
    console.error(error);
  }
};

const updateAuthUserData = async () => {
  try {
    const { min, max } = getMinMax();
    const payload = {
      cgpa: outOfFourGpa(gpa.value),
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

onMounted(async () => {
  const publicToken = useCookie("publicToken");
  if (!publicToken.value) {
    await schoolListStore.setPublicToken();
    await nextTick();
  }
  if (!schoolListStore.programListOptions.length) {
    schoolListStore.setProgramListOptions();
  } else {
    if (appStore.userData) {
      schoolListStore.isAllowwedOnUserDadaChange = false;
      setInitialValues(appStore.userData);
    }
  }
});
</script>
