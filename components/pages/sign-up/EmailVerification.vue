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
        We have sent a verification link to <br class="lg:hidden" />
        <span class="text-[#9CA2FF]">{{ email }}</span>
      </p>
      <div class="text-sm text-[#B0B4BA] font-semibold">
        <button
          @click="resendVerification"
          type="button"
          class="text-[#8380FF] underline"
        >
          Resend email verification
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";

const props = defineProps({
  email: {
    type: String,
  },
  signupToken: {
    type: String,
  },
});

const emits = defineEmits<{
  (e: "goBack"): void;
}>();

const { api } = useApi();
const { showToast } = useToast();

const resendVerification = async () => {
  try {
    await api.get("/v1/verify-via-email-retry", {
      headers: {
        Authorization: `Bearer ${props.signupToken}`,
      },
    });
    showToast("Email send", {
      type: "success",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      showToast(error.message, {
        type: "warning",
      });
    }
  }
};
</script>
