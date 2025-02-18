<template>
  <div class="py-5 px-6 rounded-2xl border border-[#E9EAEB] bg-white">
    <p class="font-medium text-[#414651]">Majors (Pick up to 3 majors)</p>
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
            class="size-5 flex justify-center items-center border-2 rounded-md transition-all border-[#D5D7DA]"
            :class="[
              selectedLPrograms.includes(option.value)
                ? '!border-[#1570EF] bg-[#1570EF]'
                : {
                    'bg-[#F5F5F5] !border-[#E9EAEB]': isProgramDisable,
                  },
            ]"
          >
            <IconTick
              v-if="selectedLPrograms.includes(option.value)"
              stroke="#ffffff"
            />
          </div>
          <div
            class="flex items-center gap-2 text-[#414651] transition-all ease-in-out duration-200"
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
    <div class="mt-6">
      <button
        @click="submit"
        :disabled="selectedLPrograms.length < 1"
        class="border border-[#D5D7DA] w-full py-2.5 rounded-lg font-semibold text-sm text-[#414651] disabled:opacity-80 flex gap-2 justify-center"
      >
        Select Major
        <IconSpinner
          v-if="isSubmitting"
          class="size-4"
          bgColor="#ffffff00"
          stroke="#414651"
        />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import useAppStore from "~/stores/AppStore";

const { api } = useApi();
const appStore = useAppStore();
const { showToast } = useToast();

interface programOptions {
  value: number;
  label: string;
}

const majorProgramsList = ref<programOptions[]>([]);
const selectedLPrograms = ref<number[]>([]);
const isSubmitting = ref<boolean>(false);

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
};

const submit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      next_program_title_ids: selectedLPrograms.value,
    });
    appStore.getUserData();
    isSubmitting.value = false;
  } catch (error) {
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
    const response = await api.get(
      "/api/v1/school/recommended/program-titles"
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
    selectedLPrograms.value = appStore.userData.educational_records.next_program_titles.map((item) => item.id);
  } catch (error) {
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
