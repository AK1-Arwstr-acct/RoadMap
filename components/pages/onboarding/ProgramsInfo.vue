<template>
  <div class="w-full sm:w-[490px] space-y-8">
    <h1 class="text-2xl md:text-4xl md:!leading-[44px] font-medium text-center">
      {{ $t("onboarding.programs_heading") }}
    </h1>
    <div class="space-y-3">
      <div v-for="(option, index) in programListOptions" :key="index">
        <label
          :for="option.label"
          class="flex items-center justify-between size-full font-medium rounded-xl cursor-pointer relative border py-4 pl-4 pr-5 transition-all ease-in-out duration-200"
          :class="[
            selectedProgramId === option.value
              ? 'border-[#84CAFF] bg-[#D1E9FF]/30 text-[#1849A9]'
              : 'border-[#D5D7DA] text-[#414651]',
          ]"
        >
          <input
            :id="option.label"
            type="radio"
            name="progress"
            :value="option.value"
            v-model="selectedProgramId"
            class="absolute top-3 right-3 appearance-none"
          />
          <div class="flex items-center gap-3">
            <component :is="option.icon" />
            {{ option.label }}
          </div>
          <div
            class="size-5 rounded-full transition-all ease-in-out duration-200 flex justify-center items-center"
            :class="[
              selectedProgramId === option.value
                ? 'bg-[#1570EF]'
                : 'border-[#D5D7DA] border-2',
            ]"
          >
            <IconTick width="16" height="16" stroke="#ffffff" />
          </div>
        </label>
      </div>
    </div>
    <button
      @click="submit"
      :disabled="!selectedProgramId"
      class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5 disabled:opacity-70"
    >
      {{ $t("onboarding.continue") }}
      <IconSpinner v-if="isSubmitting" class="animate-spin" />
      <IconArrowRight v-else fill="#ffffff" />
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import type { PropType } from "vue";
import useAppStore from "~/stores/AppStore";
import type { OptionAttributes } from "~/types/home";
import IconAustralia from "~/components/icons/IconAustralia.vue";
import IconCanada from "~/components/icons/IconCanada.vue";
import IconEurope from "~/components/icons/IconEurope.vue";
import IconUK from "~/components/icons/IconUK.vue";
import IconUS from "~/components/icons/IconUS.vue";

const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();

defineProps({
  programListOptions: {
    type: Array as PropType<OptionAttributes[]>,
    default: () => []
  }
})
const emit = defineEmits(["submitProgram"]);

const selectedProgramId = ref<string>("");
const isSubmitting = ref<boolean>(false);

const submit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      next_educational_class_grade_id: Number(selectedProgramId.value) || null,
    });
    await appStore.getUserData();
    const locations = await getStudyDestination();
    emit("submitProgram", locations);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};
const getStudyDestination = async () => {
  const gradeLevel = appStore.userData?.educational_records.next_class_grade?.id || null;
  const cgpa = Number(appStore.userData?.educational_records.cgpa) || null;
  if(!gradeLevel || !cgpa) {
    return;
  }
  const response = await api.post(
    `/api/v1/anonymous-recommendation/get-location-country`,
    {
      class_grade_ids: [gradeLevel],
      cgpa: cgpa,
      uniqueId: appStore.userData?.uuid,
    }
  );
  if (response.data.data) {
    const locationOptions = response.data.data?.map(
      (item: { country_ids: number[]; title: string }) => {
        let name = item.title.toLowerCase().split(" ").join("_");
        return {
          value: item.country_ids,
          label: item.title,
          icon: name.includes("united_kingdom")
            ? shallowRef(IconUK)
            : name.includes("canada")
            ? shallowRef(IconCanada)
            : name.includes("australia")
            ? shallowRef(IconAustralia)
            : name.includes("united_states")
            ? shallowRef(IconUS)
            : shallowRef(IconEurope),
        };
      }
    );
    return locationOptions
  }
  return [];
};

onMounted(() => {
  if(appStore.userData) {
    selectedProgramId.value = appStore.userData?.educational_records.next_class_grade?.id || "";
  }
});
</script>
