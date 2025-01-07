<template>
  <div class="size-full flex flex-col justify-center mt-16 lg:mt-0">
    <div class="w-full p-6 lg:p-12 flex-1 flex flex-col lg:justify-center gap-6">
      <div class="w-full flex flex-col gap-6">
        <BaseSelectRadio
          label="ANNUAL TUITION BUDGET"
          :options="budget"
          v-model="answers.selectedBudget"
        />
        <BaseSelectRadio
          label="GRADE"
          :options="grade"
          v-model="answers.selectedGrade"
        />
        <div class="remove-shadow">
          <label class="uppercase font-medium text-[#E2E6FF]"
            >CURRENT GPA</label
          >
          <input
            name="gpa"
            type="text"
            v-model="answers.gpa"
            inputmode="decimal"
            placeholder="N/A"
            @input="validateNumber"
            class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
          />
        </div>
        <div class="remove-shadow">
          <label class="uppercase font-medium text-[#E2E6FF]"
            >IELTS SCORES</label
          >
          <input
            name="ielts"
            type="text"
            inputmode="decimal"
            v-model="answers.ielts"
            placeholder="N/A"
            class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
          />
        </div>
      </div>
      <div class="w-full">
        <button
          @click="submit"
          :disabled="continueBtnDisabled"
          class="bg-[#8380FF] w-full rounded-lg font-semibold text-xl leading-6 py-3 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export interface ProfileInformationAnswers {
  selectedBudget: OptionAttributes | null;
  selectedGrade: OptionAttributes | null;
  ielts: string;
  gpa: string;
}
</script>
<script setup lang="ts">
import type { OptionAttributes, FormData } from "~/types/home";

const emit = defineEmits(["onSubmit"]);

const props = defineProps({
  formData: {
    type: Object as PropType<FormData>,
  },
});

const answers = ref<ProfileInformationAnswers>({
  selectedBudget: props.formData?.budget || null,
  selectedGrade: props.formData?.grade || null,
  ielts: props.formData?.ielts || "",
  gpa: props.formData?.gpa || "",
});

const budget = [
  {
    value: "0 - 250M VND",
    label: "0 - 250M VND",
  },
  {
    value: "0 - 500M VND",
    label: "0 - 500M VND",
  },
  {
    value: "0 - 750M VND",
    label: "0 - 750M VND",
  },
];
const grade = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "11",
    label: "11",
  },
  {
    value: "12",
    label: "12",
  },
];

const continueBtnDisabled = computed(() => {
  return !(
    answers.value.selectedGrade != null &&
    answers.value.selectedBudget != null &&
    answers.value.gpa != ""
  );
});

const validateNumber = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  const value = input.value;

  const regex = /^(?:[0-9](?:\.\d{0,2})?|10?)$/;
  const cleanedValue = value.replace(/[^0-9.]/g, "");

  if (regex.test(cleanedValue)) {
    input.value = cleanedValue;
    answers.value.gpa = cleanedValue;
  } else {
    input.value = cleanedValue.slice(0, -1);
    answers.value.gpa = input.value;
  }
};

const submit = () => {
  emit("onSubmit", answers.value);
};

watch(
  () => props.formData,
  () => {
    answers.value.selectedBudget = props.formData?.budget || null,
    answers.value.selectedGrade= props.formData?.grade || null,
    answers.value.ielts= props.formData?.ielts || "",
    answers.value.gpa= props.formData?.gpa || ""
  }
);
</script>
