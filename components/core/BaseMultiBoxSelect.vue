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
      <div
        class="absolute top-3 right-3"
      >
        <div class="size-5 flex justify-center items-center relative">
          <input
            :id="option"
            type="checkbox"
            v-model="isChecked"
            @change="handleChange"
            class="appearance-none absolute inset-0 size-full border-2 border-[#D9D9D9] checked:border-[#8380FF] rounded-[4px] checked:bg-[#8380FF]"
          />
          <div class="absolute inset-0 flex justify-center items-center">
            <IconTick v-if="isChecked" height="12" width="12" stroke="#ffffff" strokeWidth="3" />
          </div>
        </div>
      </div>
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

const handleChange = () => {
  emit("change");
};

watch(
  () => props.checked,
  (value) => {
    isChecked.value = value;
  }
);
</script>
