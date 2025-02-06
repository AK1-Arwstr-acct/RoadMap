<template>
  <div
    class="min-h-svh w-full flex justify-center items-center px-5 pt-24 pb-16"
  >
    <div class="w-full sm:w-[390px] space-y-8">
      <div class="flex flex-col items-center gap-6">
        <IconArrowsterLogo />
        <div class="text-center space-y-3">
          <h1 class="font-semibold text-3xl text-[#181D27]">
            {{ $t("signup.create_your_free_account") }}
          </h1>
          <p class="text-[#535862] px-3">
            {{ $t("signup.detail") }}
          </p>
        </div>
      </div>
      <div>
        <div class="space-y-5">
          <div class="remove-shadow-bg-white">
            <label class="font-medium text-[#414651] text-sm">{{
              $t("signup.name")
            }}</label>
            <input
              name="Name"
              type="text"
              v-model="userInput.name"
              :placeholder="t('signup.enter_your_name')"
              class="mt-1 rounded-lg border-2 border-[#E1E1E1] py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
            />
          </div>
          <div class="remove-shadow-bg-white">
            <label class="font-medium text-[#414651] text-sm">{{
              $t("signup.email")
            }}</label>
            <input
              name="email"
              type="text"
              v-model="userInput.email"
              placeholder="nguyen@example.com"
              class="mt-1 rounded-lg border-2 border-[#E1E1E1] py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
            />
          </div>
          <div class="remove-shadow-bg-white">
            <label class="font-medium text-[#414651] text-sm">{{
              $t("signup.password")
            }}</label>
            <div class="relative">
              <div
                @click="isShowPassword = !isShowPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <IconPasswordEye />
              </div>
              <input
                name="password"
                :type="isShowPassword ? 'text' : 'password'"
                v-model="userInput.password"
                :placeholder="t('signup.create_a_password')"
                class="mt-1 rounded-lg border-2 border-[#E1E1E1] py-2.5 pl-[14px] pr-8 w-full outline-none appearance-none text-gray-900"
              />
            </div>
          </div>
        </div>
        <div class="mt-6">
          <button
            @click="onSubmit"
            :disabled="
              userInput.name === '' ||
              userInput.email === '' ||
              userInput.password === ''
            "
            class="bg-[#1570EF] w-full rounded-lg font-semibold py-3 text-white disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {{ $t("signup.create_account") }}
          </button>
        </div>
        <div class="my-4 flex items-center gap-2">
          <div class="flex-1 h-[1px] bg-[#E9EAEB]" />
          <p class="text-[#717680] text-sm">{{ $t("login.or") }}</p>
          <div class="flex-1 h-[1px] bg-[#E9EAEB]" />
        </div>
        <a
          :href="`${config.public.baseURL}/auth/google`"
          target="_blank"
          type="submit"
          class="cursor-pointer disabled:opacity-70 w-full text-xl text-[#414651] border-2 border-[#E1E1E1] rounded-lg font-semibold py-2.5 flex gap-2 justify-center items-center"
        >
          <img src="/images/googleIcon.png" alt="google" />
          <span>{{ $t("signup.sign_up_with_google") }}</span>
        </a>
        <p class="mt-8 text-[#535862] text-sm text-center">
          {{ $t('login.already_have_an_account') }}
          <span
            @click="navigateTo(localePath('/login'))"
            class="text-[#175CD3] font-semibold cursor-pointer"
            >{{ $t('login.login') }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserInput } from "~/types/home";

definePageMeta({
  layout: "main-layout",
});

const { t } = useI18n();
const localePath = useLocalePath();
const config = useRuntimeConfig();

const isShowPassword = ref<boolean>(false);
const userInput = ref<UserInput>({
  name: "",
  email: "",
  password: "",
});

const onSubmit = () => {
  const signupInfo = useCookie("signupInfo", {
    httpOnly: false,
    secure: true,
    maxAge: 3600,
  });
  signupInfo.value = JSON.stringify(userInput.value);
  navigateTo(localePath("/signup/verify-phone"));
};
</script>
