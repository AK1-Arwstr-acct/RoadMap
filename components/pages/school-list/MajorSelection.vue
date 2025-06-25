<template>
  <div ref="focusDiv" class="relative w-fit">
    <!-- Dropdown Button -->
    <div
      @click.stop="openDropdownHandler"
      @touchstart.prevent="openDropdownHandler"
      class="border-[1.5px] border-[#0000001A] rounded-full py-1.5 px-2.5 w-fit transition-colors duration-150 ease-in-out flex justify-between gap-2 items-center cursor-pointer relative"
      :class="{
        'opacity-70 pointer-events-none': !majorProgramsList.length,
        '!border-[#93C5FD] bg-[#EFF6FF]': selectedLPrograms.length > 0,
      }"
    >
      <div v-if="selectedLPrograms.length === 0" class="flex-1">
        <p class="text-[#111827] text-left">
          Majors
        </p>
      </div>
      <div v-else>
        <p class="text-[#2563EB] text-left truncate font-medium flex items-center gap-2 w-fit">
          Majors
        </p>
      </div>
      <span
        class="transition-transform duration-200 ease-in-out"
        :class="{ 'transform rotate-180': isDropdownOpen }"
      >
        <IconChevronDown v-if="majorProgramsList.length" height="18" width="18" :stroke="selectedLPrograms.length > 0 ? '#60A5FA' : '#4B5563'" />
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
    >
      <p class="font-semibold text-[#4B5563] text-[10px] py-2 px-4 uppercase">
        {{ $t("schoolList_page.majors_pick_up_to_3_majors") }}
      </p>
      <div class="flex flex-col gap-6 pb-2 px-4">
        <div v-for="(option, index) in majorProgramsList" :key="index">
          <label
            :for="`program${index}`"
            class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200"
            :class="{
              '!cursor-default': isProgramDisable && !selectedLPrograms.includes(option.value),
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
              :disabled="isProgramDisable && !selectedLPrograms.includes(option.value)"
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
              <IconTick v-if="selectedLPrograms.includes(option.value)" stroke="#ffffff" />
            </div>
            <div
              class="flex items-center gap-2 text-[#414651] transition-all ease-in-out duration-200 text-sm"
              :class="{
                '!text-[#A4A7AE]': !selectedLPrograms.includes(option.value) && isProgramDisable,
              }"
            >
              {{ option.label }}
            </div>
          </label>
        </div>
        <!-- <div v-if="majorProgramsList.length">
        </div> -->
        <!-- <MajorSekeleton v-else /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import useDashboardStore from "~/stores/dashboardStore";
import axios from "axios";
import useAppStore from "~/stores/AppStore";
import IconChevronDown from "~/components/icons/IconChevronDown.vue";
import IconTick from "~/components/icons/IconTick.vue";
import MajorSekeleton from "~/components/pages/school-list/MajorSekeleton.vue";
import type { Dropdowns } from "~/types/dashboard";

const { api } = useApi();
const appStore = useAppStore();
const { showToast } = useToast();
const dashboardStore = useDashboardStore();

interface programOptions {
  value: number;
  label: string;
}

const props = defineProps({
  openDropdown: {
    type: String as PropType<Dropdowns>,
    default: "",
  },
  dropdownName: {
    type: String as PropType<Dropdowns>,
    default: "",
  },
  direction: {
    type: String as PropType<"upward" | "downward">,
    default: "downward",
  },
});

const emits = defineEmits<{
  (e: "open", value: string): void;
}>();

const majorProgramsList = ref<programOptions[]>([]);
const selectedLPrograms = ref<number[]>([]);

const focusDiv = ref<HTMLElement | null>(null);
const modalPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });
let resizeObserver: ResizeObserver | null = null;

const isDropdownOpen = computed(() => props.openDropdown === props.dropdownName);

const updateModalPosition = () => {
  if (focusDiv.value) {
    const rect = focusDiv.value.getBoundingClientRect();

    modalPosition.value = {
      top: rect.bottom + 5, // 20px below
      left: rect.left, // center horizontally
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
  emits("open", "" as Dropdowns);
};

const isProgramDisable = computed(() => {
  return selectedLPrograms.value.length === 3;
});

// const selectedLabels = computed(() => {
//   if (!selectedLPrograms.value.length) return "";
//   const selected = majorProgramsList.value
//     .filter((item) => selectedLPrograms.value.includes(item.value))
//     .map((item) => item.label);
//   return selected.join(", ");
// });

const toggleSelection = (id: number) => {
  if (selectedLPrograms.value.includes(id)) {
    selectedLPrograms.value = selectedLPrograms.value.filter(
      (selectedId) => selectedId !== id
    );
  } else {
    selectedLPrograms.value.push(id);
  }
  closeDropdown();
  submit();
};

const submit = async () => {
  try {
    dashboardStore.isSchoolsLoading = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      next_program_title_ids: selectedLPrograms.value.length
        ? selectedLPrograms.value
        : -1,
    });
    appStore.getUserData();
  } catch (error) {
    dashboardStore.isSchoolsLoading = false;
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const getMajors = async () => {
  if (!appStore.userData) {
    return;
  }
  try {
    const response = await api.get("/api/v1/school/recommended/program-titles");
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
    selectedLPrograms.value =
      appStore.userData.educational_records.next_program_titles.map(
        (item) => item.id
      );
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

watch(
  () => appStore.userData,
  async () => {
    getMajors();
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
  getMajors();
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