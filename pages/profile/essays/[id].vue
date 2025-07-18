<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="max-w-[752px] py-3 px-4 mx-auto lg:mt-8 pb-5 lg:pb-8">
      <p class="text-2xl md:text-3xl font-medium text-[#181D27] my-4 md:my-8">
        {{ essayStore.finalEssay?.title }}
      </p>
      <div class="md:text-lg text-[#414651] flex flex-col gap-3 rounded-lg">
        <ClientOnly>
          <vue-markdown
            :source="essayStore.finalEssay?.essayText"
            :options="options"
            class="h-fit flex flex-col gap-4"
          />
        </ClientOnly>
      </div>
      <div class="h-px bg-[#E9EAEB] mx-auto my-6 md:my-[42px]"></div>
      <div
        class="flex flex-col md:flex-row justify-between gap-6 items-end md:items-start"
      >
        <div class="flex gap-3">
          <IconTabSophie
            width="56"
            height="56"
            class="text-[#ED77FF] flex-shrink-0"
          />
          <p
            class="text-[#181D27] text-sm md:text-base font-medium text-justify"
          >
          {{ $t('profile_page.customise_prompt') }}
          </p>
        </div>
        <div>
          <NuxtLinkLocale
            :to="'/pricing'"
            class="text-[#414651] w-full text-center sm:w-fit text-nowrap font-semibold text-sm py-2 px-3.5 border border-[#D5D7DA] rounded-lg shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
          {{ $t('profile_page.make_my_essay_better') }}
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";

definePageMeta({
  layout: "dashboard-layout",
});

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/profile/essays/${route.params.id}`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/profile/essays/${route.params.id}`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/profile/essays/${route.params.id}`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/profile/essays/${route.params.id}`,
        hreflang: "x-default",
      },
    ],
  }))
);

const essayStore = useEssayStore();
const localePath = useLocalePath();

const options = {
  html: true,
};

onBeforeMount(() => {
  if (!essayStore.finalEssay) {
    navigateTo(localePath("/profile/essays"));
  }
});

onUnmounted(() => {
  essayStore.finalEssay = undefined;
});
</script>
