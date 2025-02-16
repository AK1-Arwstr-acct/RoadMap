<template>
  <div class="w-full sm:w-[490px] space-y-8">
    <h1 class="text-2xl md:text-4xl md:!leading-[44px] font-medium text-center">
      {{ $t("onboarding.area_of_interest_heading") }}
    </h1>
    <BaseSelectRadio
      :label="t('onboarding.area_of_study')"
      :options="coursePreferenceOptions"
      direction="upward"
      v-model="selectedCourse"
    />
    <button
      @click="submit"
      :disabled="!selectedCourse"
      class="w-full text-white bg-[#1570EF] rounded-lg flex gap-3 items-center justify-center py-2.5 disabled:opacity-70"
    >
      {{ $t("onboarding.continue") }}
      <IconSpinner v-if="isSubmitting" />
      <IconArrowRight v-else fill="#ffffff" />
    </button>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { log } from "console";
import type { PropType } from "vue";
import useAppStore from "~/stores/AppStore";
import type { OptionAttributes } from "~/types/home";

const props = defineProps({
  coursePreferenceOptions: {
    type: Array as PropType<OptionAttributes[]>,
    default: () => [],
  },
});

const emit = defineEmits(["submitParentCategory"]);

const { t } = useI18n();
const { api } = useApi();
const { showToast } = useToast();
const appStore = useAppStore();

const isSubmitting = ref<boolean>(false);
const selectedCourse = ref<OptionAttributes>();

const submit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/student/update-profile-basic-info", {
      cgpa: appStore.userData?.educational_records.cgpa,
      super_meta_category_id: selectedCourse.value?.value,
    });
    await appStore.getUserData();
    emit("submitParentCategory");
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

onMounted(async () => {
  if (
    appStore.userData &&
    appStore.userData.educational_records.super_meta_category
  ) {
    selectedCourse.value = props.coursePreferenceOptions.find(
      (item) =>
        Number(item.value) ===
        appStore.userData?.educational_records.super_meta_category?.id
    );
  }
});
</script>
