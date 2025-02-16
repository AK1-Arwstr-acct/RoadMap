<template>
  <div class="min-h-svh flex justify-center items-center h-full px-5">
    <div class="max-w-[864px] w-full flex justify-center gap-12 lg:gap-[84px]">
      <div class="flex-1 hidden md:block">
        <img
          src="/images/get-started.png"
          alt="Get Started"
          class="w-full size-full object-contain"
        />
      </div>
      <div class="md:flex-1 py-12">
        <h1 class="mb-4 text-[#181D27] text-2xl md:text-4xl font-medium">
          {{ $t("discover.heading") }}
        </h1>
        <p class="text-[#717680]">
          {{ $t("discover.detail") }}
        </p>
        <div class="mt-8 space-y-4">
          <NuxtLinkLocale to="/signup" class="block">
            <button
              class="cursor-pointer w-full text-xl text-white bg-[#1570EF] border border-[#E1E1E1] rounded-lg font-semibold py-2.5 flex gap-2 justify-center items-center"
            >
              {{ $t("discover.get_started") }}
            </button>
          </NuxtLinkLocale>
          <NuxtLinkLocale to="/login" class="block">
            <button
              class="cursor-pointer w-full text-xl text-[#414651] border border-[#E1E1E1] rounded-lg font-semibold py-2.5 px-2 flex gap-2 justify-center items-center"
            >
              {{ $t("discover.i_already_have_an_account") }}
            </button>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});
</script>
