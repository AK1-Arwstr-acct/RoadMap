<template>
  <div
    class="size-full rounded-2xl bg-white text-[#414651] overflow-hidden p-4 sm:p-6 flex flex-col gap-6"
  >
    <!-- phoneNumber -->
    <!-- <div class="relative remove-shadow-bg-white">
      <label class="text-sm text-[#344054] font-medium mb-3">
        Parent's phone number (Optional)
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
          autofocus
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="preventNonNumeric"
          class="w-full pr-4 py-2 outline-none text-[#05092C]"
          placeholder="915 343 643"
          data-hj-allow
        />
      </div>
    </div> -->
    <!-- school name -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        {{ $t("pricing_page.your_school_name") }}
        <span class="text-[#F04438]">*</span>
      </p>
      <input
        name="user_input_schoolName"
        type="text"
        :placeholder="t('pricing_page.e_g_thpt_nhan_chinh')"
        v-model="formDetails.schoolName"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
        data-hj-allow
      />
    </div>
    <!-- financial support -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        {{
          $t(
            "pricing_page.how_much_financial_support_can_your_family_provide_per_year"
          )
        }}
        <span class="text-[#F04438]">*</span>
      </p>
      <input
        name="user_input_budget"
        type="text"
        :placeholder="`${t('pricing_page.e_g')} 500,000,000VND`"
        v-model="formDetails.financialSupport"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
        data-hj-allow
      />
      <p class="text-sm text-[#535862] mt-1.5">
        {{
          $t(
            "pricing_page.this_information_will_help_advisors_guide_you_toward_the_most_suitable_country_school_and_scholarships_in_the_most_accurate_and_effective_way"
          )
        }}
      </p>
    </div>

    <!-- countries -->
    <div>
      <p class="font-medium text-[#414651] text-sm mb-4">
        {{ $t("pricing_page.i_want_to_study_at") }}
        <span class="text-[#F04438]">*</span>
      </p>
      <div class="flex flex-col md:flex-row gap-4 flex-wrap">
        <div
          v-for="(option, index) in studyDestinations"
          :key="index"
          class="w-[calc(42%-8px)]"
        >
          <label
            :for="`destination${index}`"
            class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200 text-nowrap"
          >
            <input
              :id="`destination${index}`"
              type="checkbox"
              name="countries"
              :value="option.title"
              :checked="
                formDetails.selectedLocationOptions.includes(option.title)
              "
              class="hidden peer"
              @change="toggleDestinationsSelection(option.title)"
            />
            <div
              class="size-5 min-w-5 flex justify-center items-center border-2 rounded-md transition-all"
              :class="[
                formDetails.selectedLocationOptions.includes(option.title)
                  ? 'border-[#1570EF] bg-[#1570EF]'
                  : 'border-gray-200',
              ]"
            >
              <IconTick
                v-if="
                  formDetails.selectedLocationOptions.includes(option.title)
                "
                stroke="#ffffff"
              />
            </div>
            {{ option.title }}
          </label>
        </div>
        <div
          v-show="formDetails.selectedLocationOptions.includes('Other')"
          class="w-full mt-2"
        >
          <p class="text-[#414651] text-sm font-medium">
            {{ $t("pricing_page.can_you_specify_for_us") }}
          </p>
          <input
            v-model="otherText"
            class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
            :placeholder="`${t('pricing_page.e_g')} Korean`"
            data-hj-allow
          />
        </div>
      </div>
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
    <!-- alternative contact -->
    <div>
      <p class="font-medium text-[#414651] text-sm mb-4">
        {{
          $t("pricing_page.alternative_contact_platform_if_you_dont_use_zalo")
        }}
        <!-- <span class="text-[#F04438]">*</span> -->
      </p>
      <div class="flex flex-col md:flex-row gap-4 flex-wrap">
        <div
          v-for="(option, index) in alternativeContact"
          :key="index"
          class="w-[calc(42%-8px)]"
        >
          <label
            :for="`contact${index}`"
            class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200 text-nowrap"
          >
            <input
              :id="`contact${index}`"
              type="checkbox"
              name="alternateContact"
              :value="option.id"
              :checked="
                formDetails.selectedAlternativeContact.includes(option.id)
              "
              class="hidden peer"
              @change="toggleAlternativeContact(option.id)"
            />
            <div
              class="size-5 min-w-5 flex justify-center items-center border-2 rounded-md transition-all"
              :class="[
                formDetails.selectedAlternativeContact.includes(option.id)
                  ? 'border-[#1570EF] bg-[#1570EF]'
                  : 'border-gray-200',
              ]"
            >
              <IconTick
                v-if="
                  formDetails.selectedAlternativeContact.includes(option.id)
                "
                stroke="#ffffff"
              />
            </div>
            {{ option.title }}
          </label>
        </div>
      </div>
    </div>
    <!-- other phoneNumber -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        {{
          $t(
            "pricing_page.if_you_dont_have_a_vietnamese_phone_number_please_leave_your_easiest_contact_information_below"
          )
        }}
        <!-- <span class="text-[#F04438]">*</span> -->
      </p>
      <input
        name="user_input_contact"
        type="text"
        :placeholder="
          t('pricing_page.account_information_phone_number_username')
        "
        v-model="formDetails.otherPhoneOrEmail"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
        data-hj-allow
      />
    </div>
    <!-- arrowster Info -->
    <!-- <div>
      <p class="font-medium text-[#414651] text-sm mb-4">
        How did you hear about Arrowster? <span class="text-[#F04438]">*</span>
      </p>
      <div class="flex gap-4 flex-wrap">
        <div
          v-for="(option, index) in arrowsterInfo"
          :key="index"
          class="w-[calc(50%-8px)]"
        >
          <label
            :for="`arrowsterInfo${index}`"
            class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200 text-nowrap"
          >
            <input
              :id="`arrowsterInfo${index}`"
              type="checkbox"
              name="countries"
              :value="option.title"
              :checked="
                formDetails.selectedArrowsterInfo.includes(option.title)
              "
              class="hidden peer"
              @change="toggleArrowsterInfo(option.title)"
            />
            <div
              class="size-5 min-w-5 flex justify-center items-center border-2 rounded-md transition-all"
              :class="[
                formDetails.selectedArrowsterInfo.includes(option.title)
                  ? 'border-[#1570EF] bg-[#1570EF]'
                  : 'border-gray-200',
              ]"
            >
              <IconTick
                v-if="formDetails.selectedArrowsterInfo.includes(option.title)"
                stroke="#ffffff"
              />
            </div>
            {{ option.title }}
          </label>
        </div>
      </div>
    </div> -->

    <!-- button -->
    <button
      :disabled="isDisable || isSubmitting"
      @click="submit"
      class="bg-[#1570EF] rounded-lg py-3 px-5 flex items-center justify-center gap-2 text-white disabled:opacity-70"
    >
      {{ $t("pricing_page.send_to_us") }}
      <IconArrowRight v-if="!isSubmitting" fill="#ffffff" />
      <IconSpinner v-else stroke="#ffffff" bgColor="transparent" width="20" />
    </button>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { Country } from "~/types/auth";

