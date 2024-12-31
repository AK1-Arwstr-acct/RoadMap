<template>
  <div class="size-full flex flex-col justify-center">
    <div
      class="w-full p-6 md:p-12 h-20 flex-1 flex flex-col gap-6 justify-center items-center"
    >
      <div class="w-full flex flex-wrap justify-between">
        <BaseRadioBoxSelect
          v-for="(item, idx) in options"
          :key="idx"
          :option="item"
          class="h-[160px] w-[32.4%]"
          :checked="selectedOption === item"
          @change="updateSelection(item)"
        />
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
const emit = defineEmits(["onSubmit", "backStep"]);

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

onMounted(() => {
  const userData = JSON.parse(sessionStorage.getItem("formData")!);
  if (userData) {
    selectedOption.value = userData.process;
  }
});
</script>
