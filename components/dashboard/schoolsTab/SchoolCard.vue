<template>
  <div
    @click="schoolDetail"
    class="bg-[#FFFEFC] border border-[#E9EAEB] rounded-2xl p-6 flex gap-6 cursor-pointer"
  >
    <div
      class="rounded-xl overflow-hidden min-w-[122px] w-[122px] h-[122px] flex justify-center items-center"
    >
      <img
        :src="program.school.avatar"
        :alt="program.school.name"
        class="size-full object-contain"
      />
    </div>
    <div class="flex-1 overflow-x-auto custom-scrollbar">
      <div class="min-w-fit">
        <div class="flex items-center gap-10 justify-between mb-2">
          <h3 class="font-medium text-[#181D27] text-nowrap">
            {{ program.school.name }}
          </h3>
          <div
            class="flex justify-center items-center gap-1.5 pr-2.5 pl-1.5 bg-[#F5F5F5] p-1 rounded-xl"
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
            <p class="text-[#414651] text-sm text-nowrap">
              {{ program.school.address.state }},
              {{
                program.school.address.country.toLowerCase().includes("kingdom")
                  ? "UK"
                  : program.school.address.country
                      .toLowerCase()
                      .includes("canada")
                  ? "CA"
                  : program.school.address.country
                      .toLowerCase()
                      .includes("australia")
                  ? "AU"
                  : program.school.address.country
                      .toLowerCase()
                      .includes("states")
                  ? "US"
                  : program.school.address.country
                      .toLowerCase()
                      .includes("europe")
                  ? "EU"
                  : ""
              }}
            </p>
          </div>
        </div>
        <p class="text-[#535862] mb-2.5">{{ program.program_title }}</p>
        <div class="flex items-center gap-6 font-medium mb-2">
          <div class="text-sm">
            <span class="text-[#717680] mr-2">SAT:</span>
            <span class="text-[#1570EF]">{{
              program.school.admission_stats.average_scores.sat || "N/A"
            }}</span>
          </div>
          <div class="text-sm">
            <span class="text-[#717680] mr-2">IELTS:</span>
            <span class="text-[#1570EF]">{{
              program.school.admission_stats.average_scores.ielts || "N/A"
            }}</span>
          </div>
          <div class="text-sm">
            <span class="text-[#717680] mr-2">GPA:</span>
            <span class="text-[#1570EF]">{{
              program.school.admission_stats.average_scores.gpa || "N/A"
            }}</span>
          </div>
        </div>
        <div class="flex items-center gap-6 font-medium">
          <div class="text-sm">
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
          <div class="text-sm">
            <span class="text-[#717680] mr-2">Ranking:</span>
            <span class="text-gray-900">{{
              program.school_ranking || "N/A"
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
