<template>
  <div class="space-y-5">
    <div class="flex flex-col items-center gap-5">
      <IconMessageRound />
      <div class="text-center space-y-3">
        <h1 class="font-semibold text-lg text-[#181D27]">
          {{ $t("otp.check_sms") }}
        </h1>
        <p class="text-[#535862] text-sm">
          {{ $t("otp.sent_code") }} {{ userInput }}
        </p>
      </div>
    </div>
    <div class="">
      <form @submit.prevent="onSubmit">
        <div class="flex flex-col gap-8">
          <div class="relative">
            <OtpInput
              :key="inputKey"
              class="flex gap-3"
              :input-classes="inputclasses"
              inputType="number"
              :num-inputs="4"
              inputmode="numeric"
              v-model:value="otp"
              :should-auto-focus="true"
              :should-focus-order="true"
              :placeholder="['-', '-', '-', '-']"
              @on-change="handleOnChange"
              @keydown="blockNonNumeric"
            />
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
              :disabled="otp.length !== 4 || isSubmitting"
              class="cursor-pointer disabled:cursor-default disabled:opacity-70 w-full focus:outline-none bg-[#1570EF] text-white rounded-lg font-semibold py-[10px] flex gap-2 justify-center items-center transition-all ease-in-out duration-200"
            >
              <IconSpinner v-if="isSubmitting" />
              {{ $t("otp.verify") }}
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
import OtpInput from "vue3-otp-input";
import useAppStore from "~/stores/AppStore";
import type { Country, UserSignupDetail } from "~/types/auth";

const props = defineProps({
  userInput: {
    type: String,
    default: "",
  },
  selectedOption: {
    type: Object as PropType<Country>,
  },
});

const { api } = useApi();
const { showToast } = useToast();
const localePath = useLocalePath();
const route = useRoute();
const appStore = useAppStore();

const otp = ref<string>("");
const isValid = ref<boolean>(true);
const isSubmitting = ref<boolean>(false);
const timeLeft = ref<number>(30);
const inputKey = ref<number>(0);
const submitButton = ref<HTMLElement | null>(null);

const inputclasses = computed(() => {
  return [
    "focus:caret-transparent text-[#1570EF] text-5xl placeholder:text-5xl text-center focus:placeholder:text-[#1570EF] w-16 h-16 md:w-20 md:h-20 rounded-[10px] outline-none focus:border-[#84CAFF] focus:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_0px_0px_4px_rgba(132,202,255,0.24)] transition-all ease-in-out duration-200",
    isValid.value
      ? "border-[1.5px] border-[#D0D5DD] text-[#9CA3AF]"
      : "border-2 border-[#F76369] placeholder:text-[#F76369] text-[#F76369]",
  ].join(" ");
});

const blockNonNumeric = (event: KeyboardEvent) => {
  const key = event.key;
  if (!/^\d$/.test(key)) {
    event.preventDefault();
  }
};

const handleOnChange = () => {
  isValid.value = true;
};

const timer = async () => {
  try {
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
      await api.post(`/api/v1/send_otp`, {
        msisdn: props.userInput,
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
    const userDetail: UserSignupDetail | null =
      (useCookie("signupInfo").value as unknown as UserSignupDetail) || null;
    if (!userDetail && !route.query.email) {
      navigateTo(localePath("/signup"));
      return;
    }

    isSubmitting.value = true;
    const otpResponse = await api.post(`/api/v2/validate_otp`, {
      msisdn: props.userInput,
      otp_code: otp.value,
    });

    const checkToken = useCookie("token");
    if (checkToken.value) {
      checkToken.value = null;
    }

    const response = await api.post("/api/v1/sign-up", {
      name: route.query.name ? route.query.name : userDetail.name,
      email: route.query.email ? route.query.email : userDetail.email,
      password: route.query.socialId ? null : userDetail.password,
      socialId: route.query.socialId ? route.query.socialId : null,
      verify_token: otpResponse.data.data.verify_token,
      msisdn: props.userInput,
      country_id: props.selectedOption?.id || null,
    });

    const token = useCookie("token", {
      httpOnly: false,
      secure: true,
      maxAge: 604800,
    });
    token.value = response.data.token;
    const signupInfoCookie = useCookie("signupInfo");
    signupInfoCookie.value = null;
    await nextTick();
    appStore.getUserData();
    navigateTo(localePath("/onboarding"));
    isSubmitting.value = false;
  } catch (error) {
    isSubmitting.value = false;
    inputKey.value += 1;
    otp.value = "";
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
