<template>
  <div class="space-y-5">
    <div class="flex flex-col items-center gap-5">
      <IconArrowsterLogo />
      <div class="text-center space-y-3">
        <h1 class="font-semibold text-3xl text-[#181D27]">
          {{ $t("forgotPassword.forgot_password") }}
        </h1>
        <p class="text-[#535862] text-sm">
          {{ $t("forgotPassword.please_check_sms") }}<br />
          {{ $t("forgotPassword.we_sent_code_to") }} {{ phoneNumber }} <br />{{
            $t("forgotPassword.enter_code_to_reset_password")
          }}
        </p>
      </div>
    </div>
    <div class="">
      <form @submit.prevent="onSubmit">
        <div class="flex flex-col gap-6">
          <div class="relative">
            <BaseOtpInput v-model:model-value="otp" :isOtpValid="isValid" />
            <div
              class="text-sm text-gray-600 text-center flex gap-1 justify-center mt-5"
            >
              <p>{{ $t("otp.did_not_get_code") }}</p>
              <button
                v-if="timeLeft === 30"
                @click="timer"
                type="button"
                class="underline"
              >
                {{ $t("otp.click_to_resend") }}
              </button>
              <p v-else>00:{{ timeLeft.toString().padStart(2, "0") }}</p>
            </div>
          </div>
          <div>
            <button
              ref="submitButton"
              @keydown.enter="onSubmit"
              type="submit"
              @click="onSubmit"
              :disabled="!isValidOtp || isSubmitting"
              class="cursor-pointer disabled:cursor-default disabled:opacity-70 w-full focus:outline-none bg-[#1570EF] text-white rounded-lg font-semibold py-[10px] flex gap-2 justify-center items-center transition-all ease-in-out duration-200"
            >
              {{ $t("otp.verify") }}
              <IconSpinner class="size-5" v-if="isSubmitting" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { PropType } from "vue";
import type { Country } from "~/types/auth";

const emits = defineEmits(["verifyNumber"]);

const props = defineProps({
  phoneNumber: {
    type: String,
    default: "",
  },
  selectedOption: {
    type: Object as PropType<Country>,
  },
});

const { api } = useApi();
const { showToast } = useToast();

const otp = ref<string[]>(["-", "-", "-", "-"]);
const isValid = ref<boolean>(true);
const isSubmitting = ref<boolean>(false);
const timeLeft = ref<number>(30);
const inputKey = ref<number>(0);
const submitButton = ref<HTMLElement | null>(null);

const isValidOtp = computed(() => {
  return otp.value.every((digit) => /^\d$/.test(digit));
});

const timer = async () => {
  try {
    otp.value = ["-", "-", "-", "-"];
    if (timeLeft.value === undefined || timeLeft.value === 0) {
      timeLeft.value = 30;
    }

    timeLeft.value -= 1;
    const timerInterval = setInterval(() => {
      timeLeft.value -= 1;

      if (timeLeft.value === 0) {
        clearInterval(timerInterval);
        timeLeft.value = 30;
      }
    }, 1000);

    try {
      await api.post(`/api/v1/reset-password`, {
        msisdn: props.phoneNumber,
        id: props.selectedOption?.id,
      });
    } catch (apiError) {
      showToast("Something went wrong while sending OTP", {
        type: "error",
      });
      clearInterval(timerInterval);
      timeLeft.value = 30;
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    const response = await api.post(`/api/v1/otp-verify`, {
      msisdn: props.phoneNumber,
      otp_code: otp.value.join(""),
    });
    emits("verifyNumber", response.data.sessionId);
    isSubmitting.value = false;
  } catch (error) {
    isSubmitting.value = false;
    inputKey.value += 1;
    otp.value = ["-", "-", "-", "-"];
    isValid.value = false;
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
    console.error(error);
  }
};

watch(
  () => otp.value,
  (newValue) => {
    if (newValue.length === 4) {
      submitButton.value?.focus();
    }
  },
  { flush: "post" }
);
</script>
