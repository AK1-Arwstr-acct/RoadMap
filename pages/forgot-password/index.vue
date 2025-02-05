<template>
  <div
    class="h-screen min-h-fit w-full flex justify-center items-center p-5 pt-24 pb-16"
  >
    <InputNumber
      v-if="steps === 'input_number'"
      @getCode="getCode"
      @setSelectedCountry="setSelectedCountry"
    />
    <VerifyNumber
      v-else-if="steps === 'verify_number'"
      :phoneNumber="phoneNumber"
      :selectedOption="selectedOption"
      @verifyNumber="verifyNumber"
    />
    <UpdatePassword v-else :verificationToken="verificationToken" />
  </div>
</template>
<script setup lang="ts">
import type { Country } from "~/types/auth";

definePageMeta({
  layout: "main-layout",
});

const steps = ref<"input_number" | "verify_number" | "update_password">(
  "input_number"
);

const phoneNumber = ref<string>("");
const verificationToken = ref<string>("");
const selectedOption = ref<Country>();

const getCode = (value: string) => {
  phoneNumber.value = value;
  steps.value = "verify_number";
};
const setSelectedCountry = (value: Country) => {
  selectedOption.value = value;
};

const verifyNumber = (value: string) => {
  verificationToken.value = value;
  steps.value = "update_password";
};
</script>
