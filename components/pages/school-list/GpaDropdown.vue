<template>
  <div ref="focusDiv" class="relative w-fit">
    <div
      @click.stop="openDropdownHandler"
      @touchstart.stop="onTouchStart"
      @touchmove="onTouchMove"
      @touchend.prevent="onTouchEnd"
      class="border-[1.5px] border-[#0000001A] rounded-full py-1.5 px-2.5 w-fit transition-colors duration-150 ease-in-out flex justify-between gap-2 items-center cursor-pointer relative"
      :class="{
        'opacity-70 pointer-events-none': disabled,
        '!border-[#93C5FD] bg-[#EFF6FF]': gpaValue !== null && gpaValue !== '',
      }"
    >
      <div class="text-nowrap">
        <p
          class="text-[#2563EB] text-left truncate font-medium flex items-center gap-2 w-fit"
          v-if="gpaValue !== null && gpaValue !== ''"
        >
          GPA {{ gpaValue }}
        </p>
        <p class="text-[#111827] text-left" v-else>Enter GPA</p>
      </div>
      <span
        class="transition-transform duration-200 ease-in-out"
        :class="{ 'transform rotate-180': isDropdownOpen }"
      >
        <IconChevronDown
          height="18"
          width="18"
          :stroke="gpaValue ? '#60A5FA' : '#4B5563'"
        />
      </span>
    </div>
    <div
      v-if="isDropdownOpen"
      v-click-outside="closeDropdown"
      :style="{
        position: 'fixed',
        top: modalPosition.top + 'px',
        left: modalPosition.left + 'px',
        // zIndex: 9999,
      }"
      class="border-[1.5px] border-gray-200 bg-white z-20 w-[240px] rounded-xl shadow-sm p-2 flex flex-col items-end gap-2"
      :class="[direction === 'upward' ? 'bottom-full mb-1' : 'top-[45px]']"
    >
      <input
        v-model="inputValue"
        type="text"
        step="0.1"
        min="0"
        max="10"
        placeholder="Enter GPA"
        class="w-full bg-[#F5F5F5] rounded-md px-3 py-2 outline-none"
        @keyup.enter="onDone"
      />
      <button
        class="bg-[#2563EB] text-white px-6 py-1.5 rounded-md font-medium w-fit"
        @click="onDone"
      >
        Done
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import IconChevronDown from "~/components/icons/IconChevronDown.vue";
import type { Dropdowns } from "~/types/dashboard";

const props = defineProps({
  modelValue: {
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
  direction: {
    type: String as PropType<"upward" | "downward">,
    default: "downward",
  },
});

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "onChange"): void;
  (e: "open", value: string): void;
}>();

// const isDropdownOpen = ref(false);
// const convertedValue = ref(props.modelValue ? ((parseFloat(props.modelValue) / 4) * 10).toFixed(0) : '')
const gpaValue = ref(props.modelValue);
const inputValue = ref(props.modelValue);

const focusDiv = ref<HTMLElement | null>(null);
const modalPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });
let resizeObserver: ResizeObserver | null = null;

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

    modalPosition.value = {
      top: rect.bottom + 5, // 20px below
      left: rect.left
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
//   isDropdownOpen.value = false;
// };

const onDone = () => {
  gpaValue.value = inputValue.value;
  emits("update:modelValue", gpaValue.value);
  emits("onChange");
  closeDropdown();
};

watch(
  () => props.modelValue,
  (newValue) => {
    // convertedValue.value = newValue ? ((parseFloat(newValue) / 4) * 10).toFixed(0) : ''
    // gpaValue.value = convertedValue.value;
    // inputValue.value = convertedValue.value;
    gpaValue.value = newValue;
    inputValue.value = newValue;
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
  if (focusDiv.value) {
    resizeObserver = new ResizeObserver(() => {
      updateModalPosition();
    });
    resizeObserver.observe(focusDiv.value);
  }
  window.addEventListener("resize", updateModalPosition);
  window.addEventListener("scroll", updateModalPosition, true);
});

onUnmounted(() => {
  if (resizeObserver && focusDiv.value) {
    resizeObserver.unobserve(focusDiv.value);
    resizeObserver.disconnect();
  }
  window.removeEventListener("resize", updateModalPosition);
  window.removeEventListener("scroll", updateModalPosition, true);
});
</script>
