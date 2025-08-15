<template>
  <div class="relative">
    <p v-if="label" class="font-medium text-text-neutral-subtle text-sm mb-1.5">
      {{ label
      }}<span v-if="required" class="text-text-error font-medium">*</span>
    </p>
    <div
      @click.stop="openDropdownHandler"
      @touchstart.prevent="openDropdownHandler"
      class="bg-background-base-subtle h-12 border border-border-neutral-subtle rounded-lg py-2 pl-[14px] w-full transition-colors duration-150 ease-in-out flex justify-between items-center cursor-pointer relative"
      :class="{
        // '!bg-background-disabled pointer-events-none': !disabled,
        'opacity-50 pointer-events-none': disabled,
        'shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_0px_0px_4px_rgba(132,202,255,0.24)]':
          isDropdownOpen && !isShadowDark,
        'shadow-[0px_0px_0px_4px_rgba(225,225,225,0.24)]':
          isDropdownOpen && isShadowDark,
        '!border-border-brand': isDropdownOpen && !isShadowDark,
        '!border-border-error':
          hasError && !selectedOption?.value && !isDropdownOpen,
      }"
    >
      <div v-if="!selectedOption?.value" class="flex-1">
        <p
          class="text-text-neutral-subtle text-left"
          :class="{ '!text-text-base': isDropdownOpen }"
        >
          {{
            placeholder === "Select Option"
              ? `${$t("schoolList_page.select_option")}`
              : placeholder
          }}
        </p>
      </div>
      <div v-else-if="selectedOption?.value && showCheckedLabel" class="flex-1">
        <p class="text-text-neutral-subtle text-left text-xs">
          {{
            placeholder === "Select Option"
              ? `${$t("schoolList_page.select_option")}`
              : placeholder
          }}
        </p>
        <p class="text-text-neutral-subtle text-left w-[calc(100%-24px)] truncate">
          {{ selectedOption.label }}
        </p>
      </div>
      <div v-else class="flex-1">
        <p
          class="text-text-base text-left w-[calc(100%-24px)] truncate flex items-center gap-2"
        >
          <div v-if="selectedOption.icon">
              <component
                :is="selectedOption.icon"
                class="size-6 text-text-neutral-subtle"
              />
            </div>
          {{ selectedOption.label }}
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
          />
        <IconSpinner v-else stroke="#A4A7AE" bgColor="transparent" width="20" />
      </span>
    </div>
    <div
      v-if="isDropdownOpen"
      v-click-outside="closeDropdown"
      class="absolute left-0 border-[1.5px] border-border-neutral-subtle bg-background-base-subtle z-20 max-h-[200px] overflow-y-auto py-1.5 rounded-md shadow-sm"
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
        class="flex items-center cursor-pointer  hover:bg-background-base-subtle-hovered"
        :class="{
          'bg-background-base-subtle-selected':
            mode === 'tick' && selectedOption?.value === item.value,
        }"
      >
        <label
          class="text-text-base text-left cursor-pointer w-full flex items-center gap-2 py-2.5 px-[14px] truncate"
          :class="{
            'justify-between': mode === 'tick',
          }"
        >
          <input
            type="radio"
            :value="item"
            v-model="selectedOption"
            @change="onChange"
            :checked="selectedOption?.value === item.value"
            class="min-w-5 h-5 cursor-pointer"
            :class="{ hidden: mode === 'tick' }"
          />
          <span
            class="truncate font-medium flex item-center gap-2"
          >
            <div v-if="item.icon">
              <component
                :is="item.icon"
                class="size-6 text-text-neutral-subtle"
              />
            </div>
            {{ item.label }}</span
          >
          <span v-if="selectedOption?.value === item.value && mode === 'tick'">
            <IconTick stroke="#1570EF" stroke-width="2" />
          </span>
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
  showCheckedLabel: {
    type: Boolean,
    default: false,
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
  mode: {
    type: String as PropType<"tick" | "radio">,
    default: "tick",
  },
  // for dropdown
  openDropdown: {
    type: String,
    default: "",
  },
  dropdownName: {
    type: String,
    default: "",
  },
});

const emits = defineEmits<{
  (e: "update:modelValue", selectedOptions: OptionAttributes | null): void;
  (e: "onChange"): void;
  (e: "open", value: string): void;
}>();

const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<OptionAttributes | null>(props.modelValue);

const openDropdownHandler = () => {
  emits("open", props.dropdownName);
  isDropdownOpen.value = !isDropdownOpen.value
};

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

watch(
  () => props.openDropdown,
  (newValue) => {
    if (newValue !== props.dropdownName) {
      isDropdownOpen.value = false
    }
  }
);
</script>
