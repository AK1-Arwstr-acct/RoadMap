<template>
  <div
    class="fixed z-40 h-[100dvh] w-full bg-black/60 flex justify-center items-center"
  >
    <div
      class="text-white bg-radial w-[564px] px-6 py-12 flex flex-col gap-6 rounded-2xl border border-[#9C99FF] shadow-[12px_24px_32px_0px_rgba(149,126,255,0.00)]"
    >
      <div class="flex flex-col items-center text-center">
        <IconArrowster width="100" height="104" />
        <div class="-mt-3">
          <h1 class="text-[32px] font-semibold">
            Welcome to Arrowster Roadmap
          </h1>
          <p class="font-medium">
            Here's a A-Z study abroad checklist specifically developed and
            customized for Vietnamese students!
          </p>
        </div>
      </div>
      <div class="text-[#F3F3F3] font-semibold flex gap-3 justify-center">
        <button
          @click="emits('close')"
          class="w-[159px] p-2 bg-[#212225] border border-[#43484E] rounded-lg"
        >
          Try now!
        </button>
        <button
          @click="emits('startTour')"
          class="bg-[#8380FF] rounded-lg px-3 py-2"
        >
          View Instruction
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(["close", "startTour"]);
</script>
<style scoped>
.bg-radial {
  background: radial-gradient(
      88.44% 88.44% at 50% 141.23%,
      #3936b2 17.18%,
      rgba(57, 54, 178, 0) 100%
    ),
    radial-gradient(
      97.99% 85.4% at 50% -25.14%,
      rgba(99, 95, 237, 0.3) 0%,
      rgba(17, 17, 19, 0.3) 76.45%
    ),
    var(--background-section-neutral, #18191b);
}
</style>
