<template>
  <div
    class="min-h-svh w-full flex justify-center items-center px-5 pt-24 pb-16"
  >
    <AddPhoneNumber
      v-if="steps === 'inputPhoneNumber'"
      @verifyPhoneNumber="verifyPhoneNumber"
      @setSelectedCountry="setSelectedCountry"
    />
    <OtpVerification
      v-else
      :userInput="phoneNumber"
      :selectedOption="selectedOption"
    />
  </div>
</template>
<script setup lang="ts">
import type { Country } from "~/types/auth";

definePageMeta({
  layout: "main-layout",
  middleware: "verify-data"
});

const steps = ref<"inputPhoneNumber" | "otpVerification">("inputPhoneNumber");
const phoneNumber = ref<string>("");
const selectedOption = ref<Country>();

const verifyPhoneNumber = (phone: string) => {
  phoneNumber.value = phone;
  steps.value = "otpVerification";
};

const setSelectedCountry = (value: Country) => {
  selectedOption.value = value;
};
</script>
