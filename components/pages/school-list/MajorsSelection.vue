<template>
  <div ref="focusDiv" class="relative w-fit">
    <!-- Dropdown Button -->
    <div
      @click.stop="openDropdownHandler"
      @touchstart.stop="onTouchStart"
      @touchmove="onTouchMove"
      @touchend.prevent="onTouchEnd"
      class="border-[1.5px] border-[#0000001A] rounded-full py-1.5 px-2.5 w-fit transition-colors duration-150 ease-in-out flex justify-between gap-2 items-center cursor-pointer relative"
      :class="{
        'opacity-70 pointer-events-none':
          !majorProgramsList.length || schoolListStore.isSchoolsLoading,
        '!border-[#93C5FD] bg-[#EFF6FF]': selectedLPrograms.length > 0,
      }"
    >
      <div v-if="selectedLPrograms.length === 0" class="flex-1">
        <p class="text-[#111827] text-left">
          {{ $t("schoolList_page.majors") }}
        </p>
      </div>
      <div v-else>
        <p
          class="text-[#2563EB] text-left truncate font-medium flex items-center gap-2 w-fit"
        >
          {{ $t("schoolList_page.majors") }}
        </p>
      </div>
      <span
        class="transition-transform duration-200 ease-in-out"
        :class="{ 'transform rotate-180': isDropdownOpen }"
      >
        <IconChevronDown
          v-if="!loadingMajors"
          height="18"
          width="18"
          :stroke="selectedLPrograms.length > 0 ? '#60A5FA' : '#4B5563'"
        />
        <IconSpinner v-else stroke="#A4A7AE" bgColor="#ffffff" width="18" />
      </span>
    </div>

    <!-- Dropdown Content -->
    <div
      v-if="isDropdownOpen"
      v-click-outside="closeDropdown"
      :style="{
        position: 'fixed',
        top: modalPosition.top + 'px',
        left: modalPosition.left + 'px',
      }"
      class="border-[1.5px] border-gray-200 bg-white z-20 max-h-[264px] w-[260px] overflow-y-auto pb-1.5 rounded-xl shadow-sm"
      :class="[direction === 'upward' ? 'bottom-full mb-1' : 'top-[45px]']"
    >
      <p class="font-semibold text-[#4B5563] text-[10px] py-2 px-4 uppercase">
        {{ $t("schoolList_page.majors_pick_up_to_3_majors") }}
      </p>
      <div class="flex flex-col gap-4 pb-2 px-4">
        <div v-for="(option, index) in majorProgramsList" :key="index">
          <label
            :for="`program${index}`"
            class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200"
            :class="{
              '!cursor-default':
                isProgramDisable && !selectedLPrograms.includes(option.value),
            }"
          >
            <input
              :id="`program${index}`"
              type="checkbox"
              name="majors"
              :value="option.value"
              :checked="selectedLPrograms.includes(option.value)"
              class="hidden peer"
              @change="toggleSelection(option.value)"
              :disabled="
                isProgramDisable && !selectedLPrograms.includes(option.value)
              "
              data-hj-allow
            />
            <div
              class="size-5 flex justify-center items-center border-2 rounded-md transition-all border-gray-200"
              :class="[
                selectedLPrograms.includes(option.value)
                  ? '!border-[#1570EF] bg-[#1570EF]'
                  : {
                      'bg-[#F5F5F5] !border-gray-200': isProgramDisable,
                    },
              ]"
            >
              <IconTick
                v-if="selectedLPrograms.includes(option.value)"
                stroke="#ffffff"
              />
            </div>
            <div
              class="flex items-center gap-2 text-[#414651] transition-all ease-in-out duration-200 text-sm"
              :class="{
                '!text-[#A4A7AE]':
                  !selectedLPrograms.includes(option.value) && isProgramDisable,
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

const { api } = useApi();
const appStore = useAppStore();
const { showToast } = useToast();
const schoolListStore = useSchoolListStore();

interface programOptions {
  value: number;
  label: string;
}

const props = defineProps({
  openDropdown: {
    type: String,
    default: "",
  },
  dropdownName: {
    type: String,
    default: "",
  },
  direction: {
    type: String,
    default: "downward",
  },
});

const emits = defineEmits<{
  (e: "open", value: string): void;
  (e: "update"): void;
}>();

const majorProgramsList = ref<programOptions[]>([]);
const selectedLPrograms = ref<number[]>([]);
const loadingMajors = ref<Boolean>(false);
const width = ref<number>(0);

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
    const dropdownWidth = 260; // Your dropdown width in px (see w-[240px])
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
    emits("open", "");
  } else {
    emits("open", props.dropdownName);
  }
};

const closeDropdown = () => {
  emits("open", "");
};

const isProgramDisable = computed(() => {
  return selectedLPrograms.value.length === 3;
});

const toggleSelection = (id: number) => {
  if (selectedLPrograms.value.includes(id)) {
    selectedLPrograms.value = selectedLPrograms.value.filter(
      (selectedId) => selectedId !== id
    );
  } else {
    selectedLPrograms.value.push(id);
  }
  schoolListStore.selectedPublicMajors = selectedLPrograms.value;
  if (!schoolListStore.isSchoolListPublic) {
    emits("update");
  }
  closeDropdown();
  submit();
};

const submit = async () => {
  try {
    schoolListStore.isSchoolsLoading = true;
    if (selectedLPrograms.value.length > 0) {
      await schoolListStore.runEngine();
    } else {
      await schoolListStore.preRunEngine();
    }
    schoolListStore.isAllowwedOnUserDadaChange = false;
    appStore.getUserData();
  } catch (error) {
    schoolListStore.isSchoolsLoading = false;
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const getMajors = async () => {
  try {
    loadingMajors.value = true;
    const publicToken = useCookie("publicToken");
    const response = await api.get(
      "/api/v2/session-based-journey/school-recommended/program-titles",
      {
        headers: {
          "X-auth-token": publicToken.value,
        },
      }
    );
    if (response) {
      majorProgramsList.value = response.data.data.map(
        (item: { id: number; title: string }) => {
          return {
            value: item.id,
            label: item.title,
          };
        }
      );
    }
    if (appStore.userData?.educational_records.next_program_titles.length) {
      const selectedMajors =
        appStore.userData?.educational_records.next_program_titles.map(
          (item) => item.id
        );
      schoolListStore.selectedPublicMajors = selectedMajors;
      selectedLPrograms.value = selectedMajors;
    }
    loadingMajors.value = false;
  } catch (error) {
    selectedLPrograms.value = [];
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

watch(
  () => schoolListStore.isPublicMajorEnable,
  (newValue) => {
    schoolListStore.selectedPublicMajors = [];
    selectedLPrograms.value = [];
    if (newValue) {
      getMajors();
    } else {
      majorProgramsList.value = [];
      // schoolListStore.schoolsList = [];
    }
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
