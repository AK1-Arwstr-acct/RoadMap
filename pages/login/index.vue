<template>
  <div
    class="min-h-svh w-full flex justify-center items-center p-5 pt-24 pb-16"
  >
    <div class="w-full sm:w-[390px] space-y-8">
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
        <div class="relative remove-shadow-bg-white">
          <label class="text-sm text-[#344054] font-medium mb-2">
            {{ $t("verifyPhone.phone_number") }}
          </label>
          <div
            class="relative border-[1.5px] rounded-lg flex items-center gap-2 p-1"
            :class="[
              isFocused
                ? '!border-[#84CAFF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_0px_0px_4px_rgba(132,202,255,0.24)]'
                : 'border-gray-200',
            ]"
            tabindex="0"
            @focus="handleFocus"
            @blur="handleBlur"
          >
            <div class="flex gap-2 items-center justify-center">
              <div
                class="flex justify-between items-center cursor-pointer rounded pr-1 pl-2 py-2 gap-1"
                @click="isDropdownOpen = !isDropdownOpen"
                @touchstart.prevent="isDropdownOpen = !isDropdownOpen"
              >
                <div>
                  <p
                    v-if="selectedOption"
                    class="min-h-6 min-w-6 h-6 w-6 mt-0.5 uppercase text-[#181D27]"
                  >
                    {{ selectedOption?.country_code }}
                  </p>
                  <div v-else class="min-w-6 min-h-6">
                    <IconSpinner bgColor="white" stroke="#1570EF" />
                  </div>
                </div>
                <IconChevronDown
                  width="16"
                  height="16"
                  stroke="#717680"
                  class="transition-all ease-in-out duration-200"
                  :class="{ 'transform rotate-180': isDropdownOpen }"
                />
              </div>
              <div
                :class="[
                  userInput.phoneNumber.length > 0
                    ? 'text-[#05092C]'
                    : 'text-[#667085]',
                ]"
              >
                {{ selectedOption?.phone_code }}
              </div>
            </div>
            <Transition name="fade">
              <div
                class="absolute left-0 top-[52px] w-full border-[1.5px] border-gray-200 bg-white z-20 max-h-[260px] overflow-y-auto rounded-lg"
                v-if="isDropdownOpen"
                v-click-outside="closeDropdown"
              >
                <div
                  v-for="country in countryCodes"
                  :key="country.id"
                  class="flex gap-1 items-center cursor-pointer justify-between hover:bg-[#FAFAFA] p-2 active:bg-[#FAFAFA]"
                  :class="{ 'bg-[#FAFAFA]': country.id === selectedOption?.id }"
                  @click="selectCountry(country)"
                >
                  <div class="text-[#667085] text-sm">
                    {{ country.title }} ({{ country.phone_code }})
                  </div>
                  <span v-if="selectedOption?.id === country.id">
                    <IconTick stroke="#1570EF" strokeWidth="2" />
                  </span>
                </div>
              </div>
            </Transition>
            <input
              name="user_input"
              ref="phoneInput"
              inputmode="numeric"
              @input="(event) => validateNumber(event)"
              autofocus
              @focus="handleFocus"
              @blur="handleBlur"
              @keydown="preventNonNumeric"
              class="w-full pr-4 py-2 outline-none text-[#05092C]"
              placeholder="915 343 643"
              data-hj-allow
            />
          </div>
        </div>
        <div class="remove-shadow-bg-white mt-6 flex flex-col">
          <label class="font-medium text-[#414651] text-sm">{{
            $t("login.password")
          }}</label>
          <input
            name="userInput"
            type="password"
            v-model="userInput.password"
            @keydown.enter="submit"
            :placeholder="t('login.enter_your_password')"
            class="mt-1 rounded-lg border-2 border-gray-200 py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
          />
          <NuxtLinkLocale :to="'/forgot-password'" class="w-fit self-end">
            <p
              class="text-sm text-[#175CD3] font-semibold mt-1.5 text-end cursor-pointer"
            >
              {{ $t("forgotPassword.forgot_password") }}
            </p>
          </NuxtLinkLocale>
        </div>
        <div class="mt-6">
          <button
            @click="submit"
            :disabled="
              userInput.phoneNumber === '' || userInput.password === ''
            "
            class="bg-[#1570EF] w-full rounded-lg font-semibold py-3 text-white disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {{ $t("login.login") }}
            <IconSpinner v-if="isSubmitting" />
          </button>
        </div>
        <div class="my-4 flex items-center gap-2">
          <div class="flex-1 h-[1px] bg-[#E9EAEB]" />
          <p class="text-[#717680] text-sm">{{ $t("login.or") }}</p>
          <div class="flex-1 h-[1px] bg-[#E9EAEB]" />
        </div>
        <button
          @click="handleClick"
          class="cursor-pointer disabled:opacity-70 w-full text-[#414651] border-2 border-gray-200 rounded-lg font-semibold py-2.5 flex gap-2 justify-center items-center"
        >
          <IconGoogle />
          <span>{{ $t("login.login_with_google") }}</span>
        </button>
        <p class="mt-8 text-[#535862] text-sm text-center">
          {{ $t("login.don_t_have_an_account") }}
          <NuxtLinkLocale :to="'/signup'">
            <span class="text-[#175CD3] font-semibold cursor-pointer">{{
              $t("login.sign_up")
            }}</span>
          </NuxtLinkLocale>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});

