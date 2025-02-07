<template>
  <div class="w-[490px] space-y-8">
    <h1 class="text-2xl md:text-4xl md:!leading-[44px] font-medium text-center">
      {{ $t("onboarding.destination_heading") }}
    </h1>
    <div class="space-y-3">
      <div v-for="(option, index) in countriesList" :key="index">
        <label
          :for="`country${index}`"
          class="flex items-center justify-between size-full font-medium rounded-xl cursor-pointer relative border p-3 transition-all ease-in-out duration-200"
          :class="[
            selectedOptionIds.includes(option.id)
              ? 'border-[#84CAFF] bg-[#D1E9FF]/30 text-[#1849A9]'
              : 'border-[#D5D7DA] text-[#414651]',
          ]"
        >
          <input
            :id="`country${index}`"
            type="checkbox"
            name="countries"
            :value="option.id"
            v-model="selectedOptionIds"
            class="absolute top-3 right-3 appearance-none"
          />
          <div class="flex items-center gap-3">
            <component :is="option.icon" />
            {{ option.name }}
          </div>
        </label>
      </div>
    </div>
    <button
      @click="submit"
      class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5"
    >
      {{ $t("onboarding.continue") }}
      <IconSpinner v-if="isSubmitting" class="animate-spin" />
      <IconArrowRight v-else fill="#ffffff" />
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import IconAustralia from "~/components/icons/IconAustralia.vue";
import IconCanada from "~/components/icons/IconCanada.vue";
import IconEurope from "~/components/icons/IconEurope.vue";
import IconUK from "~/components/icons/IconUK.vue";
import IconUS from "~/components/icons/IconUS.vue";
import useAppStore from "~/stores/AppStore";
import type { OptionAttributes } from "~/types/home";

const emit = defineEmits(["submitDestination"]);
const { showToast } = useToast();
const appStore = useAppStore();
const { api } = useApi();

// Use an array to store selected option IDs
const selectedOptionIds = ref<number[]>([]);
const isSubmitting = ref<boolean>(false);
const locationOptions = ref<OptionAttributes>();

const countriesList = [
  {
    id: 1,
    name: "United Kingdom",
    icon: IconUK,
  },
  {
    id: 2,
    name: "Canada",
    icon: IconCanada,
  },
  {
    id: 3,
    name: "Australia",
    icon: IconAustralia,
  },
  {
    id: 4,
    name: "United States",
    icon: IconUS,
  },
  {
    id: 5,
    name: "Europe",
    icon: IconEurope,
  },
];

// watch(
//   () => selectedOptionIds.value,
//   () => {
//     console.log(selectedOptionIds.value);
//   }
// );

const submit = () => {
  try {
    isSubmitting.value = true;
    // api.post("/api/v1/student/update-profile-basic-info", {
    //   current_class_grade: academicInfo.value.grade.value,
    //   cgpa: academicInfo.value.gpa,
    //   ielts_score: academicInfo.value.ielts,
    // });
    emit("submitDestination");
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
  const response = await api.post(
    `/api/v1/anonymous-recommendation/get-location-country`,
    {
      class_grade_ids: [1], // temp id pass
      cgpa: Number(appStore.userData?.educational_records.cgpa),
      uniqueId: appStore.userData?.uuid,
    }
  );
  if (response.data.data) {
    locationOptions.value = response.data.data?.map(
      (item: { country_ids: number[]; title: string }) => {
        let name = item.title.toLowerCase().split(" ").join("_");
        return {
          value: item.country_ids.join(","),
          label: item.title,
          icon: name.includes("united_kingdom")
            ? shallowRef(IconUK)
            : name.includes("Canada")
            ? shallowRef(IconCanada)
            : name.includes("Australia")
            ? shallowRef(IconAustralia)
            : name.includes("united_states")
            ? shallowRef(IconUS)
            : shallowRef(IconEurope),
        };
      }
    );
  }
};

onMounted(async () => {
  await getStudyDestination();
});
</script>
