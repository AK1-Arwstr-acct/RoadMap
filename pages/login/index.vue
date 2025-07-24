<template>
  <div class="h-dvh w-full p-5 py-8 flex items-center overflow-y-auto custom-scrollbar">
    <div class="w-full sm:w-[400px] m-auto flex flex-col gap-8 h-fit">
      <div class="flex flex-col items-center gap-6">
        <IconArrowsterLogo
          :class="{ invert: appStore.theme === 'theme-dark' }"
        />
        <div class="text-center space-y-3">
          <h1 class="font-semibold text-xl md:text-3xl text-text-base">
            {{ $t("login.heading") }}
          </h1>
          <p class="text-text-neutral-subtle">{{ $t("login.welcome_back") }}</p>
        </div>
      </div>
      <div>
        <div class="relative remove-shadow-bg-white">
          <label class="text-sm text-text-neutral-subtle font-medium mb-2">
            {{ $t("verifyPhone.phone_number") }}
          </label>
          <div
            class="relative border rounded-lg flex items-center gap-2 p-1 bg-background-base-subtle"
            :class="[
              isFocused
                ? '!border-[#84CAFF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_0px_0px_4px_rgba(132,202,255,0.24)]'
                : 'border-border-neutral-subtle',
            ]"
            tabindex="0"
            @focus="handleFocus"
            @blur="handleBlur"
          >
            <div
              class="flex justify-between items-center cursor-pointer px-2 gap-1 border-r border-divider"
              @click="isDropdownOpen = !isDropdownOpen"
              @touchstart.prevent="isDropdownOpen = !isDropdownOpen"
            >
              <div>
                <p
                  v-if="selectedOption"
                  class="uppercase text-text-neutral-subtle"
                >
                  {{ selectedOption?.phone_code }}
                </p>
                <div v-else class="min-w-6 min-h-6">
                  <IconSpinner bgColor="white" stroke="#1570EF" />
                </div>
              </div>
              <IconChevronDown
                width="16"
                height="16"
                class="transition-all ease-in-out duration-200"
                :class="{ 'transform rotate-180': isDropdownOpen }"
              />
            </div>
            <Transition name="fade">
              <div
                class="absolute left-0 top-[52px] w-full border-[1.5px] border-border-neutral-subtle bg-background-base-subtle z-20 max-h-[260px] overflow-y-auto rounded-lg"
                v-if="isDropdownOpen"
                v-click-outside="closeDropdown"
              >
                <div
                  v-for="country in countryCodes"
                  :key="country.id"
                  class="flex gap-1 items-center cursor-pointer justify-between hover:bg-background-base-subtle-hovered p-2 active:bg-[#FAFAFA]"
                  :class="{
                    'bg-background-base-subtle-selected':
                      country.id === selectedOption?.id,
                  }"
                  @click="selectCountry(country)"
                >
                  <div class="text-text-neutral-subtle text-sm">
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
              class="w-full pr-4 py-2 outline-none placeholder:text-text-disabled text-text-neutral-subtle bg-background-base-subtle caret-text-base"
              placeholder="915 343 643"
              data-hj-allow
            />
          </div>
        </div>
        <div class="remove-shadow-bg-white mt-6 flex flex-col">
          <label class="font-medium text-text-neutral-subtle text-sm">{{
            $t("login.password")
          }}</label>
          <input
            name="userInput"
            type="password"
            v-model="userInput.password"
            @keydown.enter="submit"
            :placeholder="t('login.enter_your_password')"
            class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none placeholder:text-text-disabled text-text-neutral-subtle caret-text-base"
          />
          <NuxtLinkLocale :to="'/forgot-password'" class="w-fit self-end">
            <p
              class="text-sm text-text-brand font-semibold mt-1.5 text-end cursor-pointer"
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
            class="bg-background-brand hover:bg-background-brand-hovered w-full rounded-lg font-semibold py-3 text-white disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {{ $t("login.login") }}
            <IconSpinner v-if="isSubmitting" />
          </button>
        </div>
        <div class="my-4 flex items-center gap-2">
          <div class="flex-1 h-[1px] bg-divider" />
          <p class="text-text-neutral-subtle text-sm">{{ $t("login.or") }}</p>
          <div class="flex-1 h-[1px] bg-divider" />
        </div>
        <button
          @click="handleClick"
          class="cursor-pointer disabled:opacity-70 w-full text-text-base border border-border-neutral-subtle rounded-lg font-semibold py-2.5 flex gap-2 justify-center items-center"
        >
          <IconGoogle />
          <span>{{ $t("login.login_with_google") }}</span>
        </button>
        <p class="mt-8 text-text-neutral-subtle text-sm text-center">
          {{ $t("login.don_t_have_an_account") }}
          <NuxtLinkLocale :to="'/signup'">
            <span
              class="text-link hover:text-link-hovered font-semibold cursor-pointer"
              >{{ $t("login.sign_up") }}</span
            >
          </NuxtLinkLocale>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
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
