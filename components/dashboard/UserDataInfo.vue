<template>
  <div class="border border-[#E9EAEB] px-5 py-4 bg-white rounded-2xl">
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
    <Transition name="fade">
      <div v-if="isDetailOpen" class="mt-6 remove-shadow-bg-white">
        <div>
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
            :options="onboardingStore.budgetList"
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
                v-for="(option, index) in onboardingStore.locationOptions"
                :key="index"
              >
                <label
                  :for="`country${index}`"
                  class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200"
                >
                  <input
                    :id="`country${index}`"
                    type="checkbox"
                    name="countries"
                    :value="option.value"
                    :checked="
                      option.value.some((id) =>
                        selectedLocationOptions.includes(id)
                      )
                    "
                    class="hidden peer"
                    @change="toggleSelection(option.value)"
                  />
                  <div
                    class="size-5 flex justify-center items-center border-2 rounded-md transition-all"
                    :class="[
                      option?.value.some((id) =>
                        selectedLocationOptions.includes(id)
                      )
                        ? 'border-[#1570EF] bg-[#1570EF] text-white'
                        : 'border-[#D5D7DA] bg-white',
                    ]"
                  >
                    <!-- <component :is="option.icon" /> -->
                    <IconTick
                      v-if="
                        option?.value.some((id) =>
                          selectedLocationOptions.includes(id)
                        )
                      "
                      stroke="#ffffff"
                    />
                  </div>
                  <div class="flex items-center gap-2">
                    <component :is="option.icon" class="w-6 h-6" />
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
            :options="onboardingStore.programListOptions"
            v-model="studyPrograms"
          />
        </div>
        <div class="mt-5">
          <BaseSelectRadio
            label="Area of study"
            :required="true"
            :options="onboardingStore.coursePreferenceOptions"
            v-model="areaOfStudy"
            direction="upward"
          />
        </div>
        <div class="mt-6 flex gap-3">
          <button
            class="p-2.5 border border-[#D5D7DA] w-full rounded-lg font-semibold text-sm text-[#414651]"
          >
            Reset all
          </button>
          <button
            class="p-2.5 border border-[#84CAFF] bg-[#84CAFF] w-full rounded-lg font-semibold text-sm text-white"
          >
            Update
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import useOnboardingStore from "~/stores/OnboardingStore";
import type { OptionAttributes } from "~/types/home";
import useAppStore from "~/stores/AppStore";

const onboardingStore = useOnboardingStore();
const appStore = useAppStore();

const isDetailOpen = ref<boolean>(false);
const gpa = ref<string>("");
const annualBudget = ref<OptionAttributes>();
const studyPrograms = ref<OptionAttributes>();
const areaOfStudy = ref<OptionAttributes>();
const selectedLocationOptions = ref<number[]>([]);

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

watch(
  () => appStore.userData,
  (newValue) => {
    gpa.value = `${newValue?.educational_records.cgpa}` || "";
    annualBudget.value = onboardingStore.budgetList?.find((item) =>
      item.value.includes(`${newValue?.educational_records.annual_max_budget}`)
    ) || { value: "", label: "" };
    studyPrograms.value = onboardingStore.programListOptions.find(
      (item) =>
        Number(item.value) == newValue?.educational_records.next_class_grade.id
    );
    areaOfStudy.value = onboardingStore.coursePreferenceOptions?.find(
      (item) =>
        Number(item.value) ==
        newValue?.educational_records.super_meta_category.id
    );
    selectedLocationOptions.value =
      appStore.userData?.educational_records.want_to_study_countries.map(
        (item) => item.id
      ) || [];
  },
  {
    immediate: true,
  }
);
</script>
