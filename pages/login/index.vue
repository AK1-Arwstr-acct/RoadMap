<template>
  <div
    class="h-screen min-h-fit w-full flex justify-center items-center p-5 pt-24 pb-16"
  >
    <div class="w-[390px] space-y-8">
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
            class="relative border rounded-lg flex items-center gap-2 p-1"
            :class="[
              isFocused
                ? '!border-[#84CAFF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_0px_0px_4px_rgba(132,202,255,0.24)]'
                : 'border-[#E1E1E1]',
            ]"
            tabindex="0"
            @focus="handleFocus"
            @blur="handleBlur"
          >
            <div class="flex gap-2 items-center justify-center">
              <div
                class="flex justify-between items-center cursor-pointer rounded px-1 py-2 gap-1"
                @click="isDropdownOpen = !isDropdownOpen"
                @touchstart.prevent="isDropdownOpen = !isDropdownOpen"
              >
                <div>
                  <img
                    v-if="selectedOption"
                    :src="selectedOption?.flag"
                    :alt="`${selectedOption?.title}_flag_selected`"
                    class="min-h-6 min-w-6 h-6 w-6"
                  />
                  <div v-else class="min-w-6 min-h-6">
                    <IconSpinner
                      class="animate-spin"
                      height="24"
                      width="24"
                      bgColor="white"
                      stroke="#1570EF"
                    />
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
                class="absolute left-0 top-[52px] w-full border border-[#e0e0e0] bg-white z-20 max-h-[260px] overflow-y-auto rounded-lg"
                v-if="isDropdownOpen"
                v-click-outside="closeDropdown"
              >
                <!-- <div class="border-b border-[#E0E0E0] p-2 sticky -top-0.5 sm:top-0 bg-white flex gap-[5px]">
                                            <IconSearch />
                                            <input type="text" placeholder="Search for country" v-model="search"
                                                class="w-full outline-none" />
                                        </div> -->
                <div
                  v-for="country in countryCodes"
                  :key="country.id"
                  class="flex gap-1 items-center cursor-pointer justify-between hover:bg-[#FAFAFA] p-2 active:bg-[#FAFAFA]"
                  :class="{ 'bg-[#FAFAFA]': country.id === selectedOption?.id }"
                  @click="selectCountry(country)"
                >
                  <!-- <div>
                  <img
                    :src="country.flag"
                    :alt="`${country.title}_flag`"
                    class="h-6 w-6"
                  />
                </div> -->
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
              name="phoneNumber"
              ref="phoneInput"
              inputmode="numeric"
              @input="(event) => validateNumber(event)"
              autofocus
              @focus="handleFocus"
              @blur="handleBlur"
              @keydown="preventNonNumeric"
              class="w-full pr-4 py-2 outline-none text-[#05092C]"
              placeholder="915 343 643"
            />
          </div>
        </div>
        <div class="remove-shadow-bg-white mt-6">
          <label class="font-medium text-[#414651] text-sm">{{
            $t("login.password")
          }}</label>
          <input
            name="userInput"
            type="password"
            v-model="userInput.password"
            @keydown.enter="submit"
            :placeholder="t('login.enter_your_password')"
            class="mt-1 rounded-lg border-2 border-[#E1E1E1] py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
          />
          <p
            @click="navigateTo(localePath('/forgot-password'))"
            class="text-sm text-[#175CD3] font-semibold mt-1.5 text-end cursor-pointer"
          >
            Forgot password?
          </p>
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
            <BaseSpinner v-if="isSubmitting" color="#FFFFFF" />
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
          <span>{{ $t("login.login_with_google") }}</span>
        </a>
        <p class="mt-8 text-[#535862] text-sm text-center">
          Already have an account?
          <span
            @click="navigateTo(localePath('/signup'))"
            class="text-[#175CD3] font-semibold cursor-pointer"
            >Sign up</span
          >
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
import useAppStore from "~/stores/AppStore";
import type { Country } from "~/types/auth";

const { t } = useI18n();
const localePath = useLocalePath();
const { api } = useApi();
const { showToast } = useToast();
const appStore = useAppStore();
const config = useRuntimeConfig();

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
  if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
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
      maxAge: 86400,
    });
    token.value = JSON.stringify(response.data.token);
    appStore.setAuthUser(response.data.data);
    if (response.data.data.oldUser) {
      navigateTo(localePath("/dashboard"));
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
      phoneInput.value.value = '';
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
