<template>
    <div class="w-[490px] space-y-8">
      <h1 class="text-2xl md:text-4xl md:!leading-[44px] font-medium text-center">
        {{ $t('onboarding.programs_heading') }}
      </h1>
      <div class="space-y-3">
        <div
          v-for="(option, index) in programList"
          :key="index"
        >
          <label
            :for="option.name"
            class="flex items-center justify-between size-full font-medium rounded-xl cursor-pointer relative border py-4 pl-4 pr-5 transition-all ease-in-out duration-200"
            :class="[
              selectedOptionId === option.id
                ? 'border-[#84CAFF] bg-[#D1E9FF]/30 text-[#1849A9]'
                : 'border-[#D5D7DA] text-[#414651]',
            ]"
          >
            <input
              :id="option.name"
              type="radio"
              name="progress"
              :value="option.id"
              v-model="selectedOptionId"
              class="absolute top-3 right-3 appearance-none"
            />
            <div class="flex items-center gap-3">
                <component :is="option.icon" />
              {{
                option.id === 1
                  ? "Bachelor's"
                  : option.id === 2
                  ? "Master's"
                  : "Associate"
              }}
            </div>
            <div
              class="size-5 rounded-full transition-all ease-in-out duration-200 flex justify-center items-center"
              :class="[
                selectedOptionId === option.id
                  ? 'bg-[#1570EF]'
                  : 'border-[#D5D7DA] border-2',
              ]"
            >
              <IconTick width="16" height="16" stroke="#ffffff" />
            </div>
          </label>
        </div>
      </div>
      <div>
        <BaseSelectRadio 
        :label="t('onboarding.area_of_study')"
        :options="areas"
        direction="upward"
        />
      </div>
      <button
        @click="emit('submitProgram')"
        class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5"
      >
      {{ $t('onboarding.continue') }}
        <IconArrowRight fill="#ffffff" />
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
import IconAssociate from '~/components/icons/IconAssociate.vue';
import IconBachelor from '~/components/icons/IconBachelor.vue';
import IconMaster from '~/components/icons/IconMaster.vue';

const { t } = useI18n();

  const emit = defineEmits(["submitProgram"]);
  
  const selectedOptionId = ref<number>();
  
  const programList = [
    {
      id: 1,
      name: 'bachelor',
      icon: IconBachelor,
    },
    {
      id: 2,
      name: 'master',
      icon: IconMaster
    },
    {
      id: 3,
      name: 'associate',
      icon: IconAssociate
    },
  ];

  const areas = [
    {
        value: 'it',
        label: 'it'
    },
    {
        value: 'css',
        label: 'css'
    },
    {
        value: 'fsc',
        label: 'fsc'
    },
    {
        value: 'uni',
        label: 'uni'
    },
  ]
  </script>