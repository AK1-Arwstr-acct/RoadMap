<template>
  <div class="min-h-svh flex justify-center items-center h-full px-5">
    <div
      class="max-w-[864px] w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-[84px] h-full"
    >
      <div class="flex-1 pt-12 sm:pt-0">
        <img
          src="/images/get-started.png"
          alt="Get Started"
          class="w-full size-full object-contain max-w-[300px] sm:max-w-[400px]"
          loading="eager"
        />
      </div>
      <div class="md:flex-1 pb-12 sm:pb-0">
        <h1 class="mb-4 text-[#181D27] text-2xl md:text-4xl font-medium">
          {{ $t("homepage.title") }}
        </h1>
        <p class="text-[#717680]">
          {{ $t("homepage.description.part1") }}<br /><br />{{ $t("homepage.description.part2") }}
        </p>
        <div class="mt-8 space-y-4">
          <NuxtLinkLocale to="/signup" class="block">
            <button
              class="cursor-pointer w-full text-white bg-[#1570EF] border-[1.5px] border-gray-200 rounded-lg font-semibold py-2.5 flex gap-2 justify-center items-center"
            >
              {{ $t("discover.get_started") }}
            </button>
          </NuxtLinkLocale>
          <NuxtLinkLocale to="/login" class="block">
            <button
              class="cursor-pointer w-full text-[#414651] border-[1.5px] border-gray-200 rounded-lg font-semibold py-2.5 px-2 flex gap-2 justify-center items-center"
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

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${locale.value !== "en" ? `/${locale.value}` : ""}`;

useHead(
  computed(() => ({
    link: [
      {
        rel: 'preload',
        href: '/images/get-started.png',
        as: 'image',
      },
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}`,
        hreflang: "x-default",
      },
    ],
  }))
);
</script>
