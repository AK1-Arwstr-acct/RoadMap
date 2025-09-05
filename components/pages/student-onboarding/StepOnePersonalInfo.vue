<template>
  <div class="flex flex-col gap-5">
    <!-- heading -->
    <div class="flex gap-2 items-center">
      <div class="p-2 rounded-lg bg-background-brand-subtle-hovered">
        <IconUser class="!text-icon-brand" />
      </div>
      <p class="font-semibold text-xl text-text-base">Personal information</p>
    </div>
    <!-- name -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Full legal name<span class="text-text-error font-medium">
          *</span
        ></label
      >
      <div class="">
        <input
          name="name"
          type="text"
          v-model="counselorStudentStore.onBoardingData.name"
          placeholder="Full legal name"
          class="mt-1.5 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
    <!-- Date of Birth -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Date of birth<span class="text-text-error font-medium"> *</span></label
      >
      <div class="flex items-center gap-2 pt-1.5">
        <input
          name="day"
          type="text"
          v-model="counselorStudentStore.onBoardingData.date_of_birth.day"
          placeholder="Day"
          @input="validateBirthDate"
          class="w-full bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 outline-none appearance-none text-text-base"
          data-hj-allow
        />
        <div class="min-w-[144px]">
          <BaseSelectRadio
            :options="months"
            v-model="counselorStudentStore.onBoardingData.date_of_birth.month"
            :isShadowDark="true"
            placeholder="Month"
            @onChange="onMonthChange"
          />
        </div>
        <input
          name="year"
          type="text"
          v-model="counselorStudentStore.onBoardingData.date_of_birth.year"
          placeholder="Year"
          @input="validateBirthYear"
          class="w-full bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
    <!-- phone name -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Phone number<span class="text-text-error font-medium"> *</span></label
      >
      <div class="">
        <input
          name="phone-name"
          type="text"
          v-model="counselorStudentStore.onBoardingData.phone_number"
          placeholder="Phone number"
          class="mt-1.5 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
    <!-- Email -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Email<span class="text-text-error font-medium"> *</span></label
      >
      <div class="">
        <input
          name="email"
          type="email"
          v-model="counselorStudentStore.onBoardingData.email"
          placeholder="Email"
          class="mt-1.5 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
    <!-- legal address -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Legal address<span class="text-text-error font-medium"> *</span></label
      >
      <div class="">
        <textarea
          name="address"
          v-model="counselorStudentStore.onBoardingData.legal_address"
          type="text"
          placeholder="Legal address"
          class="mt-1.5 bg-background-base-subtle resize-none rounded-lg border border-border-neutral-subtle py-3 px-4 w-full outline-none appearance-none text-text-base custom-scrollbar"
          data-hj-allow
        />
      </div>
    </div>
    <!-- current address -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Current address<span class="text-text-error font-medium">
          *</span
        ></label
      >
      <div class="">
        <textarea
          name="address"
          v-model="counselorStudentStore.onBoardingData.current_address"
          type="email"
          placeholder="Current address"
          :disabled="counselorStudentStore.sameAddress"
          class="mt-1.5 bg-background-base-subtle resize-none rounded-lg border border-border-neutral-subtle py-3 px-4 w-full outline-none appearance-none text-text-base custom-scrollbar disabled:opacity-70"
          data-hj-allow
        />
        <label
          for="address"
          class="w-fit cursor-pointer flex items-center gap-2"
        >
          <input
            type="checkbox"
            id="address"
            v-model="counselorStudentStore.sameAddress"
            @change="oldDress"
            class="appearance-none hidden"
          />
          <span
            class="size-6 border-2 rounded-md flex items-center justify-center"
            :class="[
              counselorStudentStore.sameAddress
                ? 'border-background-brand bg-background-brand'
                : 'border-border-neutral-subtle',
            ]"
          >
            <IconTick
              v-if="counselorStudentStore.sameAddress"
              stroke="#ffffff"
              width="16"
              height="16"
              strokeWidth="2"
            />
          </span>
          <span class="text-text-neutral-subtle text-sm">
            Same as legal address
          </span>
        </label>
      </div>
    </div>
    <!-- nationality -->
    <BaseSelectRadio
      label="Nationality"
      :options="countriesList"
      v-model="counselorStudentStore.onBoardingData.nationality"
      :isShadowDark="true"
      :required="true"
    />
    <!-- residency -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm pb-2.5 block">
        Permanent residency (applied or approved) in any country?<span
          class="text-text-error font-medium"
        >
          *</span
        >
      </label>
      <div class="flex gap-8 text-text-neutral-subtle font-medium">
        <label class="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            value="yes"
            v-model="counselorStudentStore.onBoardingData.permanent_residency"
            class="appearance-none hidden"
          />
          <div
            class="size-6 border-2 rounded-full flex items-center justify-center transition-all ease-in-out duration-200 shadow-2xl group-hover:outline outline-8"
            :class="[
              counselorStudentStore.onBoardingData.permanent_residency === 'yes'
                ? 'border-background-brand bg-background-brand group-hover:outline-background-brand-subtle-hovered'
                : 'border-border-neutral group-hover:outline-background-base-subtle-hovered',
            ]"
          >
            <span
              v-if="
                counselorStudentStore.onBoardingData.permanent_residency ===
                'yes'
              "
              class="size-[9px] min-w-[9px] rounded-full bg-white"
            />
          </div>
          <span>Yes</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            value="no"
            v-model="counselorStudentStore.onBoardingData.permanent_residency"
            class="appearance-none hidden"
          />
          <div
            class="size-6 border-2 rounded-full flex items-center justify-center transition-all ease-in-out duration-200 shadow-2xl group-hover:outline outline-8"
            :class="[
              counselorStudentStore.onBoardingData.permanent_residency === 'no'
                ? 'border-background-brand bg-background-brand group-hover:outline-background-brand-subtle-hovered'
                : 'border-border-neutral group-hover:outline-background-base-subtle-hovered',
            ]"
          >
            <span
              v-if="
                counselorStudentStore.onBoardingData.permanent_residency ===
                'no'
              "
              class="size-[9px] min-w-[9px] rounded-full bg-white"
            />
          </div>
          <span>No</span>
        </label>
      </div>
    </div>
    <!-- country -->
    <BaseSelectRadio
      v-if="counselorStudentStore.onBoardingData.permanent_residency === 'yes'"
      label="If yes, please name the country"
      :options="countriesList"
      v-model="counselorStudentStore.onBoardingData.residency_country_name"
      :isShadowDark="true"
      :required="true"
    />
    <!-- <div
      v-if="counselorStudentStore.onBoardingData.permanent_residency === 'yes'"
      class="remove-shadow-bg-white"
    >
      <label class="font-medium text-text-neutral-subtle text-sm"
        >If yes, please name the country<span
          class="text-text-error font-medium"
        >
          *</span
        ></label
      >
      <div>
        <input
          name="country"
          type="text"
          v-model="counselorStudentStore.onBoardingData.residency_country_name"
          placeholder="Enter country"
          class="mt-1.5 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div> -->
    <!-- passport -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Passport number (if applicable)</label
      >
      <div class="">
        <input
          name="passport-number"
          type="text"
          v-model="counselorStudentStore.onBoardingData.passport_number"
          placeholder="Passport number"
          class="mt-1.5 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import useCounselorStudentStore from "~/stores/counselorStudentStore";
