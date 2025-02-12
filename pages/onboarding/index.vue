<template>
  <div class="min-h-svh flex justify-center items-center px-5 pt-24 pb-16">
    <AcademicInfo
      v-if="steps === 'academic'"
      @submitAcademic="submitAcademic"
    />
    <ProgramsInfo
      v-else-if="steps === 'programs'"
      :programListOptions="programListOptions"
      @submitProgram="submitProgram"
    />
    <DestinationInfo
      v-else-if="steps === 'destination'"
      :locationOptions="locationOptions"
      @submitDestination="submitDestination"
    />
    <BudgetInfo
      v-else-if="steps === 'budget'"
      :budgetList="budgetList"
      @submitBudget="submitBudget"
    />
    <ParentCategory
      v-else-if="steps === 'areaOfInterest'"
      :coursePreferenceOptions="coursePreferenceOptions"
      @submitParentCategory="submitParentCategory"
    />
    <StartJourney v-else />
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import useAppStore from "~/stores/AppStore";
import useOnboardingStore from "~/stores/OnboardingStore";
import IconAssociate from "~/components/icons/IconAssociate.vue";
import IconBachelor from "~/components/icons/IconBachelor.vue";
import IconMaster from "~/components/icons/IconMaster.vue";

import type { CountriesOptionAttributes, OptionAttributes } from "~/types/home";

definePageMeta({
  layout: "main-layout",
});

const appStore = useAppStore();
const onboardingStore = useOnboardingStore();
const { showToast } = useToast();
const { api } = useApi();

const steps = ref<
  | "academic"
  | "programs"
  | "destination"
  | "budget"
  | "areaOfInterest"
  | "startJourney"
>("academic");
const programListOptions = ref<OptionAttributes[]>();
const isProgramsLoaded = ref<boolean>(false);
const locationOptions = ref<CountriesOptionAttributes[]>([]);
const coursePreferenceOptions = ref<OptionAttributes[]>();
const budgetList = ref<OptionAttributes[]>();

const submitAcademic = () => {
  steps.value = "programs";
  onboardingStore.setOnboardingProgress("40%");
};
const submitProgram = async (locations: CountriesOptionAttributes[]) => {
  locationOptions.value = locations;
  steps.value = "destination";
  onboardingStore.setOnboardingProgress("60%");
};
const submitDestination = async (budgets: OptionAttributes[]) => {
  budgetList.value = budgets;
  steps.value = "budget";
  onboardingStore.setOnboardingProgress("80%");
};
const submitBudget = async (categories: OptionAttributes[]) => {
  coursePreferenceOptions.value = categories;
  steps.value = "areaOfInterest";
  onboardingStore.setOnboardingProgress("100%");
};
const submitParentCategory = async () => {
  steps.value = "startJourney";
  onboardingStore.setOnboardingProgress(null);
};
const getStudyPrograms = async () => {
  try {
    if (!appStore.userData?.uuid) {
      return;
    }
    const response = await api.get(
      `/api/v1/anonymous-recommendation/types-of-class-grades?uniqueId=${appStore.userData.uuid}`
    );
    if (response.data.data) {
      programListOptions.value = response.data.data.map(
        (item: { id: number; class_name: string }) => {
          return {
            value: item.id,
            label: item.class_name,
            icon: item.class_name.toLowerCase().includes("bachelor")
              ? shallowRef(IconBachelor)
              : item.class_name.toLowerCase().includes("master")
              ? shallowRef(IconMaster)
              : shallowRef(IconAssociate),
          };
        }
      );
      if(programListOptions.value){
        onboardingStore.setProgramListOptions(programListOptions.value)
      }
      isProgramsLoaded.value = true;
    }
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
  () => appStore.userData,
  (newValue) => {
    if (!isProgramsLoaded.value) {
      getStudyPrograms();
    }
  }
);

onBeforeMount(async () => {
  onboardingStore.setOnboardingProgress("20%");
});
</script>
