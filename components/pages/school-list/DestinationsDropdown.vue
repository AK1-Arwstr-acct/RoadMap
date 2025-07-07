<template>
  <div ref="focusDiv" class="relative w-fit">
    <div
      @click.stop="openDropdownHandler"
      @touchstart.stop="onTouchStart"
      @touchmove="onTouchMove"
      @touchend.prevent="onTouchEnd"
      class="border-[1.5px] border-[#0000001A] rounded-full py-1.5 px-2.5 w-fit transition-colors duration-150 ease-in-out flex justify-between gap-2 items-center cursor-pointer relative"
      :class="{
        'opacity-70 pointer-events-none':
          disabled || !schoolListStore.locationOptions.length,
        '!border-[#93C5FD] bg-[#EFF6FF]': selectedLocationOptions.length > 0,
      }"
    >
      <div
        v-if="selectedLocationOptions.length <= 0"
        class="flex-1 text-nowrap"
      >
        <p class="text-[#111827] text-left">Study destination</p>
      </div>
      <div v-else class="text-nowrap">
        <p
          class="text-[#2563EB] text-left truncate font-medium flex items-center gap-2 w-fit"
        >
          Study destination
        </p>
      </div>
      <span
        class="transition-transform duration-200 ease-in-out"
        :class="{ 'transform rotate-180': isDropdownOpen }"
      >
        <IconChevronDown
          v-if="!loading"
          height="18"
          width="18"
          :stroke="selectedLocationOptions.length > 0 ? '#60A5FA' : '#4B5563'"
        />
        <IconSpinner v-else stroke="#A4A7AE" bgColor="#ffffff" width="18" />
      </span>
    </div>
    <div
      v-if="isDropdownOpen"
      v-click-outside="closeDropdown"
      :style="{
        position: 'fixed',
        top: modalPosition.top + 'px',
        left: modalPosition.left + 'px',
      }"
      class="border-[1.5px] border-gray-200 bg-white z-20 max-h-[264px] w-[240px] lg:w-[250px] sm:max-h-[264px] overflow-y-auto pb-1.5 rounded-xl shadow-sm"
    >
      <p
        v-if="label"
        class="font-semibold text-[#4B5563] text-[10px] py-2 px-4 uppercase"
      >
        Study destination
      </p>
      <div class="flex flex-col gap-6 pb-2 px-4">
        <div
          v-for="(option, index) in schoolListStore.locationOptions"
          :key="index"
        >
          <!-- :class="{
                'pointer-events-none': isLocationchange || isGpaChange,
              }" -->
          <label
            class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200"
          >
            <input
              :id="`destination${index}`"
              type="checkbox"
              name="countries"
              :value="option.value"
              :checked="option.value.some((id: number) =>
                                selectedLocationOptions.includes(id)
                            )
                                "
              class="hidden peer"
              @change="toggleSelection(option.value)"
            />
            <div
              class="size-5 flex justify-center items-center border-2 rounded-md transition-all"
              :class="[
                            option?.value.some((id: number) =>
                                selectedLocationOptions.includes(id)
                            )
                                ? 'border-[#1570EF] bg-[#1570EF]'
                                : 'border-gray-200',
                        ]"
            >
              <IconTick
                v-if="
                                option?.value.some((id: number) =>
                                    selectedLocationOptions.includes(id)
                                )
                            "
                stroke="#ffffff"
              />
            </div>
            <div
              class="flex items-center gap-2 text-[#414651]"
              :for="`destination${index}`"
            >
              <component
                :is="
                  option.label.toLowerCase().includes('kingdom')
                    ? IconUK
                    : option.label.toLowerCase().includes('canada')
                    ? IconCanada
                    : option.label.toLowerCase().includes('australia')
                    ? IconAustralia
                    : option.label.toLowerCase().includes('states')
                    ? IconUS
                    : IconEurope
                "
                class="w-6 h-6"
              />
              {{ option.label }}
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OptionAttributes } from "~/types/home";
import useSchoolListStore from "~/stores/SchoolListStore";
import IconUK from "~/components/icons/IconUK.vue";
import IconUS from "~/components/icons/IconUS.vue";
import IconAustralia from "~/components/icons/IconAustralia.vue";
import IconEurope from "~/components/icons/IconEurope.vue";
import IconCanada from "~/components/icons/IconCanada.vue";
import type { Dropdowns } from "~/types/dashboard";

const schoolListStore = useSchoolListStore();

const props = defineProps({
  modelValue: {
    type: Object as PropType<number[]>,
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
  loading: {
    type: Boolean,
    default: false,
  },
  isLocationchange: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String as PropType<"upward" | "downward">,
    default: "downward",
  },
});

const selectedLocationOptions = ref<number[]>(props.modelValue);

const focusDiv = ref<HTMLElement | null>(null);
const modalPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });
let resizeObserver: ResizeObserver | null = null;
const width = ref<number>(0);

const emits = defineEmits<{
  (e: "update:modelValue", selectedOptions: number[]): void;
  (e: "onChange"): void;
  (e: "open", value: string): void;
}>();

// const isDropdownOpen = ref<boolean>(false);

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
      left: left,
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

const onChange = () => {
  closeDropdown();
  emits("update:modelValue", selectedLocationOptions.value);
  emits("onChange");
};

const toggleSelection = async (ids: number[]) => {
  const allSelected = ids.every((id) =>
    selectedLocationOptions.value.includes(id)
  );
  if (allSelected) {
    selectedLocationOptions.value = selectedLocationOptions.value.filter(
      (id) => !ids.includes(id)
    );
  } else {
    selectedLocationOptions.value = [
      ...new Set([...selectedLocationOptions.value, ...ids]),
    ];
  }
  emits("update:modelValue", selectedLocationOptions.value);
  emits("onChange");
  //   isLocationchange.value = true;
  //   await getBudgets();
  //   await getProgramParent();
  //   isLocationchange.value = false;
};

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedLocationOptions.value = newValue ?? newValue;
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
