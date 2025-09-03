<template>
  <div
    class="bg-background-base-subtle fixed z-50 right-0 bottom-0 w-screen md:w-[480px] h-dvh py-5 md:py-6 flex flex-col gap-4 md:gap-6"
  >
    <div class="flex items-center justify-between gap-2 px-4 md:px-8">
      <p class="font-semibold text-xl md:text-2xl text-text-base">
        {{ $t("counselor_pages.new_student_modal.create_new_profile") }}
      </p>
      <div
        @click="counselorStore.isCreateNewStudent = false"
        class="cursor-pointer"
      >
        <IconCross width="24" height="24" />
      </div>
    </div>
    <!-- content -->
    <div
      class="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-5 px-4 md:px-8"
    >
      <!-- student name -->
      <div class="">
        <label class="font-medium text-text-neutral-subtle text-sm mb-1.5">{{
          $t("counselor_pages.new_student_modal.student_name")
        }}</label>
        <input
          name="name"
          type="text"
          v-model="formData.name"
          :placeholder="
            t('counselor_pages.new_student_modal.enter_student_name')
          "
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
      <div class="relative remove-shadow-bg-white">
        <label class="text-sm text-text-neutral-subtle font-medium mb-2">
          {{ $t("verifyPhone.phone_number") }}
        </label>
        <div
          class="relative border rounded-lg flex items-center gap-2 p-1 bg-background-base-subtle border-border-neutral-subtle"
          :class="{
            'shadow-[0px_0px_0px_4px_rgba(225,225,225,0.24)]': isFocused,
          }"
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
      <!-- email -->
      <div class="">
        <label class="font-medium text-text-neutral-subtle text-sm mb-1.5">{{
          $t("counselor_pages.new_student_modal.email")
        }}</label>
        <input
          name="Email"
          type="email"
          v-model="formData.email"
          placeholder="nguyen@example.com"
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
      <BaseSelectRadio
        :label="t('counselor_pages.new_student_modal.counselor')"
        :options="counselorList"
        v-model="formData.counselor"
        :loading="isCounselorLoading"
        :disabled="!counselorList.length"
        :isShadowDark="true"
        :showtextAvatar="true"
        direction="upward"
      />
      <!-- contract type -->
      <div class="">
        <label
          class="font-medium text-text-neutral-subtle text-sm pb-2.5 block"
        >
          {{ $t("counselor_pages.new_student_modal.type_of_contract") }}
        </label>
        <div class="flex gap-8 text-text-neutral-subtle font-medium">
          <label class="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              value="basic"
              v-model="formData.contractType"
              class="appearance-none hidden"
            />
            <div
              class="size-6 border-2 rounded-full flex items-center justify-center transition-all ease-in-out duration-200 shadow-2xl group-hover:outline outline-8"
              :class="[
                formData.contractType === 'basic'
                  ? 'border-background-brand bg-background-brand group-hover:outline-background-brand-subtle-hovered'
                  : 'border-border-neutral group-hover:outline-background-base-subtle-hovered',
              ]"
            >
              <span
                v-if="formData.contractType === 'basic'"
                class="size-[9px] min-w-[9px] rounded-full bg-white"
              />
            </div>
            <span>{{
              $t("counselor_pages.new_student_modal.basic_mentorship")
            }}</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              value="advance"
              v-model="formData.contractType"
              class="appearance-none hidden"
            />
            <div
              class="size-6 border-2 rounded-full flex items-center justify-center transition-all ease-in-out duration-200 shadow-2xl group-hover:outline outline-8"
              :class="[
                formData.contractType === 'advance'
                  ? 'border-background-brand bg-background-brand group-hover:outline-background-brand-subtle-hovered'
                  : 'border-border-neutral group-hover:outline-background-base-subtle-hovered',
              ]"
            >
              <span
                v-if="formData.contractType === 'advance'"
                class="size-[9px] min-w-[9px] rounded-full bg-white"
              />
            </div>
            <span>{{
              $t("counselor_pages.new_student_modal.advanced_mentorship")
            }}</span>
          </label>
        </div>
      </div>
    </div>
    <!-- buttons -->
    <div class="flex flex-col gap-2 px-4 md:px-8">
      <button
        :disabled="isDisable || isSubmitting || selectedOption === null"
        @click="submit"
        class="font-semibold text-text-constant-white w-full rounded-lg bg-background-brand py-[13px] hover:bg-background-brand-hovered disabled:opacity-65"
      >
        {{ $t("counselor_pages.new_student_modal.send_onboarding_invite") }}
      </button>
      <button
        @click="counselorStore.isCreateNewStudent = false"
        class="font-semibold text-text-brand border border-border-brand w-full rounded-lg py-[13px]"
      >
        {{ $t("counselor_pages.new_student_modal.cancel") }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStore from "~/stores/counselorStore";
import type { OptionAttributes } from "~/types/home";
import IconAward from "~/components/icons/IconAward.vue";
import type { Country } from "~/types/auth";
import axios from "axios";

const counselorStore = useCounselorStore();
const { api } = useApi();
const { t } = useI18n();
const { showToast } = useToast();

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
  counselor: OptionAttributes | null;
  contractType: string;
}

const counselorList = ref<OptionAttributes[]>([]);

const formData = ref<FormData>({
  name: "",
  phoneNumber: "",
  email: "",
  counselor: null,
  contractType: "basic",
});
const phoneInput = ref<HTMLInputElement | null>(null);
const isFocused = ref<boolean>(false);
const isDropdownOpen = ref<boolean>(false);
const countryOptions = ref<Country[]>([]);
const selectedOption = ref<Country | null>(null);
const search = ref<string>("");
const isSubmitting = ref<boolean>(false);
const isCounselorLoading = ref<boolean>(false);

const isDisable = computed(() => {
  return !(
    formData.value.name &&
    formData.value.email &&
    formData.value.counselor &&
    formData.value.phoneNumber
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
  formData.value.phoneNumber = cleanedValue;
};

const getCountries = async () => {
  try {
    const response = await api.get(`/api/v1/country_codes`);
    countryOptions.value = response.data.data.all_phone_codes;
    const currentCountry = response.data.data.current_country_code;
    if (Array.isArray(currentCountry) && currentCountry.length === 0) {
      selectedOption.value = countryOptions.value[0];
    } else {
      selectedOption.value = currentCountry;
    }
  } catch (error) {
    console.error(error);
  }
};

const submit = async () => {
  try {
    isSubmitting.value = true;
    const response = await api.post("/api/v1/counsellor/student", {
      name: formData.value.name,
      msisdn: `${selectedOption.value?.phone_code}${formData.value.phoneNumber}`,
      email: formData.value.email,
      counsellor_id: formData.value.counselor?.value,
      type: formData.value.contractType,
    });
    counselorStore.isCreateNewStudent = false;
    if (response.data.data) {
      showToast(response.data.data, {
        type: "success",
      });
    }
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

const getCounselors = async () => {
  try {
    isCounselorLoading.value = true;
    const response = await api.get("/api/v1/counsellor");
    counselorList.value = response.data.data.map(
      (item: { id: string; name: string }) => ({
        label: item.name,
        value: item.id,
      })
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isCounselorLoading.value = false;
  }
};

onMounted(() => {
  getCountries();
  getCounselors();
});
</script>
