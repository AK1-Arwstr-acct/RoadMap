<template>
  <div
    @click="schoolDetail"
    class="border-[1.5px] border-gray-200 rounded-2xl p-6 flex flex-col lg:flex-row gap-6 cursor-pointer"
  >
    <div
      class="rounded-xl overflow-hidden w-[84px] h-[84px] lg:min-w-[122px] lg:w-[122px] lg:h-[122px] flex justify-center items-center"
    >
      <img
        :src="program.school.avatar || ''"
        :alt="program.school.name"
        class="size-full object-contain"
      />
    </div>
    <div class="flex-1 overflow-x-auto custom-scrollbar">
      <div class="min-w-fit">
        <div
          class="flex flex-col lg:flex-row gap-2 lg:gap-10 justify-between items-start mb-2"
        >
          <p
            class="font-medium text-[#181D27] min-w-40 max-w-96 text-wrap order-1 lg:order-none"
          >
            {{ program.school.name }}
            {{ program.title }}
          </p>
          <div
            class="flex items-center gap-1.5 py-1 pl-1 pr-2.5 bg-[#F5F5F5] rounded-xl"
          >
            <div class="size-4 overflow-hidden">
              <component
                class="size-full"
                :is="
                  program.school.address.country
                    .toLowerCase()
                    .includes('kingdom')
                    ? IconUK
                    : program.school.address.country
                        .toLowerCase()
                        .includes('canada')
                    ? IconCanada
                    : program.school.address.country
                        .toLowerCase()
                        .includes('australia')
                    ? IconAustralia
                    : program.school.address.country
                        .toLowerCase()
                        .includes('states')
                    ? IconUS
                    : IconEurope
                "
              />
            </div>
            <p class="text-[#414651] text-sm font-medium text-nowrap">
              {{ program.school.address.state }}
              {{
                program.school.address.country_code &&
                `, ${program.school.address.country_code}`
              }}
            </p>
          </div>
        </div>
        <p class="text-[#535862] mb-2.5 text-sm 2xl:text-base">
          {{ program.program_title }}
        </p>
        <div
          class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 font-medium mb-2 text-sm 2xl:text-base"
        >
          <div>
            <span class="text-[#717680] mr-2">{{
              $t("schoolList_page.sat")
            }}</span>
            <span class="text-[#1570EF]">{{
              program.school.admission_stats.average_scores.sat ||
              `${$t("schoolList_page.coming_soon")}`
            }}</span>
          </div>
          <div>
            <span class="text-[#717680] mr-2">{{
              $t("schoolList_page.ielts")
            }}</span>
            <span class="text-[#1570EF]">{{
              program.school.admission_stats.average_scores.ielts ||
              `${$t("schoolList_page.coming_soon")}`
            }}</span>
          </div>
          <div>
            <span class="text-[#717680] mr-2">{{
              $t("schoolList_page.gpa")
            }}</span>
            <span class="text-[#1570EF]">{{
              program.school.admission_stats.average_scores.gpa ||
              `${$t("schoolList_page.coming_soon")}`
            }}</span>
          </div>
        </div>
        <div class="flex items-center gap-6 text-sm 2xl:text-base">
          <div>
            <span class="text-[#717680] mr-2">{{
              $t("schoolList_page.avg_tuition")
            }}</span>
            <span class="text-gray-900">
              {{
                `${
                  program?.currency?.symbol ?? ""
                }${program?.fee.toLocaleString()} ${
                  program?.currency?.title ?? ""
                }`
              }}
            </span>
          </div>
          <div>
            <span class="text-[#717680] mr-2">{{
              $t("schoolList_page.ranking")
            }}</span>
            <span class="text-gray-900">{{
              program.school_ranking || `${$t("schoolList_page.coming_soon")}`
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Transition name="fade">
    <div
      v-if="isPublicPaywall"
      class="fixed z-50 inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-5"
    >
      <div
        class="bg-white p-6 flex flex-col gap-8 rounded-xl w-full max-w-[400px]"
      >
        <div class="flex flex-col items-center">
          <IconTabSophie width="48" height="48" class="text-[#ED77FF] mb-5" />
          <p class="text-[#181D27] text-lg font-semibold text-center">
            {{ $t("schoolList_page.sign_up_to_unlock_full_details") }}
          </p>
          <p class="text-[#535862] text-sm text-center mt-2">
            {{
              $t(
                "schoolList_page.get_personalized_school_recommendations_and_ai_recommendations"
              )
            }}
          </p>
        </div>
        <div class="flex gap-3">
          <button
            @click="isPublicPaywall = false"
            class="border border-gray-200 py-2.5 w-full rounded-lg text-[#414651] font-semibold"
          >
            {{ $t("schoolList_page.cancel") }}
          </button>
          <NuxtLinkLocale :to="'/signup'" class="w-full">
            <button
              class="border border-[#1570EF] bg-[#1570EF] py-2.5 w-full rounded-lg text-white font-semibold"
            >
              {{ $t("schoolList_page.sign_up_for_free") }}
            </button>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import axios from "axios";
import type { Program } from "~/types/program";
import IconUK from "../../icons/IconUK.vue";
import IconCanada from "../../icons/IconCanada.vue";
import IconAustralia from "../../icons/IconAustralia.vue";
import IconUS from "../../icons/IconUS.vue";
import IconEurope from "../../icons/IconEurope.vue";
import useDashboardStore from "~/stores/dashboardStore";
import { schoolDeatailList } from "~/utils/demoData";

const emit = defineEmits(["openDetail"]);

const { api } = useApi();
const { showToast } = useToast();
const localePath = useLocalePath();
const dashboardStore = useDashboardStore();
const route = useRoute();

const props = defineProps({
  program: {
    type: Object as PropType<Program>,
    default: () => {},
  },
});

const isPublicPaywall = ref<boolean>(false);

const schoolDetail = async () => {
  try {
    if (route.path.includes("/demo")) {
      let school = schoolDeatailList.find(
        (item) => item.id === props.program.school.id
      );
      emit("openDetail", school);
      return;
    }
    if (dashboardStore.isSchoolListPublic) {
      isPublicPaywall.value = true;
      return;
    }
    const response = await api.get(
      `/api/v1/school/profile?user_name=${props.program.school.user_name}`
    );
    emit("openDetail", response.data.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};
</script>
