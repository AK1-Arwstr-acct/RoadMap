<template>
  <div class="flex flex-col md:flex-row gap-6 w-full">
    <!-- Left Card: Stepper -->
    <div
      class="bg-white border border-[#00000033] rounded-xl px-4 py-6 w-full md:max-w-[343px]"
    >
      <div class="px-2">
        <p class="text-xs font-semibold text-[#2563EB] uppercase tracking-wide">
          Finishing set-up
        </p>
        <p class="text-xl font-semibold text-[#111827] mb-4">
          Find schools that fit you
        </p>
      </div>
      <ol class="flex flex-col gap-7">
        <li class="flex items-center justify-between gap-4">
          <div class="flex flex-col items-center relative">
            <div
              class="w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold text-sm"
              :class="[
                dashboardStore.enginePosition === 'post' || dashboardStore.userSelectedSchoolsList.length > 0
                  ? 'bg-[#16A34A]'
                  : 'bg-[#2563EB]',
              ]"
            >
              <div v-if="dashboardStore.enginePosition === 'post' || dashboardStore.userSelectedSchoolsList.length > 0">
                <IconTick stroke="#ffffff" height="16" width="16" />
              </div>
              <p v-else>1</p>
            </div>
            <div
              class="w-px rounded-full h-10 absolute -bottom-11 flex-1 bg-[#0000001A]"
            />
          </div>
          <div class="flex-1">
            <p class="text-[#111827] text-sm md:text-base">Search colleges</p>
            <p class="text-xs md:text-sm text-[#4B5563]">
              Find your fit with our smart search engine
            </p>
          </div>
          <IconChevronDown
            class="-rotate-90"
            stroke="#4B5563"
            height="20"
            width="20"
          />
        </li>
        <li
          class="flex items-center justify-between gap-4"
          :class="{
            'opacity-40':
              dashboardStore.userSelectedSchoolsList.length <= 0 &&
              dashboardStore.enginePosition === 'pre',
          }"
        >
          <div class="flex flex-col items-center relative">
            <div
              class="w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold text-sm"
              :class="[
                dashboardStore.userSelectedSchoolsList.length <= 0 &&
                dashboardStore.enginePosition === 'pre'
                  ? 'bg-[#0A0A0A]'
                  : dashboardStore.userSelectedSchoolsList.length > 0
                  ? 'bg-[#16A34A]'
                  : 'bg-[#2563EB]',
              ]"
            >
              <div v-if="dashboardStore.userSelectedSchoolsList.length > 0">
                <IconTick stroke="#ffffff" height="16" width="16" />
              </div>
              <p v-else>2</p>
            </div>
            <div
              class="w-px rounded-full absolute flex-1 bg-[#0000001A]"
              :class="[
                dashboardStore.userSelectedSchoolsList.length > 0
                  ? 'h-16 -bottom-[68px]'
                  : 'h-10 -bottom-11',
              ]"
            />
          </div>
          <div class="flex-1">
            <p class="text-[#111827] text-sm md:text-base">Make College List</p>
            <p class="text-xs md:text-sm text-[#4B5563]">
              Save and organize your top choices
            </p>
          </div>
          <IconChevronDown
            class="-rotate-90"
            stroke="#4B5563"
            height="20"
            width="20"
          />
        </li>
        <li
          class="flex items-center justify-between gap-4"
          :class="{
            'opacity-40': dashboardStore.userSelectedSchoolsList.length == 0,
          }"
        >
          <div class="flex flex-col items-center">
            <div
              class="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-semibold text-sm"
            >
              3
            </div>
          </div>
          <div class="flex-1">
            <p class="text-[#111827] text-sm md:text-base">
              Finalize with Our Counselor
            </p>
            <p class="text-xs md:text-sm text-[#4B5563]">
              Get personalized support for your applications
            </p>
            <NuxtLinkLocale
              v-if="dashboardStore.userSelectedSchoolsList.length > 0"
              to="/pricing"
              class="text-sm font-semibold py-1.5 px-[18px] rounded-lg bg-[#2563EB] text-white mt-3 block w-fit"
            >
              Get mentorship
            </NuxtLinkLocale>
          </div>
          <IconChevronDown
            class="-rotate-90"
            stroke="#4B5563"
            height="20"
            width="20"
          />
        </li>
      </ol>
    </div>

    <!-- Right Card: Calendar -->
    <div
      class="bg-white border border-[#00000033] rounded-xl p-6 w-full opacity-55"
    >
      <div class="flex items-center justify-between">
        <div
          class="text-xs font-semibold text-[#2563EB] uppercase tracking-wide"
        >
          Your calendar
        </div>
        <span
          class="bg-[#E5E5E5] text-[#4B5563] text-xs font-semibold rounded-md px-2 py-0.5"
          >Coming soon</span
        >
      </div>
      <div class="text-lg font-semibold text-[#111827]">
        Application process
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
              Finalize extracurricular activity
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
                21
              </div>
              <div
                class="text-sm md:text-base text-[#7E22CE] font-semibold -mt-1"
              >
                JUN
              </div>
            </div>
          </div>
          <div>
            <div class="font-semibold text-sm md:text-base text-[#111827]">
              Essay outline review with mentor
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
                JUN
              </div>
            </div>
          </div>
          <div>
            <div class="font-semibold text-sm md:text-base text-[#111827]">
              Essay outline review with mentor
            </div>
            <div class="text-[#111827]">10:00 - 11:00</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";

const dashboardStore = useDashboardStore();
</script>
