<template>
  <div class="size-full text-[#414651] flex flex-col gap-6">
    <!-- user name -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        {{ $t("pricing_page.your_name") }}
        <span class="text-[#F04438]">*</span>
      </p>
      <input
        name="user_input"
        type="text"
        :placeholder="t('pricing_page.your_name')"
        v-model="formDetails.userName"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
        data-hj-allow
      />
    </div>
    <div>
      <p class="text-[#414651] text-sm font-medium">
        {{ $t("pricing_page.your_email") }}
        <span class="text-[#F04438]">*</span>
      </p>
      <input
        name="user_input"
        type="text"
        :placeholder="t('pricing_page.your_email')"
        v-model="formDetails.userEmail"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
        data-hj-allow
      />
    </div>
    <div>
      <p class="text-[#414651] text-sm font-medium">
        {{ $t("pricing_page.year_of_birth") }}
        <span class="text-[#F04438]">*</span>
      </p>
      <input
        name="user_input"
        type="text"
        :placeholder="t('pricing_page.year_of_birth')"
        v-model="formDetails.birthYear"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
        data-hj-allow
      />
    </div>
    <div class="flex flex-col xl:flex-row gap-6">
      <!-- phoneNumber -->
      <div class="relative remove-shadow-bg-white w-full">
        <label class="text-sm text-[#344054] font-medium mb-3">
          {{ $t("pricing_page.phone_number") }}
          <span class="text-[#F04438]">*</span>
        </label>
        <div
          class="relative border-[1.5px] rounded-lg flex items-center gap-2 mt-0.5 p-[2px]"
          :class="[
            isFocused
              ? 'shadow-[0px_0px_0px_4px_rgba(225,225,225,0.24)]'
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
                formDetails.phoneNumber.length > 0
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
            name="phoneNumber"
            ref="phoneInput"
            inputmode="numeric"
            @input="(event) => validateNumber(event)"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown="preventNonNumeric"
            class="w-full pr-4 py-2 outline-none text-[#05092C]"
            placeholder="(555) 000-0000"
            data-hj-allow
          />
        </div>
      </div>
      <!-- alternativeContact -->
      <div class="w-full">
        <BaseSelectRadio
          :options="alternativeContact"
          :label="t('pricing_page.contact_platform')"
          v-model="formDetails.selectedAlternativeContact"
        />
      </div>
    </div>
    <!-- school name -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        {{ $t("pricing_page.your_school_name") }}
        <span class="text-[#F04438]">*</span>
      </p>
      <input
        name="user_input"
        type="text"
        :placeholder="t('pricing_page.e_g_thpt_nhan_chinh')"
        v-model="formDetails.schoolName"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
        data-hj-allow
      />
    </div>
    <!-- draem school -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        {{ $t("pricing_page.share_some_of_your_dream_schools_here") }}
        <span class="text-[#F04438]">*</span>
      </p>
      <input
        name="user_input_dreamSchol"
        type="text"
        :placeholder="
          t('pricing_page.e_g_university_of_sydney_university_of_melbourne')
        "
        v-model="formDetails.dreamSchool"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
        data-hj-allow
      />
    </div>
    <!-- financial support -->
    <div>
      <p class="text-[#414651] text-sm font-medium mb-1.5">
        {{
          $t(
            "pricing_page.how_much_financial_support_can_your_family_provide_per_year"
          )
        }}
        <span class="text-[#F04438]">*</span>
      </p>
      <BaseSelectRadio
        :options="budgetOptions"
        :placeholder="t('pricing_page.financial_support.select_an_amount')"
        v-model="formDetails.financialSupport"
      />
      <p class="text-sm text-[#535862] mt-1.5">
        {{
          $t(
            "pricing_page.this_information_will_help_advisors_guide_you_toward_the_most_suitable_country_school_and_scholarships_in_the_most_accurate_and_effective_way"
          )
        }}
      </p>
    </div>
    <!-- how do you hear -->
    <div>
      <p class="text-[#414651] text-sm font-medium mb-1.5">
        {{ $t("pricing_page.how_did_you_hear_about_us") }}
      </p>
      <BaseSelectRadio
        :options="platformOptions"
        placeholder="Select an Option"
        v-model="formDetails.referralSource"
        direction="upward"
      />
    </div>
    <!-- button -->
    <button
      :disabled="isDisable || isSubmitting"
      @click="submit"
      class="bg-[#1570EF] rounded-lg py-3 px-5 flex items-center justify-center gap-2 text-white disabled:opacity-70"
    >
      {{ $t("pricing_page.apply_now") }}
      <IconArrowRight v-if="!isSubmitting" fill="#ffffff" />
      <IconSpinner v-else stroke="#ffffff" bgColor="transparent" width="20" />
    </button>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { Country } from "~/types/auth";
