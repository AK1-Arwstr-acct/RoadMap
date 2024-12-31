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
            v-for="(item, idx) in options"
            :key="idx"
            :option="item"
            :checked="isChecked(item)"
            @change="updateSelection(item)"
            class="w-[31%] h-36"
          />
        </div>
      </div>
      <div class="w-full flex gap-4 mt-12">
        <button
          @click="emit('backStep')"
          class="text-[#8380FF] bg-transparent w-full rounded-lg font-semibold text-xl leading-6 py-3 flex justify-center items-center gap-2"
        >
        <IconArrowRight class="transform rotate-180" fill="#8380FF" />
          Back
        </button>
        <button
          @click="submit"
          :disabled="selectedOptions.length == 0"
          class="bg-[#8380FF] w-full rounded-lg font-semibold text-xl leading-6 py-3 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["onSubmit", "backStep"]);

const options = [
  "United States",
  "United Kingdom",
  "Australia",
  "Europe",
  "Canada",
];
const selectedOptions = ref<String[]>([]);

const isChecked = (option: string) => {
  const countriesName = option.replace(/ /g, "_").toLowerCase();
  return selectedOptions.value.includes(countriesName);
};

const updateSelection = (option: string) => {
  const countriesName = option.replace(/ /g, "_").toLowerCase();
  if (selectedOptions.value.includes(countriesName)) {
    selectedOptions.value = selectedOptions.value.filter(
      (item) => item !== countriesName
    );
  } else {
    selectedOptions.value.push(countriesName);
  }
};

const submit = () => {
  emit("onSubmit", selectedOptions.value);
};

onMounted(() => {
  const userData = JSON.parse(sessionStorage.getItem("formData")!);
  if (userData) {
    selectedOptions.value = userData.countries;
  }
});
</script>
