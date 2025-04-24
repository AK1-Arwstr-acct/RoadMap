<template>
  <div
    class="border border-gray-200 rounded-2xl shadow-[0px_12px_16px_-4px_#0A0D1214] px-6 pb-8 pt-10 flex flex-col items-center"
  >
    <p class="text-[#181D27] font-semibold text-3xl uppercase">
      {{ $t("pricing_page.free") }}
    </p>
    <p class="mt-4 text-xl text-[#181D27] font-medium">
      {{ $t("pricing_page.starter_plan") }}
    </p>
    <p class="text-[#535862]">
      {{ $t("pricing_page.ai_product_only,_no_mentors") }}
    </p>
    <div class="flex flex-col gap-4 w-full mt-8">
      <div
        v-for="(plan, idx) in plansList.filter(
          (item) => item.starterPlan !== '' && item.starterPlan !== 'N/A'
        )"
        :key="idx"
        class="flex items-start gap-3 text-[#535862]"
      >
        <IconCheckmark class="size-5 min-w-5" />
        <p>
          {{
            `${plan.title} ${
              plan.starterPlan === "available" ? "" : `:${plan.starterPlan}`
            }`
          }}
        </p>
      </div>
    </div>
    <button
      class="bg-[#EFF8FF] border border-[#EFF8FF] text-[#175CD3] font-semibold px-[18px] py-2.5 rounded-lg w-full mt-6 shadow-sm"
      @click="emit('selectPlan', 3)"
    >
      {{ $t("pricing_page.current_plan") }}
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
