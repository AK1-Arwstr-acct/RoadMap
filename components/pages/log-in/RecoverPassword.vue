<template>
  <div class="flex flex-col h-full justify-center">
    <div class="flex flex-col gap-4">
      <p class="text-[#AEAEAE]">
        Wrong email?
        <span
          class="text-[#9CA2FF] underline cursor-pointer"
          @click="emits('goBack')"
          >Go back</span
        >
      </p>
      <h1
        class="text-5xl lg:text-6xl font-semibold text-white"
      >
        <span class="text-[#7975FF]">Password</span> <br />
        Recovery
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
const emits = defineEmits(["goBack", "recoverPassword"]);

defineProps({
  email: {
    type: String,
  },
});


onMounted(() => {
  setTimeout(() => {
    emits("recoverPassword");
  }, 3000);
});
</script>
