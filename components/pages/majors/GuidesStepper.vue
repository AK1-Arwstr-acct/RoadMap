<template>
  <div class="sticky top-0">
    <div class="font-semibold mb-3 text-text-base">{{ $t('majors_page.guide.guidesStepper.on_this_page') }}</div>
    <div class="flex flex-col gap-2">
      <div v-for="(step, idx) in steps" :key="idx">
        <div
          class="text-xs pl-2 leading-[22px] relative cursor-pointer transition-all ease-in-out duration-200"
          :class="[
            idx === activeStep ? 'text-text-base' : 'text-text-disabled',
          ]"
          @click="emit('stepClick', idx)"
        >
          <div
            class="absolute left-0 h-full w-0.5 rounded-full z-10"
            :class="[
              idx === activeStep
                ? 'bg-background-neutral-boldest'
                : 'bg-background-neutral-bold',
            ]"
          />
          {{ step }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  activeStep: {
    type: Number,
    default: 0,
  },
});

const { t } = useI18n();

const emit = defineEmits(["stepClick"]);

const steps = [
  `${t("majors_page.guide.guidesStepper.evaluate_your_strengths")}`,
  `${t("majors_page.guide.guidesStepper.frequently_asked_questions")}`,
  `${t("majors_page.guide.guidesStepper.how_do_you_choose_a_major")}`,
  `${t("majors_page.guide.guidesStepper.how_to_know_you_have_chosen_right")}`,
  `${t("majors_page.guide.guidesStepper.research_your_field")}`,
];
</script>
