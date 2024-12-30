<template>
  <div class="size-full flex flex-col justify-center">
    <div class="w-full p-6 h-20 flex-1 flex items-center">
      <div class="w-full flex flex-col gap-4">
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
            placeholder="N/A"
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
            v-model="answers.ielts"
            placeholder="N/A"
            class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
          />
        </div>
      </div>
    </div>
    <div class="w-full p-6">
      <button
        @click="submit"
        :disabled="continueBtnDisabled"
        class="bg-[#8380FF] w-full rounded-lg font-semibold text-xl leading-6 py-3 disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  </div>
</template>
<script lang="ts">
export interface ProfileInformationAnswers {
  selectedBudget: OptionAttributes | null;
  selectedGrade: OptionAttributes | null;
  ielts: string;
  gpa: number | null;
}
</script>
<script setup lang="ts">
import type { OptionAttributes } from "~/types/home";

const emit = defineEmits(["onSubmit"]);

const answers = ref<ProfileInformationAnswers>({
  selectedBudget: null,
  selectedGrade: null,
  ielts: "",
  gpa: null,
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
    answers.value.selectedGrade != null && answers.value.selectedBudget != null
  );
});

const submit = () => {
  emit("onSubmit", answers.value);
};

onMounted(() => {
  const userData = JSON.parse(sessionStorage.getItem("formData")!);
  if (userData) {
    answers.value.selectedBudget = userData.budget;
    answers.value.selectedGrade = userData.grade;
    answers.value.ielts = userData.ielts;
    answers.value.gpa = userData.gpa;
  }
});
</script>