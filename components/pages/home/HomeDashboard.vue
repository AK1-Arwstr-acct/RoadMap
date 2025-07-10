<template>
  <div class="flex flex-col md:flex-row gap-6 w-full">
    <!-- Left Card: Stepper -->
    <AuthStepper v-if="appStore.authenticatedUser || tokenExists" />
    <PublicStepper v-else />

    <!-- Right Card: Calendar -->
    <div
      class="bg-white border border-[#00000033] rounded-xl p-6 w-full opacity-55"
    >
      <div class="flex items-center justify-between">
        <div
          class="text-xs font-semibold text-[#2563EB] uppercase tracking-wide"
        >
          {{ $t("homepage.your_calendar") }}
        </div>
        <span
          class="bg-[#E5E5E5] text-[#4B5563] text-xs font-semibold rounded-md px-2 py-0.5"
          >{{ $t("homepage.coming_soon") }}</span
        >
      </div>
      <div class="text-lg font-semibold text-[#111827]">
        {{ $t("homepage.application_process") }}
      </div>
      <ul class="flex flex-col gap-4 mt-6">
        <li class="flex items-center gap-4">
          <div class="flex flex-col items-center">
            <div
              class="bg-[#FDF2F8] border-l-4 border-[#BE185D] p-3 py-1 text-center"
            >
              <div
                class="text-[#BE185D] text-2xl md:text-[32px] font-semibold leading-none"
              >
                21
              </div>
              <div
                class="text-sm md:text-base text-[#BE185D] font-semibold -mt-1"
              >
                JUN
              </div>
            </div>
          </div>
          <div>
            <div class="font-semibold text-sm md:text-base text-[#111827]">
              {{ $t("homepage.finalize_extracurricular_activity") }}
            </div>
          </div>
        </li>
        <li class="flex items-center gap-4">
          <div class="flex flex-col items-center">
            <div
              class="bg-[#FAF5FF] border-l-4 border-[#7E22CE] p-3 py-1 text-center"
            >
              <div
                class="text-[#7E22CE] text-2xl md:text-[32px] font-semibold leading-none"
              >
                01
              </div>
              <div
                class="text-sm md:text-base text-[#7E22CE] font-semibold -mt-1"
              >
                JUL
              </div>
            </div>
          </div>
          <div>
            <div class="font-semibold text-sm md:text-base text-[#111827]">
              {{ $t("homepage.essay_outline_review_with_mentor") }}
            </div>
            <div class="text-[#111827]">10:00 - 11:00</div>
          </div>
        </li>
        <li class="flex items-center gap-4">
          <div class="flex flex-col items-center">
            <div
              class="bg-[#EEF2FF] border-l-4 border-[#4338CA] p-3 py-1 text-center"
            >
              <div
                class="text-[#4338CA] text-2xl md:text-[32px] font-semibold leading-none"
              >
                21
              </div>
              <div
                class="text-sm md:text-base text-[#4338CA] font-semibold -mt-1"
              >
                JUL
              </div>
            </div>
          </div>
          <div>
            <div class="font-semibold text-sm md:text-base text-[#111827]">
              {{ $t("homepage.send_essay_draft") }}
            </div>
            <div class="text-[#111827]">10:00</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import useSchoolListStore from "~/stores/SchoolListStore";
import useAppStore from "~/stores/AppStore";

const schoolListStore = useSchoolListStore();
const appStore = useAppStore();
const localePath = useLocalePath();

const tokenExists = useCookie("token");
</script>
