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

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${locale.value !== "en" ? `/${locale.value}` : ""}/verify-phone`;

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
