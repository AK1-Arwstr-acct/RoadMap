<template>
  <div class="w-[490px] space-y-8">
    <h1 class="text-2xl md:text-4xl md:!leading-[44px] font-medium text-center">
      {{ $t('onboarding.destination_heading') }}
    </h1>
    <div class="space-y-3">
      <div v-for="(option, index) in countriesList" :key="index">
        <label
          :for="`country${index}`"
          class="flex items-center justify-between size-full font-medium rounded-xl cursor-pointer relative border p-3 transition-all ease-in-out duration-200"
          :class="[
            selectedOptionIds.includes(option.id)
              ? 'border-[#84CAFF] bg-[#D1E9FF]/30 text-[#1849A9]'
              : 'border-[#D5D7DA] text-[#414651]',
          ]"
        >
          <input
            :id="`country${index}`"
            type="checkbox"
            name="countries"
            :value="option.id"
            v-model="selectedOptionIds"
            class="absolute top-3 right-3 appearance-none"
          />
          <div class="flex items-center gap-3">
            <component :is="option.icon" />
            {{ option.name }}
          </div>
        </label>
      </div>
    </div>
    <button
      @click="emit('submitDestination')"
      class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5"
    >
    {{ $t('onboarding.continue') }}
      <IconArrowRight fill="#ffffff" />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconAustralia from "~/components/icons/IconAustralia.vue";
import IconCanada from "~/components/icons/IconCanada.vue";
import IconEurope from "~/components/icons/IconEurope.vue";
import IconUK from "~/components/icons/IconUK.vue";
import IconUS from "~/components/icons/IconUS.vue";

const emit = defineEmits(["submitDestination"]);

// Use an array to store selected option IDs
const selectedOptionIds = ref<number[]>([]);

const countriesList = [
  {
    id: 1,
    name: "United Kingdom",
    icon: IconUK,
  },
  {
    id: 2,
    name: "Canada",
    icon: IconCanada,
  },
  {
    id: 3,
    name: "Australia",
    icon: IconAustralia,
  },
  {
    id: 4,
    name: "United States",
    icon: IconUS,
  },
  {
    id: 5,
    name: "Europe",
    icon: IconEurope,
  },
];
</script>
