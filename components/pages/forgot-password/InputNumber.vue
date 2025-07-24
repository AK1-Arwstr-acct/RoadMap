<template>
  <div class="w-full sm:w-[400px] flex flex-col gap-8">
    <div class="flex flex-col items-center gap-6">
      <IconArrowsterLogo :class="{ invert: appStore.theme === 'theme-dark' }" />
      <div class="text-center space-y-3">
        <h1 class="font-semibold text-3xl text-text-base">
          {{ $t("forgotPassword.forgot_password") }}
        </h1>
        <p class="text-text-neutral-subtle">
          {{ $t("forgotPassword.dont_worry") }}
        </p>
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
      <div class="mt-6">
        <button
          @click="submit"
          :disabled="phoneNumber === ''"
          class="bg-background-brand  hover:bg-background-brand-hovered border-border-neutral-subtle w-full rounded-lg font-semibold py-3 text-text-constant-white disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {{ $t("forgotPassword.get_verification_code") }}
          <IconSpinner class="size-5" v-if="isSubmitting" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { Country } from "~/types/auth";
import useAppStore from "~/stores/AppStore";

const emits = defineEmits(["getCode", "setSelectedCountry"]);

const { api } = useApi();
const { showToast } = useToast();
const appStore = useAppStore();

const phoneInput = ref<HTMLInputElement | null>(null);
const isFocused = ref<boolean>(false);
const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<Country | null>(null);
const search = ref<string>("");
const phoneNumber = ref<string>("");
const countryOptions = ref<Country[]>([]);
const isSubmitting = ref<boolean>(false);

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
  phoneNumber.value = cleanedValue;
};
const submit = async () => {
  try {
    isSubmitting.value = true;
    const userNumber = `${selectedOption.value?.phone_code}${phoneNumber.value}`;
    await api.post(`/api/v1/reset-password`, {
      msisdn: userNumber,
    });
    emits("setSelectedCountry", selectedOption.value);
    emits("getCode", userNumber);
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
    phoneNumber.value = "";
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
