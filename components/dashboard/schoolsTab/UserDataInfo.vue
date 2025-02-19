<template>
  <div
    class="border border-[#E9EAEB] px-5 py-4 bg-white rounded-2xl transition-all ease-in-out duration-200"
  >
    <div
      class="flex items-center gap-3 cursor-pointer"
      @click="isDetailOpen = !isDetailOpen"
    >
      <div>
        <IconChevronDown
          stroke="#717680"
          :class="{ 'transform -rotate-90': !isDetailOpen }"
        />
      </div>
      <p class="font-semibold text-[#111827]">Your Details & Information</p>
    </div>
    <div
      ref="content"
      :style="{ maxHeight: isDetailOpen ? contentHeight + 'px' : '0px' }"
      class="remove-shadow-bg-white overflow-hidden transition-all ease-in-out duration-500 min-h-0"
    >
      <div class="mt-6">
        <label class="font-medium text-[#414651] text-sm"
          >GPA<span class="text-[#D92D20] font-medium">*</span></label
        >
        <input
          name="ielts"
          type="text"
          v-model="gpa"
          placeholder="Enter GPA"
          class="mt-1 rounded-lg border-2 shadow-sm border-[#E1E1E1] py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
        />
      </div>
      <div class="mt-5">
        <BaseSelectRadio
          label="Annual total budget (optional)"
          :options="dashboardStore.budgetList"
          v-model="annualBudget"
        />
      </div>
      <div class="mt-5">
        <div class="space-y-3">
          <p class="font-medium text-[#414651] text-sm">
            Study destination<span class="text-[#D92D20] font-medium">*</span>
          </p>
          <div class="space-y-4">
            <div
              v-for="(option, index) in dashboardStore.locationOptions"
              :key="index"
            >
              <label
                :for="`destination${index}`"
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
                      : 'border-[#D5D7DA]',
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
                <div class="flex items-center gap-2 text-[#414651]">
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
      <div class="mt-5">
        <BaseSelectRadio
          label="Study program"
          :required="true"
          :options="dashboardStore.programListOptions"
          v-model="studyPrograms"
        />
      </div>
      <div class="mt-5">
        <BaseSelectRadio
          label="Area of study"
          :required="true"
          :options="dashboardStore.coursePreferenceOptions"
          v-model="areaOfStudy"
          direction="upward"
        />
      </div>
      <div class="mt-6 flex gap-3">
        <button
          @click="resetUserData"
          :disabled="isUpdateDisable"
          class="p-2.5 border border-[#D5D7DA] w-full rounded-lg font-semibold text-sm text-[#414651]"
        >
          Reset all
        </button>
        <button
          @click="updateUserData"
          :disabled="isUpdateDisable"
          class="p-2.5 bg-[#1570EF] disabled:bg-[#84CAFF] w-full rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2"
        >
          Update
          <IconSpinner v-if="isSubmitting" class="size-4" bgColor="#ffffff00" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import type { OptionAttributes, UserData } from "~/types/home";
import useAppStore from "~/stores/AppStore";
import axios from "axios";
import IconUK from "../../icons/IconUK.vue";
import IconCanada from "../../icons/IconCanada.vue";
import IconAustralia from "../../icons/IconAustralia.vue";
import IconUS from "../../icons/IconUS.vue";
import IconEurope from "../../icons/IconEurope.vue";

const dashboardStore = useDashboardStore();
const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();

const isSubmitting = ref<boolean>(false);
const isDetailOpen = ref<boolean>(false);
const gpa = ref<string>("");
const annualBudget = ref<OptionAttributes>();
const studyPrograms = ref<OptionAttributes>();
const areaOfStudy = ref<OptionAttributes>();
const selectedLocationOptions = ref<number[]>([]);
const isUpdateDisable = ref<boolean>(true);
let firstRun = true;
const contentHeight = ref(0);
const content = ref<HTMLElement | null>(null);

const toggleSelection = (ids: number[]) => {
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
  if (appStore.userData) {
    setInitialValues(appStore.userData);
  }
  isUpdateDisable.value = true;
  firstRun = true;
};
const updateUserData = async () => {
  try {
    const { min, max } = getMinMax();
    isSubmitting.value = true;
    const payload = {
      cgpa: gpa.value,
      annual_min_budget: min,
      annual_max_budget: max,
      destination_country_ids: selectedLocationOptions.value,
      next_educational_class_grade_id: studyPrograms.value?.value,
      super_meta_category_id: areaOfStudy.value?.value,
    };
    await api.post("/api/v1/student/update-profile-basic-info", payload);
    await appStore.getUserData();
    isUpdateDisable.value = true;
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

const setInitialValues = (newValue: UserData) => {
  gpa.value = `${newValue?.educational_records.cgpa}` || "";
  annualBudget.value = dashboardStore.budgetList?.find((item) =>
    item.value.includes(`${newValue?.educational_records.annual_max_budget}`)
  ) || { value: "", label: "" };
  studyPrograms.value = dashboardStore.programListOptions.find(
    (item) =>
      Number(item.value) == newValue?.educational_records.next_class_grade.id
  );
  areaOfStudy.value = dashboardStore.coursePreferenceOptions?.find(
    (item) =>
      Number(item.value) == newValue?.educational_records.super_meta_category.id
  );
  selectedLocationOptions.value =
    appStore.userData?.educational_records.want_to_study_countries.map(
      (item) => item.id
    ) || [];
};

watch(
  () => [
    appStore.userData,
    dashboardStore.budgetList,
    dashboardStore.programListOptions,
    dashboardStore.coursePreferenceOptions,
  ],
  (newValue) => {
    if (appStore.userData) {
      setInitialValues(appStore.userData);
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => [
    gpa.value,
    annualBudget.value,
    studyPrograms.value,
    areaOfStudy.value,
    selectedLocationOptions.value,
  ],
  () => {
    if (firstRun) {
      firstRun = false;
      return;
    }
    isUpdateDisable.value = false;
  }
);

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
