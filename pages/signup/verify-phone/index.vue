<template>
  <div class="h-svh w-full flex items-center px-5 py-8 overflow-y-auto custom-scrollbar">
    <div class="m-auto">
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
  </div>
</template>
<script setup lang="ts">
import type { Country } from "~/types/auth";

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/verify-phone`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/verify-phone`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/verify-phone`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/verify-phone`,
        hreflang: "x-default",
      },
    ],
  }))
);

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
