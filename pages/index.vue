<template>
  <div class="h-dvh flex flex-col overflow-hidden bg-[#f5f5f5] relative">
    <DashboardNav />
    <div class="flex-1 m-4 rounded-xl flex justify-center items-center px-2 sm:px-5 bg-white">
      <div class="max-w-[574px] w-full flex flex-col items-center justify-center gap-6">
        <div class="flex-1 pt-12 sm:pt-0">
          <img src="/images/countries-application.png" alt="Get Started"
            class="w-full size-full object-contain max-w-[300px] sm:max-w-[352px]" loading="eager" />
        </div>
        <div class="md:flex-1 pb-12 sm:pb-0">
          <h1 class="mb-3 text-[#181D27] text-xl md:text-3xl font-medium text-center">
            {{ $t("homepage.title") }}
            <!-- Find Your Best-Fit Schools in Seconds -->
          </h1>
          <p class="text-[#535862] md:text-lg text-center">
            {{ $t("homepage.description.part1") }}
          </p>
          <div class="flex justify-center">
            <NuxtLinkLocale to="/school-list" class="block mt-6">
              <button
                class="w-fit text-sm sm:text-base text-white bg-[#1570EF] border-[1.5px] border-[#1570EF] rounded-lg font-semibold py-2.5 px-4">
                {{ $t("homepage.description.buttonText") }}
              </button>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${locale.value !== "en" ? `/${locale.value}` : ""
  }`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "countries-application.png",
        as: "image",
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
