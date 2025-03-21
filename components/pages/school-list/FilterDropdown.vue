<template>
  <div class="relative">
    <div
      @click="isDropdownOpen = !isDropdownOpen"
      @touchstart.prevent="isDropdownOpen = !isDropdownOpen"
      class="bg-white h-12 border-[1.5px] border-gray-200 rounded-lg py-2 px-[14px] w-full transition-colors duration-150 ease-in-out flex justify-between gap-4 items-center cursor-pointer relative"
      :class="{
        'shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_0px_0px_4px_rgba(132,202,255,0.24)]':
          isDropdownOpen,
        '!border-[#84CAFF]': isDropdownOpen,
      }"
    >
      <IconFilterLines />
      <div v-if="!selectedOption?.value" class="flex-1">
        <p
          class="text-[#979797] text-left"
          :class="{ '!text-[#181D27]': isDropdownOpen }"
        >
          {{ placeholder }}
        </p>
      </div>
      <div v-else class="flex-1">
        <p class="text-[#181D27] text-left font-medium">
          {{ selectedOption.label }}
        </p>
      </div>
      <div
        v-if="selectedOption && !isDropdownOpen"
        @click="clratSortFilter"
        class="cursor-pointer"
      >
        <IconCross fill="#1570EF" />
      </div>
      <span
        v-else
        :class="[
          isDropdownOpen
            ? 'transition-transform duration-200 ease-in-out transform rotate-180'
            : 'transition-transform duration-200 ease-in-out',
        ]"
      >
        <IconChevronDown height="18" width="18" stroke="#A4A7AE" />
      </span>
    </div>
    <div
      v-if="isDropdownOpen"
      v-click-outside="closeDropdown"
      class="absolute right-0 top-[52px] w-[320px] border-[1.5px] border-gray-200 bg-white z-20 max-h-[400px] overflow-y-auto py-1.5 rounded-md shadow-sm"
    >
      <div
        v-for="(item, index) in options"
        :key="index"
        class="flex items-center cursor-pointer px-3.5"
        :class="{
          'bg-[#FAFAFA]':
            mode === 'tick' && selectedOption?.value === item.value,
        }"
      >
        <component v-if="item.icon" :is="item.icon" />
        <label
          class="text-[#5d5f65] text-left cursor-pointer w-full flex items-center gap-2 py-2.5 px-[14px] truncate"
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
          <span class="truncate text-[#181D27] font-medium">{{
            item.label
          }}</span>
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
import useDashboardStore from "~/stores/dashboardStore";

const dashboardStore = useDashboardStore();

const props = defineProps({
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
  mode: {
    type: String as PropType<"tick" | "radio">,
    default: "tick",
  },
});

const emits = defineEmits<{
  (e: "update:modelValue", selectedOptions: OptionAttributes | null): void;
}>();

const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<OptionAttributes | null>(props.modelValue);

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const clratSortFilter = () => {
  selectedOption.value = null;
  dashboardStore.setSortParam(null);
  emits("update:modelValue", null);
};

const onChange = () => {
  closeDropdown();
  emits("update:modelValue", selectedOption.value);
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = newValue ? newValue : null;
  }
);
</script>
