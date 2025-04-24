<template>
  <div class="border-[2px] border-[#E9EAEB] rounded-xl">
    <table class="w-full border-collapse min-w-[800px] pricing-table">
      <tbody>
        <tr>
          <td class="min-w-[260px] w-full"></td>
          <!-- starter plan -->
          <td
            class="min-w-[260px] max-w-[260px] transition-all ease-in-out duration-150"
          >
            <div class="flex flex-col">
              <p class="text-[#414651] font-medium text-center">{{ $t('pricing_page.starter_plan') }}</p>
              <p
                class="text-[#181D27] text-xl font-semibold text-center mt-1.5 uppercase"
              >
              {{ $t('pricing_page.free') }}
              </p>
              <button
                class="bg-[#EFF8FF] border border-[#EFF8FF] text-sm sm:text-base text-[#175CD3] font-semibold px-[18px] py-2.5 rounded-lg w-full mt-6 shadow-sm"
                @click="emit('selectPlan', 3)"
              >
              {{ $t('pricing_page.current_plan') }}
              </button>
              <p class="text-[#181D27] text-sm text-center mt-4">
                {{ $t('pricing_page.ai_product_only,_no_mentors') }}
              </p>
            </div>
          </td>
          <!-- standard plan -->
          <td
            class="min-w-[260px] max-w-[260px] transition-all ease-in-out duration-150 bg-white"
          >
            <div class="flex flex-col">
              <p class="text-[#414651] font-medium text-center">{{ $t('pricing_page.standard_plan') }}</p>
              <p
                class="text-[#181D27] text-xl font-semibold text-center mt-1.5 uppercase"
              >
              {{ $t('pricing_page.free') }}
              </p>
              <button
                class="bg-[#1570EF] text-white text-sm sm:text-base font-semibold px-[18px] py-2.5 border border-[#1570EF] rounded-lg w-full mt-6 shadow-sm text-nowrap text-center"
                @click="emit('selectPlan', 1)"
              >
              {{ $t('pricing_page.continue_with_standard') }}
              </button>
              <p class="text-[#181D27] text-sm text-center mt-4">
                {{ $t('pricing_page.1_1_mentor_support') }}
              </p>
            </div>
          </td>
          <!-- Advanced plan -->
          <td
            class="min-w-[260px] max-w-[260px] transition-all ease-in-out duration-150 bg-white rounded-xl"
          >
            <div class="flex flex-col">
              <p class="text-[#414651] font-medium text-center">{{ $t('pricing_page.advanced_plan') }}</p>
              <p
                class="text-[#181D27] text-xl font-semibold text-center mt-1.5 text-nowrap"
              >
                50,000,000 VND
              </p>
              <button
                class="bg-[#1570EF] text-white text-sm sm:text-base font-semibold px-[18px] py-2.5 border border-[#1570EF] rounded-lg w-full mt-6 shadow-sm"
                @click="emit('selectPlan', 2)"
              >
              {{ $t('pricing_page.apply_for_mentorship') }}
              </button>
              <p class="text-[#181D27] text-sm text-center mt-4">
                {{ $t('pricing_page.1_1_mentor_support') }}
              </p>
            </div>
          </td>
        </tr>
        <tr
          v-for="(plan, idx) in plansList"
          :key="idx"
          class="text-[#181D27] last:text-[#717680] text-center"
          :class="{
            'bg-[#F5F5F5]': isHeading(plan),
          }"
        >
          <td class="!py-5" :class="{'!border-none' : isHeading(plan)}">
            <p
              class="font-medium text-start"
              :class="[
                isHeading(plan)
                  ? 'text-sm sm:text-lg text-[#181D27]'
                  : 'text-sm sm:text-base text-[#414651]',
              ]"
            >
              {{ plan.title }}
            </p>
          </td>
          <td class="!py-2" :class="{'!border-none' : isHeading(plan)}">
            <p v-if="!isHeading(plan)" class="flex justify-center">
              <IconCheckmark v-if="plan.starterPlan === 'available'" />
              <IconCrossCircle v-else-if="plan.starterPlan === 'N/A'" />
              <span v-else class="text-[#181D27] text-sm sm:text-base">
                {{ plan.starterPlan }}
              </span>
            </p>
          </td>
          <td class="!py-2" :class="{'!border-none' : isHeading(plan)}">
            <p v-if="!isHeading(plan)" class="flex justify-center">
              <IconCheckmark v-if="plan.standardPlan === 'available'" />
              <IconCrossCircle v-else-if="plan.standardPlan === 'N/A'" />
              <span v-else class="text-[#181D27] text-sm sm:text-base">
                {{ plan.standardPlan }}
              </span>
            </p>
          </td>
          <td class="!py-2" :class="{'!border-none' : isHeading(plan)}">
            <p v-if="!isHeading(plan)" class="flex justify-center">
              <IconCheckmark v-if="plan.advancedPlan === 'available'" />
              <IconCrossCircle v-else-if="plan.advancedPlan === 'N/A'" />
              <span v-else class="text-[#181D27] text-sm sm:text-base">
                {{ plan.advancedPlan }}
              </span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
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

const isHeading = (plan: Plan) => {
  return (
    plan.starterPlan === "" &&
    plan.standardPlan === "" &&
    plan.advancedPlan === ""
  );
};
</script>
<style scoped>
.pricing-table td,
th {
  border: 1px solid #E9EAEB;
}
.pricing-table td {
  padding: 24px;
}
.pricing-table tr:first-child td {
  border-top: none;
}
.pricing-table tr:last-child td {
  border-bottom: none;
}
.pricing-table tr td:first-child {
  border-left: none;
}
.pricing-table tr td:last-child {
  border-right: none;
}
</style>
