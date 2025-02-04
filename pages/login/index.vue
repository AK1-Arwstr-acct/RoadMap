<template>
  <div
    class="h-screen min-h-fit w-full flex justify-center items-center p-5 pt-24 pb-16"
  >
    <div class="w-[390px] space-y-9">
      <div class="flex flex-col items-center gap-6">
        <IconArrowsterLogo />
        <div class="text-center space-y-3">
          <h1 class="font-semibold text-3xl text-[#181D27]">
            {{ $t("login.heading") }}
          </h1>
          <p class="text-[#535862]">{{ $t("login.welcome_back") }}</p>
        </div>
      </div>
      <div>
        <div class="remove-shadow-bg-white relative">
          <label class="font-medium text-[#414651] text-sm">{{
            $t("login.phone_or_email")
          }}</label>
          <div class="relative">
            <input
              name="userInput"
              type="text"
              v-model="userInput.numberOrEmail"
              inputmode="decimal"
              :placeholder="t('login.enter_phone_or_email')"
              class="mt-1 rounded-lg border-2 py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
              :class="[error ? 'border-[#FDA29B]' : 'border-[#E1E1E1]']"
            />
            <div
              v-if="error"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <IconInfoCircle
                stroke-width="2"
                width="20"
                height="20"
                stroke="#F04438"
              />
            </div>
          </div>
          <span
            v-if="error"
            class="absolute left-0 -bottom-6 text-sm text-[#F04438]"
          >
          {{ $t('login.please_verify_your_email_to_continue') }}
          </span>
        </div>
        <div class="remove-shadow-bg-white mt-6">
          <label class="font-medium text-[#414651] text-sm">{{ $t('login.password') }}</label>
          <input
            name="userInput"
            type="password"
            v-model="userInput.password"
            :placeholder="t('login.enter_your_password')"
            class="mt-1 rounded-lg border-2 border-[#E1E1E1] py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
          />
        </div>
        <div class="mt-6">
          <button
            @click="submit"
            :disabled="userInput.numberOrEmail === '' || userInput.password === ''"
            class="bg-[#1570EF] w-full rounded-lg font-semibold py-3 text-white disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {{ $t("login.login") }}
            <BaseSpinner v-if="isSubmitting" color="#FFFFFF" />
          </button>
        </div>
        <div class="my-4 flex items-center gap-2">
          <div class="flex-1 h-[1px] bg-[#E9EAEB]" />
          <p class="text-[#717680] text-sm">{{ $t("login.or") }}</p>
          <div class="flex-1 h-[1px] bg-[#E9EAEB]" />
        </div>
        <a
          href="https://backend.arrowster.com/auth/google"
          target="_blank"
          type="submit"
          class="cursor-pointer disabled:opacity-70 w-full text-xl text-[#414651] border-2 border-[#E1E1E1] rounded-lg font-semibold py-2.5 flex gap-2 justify-center items-center"
        >
          <img src="/images/googleIcon.png" alt="google" />
          <span>{{ $t("login.login_with_google") }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});

import axios from "axios";
import useAppStore from "~/stores/AppStore";

const { t } = useI18n();
const { api } = useApi();
const { showToast } = useToast();
const appStore = useAppStore();

const error = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);
const userInput = ref<{ numberOrEmail: string; password: string }>({
  numberOrEmail: "",
  password: "",
});

const submit = async () => {
  try {
    isSubmitting.value = true;
    const response = await api.post("/v1/login", {
      emailOrMsisdn: userInput.value.numberOrEmail,
      password: userInput.value.password,
    });
    const token = useCookie("token", {
      maxAge: 86400,
    });
    token.value = JSON.stringify(response.data.token);
    appStore.setAuthUser(response.data.data);
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
    userInput.value.numberOrEmail = "";
    userInput.value.password = "";
  }
};
</script>
