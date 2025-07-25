<template>
  <div
    class="py-5 px-6 rounded-2xl border-[1.5px] border-gray-200 bg-[#FFFEFC] flex flex-col gap-6"
    :class="{ 'pointer-events-none': demoStore.isSchoolsLoading }"
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
import useDemoStore from "~/stores/demoStore";

const demoStore = useDemoStore();

interface programOptions {
  value: number;
  label: string;
}

const majorProgramsList = ref<programOptions[]>([]);
const selectedLPrograms = ref<number[]>([]);

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
  demoStore.selectedPublicMajors = selectedLPrograms.value;
  submit();
  demoStore.aiRecommendationList = false;
};

const submit = async () => {
  if (selectedLPrograms.value.length > 0) {
    demoStore.schoolsList = demoStore.filterSchoolsList.filter((item) => {
      let program_names: string[] = demoStore.majorsList
        .filter((item) => selectedLPrograms.value.includes(item.value))
        .map((major) => major.label);
      return program_names.includes(item.program_title);
    });
  } else {
    demoStore.schoolsList = demoStore.filterSchoolsList;
  }
};

watch(
  () => majorProgramsList.value,
  () => {
    selectedLPrograms.value = [];
  }
);

watch(
  () => demoStore.majorsList,
  () => {
    majorProgramsList.value = demoStore.majorsList;
  }
);
</script>
