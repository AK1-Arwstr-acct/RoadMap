<template>
  <div class="sticky top-0">
    <div class="font-semibold mb-3 text-text-base">On this page</div>
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

const emit = defineEmits(["stepClick"]);

const steps = [
  "How do you choose a major?",
  "Evaluate your strengths",
  "Research Your Field",
  "Frequently Asked Questions",
  "How to Know You've Chosen Right",
];
</script>