import useAppStore from "~/stores/AppStore";
import type { OptionAttributes } from "~/types/home";

const props = defineProps({
  selectedPlan: {
    type: Number,
    default: 2,
  },
});

const emits = defineEmits(["updateJourney"]);
const appStore = useAppStore();

const { api } = useApi();
const { showToast } = useToast();
const { t } = useI18n();

interface FormDetails {
  userName: string;
  userEmail: string;
  birthYear: string;
  phoneNumber: string;
  schoolName: string;
  financialSupport: OptionAttributes | null;
  dreamSchool: string;
  otherQuestions: string;
  selectedAlternativeContact: OptionAttributes | null;
  referralSource: OptionAttributes | null;
}

const isSubmitting = ref<boolean>(false);
const formDetails = ref<FormDetails>({
  userName: appStore.userData?.name || "",
  userEmail: appStore.userData?.email || "",
  birthYear: appStore.userData?.dob || "",
  phoneNumber: "",
  schoolName: "",
  financialSupport: null,
  dreamSchool: "",
  otherQuestions: "",
  selectedAlternativeContact: null,
  referralSource: null,
});
const isFocused = ref<boolean>(false);
const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<Country | null>(null);
const search = ref<string>("");
const countryOptions = ref<Country[]>([]);
const otherText = ref<string>("");
const width = ref<number>(0);

const alternativeContact = [
  { value: "zalo", label: "Zalo" },
  { value: "telegram", label: "Telegram" },
  { value: "whatsapp", label: "WhatsApp" },
];

const budgetOptions = [
  {
    value: "< 300 million VND",
    label: t("pricing_page.financial_support.option1"),
  },
  {
    value: "300 - 500 million VND",
    label: t("pricing_page.financial_support.option2"),
  },
  {
    value: "500 - 800 million VND",
    label: t("pricing_page.financial_support.option3"),
  },
  {
    value: "> 800 million VND",
    label: t("pricing_page.financial_support.option4"),
  },
];

const platformOptions = [
  {
    value: "TikTok",
    label: t("pricing_page.referralSource.option1"),
  },
  {
    value: "Friends",
    label: t("pricing_page.referralSource.option2"),
  },
  {
    value: "Threads",
    label: t("pricing_page.referralSource.option3"),
  },
  {
    value: "Other",
    label: t("pricing_page.referralSource.option4"),
  },
];

const textareaRows = computed(() => {
  if (width.value < 340) return 5;
  if (width.value < 370) return 4;
  if (width.value < 600) return 3;
  return 2;
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
  formDetails.value.phoneNumber = cleanedValue;
};

const isDisable = computed(() => {
  return (
    !formDetails.value.userName ||
    !formDetails.value.userEmail ||
    !formDetails.value.birthYear ||
    !formDetails.value.schoolName ||
    !formDetails.value.phoneNumber ||
    !formDetails.value.dreamSchool ||
    !formDetails.value.financialSupport
  );
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

const submit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/plans/bundle", {
      plan_id: props.selectedPlan,
      name: formDetails.value.userName,
      contact_info: formDetails.value.userEmail,
      birth_year: formDetails.value.birthYear,
      phone_number:
        formDetails.value.phoneNumber.length > 6
          ? `${selectedOption.value?.phone_code}${formDetails.value.phoneNumber}`
          : null,
      current_school_name: formDetails.value.schoolName,
      financial_support_amount: formDetails.value.financialSupport?.value,
      financial_support_amount_unit: "vnd",
      dream_schools: formDetails.value.dreamSchool,
      contact_platform: [formDetails.value.selectedAlternativeContact?.value],
      student_concern: formDetails.value.otherQuestions,
      referral_source: formDetails.value.referralSource?.value,
    });
    emits("updateJourney");
    formDetails.value = {
      userName: appStore.userData?.name || "",
      userEmail: appStore.userData?.email || "",
      birthYear: appStore.userData?.dob || "",
      phoneNumber: "+84",
      schoolName: "",
      financialSupport: null,
      dreamSchool: "",
      otherQuestions: "",
      selectedAlternativeContact: null,
      referralSource: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
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

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

onMounted(() => {
  windowSize();
  window.addEventListener("resize", windowSize);
  getCountries();
});

onUnmounted(() => {
  window.removeEventListener("resize", windowSize);
});
</script>
