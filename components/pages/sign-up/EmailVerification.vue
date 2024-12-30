<template>
  <div class="flex flex-col justify-center h-full">
    <div class="flex flex-col gap-4">
      <p class="text-[#AEAEAE]">
        Wrong email ?
        <span
          class="text-[#9CA2FF] underline cursor-pointer"
          @click="emits('goBack')"
          >Go back</span
        >
      </p>
      <h1 class="text-5xl md:text-6xl font-semibold text-white">
        Verify email
      </h1>
      <p class="text-[#AEAEAE]">
        We sent an verification link to <br class="lg:hidden" />
        <span class="text-[#9CA2FF]">{{ email }}</span>
      </p>
      <div class="text-sm text-[#B0B4BA] font-semibold">
        <button type="button" class="text-[#8380FF] underline">
          Resend email verification
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  email: {
    type: String,
  },
});

const emits = defineEmits<{
  (e: "goBack"): void;
}>();

const { api } = useApi();
</script>
