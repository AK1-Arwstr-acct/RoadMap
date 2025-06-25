<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="max-w-[752px] px-4 mx-auto lg:pt-8 pb-5 lg:pb-8">
      <div @click="$router.push(`${ $i18n.locale != 'en' ? `/${$i18n.locale}/profile` : `/profile`}`)" class="text-[#717680] cursor-pointer font-medium flex items-center gap-1.5 mb-3">
        <IconChevronDown
          class="transform rotate-90"
          stroke="#717680"
          width="20"
          height="20"
        />
        <p>
          {{ $t('profile_page.profile') }}
        </p>
      </div>
      <div>
        <div class="flex justify-between items-center font-semibold mb-5">
          <p class="text-xl md:text-2xl text-[#181D27]">{{ $t('profile_page.all_your_achievement') }}</p>
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
const router = useRouter();

const canonicalUrl = `${runtimeConfig.public.appMode}${locale.value !== "en" ? `/${locale.value}` : ""}/profile/achievements`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/profile/achievements`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/profile/achievements`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/profile/achievements`,
        hreflang: "x-default",
      },
    ],
  }))
);
</script>
