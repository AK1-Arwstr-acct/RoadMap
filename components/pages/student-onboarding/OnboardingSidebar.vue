<template>
  <div class="size-full bg-background-brand-hovered">
    <div class="size-full px-10 py-20 flex flex-col gap-6">
      <div>
        <img
          src="/images/countries-application.png"
          alt="application"
          class="w-full max-w-[264px]"
        />
      </div>
      <div class="flex flex-col gap-8">
        <div class="text-text-constant-white">
          <p class="font-semibold text-2xl leading-9">
            {{ $t("student_onboarding.sidebar.welcome") }}
            {{ appStore.userData?.name }} 👋
          </p>
          <p class="leading-7">
            {{ $t("student_onboarding.sidebar.onboarding_message") }}
          </p>
        </div>
        <!-- stepper -->
        <div class="flex flex-col">
          <div
            v-for="(step, idx) in steps"
            :key="idx + 1"
            class="flex items-center gap-4"
            :class="{
              'opacity-60': idx + 1 > counselorStudentStore.onboardingStep,
            }"
          >
            <!-- Step circle and connector -->
            <div class="flex flex-col items-center">
              <div
                :class="[
                  'size-8 min-w-8 flex items-center justify-center rounded-full text-sm text-text-brand-bold font-semibold relative',
                  idx + 1 < counselorStudentStore.onboardingStep
                    ? 'bg-background-success'
                    : 'bg-white',
                ]"
              >
                <IconTick
                  v-if="idx + 1 < counselorStudentStore.onboardingStep"
                  stroke="#ffffff"
                  width="16"
                  height="16"
                />
                <span v-else>
                  {{ idx + 1 }}
                </span>
                <!-- line -->
                <div
                  v-if="idx < steps.length - 1"
                  class="w-px h-5 bg-border-neutral-subtle absolute top-9 left-1/2 transform -translate-x-1/2"
                  :class="{
                    'opacity-60':
                      idx + 1 >= counselorStudentStore.onboardingStep,
                  }"
                ></div>
              </div>
            </div>
            <!-- Step label -->
            <div class="text-text-constant-white py-4 font-semibold leading-7">
              {{ step }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();
const appStore = useAppStore();
const { t } = useI18n();

const steps = ref<string[]>([
  t("student_onboarding.sidebar.student_information"),
  t("student_onboarding.sidebar.family_travel_and_financial_records"),
  t("student_onboarding.sidebar.contract_details"),
  t("student_onboarding.sidebar.schedule_first_meeting"),
]);
</script>
