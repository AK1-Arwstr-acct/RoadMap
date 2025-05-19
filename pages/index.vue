<template>
  <div class="h-svh flex justify-center items-center relative">
    <AuthNavbar :ishome="true" />
    <div class="size-full flex flex-col md:flex-row">
      <div
        class="md:w-1/2 min-h-[338px] h-1/2 md:h-full bg-[#175CD3] overflow-hidden relative isolate px-14 pt-24 pb-24"
      >
        <img
          src="/images/ai-recommendation.png"
          alt="ai-recommendation"
          class="w-full object-contain max-w-[200px] md:max-w-[362px] absolute -z-10 -right-20 md:-right-36 top-36 md:-top-16 -rotate-45"
          loading="eager"
        />
        <img
          src="/images/home-side-image.png"
          alt="Get Started"
          class="w-[300px] object-contain max-w-[200px] md:max-w-[362px] absolute -z-10 left-0 bottom-0"
          loading="eager"
        />
        <!-- ss -->
        <div class="flex flex-col items-center justify-center h-full w-full">
          <div
            class="w-full md:max-w-[600px] flex flex-col items-center md:items-start"
          >
            <img
              src="/images/school-list-snap.png"
              alt="school-list-snap"
              class="object-contain w-[60%] md:w-[90%] max-w-[524px] mr-20 md:mr-0 md:self-start"
              loading="eager"
            />
            <img
              src="/images/sophie-chat-snap.png"
              alt="sophie-chat-snap"
              class="object-cover w-[50%] md:w-[70%] 2xl:max-w-[464px] ml-20 md:ml-0 -mt-8 md:-mt-16 shadow-[-6px_-8px_30.6px_0px_#00000033] md:self-end"
              loading="eager"
            />
          </div>
        </div>
      </div>
      <div class="md:w-1/2 flex justify-center items-center px-5 md:px-10 py-6">
        <div class="max-w-[442px]">
          <h1 class="mb-4 text-[#181D27] text-2xl md:text-4xl font-medium">
            <!-- {{ $t("homepage.title") }} -->
            Your All-in-One Platform for Studying Abroad
          </h1>
          <ul class="text-[#717680] list-disc list-inside">
            <li class="-indent-6 pl-6">AI-powered school matching</li>
            <li class="-indent-6 pl-6">Essay assistant</li>
            <li class="-indent-6 pl-6">
              Free mentorship from top university alumni and 100+ hours of
              learning materials
            </li>
          </ul>
          <div class="mt-[42px] flex flex-col gap-4">
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
        href: "ai-recommendation.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "home-side-image.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "school-list-snap.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "sophie-chat-snap.png",
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
