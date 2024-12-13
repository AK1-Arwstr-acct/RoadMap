<template>
  <div class="size-full">
    <label
      :for="option"
      class="flex items-center size-full text-xl font-semibold justify-center rounded-xl cursor-pointer relative text-[#F3F3F3] border-4 text-center"
      :class="[
        !isChecked
          ? 'border-[#292929] bg-[#292929]'
          : 'border-[#8380FF] bg-[#14125C]',
      ]"
    >
      <input
        :id="option"
        type="radio"
        v-model="isChecked"
        @change="handleChange"
        class="absolute top-3 right-3 appearance-none"
      />
      <span class="absolute top-3 right-3 size-[18px] border-2 rounded-full" :class="[isChecked ? 'bg-[#8380FF] border-[#8380FF]' : 'border-[#D9D9D9]']" />
      {{ option }}
    </label>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["change"]);

const props = defineProps({
  option: {
    type: String,
    default: () => "",
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const isChecked = ref<boolean>(props.checked);

watch(
  () => props.checked,
  () => {
    isChecked.value = props.checked;
  }
);

const handleChange = () => {
  emit("change");
};
</script>