import type { OptionAttributes } from "~/types/home";

const counselorStudentStore = useCounselorStudentStore();
const { showToast } = useToast();
const { api } = useApi();

const countriesList = ref<OptionAttributes[]>([]);
const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
const fullMonths = ["01", "03", "05", "07", "08", "10", "12"];

const oldDress = () => {
  if (counselorStudentStore.sameAddress) {
    counselorStudentStore.onBoardingData.current_address =
      counselorStudentStore.onBoardingData.legal_address;
  } else {
    counselorStudentStore.onBoardingData.current_address = "";
  }
};

const validateBirthDate = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  let value = input.value.replace(/[^0-9.]/g, "");
  const num = parseFloat(value);
  let limit = 31;
  const month = counselorStudentStore.onBoardingData.date_of_birth.month?.value;
  const year = counselorStudentStore.onBoardingData.date_of_birth.year;
  if (month && month === "02") {
    limit = 29;
    if (year && Number(year) % 4 !== 0) {
      limit = 28;
    }
  } else if (month && !fullMonths.includes(month)) {
    limit = 30;
  }
  if (!isNaN(num) && num >= 0 && num <= limit) {
    // Limit to 2 decimal places
    value = num.toFixed(value.includes(".") ? 2 : 0).replace(/\.00$/, "");
    input.value = value;
    counselorStudentStore.onBoardingData.date_of_birth.day = value;
  } else if (value === "") {
    counselorStudentStore.onBoardingData.date_of_birth.day = "";
  } else {
    // Remove last character if out of range
    value = value.slice(0, -1);
    input.value = value;
    counselorStudentStore.onBoardingData.date_of_birth.day = value;
  }
};

