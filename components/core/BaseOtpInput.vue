<template>
  <div class="flex gap-3">
    <input
      v-for="(digit, index) in otp"
      :key="index"
      v-model="otp[index]"
      ref="inputRefs"
      type="text"
      class="text-[#1570EF] text-5xl placeholder:text-5xl text-center focus:placeholder:text-[#1570EF] w-16 h-16 md:w-20 md:h-20 rounded-[10px] outline-none focus:border-[#84CAFF] focus:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_0px_0px_4px_rgba(132,202,255,0.24)] transition-all ease-in-out duration-200"
      :class="[
        isValid
          ? 'border-[1.5px] border-[#D0D5DD] text-[#9CA3AF]'
          : 'border-2 border-[#F76369] placeholder:text-[#F76369] text-[#F76369]',
      ]"
      inputmode="numeric"
      @input="(event) => handleInput(event, index)"
      @click="isValid = true"
      @keydown="(event) => handleKeydown(event, index)"
      @mouseup.prevent="selectText"
      data-hj-allow
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    default: ["-", "-", "-", "-"],
  },
  isOtpValid: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const otp = ref<string[]>(props.modelValue);
const inputRefs = ref<(HTMLInputElement | null)[]>([]);
const isValid = ref<boolean>(props.isOtpValid);

const handleInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement;
  let value = target.value.replace(/[^0-9]/g, "");

  if (value.length > 1) {
    value = value.slice(-1); // Only keep the last digit entered
  }

  otp.value[index] = value;
  if (value && index < otp.value.length - 1) {
    nextTick(() => inputRefs.value[index + 1]?.focus());
  }
  emit("update:modelValue", otp.value);
  nextTick(() => {
    target.setSelectionRange(target.value.length, target.value.length);
  });
};

const handleKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key === "Backspace" && !otp.value[index] && index > 0) {
    otp.value[index - 1] = "";
    nextTick(() => inputRefs.value[index - 1]?.focus());
  }
  // Left/Up Arrow (←) - Move & Select**
  if ((event.key === "ArrowLeft" || event.key === "ArrowUp") && index > 0) {
    event.preventDefault();
    nextTick(() => {
      inputRefs.value[index - 1]?.focus();
      inputRefs.value[index - 1]?.select();
    });
  }

  // Right/Down Arrow (→) - Move & Select**
  if (
    (event.key === "ArrowRight" || event.key === "ArrowDown") &&
    index < otp.value.length - 1
  ) {
    event.preventDefault();
    nextTick(() => {
      inputRefs.value[index + 1]?.focus();
      inputRefs.value[index + 1]?.select();
    });
  }
};

const selectText = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement;
  nextTick(() => target.select());
};

watch(
  () => props.isOtpValid,
  () => {
    isValid.value = props.isOtpValid;
  }
);
watch(
  () => props.modelValue,
  () => {
    otp.value = props.modelValue;
  }
);
</script>
