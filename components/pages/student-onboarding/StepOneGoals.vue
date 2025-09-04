<template>
  <div class="flex flex-col gap-5">
    <!-- heading -->
    <div class="flex gap-2 items-center">
      <div class="p-2 rounded-lg bg-background-error-subtle">
        <IconFlag width="24" height="24" class="text-icon-error" />
      </div>
      <p class="font-semibold text-xl text-text-base">Goals and preference</p>
    </div>
    <!-- Intended Study program -->
    <BaseSelectRadio
      label="Intended Study program"
      :options="studyProgram"
      v-model="counselorStudentStore.onBoardingData.intended_study_program"
      :isShadowDark="true"
      :required="true"
      :disabled="!studyProgram.length"
      :loading="isStudyProgramLoading"
    />
    <!-- Intended major or Field -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Intended major or Field<span class="text-text-error font-medium">
          *</span
        ></label
      >
      <div class="">
        <!-- v-model="" -->
        <input
          name="Intended-major"
          type="text"
          v-model="counselorStudentStore.onBoardingData.intended_major"
          @input=""
          placeholder="Intended major"
          class="mt-1.5 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
    <!-- countries -->
    <Transition name="fade">
      <div v-if="locationOptions.length" class="flex flex-col gap-3">
        <p class="font-medium text-text-neutral-subtle text-sm">
          Preferred Study Destination(s)<span
            class="text-text-error font-medium"
          >
            *</span
          >
        </p>
        <div class="flex flex-wrap gap-3">
          <div v-for="(option, index) in countriesList" :key="index">
            <label
              class="w-fit pl-1 pr-[10px] py-1 flex items-center gap-1.5 size-full font-medium rounded-full cursor-pointer relative transition-all ease-in-out duration-200 text-sm border"
              :class="[
                              option?.value.some((id: number) =>
                                counselorStudentStore.onBoardingData.country_destinations.includes(id)
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
                                          counselorStudentStore.onBoardingData.country_destinations.includes(id)
                                      )
                                          "
                class="hidden peer"
                @change="toggleSelection(option.value)"
              />
              <div class="flex items-center gap-2" :for="`destination${index}`">
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
    <!-- Annual budget -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Annual budget<span class="text-text-error font-medium"> *</span></label
      >
      <div class="">
        <!-- v-model="" -->
        <input
          name="Annual-budget"
          type="text"
          v-model="counselorStudentStore.onBoardingData.annual_budget"
          @input=""
          placeholder="$40,000"
          class="mt-1.5 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
    <!-- Preferred earliest intake -->
    <BaseSelectRadio
      label="Preferred earliest intake"
      :options="enrollPlanOptions"
      v-model="counselorStudentStore.onBoardingData.earliest_intake"
      :isShadowDark="true"
      :required="true"
    />
    <!-- Post-graduation Plan -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Post-graduation Plan</label
      >
      <div class="">
        <textarea
          name="details"
          v-model="counselorStudentStore.onBoardingData.post_graduation_plan"
          type="text"
          @input=""
          placeholder="e.g. Return to home country, stay and find jobs, etc."
          class="mt-1.5 bg-background-base-subtle resize-none rounded-lg border border-border-neutral-subtle py-3 px-4 w-full outline-none appearance-none text-text-base custom-scrollbar"
          data-hj-allow
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconUK from "~/components/icons/IconUK.vue";
import IconCanada from "~/components/icons/IconCanada.vue";
import IconAustralia from "~/components/icons/IconAustralia.vue";
import IconUS from "~/components/icons/IconUS.vue";
import IconEurope from "~/components/icons/IconEurope.vue";
import useCounselorStudentStore from "~/stores/counselorStudentStore";
import type { OptionAttributes } from "~/types/home";
import axios from "axios";

const counselorStudentStore = useCounselorStudentStore();
const { showToast } = useToast();
const { api } = useApi();

const studyProgram = ref<OptionAttributes[]>([]);
const isStudyProgramLoading = ref<boolean>(false);

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

const countriesList = [
  { value: [92], label: "United Kingdom", icon: shallowRef(IconUK) },
  { value: [156], label: "Canada", icon: shallowRef(IconCanada) },
  { value: [182], label: "United States", icon: shallowRef(IconUS) },
  {
    value: [67, 68, 62, 63, 88, 78, 191, 80, 90],
    label: "Europe",
    icon: shallowRef(IconEurope),
  },
  { value: [185], label: "Australia", icon: shallowRef(IconAustralia) },
];

const toggleSelection = async (ids: number[]) => {
  const allSelected = ids.every((id) =>
    counselorStudentStore.onBoardingData.country_destinations.includes(id)
  );
  if (allSelected) {
    counselorStudentStore.onBoardingData.country_destinations =
      counselorStudentStore.onBoardingData.country_destinations.filter(
        (id) => !ids.includes(id)
      );
  } else {
    counselorStudentStore.onBoardingData.country_destinations = [
      ...new Set([
        ...counselorStudentStore.onBoardingData.country_destinations,
        ...ids,
      ]),
    ];
  }
};

const setProgramListOptions = async () => {
  try {
    isStudyProgramLoading.value = true;
    const response = await api.get(`/api/v2/openapi/types-of-class-grades`);
    if (response?.data.data) {
      studyProgram.value = response.data.data.map(
        (item: { id: number; class_name: string }) => {
          return {
            value: item.id,
            label: item.class_name,
          };
        }
      );
      return studyProgram.value;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isStudyProgramLoading.value = false;
  }
};

onMounted(() => {
  setProgramListOptions();
});
</script>
