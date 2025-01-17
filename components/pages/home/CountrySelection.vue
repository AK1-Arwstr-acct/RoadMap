<template>
  <div class="size-full flex flex-col justify-center">
    <div
      class="w-full p-6 md:p-12 h-20 flex-1 flex flex-col gap-6 justify-center items-center"
    >
      <div
        class="border border-[#63B3FF] bg-[#0E265C] flex gap-2 justify-center items-center p-2 rounded-lg"
      >
        <IconInfoCircle height="20" width="20" stroke="#63B3FF" />
        <p class="text-xs font-medium">
          You can change your country selection afterward
        </p>
      </div>
      <div class="w-full">
        <div class="w-full flex gap-x-3 gap-y-6 flex-wrap justify-center">
          <BaseMultiBoxSelect
            v-for="(item, idx) in countryOptions"
            :key="idx"
            :option="item.title"
            :checked="isChecked(item.id)"
            @change="updateSelection(item.id)"
            class="w-[calc(50%-6px)] sm:w-[31%] h-36"
          />
        </div>
      </div>
      <div class="w-full flex gap-4 lg:mt-12">
        <div
          class="text-[#8380FF] bg-transparent w-full flex justify-center rounded-lg font-semibold text-xl leading-6 py-3"
        >
          <span
            @click="goback"
            class="flex justify-center items-center gap-2 cursor-pointer w-fit"
          >
            <IconArrowRight class="transform rotate-180" fill="#8380FF" />
            Back
          </span>
        </div>
        <button
          @click="submit"
          :disabled="selectedOptions.length == 0"
          class="bg-[#8380FF] w-full rounded-lg font-semibold text-xl leading-6 py-3 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          Continue
          <BaseSpinner v-if="isSubmitting" color="#FFFFFF" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["onSubmit", "backStep", "updateSelectedCounties"]);

const props = defineProps({
  selectedCounties: {
    type: Array as PropType<number[]>,
  },
  isSubmitting: {
    type: Boolean,
    default: false
  }
});
const countryOptions = [
  {
    id: [182],
    title: "United States",
  },
  {
    id: [92],
    title: "United Kingdom",
  },
  {
    id: [185],
    title: "Australia",
  },
  {
    id: [67, 68, 62, 63, 88, 78, 191, 80, 90],
    title: "Europe",
  },
  {
    id: [156],
    title: "Canada",
  },
];
const selectedOptions = ref<number[]>(props.selectedCounties || []);

const isChecked = (option: number[]) => {
  return option.some((num) => selectedOptions.value.includes(num));
};

const updateSelection = (option: number[]) => {
  // const countriesName = option.replace(/ /g, "_").toLowerCase();
  // if (selectedOptions.value.includes(countriesName)) {
  //   selectedOptions.value = selectedOptions.value.filter(
  //     (item) => item !== countriesName
  //   );
  // } else {
  //   selectedOptions.value.push(countriesName);
  // }
  option.forEach((num) => {
    if (selectedOptions.value.includes(num)) {
      selectedOptions.value = selectedOptions.value.filter((item) => item !== num);
    } else {
      selectedOptions.value.push(num);
    }
  });
};

const goback = () => {
  emit("backStep"), emit("updateSelectedCounties", selectedOptions.value);
};

const submit = () => {
  emit("onSubmit", selectedOptions.value);
};

watch(
  () => props.selectedCounties,
  () => {
    selectedOptions.value = props.selectedCounties || [];
  }
);
</script>
