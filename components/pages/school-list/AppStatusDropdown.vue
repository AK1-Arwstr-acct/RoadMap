<template>
  <div class="relative">
    <div
      @click.stop="handelDropdown"
      @touchstart.prevent="handelDropdown"
      class="bg-white border border-gray-200 rounded-full py-1.5 px-2.5 w-fit duration-150 ease-in-out flex gap-1.5 items-center cursor-pointer relative text-sm"
      :class="{
        '!bg-[#f8f8f8] pointer-events-none': disabled,
      }"
    >
      <div v-if="!selectedOption?.value" class="flex-1">
        <p
          class="text-[#979797] text-left capitalize"
          :class="{ '!text-[#181D27]': isDropdownOpen }"
        >
          {{
            placeholder === "Select Option"
              ? `${$t("schoolList_page.select_option")}`
              : placeholder
          }}
        </p>
      </div>
      <div v-else-if="selectedOption?.value && showCheckedLabel" class="flex-1">
        <p class="text-[#717680] text-left text-xs capitalize">
          {{
            placeholder === "Select Option"
              ? `${$t("schoolList_page.select_option")}`
              : placeholder
          }}
        </p>
        <p class="text-[#717680] text-left w-[calc(100%-24px)] truncate capitalize">
          {{ selectedOption.label }}
        </p>
      </div>
      <div
        v-else
        class="flex-1 text-[#181D27] text-left w-full truncate font-medium capitalize"
      >
        {{ selectedOption.label }}
      </div>
      <span
        class="transition-transform duration-200 ease-in-out"
        :class="{ 'transform rotate-180': isDropdownOpen }"
      >
        <IconChevronDown
          v-if="!loading"
          height="18"
          width="18"
          stroke="#4B5563"
        />
        <IconSpinner v-else stroke="#4B5563" bgColor="#ffffff" width="16" height="17" />
      </span>
    </div>
    <div
      v-if="isDropdownOpen"
      v-click-outside="closeDropdown"
      class="absolute left-0 lg:left-auto lg:right-0 border-[1.5px] border-gray-200 overflow-hidden bg-white z-20 rounded-xl shadow-[2px_-1px_5px_4px_#0000,_2px_3px_20px_15px_#0000,_0_1px_20px_14px_rgb(0_0_0_/_0.05)]"
      :class="[
        direction === 'upward' ? 'bottom-full mb-3' : 'top-[45px]',
        dropdownWidth === '' ? 'w-full' : dropdownWidth,
      ]"
    >
      <div
        v-for="(item, index) in options"
        :key="index"
        class="flex items-center cursor-pointer"
        :class="{
          'bg-[#F5F5F5]': selectedOption?.value === item.value,
        }"
      >
        <label
          @click.stop
          class="text-[#111827] text-left cursor-pointer w-full flex items-center gap-2 py-3 px-4 truncate justify-between"
        >
          <input
            type="radio"
            :value="item"
            v-model="selectedOption"
            @change.stop="onChange"
            :checked="selectedOption?.value === item.value"
            class="min-w-5 h-5 cursor-pointer hidden"
          />
          <span
            class="truncate text-[#181D27] font-medium flex item-center gap-2 capitalize"
          >
            <div v-if="item.icon">
              <component :is="item.icon" class="size-6 text-[#717680]" />
            </div>
            {{ item.label }}</span
          >
          <span v-if="selectedOption?.value === item.value">
            <IconTick stroke="#1570EF" stroke-width="2" />
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OptionAttributes } from "~/types/home";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();

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

const handelDropdown = () => {
  if (appStore.authenticatedUser) {
    isDropdownOpen.value = !isDropdownOpen.value;
  } else {
    appStore.featureSoftPaywall = true;
  }
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
