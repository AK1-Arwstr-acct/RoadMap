<template>
  <div
    @click="emit('openDetail')"
    class="bg-[#FFFEFC] border border-[#E9EAEB] rounded-2xl p-6 flex gap-6 cursor-pointer"
  >
    <div
      class="rounded-xl overflow-hidden min-w-[122px] w-[122px] h-[122px] flex justify-center items-center"
    >
      <img
        :src="programs.school.avatar"
        :alt="programs.school.name"
        class="size-full object-contain"
      />
    </div>
    <div class="flex-1 overflow-x-auto custom-scrollbar">
      <div class="min-w-fit">
        <div class="flex items-center gap-10 justify-between mb-2">
          <h3 class="text-lg font-semibold text-[#181D27] text-nowrap">
            {{ programs.school.name }}
          </h3>
          <div
            class="flex justify-center items-center gap-1.5 pr-2.5 pl-1.5 bg-[#F5F5F5] p-1 rounded-xl"
          >
            <div class="size-4">
              <img
                src="/public//images//countries/canada.png"
                alt="Bostan Us"
              />
            </div>
            <p class="text-[#414651] text-sm text-nowrap">
              {{ programs.school.address.state }},
              {{ programs.school.address.country }}
            </p>
          </div>
        </div>
        <p class="text-[#535862] mb-2.5">{{ programs.program_title }}</p>
        <div class="flex items-center gap-6 font-medium mb-2">
          <div>
            <span class="text-[#717680] mr-2">SAT:</span>
            <span class="text-[#1570EF]">1300 - 1500</span>
          </div>
          <div>
            <span class="text-[#717680] mr-2">IELTS:</span>
            <span class="text-[#1570EF]">7.0 - 8.5</span>
          </div>
          <div>
            <span class="text-[#717680] mr-2">GPA:</span>
            <span class="text-[#1570EF]">3.3 - 4.0</span>
          </div>
        </div>
        <div class="flex items-center gap-6 font-medium">
          <div>
            <span class="text-[#717680] mr-2">Avg. tuition:</span>
            <span class="text-gray-900">$17,324</span>
          </div>
          <div>
            <span class="text-[#717680] mr-2">Ranking:</span>
            <span class="text-gray-900">{{
              programs.school_ranking || "N/A"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Program } from "~/types/program";

const emit = defineEmits(["openDetail"]);

defineProps({
  programs: {
    type: Object as PropType<Program>,
    default: () => {},
  },
});
</script>
