<template>
  <div class="flex flex-col gap-8 mt-12">
    <div>
      <div class="mb-8 md:mb-6">
        <p class="text-[#AEAEAE] mb-3">
          Wrong phone number?
          <span
            class="text-[#9CA2FF] underline cursor-pointer"
            @click="emits('goBack')"
            >Go back</span
          >
        </p>
        <h1
          class="text-6xl lg:text-[72px] md:leading-[80px] font-semibold mb-3 text-white"
        >
          <span class="text-[#7975FF]">OTP</span> <br />
          Verification
        </h1>
        <p class="text-[#AEAEAE]">
          We sent an OTP to your phone number<br class="lg:hidden" />
          <span class="text-[#9CA2FF]"
            >({{ selectedOption?.phone_code }}) {{ phoneNumber }}</span
          >
        </p>
      </div>
      <div>
        <div class="relative">
          <OtpInput
            :key="inputKey"
            class="flex gap-3 md:gap-2 w-full"
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
          <p
            v-if="!isValid"
            class="text-[#F76369] mt-1 font-semibold absolute left-1/2 transform -translate-x-1/2"
          >
            OTP invalid
          </p>
        </div>
      </div>
    </div>
    <div>
      <button
        @click="onSubmit"
        type="submit"
        :disabled="otp.length !== 4 || isSubmitting"
        class="cursor-pointer disabled:opacity-70 w-full text-xl bg-[#8380FF] text-[#F3F3F3] rounded-lg font-semibold py-3 flex gap-2 justify-center items-center transition-all ease-in-out duration-200"
      >
        <BaseSpinner v-if="isSubmitting" color="#FFFFFF" />
        Continue
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import OtpInput from "vue3-otp-input";
//   import useAuthStore from "~/stores/authStore";
import type { Country } from "~/types/signUp";

const props = defineProps({
  phoneNumber: {
    type: String,
  },
  selectedOption: {
    type: Object as PropType<Country>,
  },
});

const emits = defineEmits<{
//   (e: "setAccess"): void;
  (e: "goBack"): void;
  (e: "OtpConfirm"): void;
}>();

const { api } = useApi();
//   const authStore = useAuthStore();

const otp = ref<string>("");
const isValid = ref<boolean>(true);
const isSubmitting = ref<boolean>(false);
const inputKey = ref<number>(0);

const inputclasses = computed(() => {
  return [
    "focus:caret-transparent border-b-2 focus:text-[#5836F5] bg-transparent text-[64px] rounded-none placeholder:text-5xl text-center focus:placeholder:text-[#5836F5] w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-200",
    isValid.value
      ? "border-[#D0D5DD] text-[#9CA3AF]"
      : "border-[#F76369] placeholder:text-[#F76369] text-[#F76369]",
  ].join(" ");
});

const handleOnChange = () => {
  isValid.value = true;
};
const blockNonNumeric = (event: KeyboardEvent) => {
  const key = event.key;
  if (!/^\d$/.test(key)) {
    event.preventDefault();
  }
};

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    emits('OtpConfirm')
    // const response = await api.post(`/validate_otp`, {
    //   msisdn: `${props.selectedOption?.phone_code ?? ""}${
    //     props.phoneNumber ?? ""
    //   }`,
    //   otp_code: otp.value,
    // });

    //   const token = useCookie("token", {
    //     httpOnly: false,
    //     secure: true,
    //     maxAge: 86400,
    //   });
    //   token.value = response.data.data.token;

    //   authStore.oldUser = response.data.data.oldUser;
    //   authStore.uniqueId = response.data.data.uniqueId;
    //   emits("setAccess");

    // We need to add this timeout so user don't feel that loader is stopped but I haven't yet navigated to homepage
    // setTimeout(() => {
    //   isSubmitting.value = false;
    // }, 700);
  } catch (error) {
    isSubmitting.value = false;
    inputKey.value += 1;
    otp.value = "";
    isValid.value = false;
    console.error(error);
  }
};
</script>
