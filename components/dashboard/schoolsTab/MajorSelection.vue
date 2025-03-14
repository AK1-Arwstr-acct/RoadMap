<template>
  <div
    v-if="majorProgramsList.length"
    class="py-5 px-6 rounded-2xl border-[1.5px] border-gray-200 bg-white"
    :class="{ 'pointer-events-none': dashboardStore.isSchoolsLoading }"
  >
    <p class="font-medium text-[#414651] text-sm">
      Majors (Pick up to 3 majors)
    </p>
    <div
      class="mt-[14px] space-y-4 max-h-[280px] overflow-y-auto custom-scrollbar"
    >
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
            name="countries"
            :value="option.value"
            :checked="selectedLPrograms.includes(option.value)"
            class="hidden peer"
            @change="toggleSelection(option.value)"
            :disabled="
              isProgramDisable && !selectedLPrograms.includes(option.value)
            "
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
  <MajorSekeleton v-else />
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import axios from "axios";
import useAppStore from "~/stores/AppStore";

const { api } = useApi();
const appStore = useAppStore();
const { showToast } = useToast();
const dashboardStore = useDashboardStore();

interface programOptions {
  value: number;
  label: string;
}

const majorProgramsList = ref<programOptions[]>([]);
const selectedLPrograms = ref<number[]>([]);

const isProgramDisable = computed(() => {
  return selectedLPrograms.value.length === 3;
});

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const toggleSelection = (id: number) => {
  if (selectedLPrograms.value.includes(id)) {
    selectedLPrograms.value = selectedLPrograms.value.filter(
      (selectedId) => selectedId !== id
    );
  } else {
    selectedLPrograms.value.push(id);
  }
  submit();
  // if (debounceTimeout) {
  //   clearTimeout(debounceTimeout);
  // }
  // debounceTimeout = setTimeout(async () => {
  //   submit();
  // }, 1000);
};

const submit = async () => {
  try {
    dashboardStore.isSchoolsLoading = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      next_program_title_ids: selectedLPrograms.value.length ? selectedLPrograms.value : -1,
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

onMounted(() => {
  getMajors();
});
</script>
