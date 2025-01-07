<template>
  <div class="size-full flex flex-col justify-center">
    <div
      class="w-full p-6 md:p-12 h-20 flex-1 flex flex-col gap-6 justify-center items-center"
    >
      <div class="w-full flex flex-wrap gap-3 sm:gap-0 justify-center sm:justify-between">
        <BaseRadioBoxSelect
          v-for="(item, idx) in options"
          :key="idx"
          :option="item"
          class="h-[160px] w-[calc(50%-6px)] sm:w-[32.4%]"
          :checked="selectedOption === item"
          @change="updateSelection(item)"
        />
      </div>
      <div class="w-full flex gap-4 mt-12">
        <button
          @click="goback"
          class="text-[#8380FF] bg-transparent w-full rounded-lg font-semibold text-xl leading-6 py-3 flex justify-center items-center gap-2"
        >
          <IconArrowRight class="transform rotate-180" fill="#8380FF" />
          Back
        </button>
        <button
          @click="submit"
          :disabled="selectedOption == null"
          class="bg-[#8380FF] w-full rounded-lg font-semibold text-xl leading-6 py-3 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["onSubmit", "backStep" , "updateProcessSelection"]);

const props = defineProps({
  selectedProcess: {
    type: String,
  },
});

const options = [
  "Just getting started",
  "Already have a school list",
  "Certificates completed",
];
const selectedOption = ref<String | null>( props.selectedProcess || null);

const updateSelection = (option: string) => {
  selectedOption.value = selectedOption.value === option ? null : option;
};

const goback = () => {
  emit('backStep');
  emit('updateProcessSelection' , selectedOption.value)
}

const submit = () => {
  emit("onSubmit", selectedOption.value);
};

watch(
  () => props.selectedProcess,
  () => {
    selectedOption.value = props.selectedProcess || null;
  }
);
</script>
