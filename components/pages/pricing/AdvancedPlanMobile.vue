<template>
  <div
    class="border border-gray-200 rounded-2xl shadow-[0px_12px_16px_-4px_#0A0D1214] px-6 pb-8 pt-10 flex flex-col items-center"
  >
    <p class="text-[#181D27] font-semibold text-3xl">50,000,000 VND</p>
    <p class="mt-4 text-xl text-[#181D27] font-medium">Advanced Plan</p>
    <p class="text-[#535862]">1-1 mentor support</p>
    <div class="flex flex-col gap-4 w-full mt-8">
      <div
        v-for="(plan, idx) in plansList.filter(
          (item) =>
            item.advancedPlan !== '' &&
            item.advancedPlan !== 'N/A' &&
            item.title
        )"
        :key="idx"
        class="flex items-start gap-3 text-[#535862]"
      >
        <IconCheckmark class="size-5 min-w-5" />
        <p>
          {{
            `${plan.title} ${
              plan.advancedPlan === "available" ? "" : `:${plan.advancedPlan}`
            }`
          }}
        </p>
      </div>
      <p class="text-center text-[#535862]">
        *Requires SAT 1500+, limited slots
      </p>
    </div>
    <button
      class="bg-[#1570EF] text-white font-semibold px-[18px] py-2.5 border border-[#1570EF] rounded-lg w-full mt-6 shadow-sm"
      @click="emit('selectPlan', 2)"
    >
      Apply for Advanced
    </button>
  </div>
</template>
<script setup lang="ts">
import type { Plan } from "~/types/home";

const emit = defineEmits(["selectPlan"]);

defineProps({
  plansList: {
    type: Array as PropType<Plan[]>,
    default: () => [],
  },
});
</script>
