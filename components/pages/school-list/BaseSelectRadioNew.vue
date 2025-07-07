<template>
    <div ref="focusDiv" class="relative w-fit">
        <div 
            @click.stop="openDropdownHandler" 
            @touchstart.stop="onTouchStart"
            @touchmove="onTouchMove"
            @touchend.prevent="onTouchEnd"
            class="border-[1.5px] border-[#0000001A] rounded-full py-1.5 px-2.5 w-fit transition-colors duration-150 ease-in-out flex justify-between gap-2 items-center cursor-pointer relative"
            :class="{
              'opacity-70 pointer-events-none': disabled || !options.length,
                '!border-[#93C5FD] bg-[#EFF6FF]': selectedOption,
            }">
            <div v-if="!selectedOption?.value" class="flex-1 text-nowrap">
                <p class="text-[#111827] text-left">
                    {{
                        label
                    }}
                </p>
            </div>
            <div v-else class="text-nowrap">
                <p class="text-[#2563EB] text-left truncate font-medium flex items-center gap-2 w-fit">
                <div v-if="selectedOption.icon">
                    <component :is="selectedOption.icon" class="size-6 text-[#717680]" />
                </div>
                {{ selectedOption.label }}
                </p>
            </div>
            <span class="transition-transform duration-200 ease-in-out"
                :class="{ 'transform rotate-180': isDropdownOpen }">
                <IconChevronDown v-if="!loading" height="18" width="18"
                    :stroke="selectedOption ? '#60A5FA' : '#4B5563'" />
                <IconSpinner v-else stroke="#A4A7AE" bgColor="#ffffff" width="18" />
            </span>
        </div>
        <div v-if="isDropdownOpen" v-click-outside="closeDropdown"
            :style="{
                position: 'fixed',
                top: modalPosition.top + 'px',
                left: modalPosition.left + 'px',
                zIndex: 9999999
            }"
            class="border-[1.5px] border-gray-200 bg-white z-50 max-h-[264px] w-[240px] sm:max-h-[264px] overflow-y-auto pb-1.5 rounded-xl shadow-sm"
            >
            <p v-if="label" class="font-semibold text-[#4B5563] text-[10px] py-2 px-4 uppercase">
                {{ label
                }}
            </p>
            <div v-for="(item, index) in options" :key="index" class="flex items-center cursor-pointer" :class="{
                'bg-[#FAFAFA]':
                    mode === 'tick' && selectedOption?.value === item.value,
            }">
                <label
                    class="text-[#5d5f65] text-left cursor-pointer w-full flex items-center gap-2 py-2.5 px-[14px] truncate"
                    :class="{
                        'justify-between': mode === 'tick',
                    }">
                    <input type="radio" :value="item" v-model="selectedOption" @change="onChange"
                        :checked="selectedOption?.value === item.value" class="min-w-5 h-5 cursor-pointer"
                        :class="{ hidden: mode === 'tick' }" />
                    <span class="truncate text-[#181D27] font-medium flex item-center gap-2">
                        <div v-if="item.icon">
                            <component :is="item.icon" class="size-6 text-[#717680]" />
                        </div>
                        {{ item.label }}
                    </span>
                    <span v-if="selectedOption?.value === item.value && mode === 'tick'">
                        <IconTick stroke="#1570EF" stroke-width="2" />
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Dropdowns } from "~/types/dashboard";
import type { OptionAttributes } from "~/types/home";

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
    label: {
        type: String,
        default: "",
    },
    openDropdown: {
        type: String as PropType<Dropdowns>,
        default: "",
    },
    dropdownName: {
        type: String as PropType<Dropdowns>,
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
    direction: {
        type: String as PropType<"upward" | "downward">,
        default: "downward",
    },
    mode: {
        type: String as PropType<"tick" | "radio">,
        default: "tick",
    },
});

const emits = defineEmits<{
    (e: "update:modelValue", selectedOptions: OptionAttributes | null): void;
    (e: "onChange"): void;
    (e: "open", value: string): void;
}>();

// const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<OptionAttributes | null>(props.modelValue);

const focusDiv = ref<HTMLElement | null>(null);
const modalPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });
let resizeObserver: ResizeObserver | null = null;
const width = ref<number>(0);

const isDropdownOpen = computed(
  () => props.openDropdown === props.dropdownName
);

const touchStartX = ref(0);
const touchMoved = ref(false);

const onTouchStart = (e: TouchEvent) => {
  touchMoved.value = false;
  touchStartX.value = e.touches[0].clientX;

};

const onTouchMove = (e: TouchEvent) => {
  const dx = Math.abs(e.touches[0].clientX - touchStartX.value);
  // If moved more than 2px in x direction, consider it a scroll
  if (dx > 2) {
    touchMoved.value = true;
  }
};

const onTouchEnd = (e: TouchEvent) => {
  if (!touchMoved.value) {
    openDropdownHandler();
  }
};


const updateModalPosition = () => {
  if (focusDiv.value) {
    const rect = focusDiv.value.getBoundingClientRect();
     const dropdownWidth = 240; // Your dropdown width in px (see w-[240px])
    const viewportWidth = window.innerWidth;

    let left = rect.left;
    // Calculate if dropdown overflow right edge
    const overflowRight = rect.left + dropdownWidth > viewportWidth;
    if (overflowRight && width.value > 1024) {
      left = Math.max(0, viewportWidth - dropdownWidth - 24); // 24px margin from right
    }

    modalPosition.value = {
      top: rect.bottom + 5, // 5px below
      left: left
    };
  }
};

const openDropdownHandler = () => {
  if (isDropdownOpen.value) {
    emits("open", "" as Dropdowns);
  } else {
    emits("open", props.dropdownName);
  }
};

const closeDropdown = () => {
  emits("open", "" as Dropdowns); // Cast "" to Dropdowns type
};

// const closeDropdown = () => {
//     isDropdownOpen.value = false;
// };

const onChange = () => {
    closeDropdown();
    emits("update:modelValue", selectedOption.value);
    emits("onChange");
};

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

watch(
    () => props.modelValue,
    (newValue) => {
        selectedOption.value = newValue ? newValue : null;
    }
);

watch(
  () => isDropdownOpen.value,
  (val) => {
    if (val) {
      nextTick(() => {
        updateModalPosition();
      });
    }
  }
);

onMounted(() => {
  windowSize();
  if (focusDiv.value) {
    resizeObserver = new ResizeObserver(() => {
      updateModalPosition();
    });
    resizeObserver.observe(focusDiv.value);
  }
  window.addEventListener("resize", updateModalPosition);
  window.addEventListener("scroll", updateModalPosition, true);
  window.addEventListener("resize", windowSize);
});

onUnmounted(() => {
  if (resizeObserver && focusDiv.value) {
    resizeObserver.unobserve(focusDiv.value);
    resizeObserver.disconnect();
  }
  window.removeEventListener("resize", updateModalPosition);
  window.removeEventListener("scroll", updateModalPosition, true);
  window.removeEventListener("resize", windowSize);
});
</script>