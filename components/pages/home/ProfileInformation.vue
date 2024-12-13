<template>
  <div class="size-full flex flex-col justify-center">
    <div class="w-full p-6 h-20 flex-1 flex items-center">
      <div class="w-full flex flex-col gap-2">
        <BaseSelectRadio label="ANNUAL TUITION BUDGET" :options="budget" v-model="answers.selectedBudget" />
        <BaseSelectRadio label="GRADE" :options="grade" v-model="answers.selectedGrade" />
      </div>
    </div>
    <div class="w-full p-6">
      <button @click="submit" :disabled="continueBtnDisabled"
        class="bg-[#8380FF] w-full rounded-lg font-semibold text-xl leading-6 py-3 disabled:opacity-50">
        Continue
      </button>
    </div>
  </div>
</template>
<script lang="ts">
export interface ProfileInformationAnswers {
  selectedBudget: OptionAttributes | null;
  selectedGrade: OptionAttributes | null;
}
</script>
<script setup lang="ts">
import type { OptionAttributes } from "~/types/home";

const emit = defineEmits(["onSubmit"]);

const answers = ref<ProfileInformationAnswers>({
  selectedBudget: null,
  selectedGrade: null,
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
  return !(answers.value.selectedGrade != null && answers.value.selectedBudget != null);
});

const submit = () => {
    emit('onSubmit', answers.value)
}
</script>
