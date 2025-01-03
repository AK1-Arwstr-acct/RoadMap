<template>
  <div class="h-screen w-screen overflow-x-hidden no-scrollbar">
    <div class="size-full flex h-full min-h-fit">
      <!-- Left Side -->
      <div
        class="w-1/2 min-h-full bg-[#14125C] text-[#F3F3F3] relative isolate hidden lg:flex flex-col"
      >
        <div class="absolute inset-0 -z-10">
          <NuxtImg
            v-if="steps === 'profile_information'"
            src="/images/shared/gradient-bg-red.png"
            class="size-full object-cover object-left-bottom"
            alt="Background Image"
          />
          <NuxtImg
            v-else-if="steps === 'country_selection'"
            src="/images/shared/gradient-bg-green.png"
            class="size-full object-cover object-left-bottom"
            alt="Background Image"
          />
          <NuxtImg
            v-else
            src="/images/shared/gradient-bg-blue.png"
            class="size-full object-cover object-left-bottom"
            alt="Background Image"
          />
        </div>
        <!-- <div class="w-full h-4 bg-gradient-to-r from-[#8380FF] to-[#ADB2FF]" /> -->
        <div class="pl-12 pt-8">
          <NuxtImg class="w-[164px]" src="/images/logo/logo.svg" alt="Logo" />
        </div>
        <div class="mt-6 flex-1 flex items-center px-12">
          <div class="w-full -mt-10">
            <div
              class="py-1 px-2 rounded-full w-fit font-semibold"
              :class="[
                steps === 'profile_information'
                  ? 'text-[#5C2C08] bg-[#FFAF38]'
                  : steps === 'country_selection'
                  ? 'text-[#07422A] bg-[#36C453]'
                  : 'text-[#0E265C] bg-[#63B3FF]',
              ]"
            >
              Question
              {{
                steps === "profile_information"
                  ? "1"
                  : steps === "country_selection"
                  ? "2"
                  : "3"
              }}
            </div>
            <h1
              class="text-7xl leading-[80px] font-semibold"
              v-html="displayQuestion"
            />
          </div>
        </div>
      </div>
      <!-- Right side  -->
      <div class="w-full lg:w-1/2 h-full min-h-fit bg-[#1A1A1A] text-[#F3F3F3]">
        <div class="flex flex-col w-full h-full min-h-fit">
          <NuxtImg
            class="w-[164px] lg:hidden p-6"
            src="/images/logo/logo.svg"
            alt="Logo"
          />
          <div class="flex-1">
            <ProfileInformation
              v-if="steps === 'profile_information'"
              @onSubmit="updateProfileInfo"
            />
            <CountrySelection
              v-else-if="steps === 'country_selection'"
              @onSubmit="updateCountrySelection"
              @backStep="backStep"
            />
            <ProcessSelection v-else @onSubmit="updateProcessSelection" @backStep="backStep" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ProfileInformationAnswers } from "~/components/pages/home/ProfileInformation.vue";
import type { FormData } from "~/types/home";

const steps = ref<"profile_information" | "country_selection" | "your_process">(
  "profile_information"
);
const formData = ref<FormData>({
  budget: null,
  grade: null,
  gpa: "",
  ielts: null,
  countries: [],
  process: "",
});

const displayQuestion = computed(() => {
  return steps.value === "profile_information"
    ? "Profile<br/>Information"
    : steps.value === "country_selection"
    ? "Select<br/>countries"
    : "Your process";
});

const backStep = () => {
  if (steps.value === "country_selection") {
    steps.value = "profile_information";
  } else if (steps.value === "your_process") {
    steps.value = "country_selection";
  }
};

const updateProfileInfo = (data: ProfileInformationAnswers) => {
  steps.value = "country_selection";
  formData.value.budget = data.selectedBudget;
  formData.value.grade = data.selectedGrade;
  formData.value.ielts = data.ielts;
  formData.value.gpa = data.gpa;
};
const updateCountrySelection = (selectedCountries: string[]) => {
  steps.value = "your_process";
  formData.value.countries = selectedCountries;
};
const updateProcessSelection = (item: string) => {
  formData.value.process = item;
  sessionStorage.setItem("formData", JSON.stringify(formData.value));
  navigateTo("/roadmap");
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
