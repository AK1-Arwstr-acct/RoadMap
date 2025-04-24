<template>
  <div class="w-full flex justify-center items-center pt-24 pb-16">
    <div class="w-full md:w-[390px]">
      <h1 class="font-semibold text-3xl text-[#181D27] mb-8">
        {{ $t("ai_essay_page.could_you_share_a_few_personal_details_with_us") }}
      </h1>
      <div>
        <div class="remove-shadow-bg-white flex flex-col">
          <label class="font-medium text-[#414651] text-sm"
            >{{ $t("ai_essay_page.your_email")
            }}<span class="text-[#F04438]">*</span></label
          >
          <input
            name="user_input"
            type="email"
            v-model="userInput.email"
            @keydown.enter="submit"
            placeholder="nguyen@example.com"
            class="mt-1 rounded-lg border-2 border-gray-200 py-2.5 px-[14px] w-full outline-none appearance-none text-gray-900"
            data-hj-allow
          />
          <p class="text-sm text-[#535862] mt-1.5">
            {{
              $t(
                "ai_essay_page.we_will_send_you_your_draft_essay_through_email"
              )
            }}
          </p>
        </div>
        <div class="relative remove-shadow-bg-white mt-6">
          <label class="text-sm text-[#344054] font-medium mb-2">
            {{ $t("ai_essay_page.phone_number_optional") }}
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
              name="user_input_ph"
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
          <p class="text-sm text-[#535862] mt-1.5">
            {{
              $t(
                "ai_essay_page.feel_free_to_leave_your_contact_info_if_youre_interested"
              )
            }}
          </p>
        </div>
        <div class="mt-6">
          <button
            @click="submit"
            :disabled="userInput.email === ''"
            class="bg-[#1570EF] w-full rounded-lg font-semibold py-3 text-white disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {{ $t("ai_essay_page.continue") }}
            <IconSpinner v-if="isSubmitting" />
            <IconArrowRight v-else fill="#ffffff" />
          </button>
        </div>
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
import useEssayStore from "~/stores/essayStore";

const essayStore = useEssayStore();
const emit = defineEmits(["submit"]);

const { api } = useApi();
const { showToast } = useToast();

const phoneInput = ref<HTMLInputElement | null>(null);
const isFocused = ref<boolean>(false);
const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<Country | null>(null);
const search = ref<string>("");
const countryOptions = ref<Country[]>([]);
const isSubmitting = ref<boolean>(false);
const userInput = ref<{ phoneNumber: string; email: string }>({
  phoneNumber: "",
  email: "",
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
};

const submit = async () => {
  try {
    isSubmitting.value = true;

    const response = await api.post("/api/v1/session-based-journey/session", {
      msisdn: userInput.value.phoneNumber
        ? `${selectedOption.value?.phone_code}${userInput.value.phoneNumber}`
        : null,
      email: userInput.value.email,
    });
    emit("submit");
    essayStore.publicUserToken = response.data.data.token;
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
    userInput.value.email = "";
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
