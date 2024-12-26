<template>
  <div
    class="relative h-screen flex justify-center py-8 px-5 lg:px-28 overflow-y-auto no-scrollbar"
    :class="{'items-center': windowHeight}"
  >
    <div class="fixed inset-0 -z-20">
      <NuxtImg
        src="/images/shared/background-image.png"
        class="size-full object-cover"
        alt="Background Image"
      />
    </div>
    <div
      class="bgGradient size-auto min-h-fit h-full max-h-[800px] w-[1200px] p-0.5 rounded-2xl flex"
    >
      <!-- Left Side -->
      <div
        class="w-full min-h-fit h-full lg:w-1/2 bg-[#1A1A1A] rounded-l-2xl rounded-r-2xl lg:rounded-r-none"
      >
        <div class="w-full p-6 flex flex-col" :class="[windowHeight ? 'h-full': steps === 'log_in' ? 'h-fit gap-16' : 'h-fit']">
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
              @setPhoneNumber="(value) => setPhoneNumber(value)"
              @setSelectedOption="(value) => setSelectedOption(value)"
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

const steps = ref<"log_in" | "otp_varification" | "reset_password">("log_in");
const selectedOption = ref<Country>();
const phoneNumber = ref<string>("");
const height = ref<number>(0);

const windowHeight = computed(() => {
  return height.value > 830;
});

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

const windowSize = () => {
  if (typeof window !== "undefined") {
    height.value = window.innerHeight;
  }
};

onMounted(() => {
  windowSize();
  window.addEventListener("resize", windowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", windowSize);
});
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
