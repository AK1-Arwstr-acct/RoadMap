<template>
    <div
      class="relative h-screen flex justify-center items-center py-8 px-5 lg:px-28"
    >
      <div class="fixed inset-0 -z-20">
        <NuxtImg
          src="/images/shared/background-image.png"
          class="size-full object-cover"
          alt="Background Image"
        />
      </div>
      <div
        class="bgGradient size-auto h-full max-h-[800px] w-[1200px] p-0.5 rounded-2xl flex"
      >
        <!-- Left Side -->
        <div
          class="w-full lg:w-1/2 bg-[#1A1A1A] rounded-l-2xl rounded-r-2xl lg:rounded-r-none overflow-hidden p-6 flex flex-col gap-6"
        >
          <div>
            <NuxtImg
              class="w-[164px] invert"
              src="/images/logo/logo.svg"
              alt="Logo"
            />
          </div>
          <div class="flex-1">
            <!-- steps -->
            <LogInByPhoneNumber
              v-if="steps === 'log_in'"
              @setPhoneNumber="(value)=>setPhoneNumber(value)"
              @setSelectedOption="(value)=>setSelectedOption(value)"
            />
            <RecoverPassword
              v-else-if="steps === 'otp_varification'"
              :phoneNumber="phoneNumber"
              :selectedOption="selectedOption"
              @goBack="steps = 'log_in'"
              @OtpConfirm="OtpConfirm"
            />
            <ResetPassword v-else @newPassword="steps = 'log_in'" />
          </div>
        </div>
        <!-- Right side  -->
        <div class="hidden lg:block lg:w-1/2 rounded-r-2xl overflow-hidden">
          <RightSideInformation />
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import type { Country } from "~/types/signUp";
  
  const steps = ref<"log_in" | "otp_varification" | "reset_password">(
    "log_in"
  );
  const selectedOption = ref<Country>();
  const phoneNumber = ref<string>("");
  
  const setSelectedOption = (selectedCountry: Country) => {
    selectedOption.value = selectedCountry;
  };
  const setPhoneNumber = (Number: string) => {
    phoneNumber.value = Number;
    steps.value = "otp_varification";
  };
  const OtpConfirm = () => {
    steps.value = "reset_password";
  };
  </script>
  
  <style scoped>
  .bgGradient {
    background: radial-gradient(
        68.44% 78.44% at 10% 141.23%,
        #ffffff 17.18%,
        rgba(57, 54, 178, 0) 100%
      ),
      radial-gradient(
        97.99% 85.4% at 10% -15.14%,
        rgba(255, 255, 255) 10.18%,
        rgba(26, 26, 26, 0.3) 76.45%
      );
  }
  </style>
  