<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="h-full w-full">
      <ChatWithSophie />
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
});

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${locale.value !== "en" ? `/${locale.value}` : ""}/sophie`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/sophie`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/sophie`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/sophie`,
        hreflang: "x-default",
      },
    ],
  }))
);
</script>