const validateBirthYear = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  let value = input.value.replace(/[^0-9.]/g, "");

  const currentYear = new Date().getFullYear();
  const num = parseFloat(value);
  if (!isNaN(num) && num >= 0 && num <= currentYear) {
    // Limit to 2 decimal places
    value = num.toFixed(value.includes(".") ? 2 : 0).replace(/\.00$/, "");
    input.value = value;
    counselorStudentStore.onBoardingData.date_of_birth.year = value;
  } else if (value === "") {
    counselorStudentStore.onBoardingData.date_of_birth.year = "";
  } else {
    // Remove last character if out of range
    value = value.slice(0, -1);
    input.value = value;
    counselorStudentStore.onBoardingData.date_of_birth.year = value;
  }
  const year = counselorStudentStore.onBoardingData.date_of_birth.year;
  const day = Number(counselorStudentStore.onBoardingData.date_of_birth.day);
  const month = counselorStudentStore.onBoardingData.date_of_birth.month?.value;
  if (
    year.length === 4 &&
    Number(year) % 4 !== 0 &&
    month === "02" &&
    day === 29
  ) {
    counselorStudentStore.onBoardingData.date_of_birth.day = "";
  }
};

const onMonthChange = () => {
  const day = Number(counselorStudentStore.onBoardingData.date_of_birth.day);
  const month = counselorStudentStore.onBoardingData.date_of_birth.month?.value;
  if (month === "02" && day > 29) {
    counselorStudentStore.onBoardingData.date_of_birth.day = "";
    return;
  }
  if (month && !fullMonths.includes(month) && day > 30) {
    counselorStudentStore.onBoardingData.date_of_birth.day = "";
  }
};

const setCountriesList = async () => {
  try {
    const response = await api.get(`/api/v2/openapi/countries`);
    if (response?.data.data) {
      countriesList.value = response.data.data.all_phone_codes.map(
        (item: { id: number; title: string }) => {
          return {
            value: item.id,
            label: item.title,
          };
        }
      );
      if (response.data.data.current_country_code) {
        counselorStudentStore.onBoardingData.nationality =
          countriesList.value.find(
            (item) => item.value === response.data.data.current_country_code.id
          ) || countriesList.value[0];
        counselorStudentStore.onBoardingData.residency_country_name =
          counselorStudentStore.onBoardingData.nationality;
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

watch(
  () => counselorStudentStore.onBoardingData.current_address,
  () => {
    if (
      counselorStudentStore.onBoardingData.current_address ===
      counselorStudentStore.onBoardingData.legal_address
    ) {
      counselorStudentStore.sameAddress = true;
    }
  }
);

onMounted(() => {
  setCountriesList();
});
</script>
