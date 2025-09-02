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
          @input=""
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
          @input=""
          placeholder="Day"
          class="w-full bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 outline-none appearance-none text-text-base"
          data-hj-allow
        />
        <div class="min-w-[144px]">
          <BaseSelectRadio
            :options="months"
            v-model="counselorStudentStore.onBoardingData.date_of_birth.month"
            :isShadowDark="true"
            placeholder="Month"
          />
        </div>
        <input
          name="year"
          type="text"
          v-model="counselorStudentStore.onBoardingData.date_of_birth.year"
          @input=""
          placeholder="Year"
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
          @input=""
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
          @input=""
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
          @input=""
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
          @input=""
          placeholder="Current address"
          class="mt-1.5 bg-background-base-subtle resize-none rounded-lg border border-border-neutral-subtle py-3 px-4 w-full outline-none appearance-none text-text-base custom-scrollbar"
          data-hj-allow
        />
        <label
          for="address"
          class="w-fit cursor-pointer flex items-center gap-2"
        >
          <input
            type="checkbox"
            id="address"
            v-model="sameAddress"
            @change="oldDress"
            class="appearance-none hidden"
          />
          <span
            class="size-6 border-2 rounded-md flex items-center justify-center"
            :class="[
              sameAddress
                ? 'border-background-brand bg-background-brand'
                : 'border-border-neutral-subtle',
            ]"
          >
            <IconTick
              v-if="sameAddress"
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
      :options="tempOptions"
      v-model="counselorStudentStore.onBoardingData.residency_country_name"
      :isShadowDark="true"
      :required="true"
    />
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
          @input=""
          placeholder="Passport number"
          class="mt-1.5 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";
import IconUK from "~/components/icons/IconUK.vue";
import IconCanada from "~/components/icons/IconCanada.vue";
import IconAustralia from "~/components/icons/IconAustralia.vue";
import IconUS from "~/components/icons/IconUS.vue";
import IconEurope from "~/components/icons/IconEurope.vue";
import type { CountriesOptionAttributes } from "~/types/home";

const counselorStudentStore = useCounselorStudentStore();

const sameAddress = ref<boolean>(false);

const tempOptions = [
  {
    label: "temp",
    value: "temp",
  },
  {
    label: "temp",
    value: "temp",
  },
  {
    label: "temp",
    value: "temp",
  },
];

const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const countriesList : CountriesOptionAttributes[] = [
  { value: [92], label: "United Kingdom" },
  { value: [156], label: "Canada" },
  { value: [182], label: "United States" },
  {
    value: [67, 68, 62, 63, 88, 78, 191, 80, 90],
    label: "Europe",
  },
  { value: [185], label: "Australia" },
];

const oldDress = () => {
  if (sameAddress.value) {
    counselorStudentStore.onBoardingData.current_address =
      counselorStudentStore.onBoardingData.legal_address;
  } else {
    counselorStudentStore.onBoardingData.current_address = "";
  }
};
</script>
