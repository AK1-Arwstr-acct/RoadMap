<template>
  <div class="h-dvh w-full flex items-center px-5 py-8 overflow-y-auto custom-scrollbar">
    <div class="w-full sm:w-[400px] m-auto flex flex-col gap-8">
      <div class="flex flex-col items-center gap-6">
        <IconArrowsterLogo
          :class="{ invert: appStore.theme === 'theme-dark' }"
        />
        <div class="text-center flex flex-col gap-3">
          <h1 class="font-semibold text-xl md:text-3xl text-text-base">
            {{ $t("signup.create_your_free_account") }}
          </h1>
          <p class="text-text-neutral-subtle px-3">
            {{ $t("signup.detail") }}
          </p>
        </div>
      </div>
      <div>
        <div class="flex flex-col gap-5">
          <div class="remove-shadow-bg-white">
            <label class="font-medium text-text-neutral-subtle text-sm">{{
              $t("signup.name")
            }}</label>
            <input
              name="user_input"
              type="text"
              v-model="userInput.name"
              :placeholder="t('signup.enter_your_name')"
              class="bg-background-base-subtle mt-1 rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base placeholder:text-text-disabled"
              data-hj-allow
              @input="handelHotjar"
            />
          </div>
          <div class="remove-shadow-bg-white">
            <label class="font-medium text-text-neutral-subtle text-sm">{{
              $t("signup.email")
            }}</label>
            <input
              name="user_input_m"
              type="text"
              v-model="userInput.email"
              placeholder="nguyen@example.com"
              class="bg-background-base-subtle mt-1 rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base placeholder:text-text-disabled"
              data-hj-allow
              @input="handelHotjar"
            />
          </div>
          <div class="remove-shadow-bg-white">
            <label class="font-medium text-text-neutral-subtle text-sm">{{
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
                class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 pl-[14px] pr-8 w-full outline-none appearance-none text-text-base placeholder:text-text-disabled"
              />
            </div>
          </div>
        </div>
        <div class="mt-6 flex flex-col gap-4">
          <button
            @click="onSubmit"
            :disabled="
              userInput.name === '' ||
              userInput.email === '' ||
              userInput.password === ''
            "
            class="bg-background-brand hover:bg-background-brand-hovered w-full rounded-lg font-semibold py-3 text-text-constant-white disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {{ $t("signup.create_account") }}
          </button>
          <button
            @click="handleClick"
            class="cursor-pointer disabled:opacity-70 w-full text-text-neutral-subtle border border-border-neutral-subtle rounded-lg font-semibold py-2.5 flex gap-2 justify-center items-center"
          >
            <IconGoogle />
            <span>{{ $t("signup.sign_up_with_google") }}</span>
          </button>
        </div>
        <p class="mt-8 text-text-neutral-subtle text-sm text-center">
          {{ $t("login.already_have_an_account") }}
          <NuxtLinkLocale :to="'/login'">
            <span
              class="text-link hover:text-link-hovered font-semibold cursor-pointer"
              >{{ $t("login.login") }}</span
            >
          </NuxtLinkLocale>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserInput } from "~/types/home";
import useAppStore from "~/stores/AppStore";

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/signup`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/signup`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/signup`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/signup`,
        hreflang: "x-default",
      },
    ],
  }))
);

const { t } = useI18n();
const localePath = useLocalePath();
const config = useRuntimeConfig();
const appStore = useAppStore();

const isShowPassword = ref<boolean>(false);
const userInput = ref<UserInput>({
  name: "",
  email: "",
  password: "",
});

const handelHotjar = () => {
  if (window.hj) {
    window.hj("event", "user_input_entered");
  }
};

const handleClick = () => {
  const checkToken = useCookie("token");
  if (checkToken.value) {
    checkToken.value = null;
  }
  window.location.href = `${config.public.baseURL}/auth/google`;
};
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
