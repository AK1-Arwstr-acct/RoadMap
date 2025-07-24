<template>
  <div class="relative">
    <p v-if="label" class="font-medium text-text-neutral-subtle text-sm mb-1.5">
      {{ label }}
    </p>
    <div
      @click.stop="isDropdownOpen = !isDropdownOpen"
      @touchstart.prevent="isDropdownOpen = !isDropdownOpen"
      class="bg-background-base-subtle border-[1.5px] border-border-neutral-subtle rounded-lg py-2.5 pl-[14px] pr-[32px] w-full transition-colors duration-150 ease-in-out cursor-pointer relative"
      :class="{
        // '!bg-background-disabled pointer-events-none': !disabled,
        '!bg-[#f8f8f8] pointer-events-none': disabled,
        '!border-border-brand shadow-[0px_0px_0px_4px_rgba(225,225,225,0.24)]':
          isDropdownOpen,
      }"
    >
      <div v-if="!selectedOptions.length" class="flex-1">
        <p
          class="text-text-neutral-subtle w-full truncate"
          :class="{ '!text-text-base': isDropdownOpen }"
        >
          {{
            placeholder === "Select Option"
              ? `${$t("schoolList_page.select_option")}`
              : placeholder
          }}
        </p>
      </div>
      <div v-else class="flex-1">
        <p class="text-text-base w-full truncate">
          {{ selectedLabels }}
        </p>
      </div>
      <span
        :class="[
          isDropdownOpen
            ? 'absolute right-[14px] top-3 transition-transform duration-200 ease-in-out transform rotate-180'
            : 'absolute right-[14px] top-3 transition-transform duration-200 ease-in-out',
        ]"
      >
        <IconChevronDown v-if="!loading" height="18" width="18" />
        <IconSpinner v-else stroke="#A4A7AE" bgColor="transparent" width="20" />
      </span>
    </div>

    <!-- Dropdown Content -->
    <div
      v-if="isDropdownOpen"
      v-click-outside="closeDropdown"
      class="absolute left-0 border-[1.5px] border-border-neutral-subtle bg-background-base-subtle z-20 max-h-[300px] sm:max-h-[400px] overflow-y-auto py-1.5 rounded-md shadow-sm"
      :class="[
        direction === 'upward'
          ? label
            ? 'bottom-12 mb-1'
            : 'bottom-full mb-1'
          : label
          ? 'top-[82px]'
          : 'top-[52px]',
        dropdownWidth === '' ? 'w-full' : dropdownWidth,
      ]"
    >
      <div class="flex flex-col gap-4 pb-2 px-4">
        <div v-for="(option, index) in options" :key="index">
          <label
            :for="`program${index}`"
            class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200"
            :class="{
              '!cursor-default':
                isProgramDisable &&
                !selectedOptions.includes(Number(option.value)),
            }"
          >
            <input
              :id="`program${index}`"
              type="checkbox"
              name="majors"
              :value="option.value"
              :checked="selectedOptions.includes(Number(option.value))"
              class="hidden peer"
              @change="toggleSelection(Number(option.value))"
              :disabled="
                isProgramDisable &&
                !selectedOptions.includes(Number(option.value))
              "
              data-hj-allow
            />
            <div
              class="size-5 flex justify-center items-center border-2 rounded-md transition-all border-border-neutral-subtle"
              :class="[
                selectedOptions.includes(Number(option.value))
                  ? '!border-border-brand bg-background-brand'
                  : {
                      'bg-background-disabled': isProgramDisable,
                    },
              ]"
            >
              <IconTick
                v-if="selectedOptions.includes(Number(option.value))"
                stroke="#ffffff"
              />
            </div>
            <div
              class="flex items-center gap-2 text-text-base transition-all ease-in-out duration-200 text-sm"
              :class="{
                '!text-text-disabled':
                  !selectedOptions.includes(Number(option.value)) &&
                  isProgramDisable,
              }"
            >
              {{ option.label }}
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import useSchoolListStore from "~/stores/SchoolListStore";
import axios from "axios";
import useAppStore from "~/stores/AppStore";
import IconChevronDown from "~/components/icons/IconChevronDown.vue";
import IconTick from "~/components/icons/IconTick.vue";
import IconSpinner from "~/components/icons/IconSpinner.vue";
import type { OptionAttributes } from "~/types/home";

const { api } = useApi();
const appStore = useAppStore();
const { showToast } = useToast();
const schoolListStore = useSchoolListStore();

interface programOptions {
  value: number;
  label: string;
}

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  options: {
    type: Array as PropType<OptionAttributes[]>,
    default: [],
  },
  placeholder: {
    type: String,
    default: "Select Option",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String as PropType<"upward" | "downward">,
    default: "downward",
  },
  dropdownWidth: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Object as PropType<number[]>,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "update:modelValue", selectedOptions: number[]): void;
  (e: "onChange", selectedOptions: number[] | null): void;
}>();

const selectedOptions = ref<number[]>(props.modelValue);
const isDropdownOpen = ref<boolean>(false);

const selectedLabels = computed(() => {
  const list = props.options.filter((item) =>
    selectedOptions.value.includes(Number(item.value))
  );
  return list.map((item) => item.label).join(", ");
});

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const isProgramDisable = computed(() => {
  return selectedOptions.value.length === 3;
});

const toggleSelection = (id: number) => {
  if (selectedOptions.value.includes(id)) {
    selectedOptions.value = selectedOptions.value.filter(
      (selectedId) => selectedId !== id
    );
  } else {
    selectedOptions.value.push(id);
  }
  emits("update:modelValue", selectedOptions.value);
  emits("onChange", selectedOptions.value);
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOptions.value = newValue ? newValue : [];
  }
);
</script>
