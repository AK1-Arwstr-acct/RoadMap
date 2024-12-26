<template>
  <div class="size-full flex items-center">
    <div class="flex flex-col gap-6 w-full">
      <div>
        <h1
          class="text-6xl md:text-[72px] md:leading-[80px] text-[#9C99FF] font-semibold mb-3"
        >
          Log in
        </h1>
      </div>
      <!-- input -->
      <div class="flex flex-col gap-6">
        <div class="relative">
          <label class="uppercase font-semibold text-[#E2E6FF] mb-1.5">
            Phone number
          </label>
          <div
            class="remove-shadow relative border-b border-[#D0D5DD] outline-none flex items-center gap-2 py-2"
            tabindex="0"
          >
            <div class="flex gap-3 items-center justify-center">
              <div
                class="flex justify-between items-center cursor-pointer rounded bg-[#212121] px-1 py-2 gap-1"
                @click="isDropdownOpen = !isDropdownOpen"
                @touchstart.prevent="isDropdownOpen = !isDropdownOpen"
              >
                <div>
                  <img
                    v-if="selectedOption"
                    :src="selectedOption?.flag"
                    :alt="`${selectedOption?.title}_flag_selected`"
                    class="min-h-6 min-w-6 h-6 w-6"
                  />
                  <div v-else class="min-w-6 min-h-6">
                    <IconSpinner
                      class="animate-spin"
                      height="24"
                      width="24"
                      bgColor="white"
                      stroke="#5836F5"
                    />
                  </div>
                </div>
                <IconChevronDown
                  width="16"
                  height="16"
                  stroke="#C5C5C5"
                  class="transition-all ease-in-out duration-200"
                  :class="{ 'transform rotate-180': isDropdownOpen }"
                />
              </div>
              <div
                :class="[
                  phoneNumber.length > 0 ? 'text-[#ffffff]' : 'text-[#999999]',
                ]"
              >
                ({{ selectedOption?.phone_code || "-" }})
              </div>
            </div>
            <Transition name="fade">
              <div
                class="absolute left-0 bottom-[52px] w-full border border-[#e0e0e0] bg-white z-20 max-h-[250px] overflow-y-auto rounded-lg"
                v-if="isDropdownOpen"
                v-click-outside="closeDropdown"
              >
                <!-- <div class="border-b border-[#E0E0E0] p-2 sticky -top-0.5 sm:top-0 bg-white flex gap-[5px]">
                           <IconSearch />
                           <input type="text" placeholder="Search for country" v-model="search"
                               class="w-full outline-none" />
                       </div> -->
                <div
                  v-for="country in countryCodes"
                  :key="country.id"
                  class="flex gap-1 items-center cursor-pointer hover:bg-[#F1F5F9] p-2 rounded-md active:bg-[#CBD5E1]"
                  @click="selectCountry(country)"
                >
                  <div>
                    <img
                      :src="country.flag"
                      :alt="`${country.title}_flag`"
                      class="h-6 w-6"
                    />
                  </div>
                  <div class="text-[#667085] text-sm">
                    {{ country.title }} ({{ country.phone_code }})
                  </div>
                </div>
              </div>
            </Transition>
            <input
              name="phoneNumber"
              inputmode="numeric"
              @input="(event) => validateNumber(event)"
              autofocus
              class="w-full pr-4 py-2 outline-none text-white bg-transparent placeholder:text-[#999999]"
              placeholder="000-000-000"
            />
          </div>
        </div>
        <div>
          <div class="remove-shadow">
            <label class="uppercase font-medium text-[#E2E6FF]">PASSWORD</label>
            <div class="relative">
              <input
                name="userName"
                :type="isPassword ? 'password' : 'text'"
                v-model="password"
                class="bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
              />
              <div @click="isPassword = !isPassword" class="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer py-1 pl-1">
              <IconCloseEye />
            </div>
            </div>
          </div>
        </div>
      </div>
      <!-- button -->
      <div>
        <button
          @click="onSubmit"
          type="submit"
          class="w-full disabled:bg-opacity-60 bg-[#8380FF] text-white rounded-lg font-medium p-3 flex text-xl gap-2 justify-center items-center"
        >
          <BaseSpinner v-if="isSubmitting" color="#FFFFFF" />
          Log in
        </button>
        <p class="text-[#AEAEAE] mt-3">
          Forgot your password?
          <button
            :disabled="phoneNumber.length < 5"
            @click="reset"
            class="text-[#8380FF] cursor-pointer underline disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Country } from "~/types/signUp";

const emits = defineEmits(["setPhoneNumber", "setSelectedOption"]);

const { api } = useApi();

const isPassword = ref<boolean>(true);
const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<Country | null>(null);
const countryOptions = ref<Country[]>([]);
const search = ref<string>("");
const phoneNumber = ref<string>("");
const password = ref<string>("");
const isSubmitting = ref<boolean>(false);

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const countryCodes = computed(() => {
  if (search.value) {
    return countryOptions.value.filter((item) => {
      return item.title.toLowerCase().includes(search.value.toLowerCase());
    });
  } else {
    return countryOptions.value;
  }
});

const selectCountry = (country: Country) => {
  isDropdownOpen.value = false;
  selectedOption.value = country;
};

const validateNumber = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  const value = input.value;

  const regex = /^[0-9 ]+$/;
  const cleanedValue = value.replace(/\s+/g, "");

  if (regex.test(value)) {
    input.value = value;
  } else {
    input.value = value.slice(0, -1);
  }
  phoneNumber.value = cleanedValue;
};

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    if (selectedOption.value?.id) {
      emits("setSelectedOption", selectedOption.value);
    }
    // code to verify correct password
    navigateTo("ai-introduction");
    isSubmitting.value = false;
  } catch (error) {
    isSubmitting.value = false;
    // setErrors({ phoneNumber: "Phone number is not valid" });
  }
};

const reset = () => {
  if (selectedOption.value?.id) {
    emits("setSelectedOption", selectedOption.value);
  }
  emits("setPhoneNumber", phoneNumber.value);
  // const response = await api.post(`/send_otp`, {
  //   msisdn: `${selectedOption.value?.phone_code ?? ""}${
  //     phoneNumber.value ?? ""
  //   }`,
  //   id: selectedOption.value?.id,
  // });
};

const getCountries = async () => {
  try {
    const response = await api.get(`/country_codes`);
    countryOptions.value = response.data.data.all_phone_codes;
    selectedOption.value = response.data.data.current_country_code;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getCountries();
});
</script>
