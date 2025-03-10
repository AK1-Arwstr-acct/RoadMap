<template>
  <div class="w-full sm:w-[390px] space-y-8">
    <div class="flex flex-col items-center gap-6">
      <IconArrowsterLogo />
      <div class="text-center space-y-3">
        <h1 class="font-semibold text-3xl text-[#181D27]">
          {{ $t("verifyPhone.we_ll_need_your_phone_number_to_get_started") }}
        </h1>
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
                  <IconSpinner
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
                phoneNumber.length > 0 ? 'text-[#05092C]' : 'text-[#667085]',
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
              <!-- <div class="border-b-[1.5px] border-gray-200 p-2 sticky -top-0.5 sm:top-0 bg-white flex gap-[5px]">
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
                  <NuxtImg
                    :src="country.flag"
                    :alt="`${country.title}_flag`"
                    class="h-6 w-6"
                    loading="eager"
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
            inputmode="numeric"
            @input="(event) => validateNumber(event)"
            autofocus
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown.enter="submit"
            @keydown="preventNonNumeric"
            class="w-full pr-4 py-2 outline-none text-[#05092C]"
            placeholder="915 343 643"
          />
        </div>
      </div>
      <div class="mt-6">
        <button
          @click="submit"
          :disabled="phoneNumber === ''"
          class="bg-[#1570EF] w-full rounded-lg font-semibold outline-none py-3 text-white disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {{ $t("verifyPhone.verify_phone_number") }}
          <IconSpinner v-if="isSubmitting"  />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { Country } from "~/types/auth";

const emits = defineEmits(["verifyPhoneNumber", "setSelectedCountry"]);
const { t } = useI18n();
const { api } = useApi();
const { showToast } = useToast();

const isSubmitting = ref<boolean>(false);

const isFocused = ref<boolean>(false);
const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<Country | null>(null);
const phoneNumber = ref<string>("");
const search = ref<string>("");
const countryOptions = ref<Country[]>([]);

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
    await api.post(`/api/v1/send_otp`, {
      msisdn: userNumber,
      id: selectedOption.value?.id,
    });
    emits("setSelectedCountry", selectedOption.value);
    emits("verifyPhoneNumber", userNumber);
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      showToast(error.response?.data.message, {
        type: "warning",
      });
    }
  } finally {
    isSubmitting.value = false;
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
