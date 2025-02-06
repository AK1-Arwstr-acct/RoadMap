<template>
  <div class="w-[490px] space-y-8">
    <h1 class="text-2xl md:text-4xl md:!leading-[44px] font-medium text-center">
      {{ $t("onboarding.programs_heading") }}
    </h1>
    <div class="space-y-3">
      <div v-for="(option, index) in programList" :key="index">
        <label
          :for="option.name"
          class="flex items-center justify-between size-full font-medium rounded-xl cursor-pointer relative border py-4 pl-4 pr-5 transition-all ease-in-out duration-200"
          :class="[
            selectedOptionId === option.id
              ? 'border-[#84CAFF] bg-[#D1E9FF]/30 text-[#1849A9]'
              : 'border-[#D5D7DA] text-[#414651]',
          ]"
        >
          <input
            :id="option.name"
            type="radio"
            name="progress"
            :value="option.id"
            v-model="selectedOptionId"
            class="absolute top-3 right-3 appearance-none"
          />
          <div class="flex items-center gap-3">
            <component :is="option.icon" />
            {{
              option.id === 1
                ? "Bachelor's"
                : option.id === 2
                ? "Master's"
                : "Associate"
            }}
          </div>
          <div
            class="size-5 rounded-full transition-all ease-in-out duration-200 flex justify-center items-center"
            :class="[
              selectedOptionId === option.id
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
        :options="areas"
        direction="upward"
      />
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
import IconAssociate from "~/components/icons/IconAssociate.vue";
import IconBachelor from "~/components/icons/IconBachelor.vue";
import IconMaster from "~/components/icons/IconMaster.vue";
import useAppStore from "~/stores/AppStore";

const { t } = useI18n();
const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();

const emit = defineEmits(["submitProgram"]);

const selectedOptionId = ref<number>();
const isSubmitting = ref<boolean>(false);

const programList = [
  {
    id: 1,
    name: "bachelor",
    icon: IconBachelor,
  },
  {
    id: 2,
    name: "master",
    icon: IconMaster,
  },
  {
    id: 3,
    name: "associate",
    icon: IconAssociate,
  },
];

const areas = [
  {
    value: "it",
    label: "it",
  },
  {
    value: "css",
    label: "css",
  },
  {
    value: "fsc",
    label: "fsc",
  },
  {
    value: "uni",
    label: "uni",
  },
];

const submit = () => {
  try {
    isSubmitting.value = true;
    // api.post("/api/v1/student/update-profile-basic-info", {
    //   current_class_grade: academicInfo.value.grade.value,
    //   cgpa: academicInfo.value.gpa,
    //   ielts_score: academicInfo.value.ielts,
    // });
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
  // const response = await api.get(`/api/v1/anonymous-recommendation/types-of-class-grades?uniqueId=${appStore.authUser.uuid}`)
  // const response = await api.get(`/api/v1/anonymous-recommendation/types-of-class-grades`,{
  //   uniqueId: appStore.authUser.uuid
  // })
  // const response = await api.get(`/api/v1/anonymous-recommendation/types-of-class-grades?uniqueId=6f033ce1-6105-4c04-b4ab-6bb5039ae592`)
};

onMounted(async () => {
  // const response = await api.get('/api/v1/anonymous-recommendation/find-program-parent')
  appStore.getUserData();
  getStudyPrograms();
});
</script>
