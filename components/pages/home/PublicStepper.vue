<template>
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
      <li
        @click="navigateTo(localePath('/school-list'))"
        class="flex items-center justify-between gap-4 cursor-pointer"
      >
        <div class="flex flex-col items-center relative">
          <div
            class="w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold text-sm"
            :class="[
              schoolListStore.enginePosition === 'post' ||
              schoolListStore.userSelectedSchoolsListPublic.length > 0
                ? 'bg-[#16A34A]'
                : 'bg-[#2563EB]',
            ]"
          >
            <div
              v-if="
                schoolListStore.enginePosition === 'post' ||
                schoolListStore.userSelectedSchoolsListPublic.length > 0
              "
            >
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
        @click="navigateTo(localePath('/checklist'))"
        class="flex items-center justify-between gap-4 cursor-pointer"
        :class="{
          'opacity-40 pointer-events-none':
            schoolListStore.userSelectedSchoolsListPublic.length <= 0 &&
            schoolListStore.enginePosition === 'pre',
        }"
      >
        <div class="flex flex-col items-center relative">
          <div
            class="w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold text-sm"
            :class="[
              schoolListStore.userSelectedSchoolsListPublic.length <= 0 &&
              schoolListStore.enginePosition === 'pre'
                ? 'bg-[#0A0A0A]'
                : schoolListStore.userSelectedSchoolsListPublic.length > 0
                ? 'bg-[#16A34A]'
                : 'bg-[#2563EB]',
            ]"
          >
            <div v-if="schoolListStore.userSelectedSchoolsListPublic.length > 0">
              <IconTick stroke="#ffffff" height="16" width="16" />
            </div>
            <p v-else>2</p>
          </div>
          <div
            class="w-px rounded-full absolute flex-1 bg-[#0000001A]"
            :class="[
              schoolListStore.userSelectedSchoolsListPublic.length > 0
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
          'opacity-40': schoolListStore.userSelectedSchoolsListPublic.length == 0,
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
            v-if="schoolListStore.userSelectedSchoolsListPublic.length > 0"
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
</template>
<script setup lang="ts">
import useSchoolListStore from "~/stores/SchoolListStore";

const localePath = useLocalePath();
const schoolListStore = useSchoolListStore();
</script>
