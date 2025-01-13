<template>
  <div class="flex flex-col h-full justify-center">
    <div class="flex flex-col gap-4">
      <!-- <p class="text-[#AEAEAE]">
        Wrong email?
        <span
          class="text-[#9CA2FF] underline cursor-pointer"
          @click="emits('goBack')"
          >Go back</span
        >
      </p> -->
      <h1 class="text-5xl lg:text-6xl font-semibold text-white">
        <span class="text-[#7975FF]">Password</span> <br />
        Recovery
      </h1>
      <!-- <p class="text-[#AEAEAE]">
        We have sent a verification link to <br class="lg:hidden" />
        <span class="text-[#9CA2FF]">{{ email }}</span>
      </p> -->
      <div class="w-full remove-shadow">
        <label class="uppercase font-medium text-[#E2E6FF]">Your email</label>
        <input
          name="email"
          type="email"
          v-model="email"
          autofocus
          @keydown.enter="onSubmit"
          placeholder="Enter your email"
          class="mt-[7px] bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
        />
      </div>
      <!-- <div class="text-sm text-[#B0B4BA] font-semibold">
        <button type="button" class="text-[#8380FF] underline">
          Resend email verification
        </button>
      </div> -->
      <div>
        <button
          @click="onSubmit"
          type="submit"
          :disabled="email == ''"
          class="w-full disabled:bg-opacity-60 bg-[#8380FF] text-white rounded-lg font-medium p-3 flex text-xl gap-2 justify-center items-center"
        >
          Confirm
          <BaseSpinner v-if="isSubmitting" color="#FFFFFF" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';

const emits = defineEmits(["goBack", "recoverPassword"]);

defineProps({
  email: {
    type: String,
  },
});

const { api } = useApi();
const { showToast } = useToast();

const email = ref<string>("");
const isSubmitting = ref<boolean>(false);

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/v1/reset-password", {
      email: email.value,
    });
    showToast("Please check your email for password recovery", {
      type: "success",
    });
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      showToast(error.response?.data.message.email[0], {
        type: "warning",
      });
    }
  } finally {
    email.value = "";
    isSubmitting.value = false;
  }
};
</script>
