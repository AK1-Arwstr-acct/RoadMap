<template>
  <div class="size-full flex flex-col justify-center">
    <div
      class="w-full p-6 h-20 flex-1 flex flex-col justify-center items-center"
    >
      <div class="w-full">
        <div class="w-full flex gap-3 flex-wrap justify-center">
          <BaseMultiBoxSelect
            v-for="(item, idx) in options"
            :key="idx"
            :option="item"
            :checked="selectedOptions.includes(item)"
            @change="updateSelection(item)"
            class="w-[31%] h-36"
          />
          <div
            class="border border-[#63B3FF] bg-[#0E265C] flex gap-2 justify-center items-center p-2 rounded-lg"
          >
            <IconInfoCircle height="20" width="20" stroke="#63B3FF" />
            <p class="text-xs font-medium">
              You can change your country selection afterward
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full p-6">
      <button
        @click="submit"
        :disabled="selectedOptions.length == 0"
        class="bg-[#8380FF] w-full rounded-lg font-semibold text-xl leading-6 py-3 disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["onSubmit"]);

const options = [
  "United States",
  "United Kingdom",
  "Australia",
  "Europe",
  "Canada",
];
const selectedOptions = ref<String[]>([]);

const updateSelection = (option: string) => {
  const countriesName = option.replace(/ /g, '_').toLowerCase();
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
</script>
