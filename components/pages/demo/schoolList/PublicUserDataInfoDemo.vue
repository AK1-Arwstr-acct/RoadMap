<template>
    <div
      class="border-[1.5px] border-gray-200 px-5 py-4 bg-white rounded-2xl transition-all ease-in-out duration-200"
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
        <p class="font-semibold text-[#111827] text-sm">
          {{ $t("schoolList_page.your_details_and_information") }}
        </p>
      </div>
      <div
        ref="content"
        :style="{ maxHeight: isDetailOpen ? contentHeight + 'px' : '0px' }"
        class="remove-shadow-bg-white overflow-hidden transition-all ease-in-out duration-500 min-h-0"
      >
        <div class="mt-6">
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
            data-hj-allow
          />
        </div>
        <div class="mt-5">
          <BaseSelectRadio
            :label="t('schoolList_page.study_program')"
            :required="true"
            :options="demoStore.programListOptions"
            v-model="studyPrograms"
          />
        </div>
        <Transition name="fade">
          <div class="mt-5" v-if="demoStore.locationOptions.length">
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
                  v-for="(option, index) in demoStore.locationOptions"
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
        </Transition>
        <div class="mt-5">
          <BaseSelectRadio
            :label="t('schoolList_page.annual_total_budget')"
            :options="demoStore.budgetList"
            v-model="annualBudget"
            direction="upward"
            :loading="isBudgetLoading"
            :disabled="!route.path.includes('/demo') && ( !demoStore.budgetList.length || isBudgetLoading )"
          />
        </div>
        <div class="mt-5">
          <BaseSelectRadio
            :label="t('schoolList_page.area_of_study')"
            :required="true"
            :options="demoStore.coursePreferenceOptions"
            v-model="areaOfStudy"
            direction="upward"
            :disabled="
              !route.path.includes('/demo') &&
              (!demoStore.coursePreferenceOptions.length ||
                isAreaOfStudyLoading)
            "
            :loading="isAreaOfStudyLoading"
          />
        </div>
        <div class="mt-6 flex gap-3 border-b-8 border-transparent">
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
            <IconSpinner
              v-if="isSubmitting"
              class="size-3.5"
              bgColor="#ffffff00"
            />
          </button>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import useDemoStore from "~/stores/demoStore";
  import type { OptionAttributes, UserData } from "~/types/home";
  import useAppStore from "~/stores/AppStore";
  import axios from "axios";
  import IconUK from "~/components/icons/IconUK.vue";
  import IconCanada from "~/components/icons/IconCanada.vue";
  import IconAustralia from "~/components/icons/IconAustralia.vue";
  import IconUS from "~/components/icons/IconUS.vue";
  import IconEurope from "~/components/icons/IconEurope.vue";
  import { majors, schoolsList } from "~/utils/demoData";
  import type { Program } from "~/types/program";
  
  const demoStore = useDemoStore();
  const appStore = useAppStore();
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
  
  const isUpdateBtnDisable = computed(() => {
    return !!(
      gpa.value &&
      studyPrograms.value?.value &&
      selectedLocationOptions.value.length > 0 &&
      annualBudget.value?.value &&
      areaOfStudy.value?.value
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
  };
  
  const updateUserData = async () => {
    try {
      demoStore.selectedPublicMajors = [];
      demoStore.aiRecommendationList = false;
      demoStore.majorsList = majors.filter(
        (item) => item.parent === Number(areaOfStudy.value?.value)
      );
      const { min, max } = getMinMax();
      const convertedScore = ((Number(gpa.value) / 10) * 4).toFixed(2);

      const filterData: Program[] = schoolsList.filter((item) => {
        return (
          (item.school.admission_stats?.average_scores?.gpa ?? 0) <=
            Number(convertedScore) &&
          item.class_grades.some(
            (grade) => grade.title === studyPrograms.value?.label
          ) &&
          selectedLocationOptions.value.includes(
            item.school.address.country_id ?? -1
          ) &&
          item.fee <= max &&
          areaOfStudy.value?.label.toLowerCase() ===
            item.super_meta_title.toLowerCase()
        );
      });
      demoStore.filterSchoolsList = filterData;
      demoStore.schoolsList = filterData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = errorList(error);
        showToast(errorMessage, {
          type: "error",
        });
      }
    }
  };

  
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
  
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
  