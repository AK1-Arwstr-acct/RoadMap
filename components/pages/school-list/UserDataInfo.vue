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
      @onChange="getProgramParent"
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
      <div v-if="appStore.firstTimeUser" ref="focusDiv" class="absolute inset-0 z-30 bg-white rounded-md flex justify-center items-center">
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
          v-if="appStore.firstTimeUser"
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
    <!-- <div class="mt-6">
      <label class="font-medium text-[#414651] text-sm"
        >{{ $t("schoolList_page.gpa")
        }}<span class="text-[#D92D20] font-medium">*</span></label
      >
      <input
        name="ielts"
        type="text"
        v-model="gpa"
        :placeholder="t('schoolList_page.enter_gpa')"
        class="mt-1 rounded-lg border-2 shadow-sm border-gray-200 py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
        @input="gpaChanged"
        data-hj-allow
      />
    </div> -->
    <!-- <div>
      <div
        class="flex flex-col gap-3 relative isolate"
      >
         temporary layer for displaying wait curser  
        <div
          v-if="isLocationchange || isGpaChange"
          class="absolute inset-0 cursor-wait z-10"
        />
        <div class="flex flex-col gap-4">
          <div
            v-for="(option, index) in dashboardStore.locationOptions"
            :key="index"
          >
            <label
              class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200"
              :class="{
                'pointer-events-none': isLocationchange || isGpaChange,
              }"
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
    </div> -->
    <!-- <div class="mt-6 flex gap-3 border-b-8 border-transparent">
      <button
        @click="resetUserData"
        class="p-2.5 border-[1.5px] border-gray-200 w-full rounded-lg font-semibold text-sm text-[#414651]"
      >
        {{ $t("schoolList_page.reset_all") }}
      </button>
      <button
        @click="updateUserData"
        :disabled="
          !isUpdateBtnDisable ||
          disabledBtn ||
          isBudgetLoading ||
          isAreaOfStudyLoading ||
          isGpaChange ||
          isSubmitting
        "
        class="p-2.5 bg-[#1570EF] disabled:bg-[#84CAFF] w-full rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2"
      >
        {{ $t("schoolList_page.update") }}
        <IconSpinner v-if="isSubmitting" class="size-3.5" bgColor="#ffffff00" />
      </button>
    </div> -->
  </div>
  <Transition name="fade">
    <div v-if="appStore.firstTimeUser" class="fixed z-20 inset-0 bg-black/60" />
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

// for dropdowns open
const openDropdown = ref<Dropdowns>("");

// first time user modal
const focusDiv = ref<HTMLElement | null>(null);
const modalPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });
let resizeObserver: ResizeObserver | null = null;

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
    Number(gpa.value) === appStore.userData?.educational_records.cgpa &&
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

const resetUserData = () => {
  if (appStore.userData) {
    setInitialValues(appStore.userData);
    gpaChanged();
  }
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

const setInitialValues = (newValue: UserData) => {
  gpa.value = `${newValue?.educational_records.cgpa}` || "";
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

const programChanged = async () => {
  try {
    if (!gpa.value || !studyPrograms.value?.value) {
      return;
    }
    isLocationLoading.value = true;
    const response = await api.post(
      "/api/v1/anonymous-recommendation/get-location-country",
      {
        cgpa: gpa.value,
        class_grade_ids: [studyPrograms.value?.value],
        uniqueId: appStore.userData?.uuid,
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
      if (!dashboardStore.locationOptions.length) {
        areaOfStudy.value = undefined;
        annualBudget.value = undefined;
      }
      const currentCountryIds = dashboardStore.locationOptions
        .map((option) => option.value)
        .flat();
      const preSelection = selectedLocationOptions.value;
      selectedLocationOptions.value = selectedLocationOptions.value.filter(
        (id) => currentCountryIds.includes(id)
      );
      if (
        !(
          preSelection.length === selectedLocationOptions.value.length &&
          preSelection.every((id) => selectedLocationOptions.value.includes(id))
        )
      ) {
        isLocationchange.value = true;
        await getBudgets();
        await getProgramParent();
        isLocationchange.value = false;
      }
      isLocationLoading.value = false;
    }
  } catch (error) {}
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
    const response = await api.post(
      "/api/v1/anonymous-recommendation/find-program-parent",
      {
        cgpa: gpa.value,
        class_grade_ids: [studyPrograms.value?.value],
        country_ids: selectedLocationOptions.value || [],
        max_budget: (annualBudget.value as { max?: number }).max,
        min_budget: null,
        uniqueId: appStore.userData?.uuid,
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
    const response = await api.post(
      "/api/v1/anonymous-recommendation/budget-range",
      {
        cgpa: gpa.value,
        class_grade_ids: [studyPrograms.value?.value],
        country_ids: selectedLocationOptions.value || [],
        uniqueId: appStore.userData?.uuid,
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
    await getBudgets();
    await getProgramParent();
    isGpaChange.value = false;
  }, 1000);
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
  () => [appStore.userData],
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
});

onUnmounted(() => {
  if (resizeObserver && focusDiv.value) {
    resizeObserver.unobserve(focusDiv.value);
    resizeObserver.disconnect();
  }
  window.removeEventListener("resize", updateModalPosition);
});
</script>
