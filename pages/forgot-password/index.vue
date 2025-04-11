<template>
  <div
    class="min-h-svh w-full flex justify-center items-center p-5 pt-24 pb-16"
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

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${locale.value !== "en" ? `/${locale.value}` : ""}/forgot-password`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/forgot-password`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/forgot-password`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/forgot-password`,
        hreflang: "x-default",
      },
    ],
  }))
);

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
