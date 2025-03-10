<template>
  <div
    @click="schoolDetail"
    class="border-[1.5px] border-gray-200 rounded-2xl p-6 flex gap-6 cursor-pointer"
  >
    <div
      class="rounded-xl overflow-hidden min-w-[122px] w-[122px] h-[122px] flex justify-center items-center"
    >
      <NuxtImg
        :src="program.school.avatar"
        :alt="program.school.name"
        class="size-full object-contain"
        loading="eager"
        preload
      />
    </div>
    <div class="flex-1 overflow-x-auto custom-scrollbar">
      <div class="min-w-fit">
        <div class="flex gap-10 justify-between mb-2">
          <p class="font-medium text-[#181D27] min-w-40 max-w-96 text-wrap">
            {{ program.school.name }}
            {{ program.title }}
          </p>
          <div
            class="flex justify-center items-center gap-1.5 pr-2.5 pl-1.5 bg-[#F5F5F5] px-1 py-2 rounded-xl h-max"
          >
            <component
              :is="
                program.school.address.country.toLowerCase().includes('kingdom')
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
              class="size-4"
            />
            <p class="text-[#414651] text-sm font-medium text-nowrap">
              {{ program.school.address.state }}
              {{ program.school.address.country_code && `, ${program.school.address.country_code}` }}
            </p>
          </div>
        </div>
        <p class="text-[#535862] mb-2.5 text-sm 2xl:text-base">
          {{ program.program_title }}
        </p>
        <div
          class="flex items-center gap-6 font-medium mb-2 text-sm 2xl:text-base"
        >
          <div>
            <span class="text-[#717680] mr-2">SAT:</span>
            <span class="text-[#1570EF]">{{
              program.school.admission_stats.average_scores.sat || "Coming Soon"
            }}</span>
          </div>
          <div>
            <span class="text-[#717680] mr-2">IELTS:</span>
            <span class="text-[#1570EF]">{{
              program.school.admission_stats.average_scores.ielts || "Coming Soon"
            }}</span>
          </div>
          <div>
            <span class="text-[#717680] mr-2">GPA:</span>
            <span class="text-[#1570EF]">{{
              program.school.admission_stats.average_scores.gpa || "Coming Soon"
            }}</span>
          </div>
        </div>
        <div class="flex items-center gap-6 text-sm 2xl:text-base">
          <div>
            <span class="text-[#717680] mr-2">Avg. tuition:</span>
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
            <span class="text-[#717680] mr-2">Ranking:</span>
            <span class="text-gray-900">{{
              program.school_ranking || "Coming Soon"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { Program } from "~/types/program";
import IconUK from "../../icons/IconUK.vue";
import IconCanada from "../../icons/IconCanada.vue";
import IconAustralia from "../../icons/IconAustralia.vue";
import IconUS from "../../icons/IconUS.vue";
import IconEurope from "../../icons/IconEurope.vue";

const emit = defineEmits(["openDetail"]);

const { api } = useApi();
const { showToast } = useToast();

const props = defineProps({
  program: {
    type: Object as PropType<Program>,
    default: () => {},
  },
});

const schoolDetail = async () => {
  try {
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
