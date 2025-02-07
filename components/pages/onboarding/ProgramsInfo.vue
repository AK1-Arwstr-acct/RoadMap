<template>
  <div class="w-[490px] space-y-8">
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
    <div>
      <BaseSelectRadio
        :label="t('onboarding.area_of_study')"
        :options="coursePreferenceOptions"
        direction="upward"
        v-model="selectedCourse"
        :loading="isCourseLoading"
        :disabled="selectedProgramId === ''"
      />
    </div>
    <button
      @click="submit"
      :disabled="selectedProgramId === ''"
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
import IconAssociate from "~/components/icons/IconAssociate.vue";
import IconBachelor from "~/components/icons/IconBachelor.vue";
import IconMaster from "~/components/icons/IconMaster.vue";
import useAppStore from "~/stores/AppStore";
import type { OptionAttributes } from "~/types/home";

const { t } = useI18n();
const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();

const emit = defineEmits(["submitProgram"]);

const selectedProgramId = ref<string>("");
const isSubmitting = ref<boolean>(false);
const isCourseLoading = ref<boolean>(false);
const programListOptions = ref<OptionAttributes[]>();
const coursePreferenceOptions = ref<OptionAttributes[]>();
const selectedCourse = ref<OptionAttributes>();

const submit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      current_class_grade: [
        appStore.userData?.educational_records.current_class_grade.id,
      ],
      super_meta_category_id: selectedCourse.value?.value || null,
      class_grade_ids: Number(selectedProgramId.value) || null,
    });
    appStore.getUserData();
    emit("submitProgram");
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

const getStudyPrograms = async () => {
  try {
    const response = await api.get(
      `/api/v1/anonymous-recommendation/types-of-class-grades?uniqueId=${appStore.userData?.uuid}`
    );
    if (response.data.data) {
      programListOptions.value = response.data.data.map(
        (item: { id: number; class_name: string }) => {
          return {
            value: item.id,
            label: item.class_name,
            icon: item.class_name.toLowerCase().includes("bachelor")
              ? shallowRef(IconBachelor)
              : item.class_name.toLowerCase().includes("master")
              ? shallowRef(IconMaster)
              : shallowRef(IconAssociate),
          };
        }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const gatAreaofStudies = async (programId: string) => {
  try {
    isCourseLoading.value = true;
    const response = await api.post(
      "/api/v1/anonymous-recommendation/find-program-parent",
      {
        uniqueId: appStore.userData?.uuid,
        cgpa: appStore.userData?.educational_records.cgpa,
        class_grade_ids: [Number(programId)],
        // next_educational_class_grade_id: 1,
      }
    );
    if (response.data.data) {
      coursePreferenceOptions.value = response.data.data.map(
        (item: { id: number; title: string }) => {
          return {
            value: item?.id,
            label: item?.title,
          };
        }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isCourseLoading.value = false;
  }
};

watch(
  () => selectedProgramId.value,
  (newValue) => {
    if (newValue !== "") {
      gatAreaofStudies(newValue);
    }
  }
);

// watch(
//   () => appStore.userData,
//   (newValue) => {
//     if (newValue) {
//       selectedProgramId.value = ''
//       selectedCourse.value = ''
//   }
//   }
// );

onMounted(async () => {
  getStudyPrograms();
});
</script>
