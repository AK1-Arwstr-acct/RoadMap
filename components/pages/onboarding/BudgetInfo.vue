<template>
    <div class="w-[490px] space-y-8">
      <h1 class="text-2xl md:text-4xl md:!leading-[44px] font-medium text-center">
        {{ $t('onboarding.budget_heading') }}
      </h1>
      <div class="space-y-3">
        <div
          v-for="(option, index) in budgetList"
          :key="index"
        >
          <label
            :for="option.label"
            class="flex items-center justify-between size-full font-medium rounded-xl cursor-pointer relative border p-4 transition-all ease-in-out duration-200"
            :class="[
              selectedOptionId === option.id
                ? 'border-[#84CAFF] bg-[#D1E9FF]/30 text-[#1849A9]'
                : 'border-[#D5D7DA] text-[#414651]',
            ]"
          >
            <input
              :id="option.label"
              type="radio"
              name="budget"
              :value="option.id"
              v-model="selectedOptionId"
              class="absolute top-3 right-3 appearance-none"
            />
              {{
                option.label
              }}
          </label>
        </div>
      </div>
      <button
        @click="emit('submitBudget')"
        class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5"
      >
      {{ $t('onboarding.continue') }}
        <IconArrowRight fill="#ffffff" />
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(["submitBudget"]);
  
  const selectedOptionId = ref<number>();
  
  const budgetList = [
    {
      id: 1,
      label: '$0 - $10,000',
      value: '',
    },
    {
      id: 2,
      label: '$0 - $20,000',
      value: '',
    },
    {
      id: 3,
      label: '$0 - $30,000',
      value: '',
    },
    {
      id: 4,
      label: '$0 - $60,000',
      value: '',
    },
    {
      id: 5,
      label: '$0 - $90,000',
      value: '',
    },
  ];
  </script>