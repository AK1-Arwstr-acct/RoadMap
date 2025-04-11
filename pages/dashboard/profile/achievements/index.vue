<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="max-w-[752px] px-4 mx-auto pt-8 pb-16">
      <div>
        <div class="flex justify-between items-center font-semibold mb-5">
          <h3 class="text-xl md:text-2xl text-[#181D27]">All your achievement</h3>
        </div>
        <Achievements :is-detail-page="true" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
});

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${locale.value !== "en" ? `/${locale.value}` : ""}/dashboard/profile/achievements`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/dashboard/profile/achievements`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/dashboard/profile/achievements`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/dashboard/profile/achievements`,
        hreflang: "x-default",
      },
    ],
  }))
);
</script>
