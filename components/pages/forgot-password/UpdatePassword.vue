<template>
  <div class="w-full sm:w-[390px] space-y-8">
    <div class="flex flex-col items-center gap-6">
      <IconArrowsterLogo />
      <div class="text-center space-y-3">
        <h1 class="font-semibold text-3xl text-[#181D27]">
          {{ $t('forgotPassword.update_your_password') }}
        </h1>
        <p class="text-[#535862]">{{ $t('forgotPassword.please_enter_new_password') }}</p>
      </div>
    </div>
    <div>
      <div class="remove-shadow-bg-white relative">
        <label class="font-medium text-[#414651] text-sm">{{ $t('forgotPassword.new_password') }}</label>
        <div class="relative">
          <input
            name="userInput"
            type="password"
            v-model="userInput.password"
            inputmode="decimal"
            :placeholder="t('forgotPassword.enter_your_password')"
            class="mt-1 rounded-lg border-2 border-gray-200' py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
          />
        </div>
      </div>
      <div class="remove-shadow-bg-white mt-6">
        <label class="font-medium text-[#414651] text-sm"
          >{{ $t('forgotPassword.confirm_password') }}</label
        >
        <input
          name="userInput"
          type="password"
          v-model="userInput.confirmPassword"
          :placeholder="t('forgotPassword.confirm_your_password')"
          class="mt-1 rounded-lg border-2 border-gray-200 py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
        />
      </div>
      <div class="mt-6">
        <button
          @click="submit"
          :disabled="
            userInput.password === '' || userInput.confirmPassword === '' || userInput.password != userInput.confirmPassword
          "
          class="bg-[#1570EF] w-full rounded-lg font-semibold py-3 text-white disabled:opacity-70 flex justify-center items-center gap-2"
        >
        {{ $t('forgotPassword.save_changes') }}
          <IconSpinner class="size-5" v-if="isSubmitting"  />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";

const props = defineProps({
  verificationToken: {
    type: String,
    default: "",
  },
});

const { t } = useI18n();
const localePath = useLocalePath();
const { api } = useApi();
const { showToast } = useToast();

const isSubmitting = ref<boolean>(false);
const userInput = ref<{ password: string; confirmPassword: string }>({
  password: "",
  confirmPassword: "",
});

const submit = async () => {
  try {
    isSubmitting.value = true;
    await api.post(
      "/api/v1/update-password",
      {
        password: userInput.value.password,
      },
      {
        headers: {
          sessionid: `${props.verificationToken}`,
        },
      }
    );
    navigateTo(localePath("/login"));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
    console.error(error);
  } finally {
    isSubmitting.value = false;
    userInput.value.password = "";
    userInput.value.confirmPassword = "";
  }
};
</script>