import axios from "axios";
import type { Country } from "~/types/auth";
import useAppStore from "~/stores/AppStore";
import { identifyUserInHotjar } from "@/utils/hotjar";

const { t } = useI18n();
const localePath = useLocalePath();
const { api } = useApi();
const { showToast } = useToast();
const config = useRuntimeConfig();
const appStore = useAppStore();

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/login`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/login`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/login`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/login`,
        hreflang: "x-default",
      },
    ],
  }))
);

const phoneInput = ref<HTMLInputElement | null>(null);
const isFocused = ref<boolean>(false);
const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<Country | null>(null);
const search = ref<string>("");
const countryOptions = ref<Country[]>([]);
const isSubmitting = ref<boolean>(false);
const userInput = ref<{ phoneNumber: string; password: string }>({
  phoneNumber: "",
  password: "",
});

const countryCodes = computed(() => {
  if (search.value) {
    return countryOptions.value.filter((item) => {
      return item.title.toLowerCase().includes(search.value.toLowerCase());
    });
  } else {
    return countryOptions.value;
  }
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
const handleFocus = () => {
  isFocused.value = true;
};
const handleBlur = () => {
  isFocused.value = false;
};
const closeDropdown = () => {
  isDropdownOpen.value = false;
};
const selectCountry = (country: Country) => {
  isDropdownOpen.value = false;
  selectedOption.value = country;
};
const preventNonNumeric = (event: KeyboardEvent) => {
  if (
    !/^[0-9]$/.test(event.key) &&
    event.key !== "Backspace" &&
    event.key !== "Tab"
  ) {
    event.preventDefault();
  }
};
const validateNumber = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  const value = input.value;

  const regex = /^[0-9 ]+$/;
  const cleanedValue = value.replace(/\s+/g, "");

  if (regex.test(value)) {
    input.value = value;
  } else {
    input.value = value.slice(0, -1);
  }
  userInput.value.phoneNumber = cleanedValue;
  handelHotjar();
};
const submit = async () => {
  try {
    isSubmitting.value = true;
    const checkToken = useCookie("token");
    if (checkToken.value) {
      checkToken.value = null;
    }

    const response = await api.post("/api/v1/login", {
      emailOrMsisdn: `${selectedOption.value?.phone_code}${userInput.value.phoneNumber}`,
      password: userInput.value.password,
    });
    const token = useCookie("token", {
      maxAge: 604800,
      httpOnly: false,
      secure: true,
    });
    token.value = JSON.stringify(response.data.token);
    await nextTick();
    const user = await appStore.getUserData();
    identifyUserInHotjar(user);
    await appStore.checkAuthenticatedUser();
    await appStore.getAuthUserData();
    if (response.data.data.onboarded) {
      appStore.paywallOnLastScreen === ""
        ? navigateTo(localePath("/"))
        : navigateTo(localePath(appStore.paywallOnLastScreen));
      appStore.paywallOnLastScreen = "";
    } else {
      navigateTo(localePath("/onboarding"));
    }
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
    userInput.value.phoneNumber = "";
    userInput.value.password = "";
    if (phoneInput.value) {
      phoneInput.value.value = "";
    }
  }
};
const getCountries = async () => {
  try {
    const response = await api.get(`/api/v1/country_codes`);
    countryOptions.value = response.data.data.all_phone_codes;
    selectedOption.value = response.data.data.current_country_code;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getCountries();
});
</script>
