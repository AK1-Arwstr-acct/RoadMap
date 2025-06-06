<template>
  <div class="w-full sm:w-[490px] space-y-8">
    <h1 class="text-2xl md:text-4xl md:!leading-[44px] font-medium text-center">
      {{ $t("onboarding.budget_heading") }}
    </h1>
    <div class="space-y-3">
      <div v-for="(option, index) in budgetList" :key="index">
        <label
          :for="option.label"
          class="flex items-center justify-between size-full font-medium rounded-xl cursor-pointer relative border-[1.5px] p-4 transition-all ease-in-out duration-200"
          :class="[
            selectedOptionId === option.value
              ? 'border-[#84CAFF] bg-[#D1E9FF]/30 text-[#1849A9]'
              : 'border-gray-200 text-[#414651]',
          ]"
        >
          <input
            :id="option.label"
            type="radio"
            name="budget"
            :value="option.value"
            v-model="selectedOptionId"
            class="absolute top-3 right-3 appearance-none"
          />
          {{ option.label }}
        </label>
      </div>
    </div>
    <button
      @click="submitBudget"
      :disabled="!selectedOptionId || isSubmitting"
      class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5 disabled:opacity-70"
    >
      {{ $t("onboarding.continue") }}
      <IconSpinner class="size-5" v-if="isSubmitting" />
      <IconArrowRight v-else fill="#ffffff" />
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import type { PropType } from "vue";
import type { OptionAttributes } from "~/types/home";
import useAppStore from "~/stores/AppStore";

const props = defineProps({
  budgetList: {
    type: Array as PropType<OptionAttributes[]>,
    default: () => [],
  },
});
const emit = defineEmits(["submitBudget"]);

const { api } = useApi();
const appStore = useAppStore();
const { showToast } = useToast();

const isSubmitting = ref<boolean>(false);
const selectedOptionId = ref<string>();

const getMinMax = () => {
  if (selectedOptionId.value) {
    const matches = selectedOptionId.value.match(/\d+,\d+|\d+/g);
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

const submitBudget = async () => {
  try {
    const { min, max } = getMinMax();
    isSubmitting.value = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      annual_min_budget: min,
      annual_max_budget: max,
    });
    await appStore.getUserData();
    const parentCategories = await gatAreaofStudies();
    emit("submitBudget", parentCategories);
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
const gatAreaofStudies = async () => {
  try {
    const response = await api.get(
      "/api/v1/school/recommended/get-super-meta-categories"
    );
    if (response.data.data) {
      const coursePreferenceOptions = response.data.data.map(
        (item: { id: number; title: string }) => {
          return {
            value: item?.id,
            label: item?.title,
          };
        }
      );
      return coursePreferenceOptions;
    }
    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

onMounted(() => {
  if (appStore.userData) {
    const budget = `${appStore.userData.educational_records.annual_min_budget}-${appStore.userData.educational_records.annual_max_budget}`;
    const isBudgetExists = props.budgetList.find((item) => {
      return item.value === budget;
    });
    if (isBudgetExists) {
      selectedOptionId.value = budget;
    }
  }
});
</script>
