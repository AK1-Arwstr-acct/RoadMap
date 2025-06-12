<template>
  <div class="relative z-30">
    <p v-if="label" class="font-medium text-[#414651] text-sm mb-1.5">
      {{ label
      }}<span v-if="required" class="text-[#D92D20] font-medium">*</span>
    </p>
    <div
      @click="isDropdownOpen = !isDropdownOpen"
      @touchstart.prevent="isDropdownOpen = !isDropdownOpen"
      class="bg-white h-12 border-[1.5px] border-gray-200 rounded-lg py-2 pl-[14px] w-full transition-colors duration-150 ease-in-out flex justify-between items-center cursor-pointer relative"
      :class="{
        '!bg-[#f8f8f8] pointer-events-none': disabled,
        'shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_0px_0px_4px_rgba(132,202,255,0.24)]':
          isDropdownOpen && !isShadowDark,
        'shadow-[0px_0px_0px_4px_rgba(225,225,225,0.24)]':
          isDropdownOpen && isShadowDark,
        '!border-[#84CAFF]': isDropdownOpen && !isShadowDark,
        '!border-[#EF4646]':
          hasError && !selectedOption?.value && !isDropdownOpen,
      }"
    >
      <div class="flex-1">
        <p
          class="text-[#979797] text-left"
          :class="{ '!text-[#181D27]': isDropdownOpen }"
        >
          {{
            placeholder === "Select Option"
              ? `${$t("schoolList_page.select_option")}`
              : placeholder
          }}
        </p>
      </div>
      <span
        :class="[
          isDropdownOpen
            ? 'absolute right-[14px] top-3 transition-transform duration-200 ease-in-out transform rotate-180'
            : 'absolute right-[14px] top-3 transition-transform duration-200 ease-in-out',
        ]"
      >
        <IconChevronDown
          v-if="!loading"
          height="18"
          width="18"
          stroke="#A4A7AE"
        />
        <IconSpinner v-else stroke="#A4A7AE" bgColor="#ffffff" width="20" />
      </span>
    </div>
    <div
      v-if="isDropdownOpen"
      v-click-outside="closeDropdown"
      class="absolute left-0 border-[1.5px] border-gray-200 bg-white z-20 max-h-[300px] sm:max-h-[400px] overflow-y-auto py-1.5 rounded-md shadow-sm"
      :class="[
        direction === 'upward'
          ? label
            ? 'bottom-12 mb-1'
            : 'bottom-full mb-1'
          : label
          ? 'top-[82px]'
          : 'top-[52px]',
        dropdownWidth === '' ? 'w-full' : dropdownWidth
      ]"
    >
      <div
        v-for="(item, index) in options"
        :key="index"
        class="flex items-center cursor-pointer"
        :class="{
          'bg-[#FAFAFA]':
            selectedOption?.value === item.value,
        }"
      >
        <label
          class="text-[#5d5f65] text-left cursor-pointer w-full flex items-center gap-2 py-2.5 px-[14px] truncate"
          
        >
          <input
            type="radio"
            :value="item"
            v-model="selectedOption"
            @change="onChange"
            :checked="selectedOption?.value === item.value"
            class="min-w-5 h-5 cursor-pointer hidden"
          />
          <span
            class="truncate text-[#181D27] font-medium flex item-center gap-2"
          >
            <div v-if="item.icon">
              <component
                :is="item.icon"
                class="size-6 text-[#717680]"
              />
            </div>
            {{ item.label }}</span
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OptionAttributes } from "~/types/home";

const props = defineProps({
  dropdownWidth: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select Option",
  },
  options: {
    type: Array as PropType<OptionAttributes[]>,
    default: [],
  },
  modelValue: {
    type: Object as PropType<OptionAttributes | null>,
    default: null,
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  isShadowDark: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String as PropType<"upward" | "downward">,
    default: "downward",
  },
});

const emits = defineEmits<{
  (e: "update:modelValue", selectedOptions: OptionAttributes | null): void;
  (e: "onChange"): void;
}>();

const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<OptionAttributes | null>(props.modelValue);

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const onChange = () => {
  closeDropdown();
  emits("update:modelValue", selectedOption.value);
  emits("onChange");
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = newValue ? newValue : null;
  }
);
</script>