<template>
  <div class="h-svh flex justify-center items-center relative">
    <AuthNavbar :ishome="true" />
    <div class="size-full flex flex-col lg:flex-row">
      <div
        class="lg:w-1/2 h-[calc(50%-48px)] md:h-full overflow-hidden relative isolate mt-[68px] lg:mt-0"
      >
        <img
          src="/images/ai-recommendation.png"
          alt="ai-recommendation"
          class="hidden lg:block w-full object-contain max-w-[200px] absolute -right-20 -top-10 -rotate-45"
          loading="eager"
        />
        <img
          src="/images/home-side-image.png"
          alt="Get Started"
          class="hidden lg:block w-[200px] object-contain max-w-[200px] absolute left-0 bottom-0"
          loading="eager"
        />
        <!-- ss -->
        <img
          src="/images/home-frame.png"
          alt="Get Started"
          class="size-full object-cover relative -z-10 hidden lg:block"
          loading="eager"
        />
        <img
          src="/images/home-mobile-frame.png"
          alt="Get Started"
          class="size-full object-contain object-bottom lg:hidden"
          loading="eager"
        />
      </div>
      <div class="lg:w-1/2 flex justify-center items-center px-5 md:px-10 py-5 md:py-6">
        <div class="max-w-[442px]">
          <h1 class="mb-2 md:mb-4 text-[#181D27] text-xl md:text-4xl font-medium">
            {{ $t("discover.heading") }}
          </h1>
          <ul class="text-[#717680] list-disc list-inside">
            <li class="-indent-6 pl-6">{{ $t("discover.detail1") }}</li>
            <li class="-indent-6 pl-6">{{ $t("discover.detail2") }}</li>
            <li class="-indent-6 pl-6">
              {{ $t("discover.detail3") }}
            </li>
            <li class="-indent-6 pl-6">
              {{ $t("discover.detail4") }}
            </li>
          </ul>
          <div class="mt-4 md:mt-[42px] flex flex-col gap-4">
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
  </div>
</template>
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/home-mobile-frame.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/home-frame.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/ai-recommendation.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/home-side-image.png",
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
