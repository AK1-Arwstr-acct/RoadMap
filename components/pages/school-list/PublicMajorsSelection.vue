<template>
  <div
    class="py-5 px-6 rounded-2xl border-[1.5px] border-gray-200 bg-[#FFFEFC] flex flex-col gap-6"
    :class="{ 'pointer-events-none': dashboardStore.isSchoolsLoading }"
  >
    <p class="font-medium text-[#414651]">
      {{ $t("schoolList_page.majors_pick_up_to_3_majors") }}
    </p>
    <div
      v-if="majorProgramsList.length"
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
    <div v-else class="">
      <p class="text-sm text-[#535862] font-medium">
        {{ $t("schoolList_page.tell_us_about_yourself_to_get_started") }}
      </p>
      <p class="text-sm text-[#717680] mt-2">
        {{
          $t(
            "schoolList_page.fill_in_your_details_on_the_right_to_generate_your_personalized_school_matches"
          )
        }}
      </p>
    </div>
    <button
      v-if="!majorProgramsList.length"
      disabled
      class="text-sm font-semibold text-[#D5D7DA] bg-white rounded-lg py-2.5 border border-gray-200 w-full"
    >
      {{ $t("schoolList_page.select_major") }}
    </button>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import axios from "axios";
import useAppStore from "~/stores/AppStore";

const { api } = useApi();
const appStore = useAppStore();
const { showToast } = useToast();
const dashboardStore = useDashboardStore();
const route = useRoute();

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
  dashboardStore.selectedPublicMajors = selectedLPrograms.value;
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
    if (selectedLPrograms.value.length > 0) {
      await dashboardStore.runEngine();
    } else {
      await dashboardStore.preRunEngine();
    }
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
  try {
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
  () => dashboardStore.isPublicMajorEnable,
  (newValue) => {
    if (newValue) {
      getMajors();
    } else {
      majorProgramsList.value = [];
      dashboardStore.schoolsList = [];
    }
  }
);
</script>
