<template>
  <div class="pt-4 pb-1 h-full flex flex-col">
    <div class="flex justify-center pt-10 md:pt-40">
      <div class="w-full max-w-[592px] flex flex-col items-center">
        <img
          src="/public/images/lets-go.png"
          alt="sophie Icon"
          class="w-[167px] md:w-[255px]"
          loading="eager"
        />
        <p class="text-center text-[#181D27] md:text-xl font-semibold mt-4">
          {{ $t("schoolList_page.publicInfo.start_search_button") }}
        </p>
        <p class="text-center text-sm md:text-base text-[#414651] mt-5">
          {{ $t("schoolList_page.publicInfo.fill_information_message") }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
