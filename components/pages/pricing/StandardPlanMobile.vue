<template>
  <div
    class="border border-gray-200 rounded-2xl shadow-[0px_12px_16px_-4px_#0A0D1214] px-6 pb-8 pt-10 flex flex-col items-center"
  >
    <p class="text-[#181D27] font-semibold text-3xl uppercase">{{ $t('pricing_page.free') }}</p>
    <p class="mt-4 text-xl text-[#181D27] font-medium">{{ $t('pricing_page.standard_plan') }}</p>
    <p class="text-[#535862]">{{ $t('pricing_page.1_1_mentor_support') }}</p>
    <div class="flex flex-col gap-4 w-full mt-8">
      <div
        v-for="(plan, idx) in plansList.filter(
          (item) =>
            item.standardPlan !== '' &&
            item.standardPlan !== 'N/A' &&
            item.title
        )"
        :key="idx"
        class="flex items-start gap-3 text-[#535862]"
      >
        <IconCheckmark class="size-5 min-w-5" />
        <p>
          {{
            `${plan.title} ${
              plan.standardPlan === "available" ? "" : `:${plan.standardPlan}`
            }`
          }}
        </p>
      </div>
      <p class="text-center text-[#535862]">
        {{ $t('pricing_page.5_000_000_vnd_refundable_deposit_for_slot_reservation') }}
      </p>
    </div>
    <button
      class="bg-[#1570EF] text-white font-semibold px-[18px] py-2.5 border border-[#1570EF] rounded-lg w-full mt-6 shadow-sm"
      @click="emit('selectPlan', 1)"
    >
    {{ $t('pricing_page.unlock_mentor_help') }}
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
