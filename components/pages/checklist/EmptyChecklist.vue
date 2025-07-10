<template>
  <div class="flex flex-col items-center text-center">
    <img
      src="/images/lets-go.png"
      alt="countries-application"
      class="max-w-[167px] md:max-w-[255px]"
      loading="eager"
    />
    <p class="text-[#181D27] md:text-xl font-semibold mt-6">
      {{ $t("checklist_page.no_saved_colleges_yet") }}
    </p>
    <p class="mt-2 text-[#535862] text-sm md:text-base max-w-[640px]">
      {{ $t("checklist_page.no_school_detail") }}
    </p>
    <NuxtLinkLocale
      to="/school-list"
      class="mt-4 px-[18px] py-1.5 rounded-lg bg-[#2563EB] text-white font-semibold text-sm"
    >
      {{ $t("checklist_page.find_your_college") }}
    </NuxtLinkLocale>
  </div>
</template>
