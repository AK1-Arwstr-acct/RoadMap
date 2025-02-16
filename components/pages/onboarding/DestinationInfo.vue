<template>
  <div class="w-full sm:w-[490px] space-y-8">
    <h1 class="text-2xl md:text-4xl md:!leading-[44px] font-medium text-center">
      {{ $t("onboarding.destination_heading") }}
    </h1>
    <div class="space-y-3">
      <div v-for="(option, index) in locationOptions" :key="index">
        <label
          :for="`country${index}`"
          class="flex items-center justify-between size-full font-medium rounded-xl cursor-pointer relative border p-3 transition-all ease-in-out duration-200"
          :class="[
            option?.value.some((id) => selectedOptionIds.includes(id))
              ? 'border-[#84CAFF] bg-[#D1E9FF]/30 text-[#1849A9]'
              : 'border-[#D5D7DA] text-[#414651]',
          ]"
        >
          <input
            :id="`country${index}`"
            type="checkbox"
            name="countries"
            :value="option.value"
            :checked="option.value.some((id) => selectedOptionIds.includes(id))"
            @change="toggleSelection(option.value)"
            class="absolute top-3 right-3 appearance-none"
          />
          <div class="flex items-center gap-3">
            <component :is="option.icon" />
            {{ option.label }}
          </div>
        </label>
      </div>
    </div>
    <button
      @click="submit"
      :disabled="selectedOptionIds.length === 0"
      class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5 disabled:opacity-70"
    >
      {{ $t("onboarding.continue") }}
      <IconSpinner v-if="isSubmitting" />
      <IconArrowRight v-else fill="#ffffff" />
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import useAppStore from "~/stores/AppStore";
import type { CountriesOptionAttributes } from "~/types/home";

defineProps({
  locationOptions: {
    type: Array as PropType<CountriesOptionAttributes[]>,
    default: () => [],
  },
});
const emit = defineEmits(["submitDestination"]);

const { showToast } = useToast();
const appStore = useAppStore();
const { api } = useApi();

// Use an array to store selected option IDs
const selectedOptionIds = ref<number[]>([]);
const isSubmitting = ref<boolean>(false);

const toggleSelection = (ids: number[]) => {
  const allSelected = ids.every((id) => selectedOptionIds.value.includes(id));
  if (allSelected) {
    selectedOptionIds.value = selectedOptionIds.value.filter(
      (id) => !ids.includes(id)
    );
  } else {
    selectedOptionIds.value = [
      ...new Set([...selectedOptionIds.value, ...ids]),
    ];
  }
};

const submit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      destination_country_ids: selectedOptionIds.value,
    });
    await appStore.getUserData();
    const budgets = await getBudgets();
    emit("submitDestination", budgets);
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
const getBudgets = async () => {
  const response = await api.get(`/api/v1/school/recommended/budget-range`);
  if (response.data.data) {
    const budgetList = response.data.data.map(
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
            !!item[1] ? " -" + budgetWithComma(item[1]) : ""
          }`,
          min: min,
          max: max,
        };
      }
    );
    await nextTick();
    return budgetList;
  }
  return [];
};

onMounted(async () => {
  const preSelected =
    appStore.userData?.educational_records.want_to_study_countries.map(
      (item) => item.id
    );
  selectedOptionIds.value =
    preSelected && preSelected.length > 0 ? preSelected : [];
});
</script>
