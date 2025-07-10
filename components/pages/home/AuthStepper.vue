<template>
  <div
    class="bg-white border border-[#00000033] rounded-xl px-4 py-6 w-full md:max-w-[343px]"
  >
    <div class="px-2">
      <p class="text-xs font-semibold text-[#2563EB] uppercase tracking-wide">
        {{ $t("homepage.finishing_set-up") }}
      </p>
      <p class="text-xl font-semibold text-[#111827] mb-4">
        {{ $t("homepage.find_schools_that_fit_you") }}
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
              appStore.authUserData?.isSchoolListVisited ||
              appStore.authUserData?.isAnyCollegeAdded
                ? 'bg-[#16A34A]'
                : 'bg-[#2563EB]',
            ]"
          >
            <div
              v-if="
                appStore.authUserData?.isSchoolListVisited ||
                appStore.authUserData?.isAnyCollegeAdded
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
          <p class="text-[#111827] text-sm md:text-base">
            {{ $t("homepage.search_colleges") }}
          </p>
          <p class="text-xs md:text-sm text-[#4B5563]">
            {{ $t("homepage.find_your_fit_with_our_smart_search_engine") }}
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
            !appStore.authUserData?.isAnyCollegeAdded &&
            !appStore.authUserData?.isSchoolListVisited,
        }"
      >
        <div class="flex flex-col items-center relative">
          <div
            class="w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold text-sm"
            :class="[
              !appStore.authUserData?.isAnyCollegeAdded &&
              !appStore.authUserData?.isSchoolListVisited
                ? 'bg-[#0A0A0A]'
                : appStore.authUserData?.isAnyCollegeAdded
                ? 'bg-[#16A34A]'
                : 'bg-[#2563EB]',
            ]"
          >
            <div v-if="appStore.authUserData?.isAnyCollegeAdded">
              <IconTick stroke="#ffffff" height="16" width="16" />
            </div>
            <p v-else>2</p>
          </div>
          <div
            class="w-px rounded-full absolute flex-1 bg-[#0000001A]"
            :class="[
              appStore.authUserData?.isAnyCollegeAdded
                ? 'h-16 -bottom-[68px]'
                : 'h-10 -bottom-11',
            ]"
          />
        </div>
        <div class="flex-1">
          <p class="text-[#111827] text-sm md:text-base">
            {{ $t("homepage.make_college_list") }}
          </p>
          <p class="text-xs md:text-sm text-[#4B5563]">
            {{ $t("homepage.save_and_organize_your_top_choices") }}
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
          'opacity-40': !appStore.authUserData?.isAnyCollegeAdded,
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
            {{ $t("homepage.finalize_with_our_counselor") }}
          </p>
          <p class="text-xs md:text-sm text-[#4B5563]">
            {{ $t("homepage.get_personalized_support_for_your_applications") }}
          </p>
          <NuxtLinkLocale
            v-if="appStore.authUserData?.isAnyCollegeAdded"
            to="/pricing"
            class="text-sm font-semibold py-1.5 px-[18px] rounded-lg bg-[#2563EB] text-white mt-3 block w-fit"
          >
            {{ $t("homepage.get_mentorship") }}
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
import useAppStore from "~/stores/AppStore";

const localePath = useLocalePath();
const appStore = useAppStore();
</script>