const props = defineProps({
  selectedPlan: {
    type: Number,
    default: 2,
  },
});

const emits = defineEmits(["updateJourney"]);

const { api } = useApi();
const { showToast } = useToast();
const { t } = useI18n();

interface FormDetails {
  phoneNumber: string;
  schoolName: string;
  financialSupport: string;
  otherPhoneOrEmail: string;
  dreamSchool: string;
  selectedLocationOptions: string[];
  selectedAlternativeContact: string[];
  selectedArrowsterInfo: string[];
}

const isSubmitting = ref<boolean>(false);
const formDetails = ref<FormDetails>({
  phoneNumber: "",
  schoolName: "",
  financialSupport: "",
  dreamSchool: "",
  otherPhoneOrEmail: "",
  selectedLocationOptions: [],
  selectedAlternativeContact: [],
  selectedArrowsterInfo: [],
});
const isFocused = ref<boolean>(false);
const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<Country | null>(null);
const search = ref<string>("");
const countryOptions = ref<Country[]>([]);
const otherText = ref<string>("");

const studyDestinations = [
  { id: 1, title: "United Kingdom" },
  { id: 2, title: "Canada" },
  { id: 3, title: "Australia" },
  { id: 4, title: "United States" },
  { id: 5, title: "Europe" },
  { id: 6, title: "Vietnam International University" },
  { id: 7, title: "New Zealand" },
  { id: 8, title: "Other" },
];

