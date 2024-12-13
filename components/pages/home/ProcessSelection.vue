<template>
  <div class="size-full flex flex-col justify-center">
    <div
      class="w-full p-6 h-20 flex-1 flex flex-col justify-center items-center"
    >
      <div class="w-full flex gap-3 flex-wrap justify-center">
        <BaseRadioBoxSelect
          v-for="(item, idx) in options"
          :key="idx"
          :option="item"
          class="h-[160px] w-[31%]"
          :checked="selectedOption === item"
          @change="updateSelection(item)"
        />
      </div>
    </div>
    <div class="w-full p-6">
      <button
        @click="submit"
        :disabled="selectedOption == null"
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
  "Just getting started",
  "Already have a school list",
  "Certificates completed",
];
const selectedOption = ref<String | null>(null);

const updateSelection = (option: string) => {
  selectedOption.value = selectedOption.value === option ? null : option;
};

const submit = () => {
  emit("onSubmit", selectedOption.value);
};
</script>