const alternativeContact = [
  { id: "telegram", title: "Telegram" },
  // { id: "instagram", title: "Instagram" },
  { id: "whatsapp", title: "WhatsApp" },
  // { id: "messenger", title: "Messenger" },
];

const arrowsterInfo = [
  { id: 1, title: "Arrowster’s Fanpage" },
  { id: 2, title: "Shared by friends" },
  { id: 3, title: "Group Trạm xá Du học" },
  { id: 4, title: "Other" },
  { id: 5, title: "Personal Threads posts" },
];

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
    !formDetails.value.schoolName ||
    !formDetails.value.financialSupport ||
    !formDetails.value.dreamSchool ||
    // !formDetails.value.otherPhoneOrEmail ||
    formDetails.value.selectedLocationOptions.length === 0
    // formDetails.value.selectedAlternativeContact.length === 0 ||
    // formDetails.value.selectedArrowsterInfo.length === 0
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

const toggleDestinationsSelection = (title: string) => {
  if (formDetails.value.selectedLocationOptions.includes(title)) {
    let updateIds = formDetails.value.selectedLocationOptions.filter(
      (item) => item !== title
    );
    formDetails.value.selectedLocationOptions = updateIds;
  } else {
    formDetails.value.selectedLocationOptions.push(title);
  }
};
const toggleAlternativeContact = (id: string) => {
  if (formDetails.value.selectedAlternativeContact.includes(id)) {
    let updateIds = formDetails.value.selectedAlternativeContact.filter(
      (item) => item !== id
    );
    formDetails.value.selectedAlternativeContact = updateIds;
  } else {
    formDetails.value.selectedAlternativeContact.push(id);
  }
};
const toggleArrowsterInfo = (title: string) => {
  if (formDetails.value.selectedArrowsterInfo.includes(title)) {
    let updateIds = formDetails.value.selectedArrowsterInfo.filter(
      (item) => item !== title
    );
    formDetails.value.selectedArrowsterInfo = updateIds;
  } else {
    formDetails.value.selectedArrowsterInfo.push(title);
  }
};

const submit = async () => {
  try {
    isSubmitting.value = true;
    const isOther = formDetails.value.selectedLocationOptions.includes("Other");
    let tempLocation = formDetails.value.selectedLocationOptions;
    if (isOther) {
      tempLocation = [
        ...formDetails.value.selectedLocationOptions.filter(
          (item) => item !== "Other"
        ),
        otherText.value,
      ];
    }
    await api.post("/api/v1/plans/bundle", {
      plan_id: props.selectedPlan,
      parent_phone:
        formDetails.value.phoneNumber.length > 6
          ? `${selectedOption.value?.phone_code}${formDetails.value.phoneNumber}`
          : null,
      current_school_name: formDetails.value.schoolName,
      financial_support_amount: formDetails.value.financialSupport,
      financial_support_amount_unit: "vnd",
      want_to_study_at: tempLocation,
      dream_schools: formDetails.value.dreamSchool,
      contact_platform: formDetails.value.selectedAlternativeContact,
      contact_info: formDetails.value.otherPhoneOrEmail,
      lead_incoming_platform: formDetails.value.selectedArrowsterInfo,
    });
    emits("updateJourney");
    formDetails.value = {
      phoneNumber: "+84",
      schoolName: "",
      financialSupport: "",
      dreamSchool: "",
      otherPhoneOrEmail: "",
      selectedLocationOptions: [],
      selectedAlternativeContact: [],
      selectedArrowsterInfo: [],
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

onMounted(() => {
  getCountries();
});
</script>
