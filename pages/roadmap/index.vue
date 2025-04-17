<template>
  <div class="size-full">
    <section class="flex h-full bg-white">
      <div class="w-full flex justify-center overflow-y-auto no-scrollbar">
        <div class="h-fit max-w-[772px] px-4 md:px-10 lg:px-0 py-10 w-full">
          <div
            class="flex flex-col gap-14"
            v-if="
              !appTrackerStore.preApplication &&
              !appTrackerStore.applicationList.length &&
              !appTrackerStore.postApplication
            "
          >
            <RoadmapSkeleton v-for="a in 3" />
          </div>
          <div v-else>
            <h1 class="mb-8 text-[#181D27] text-2xl font-semibold lg:hidden">
              {{ $t('roadmap_page.roadmap') }}
            </h1>
            <div class="flex flex-col gap-14">
              <PreAppCard />
              <CountriesAppCard />
              <PostAppCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import useAppTrackerStore from "~/stores/AppTrackerStore";

definePageMeta({
  layout: "dashboard-layout",
});

const appTrackerStore = useAppTrackerStore();

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${locale.value !== "en" ? `/${locale.value}` : ""}/roadmap`;

useHead(
  computed(() => ({
    link: [
      {
        rel: 'preload',
        href: '/images/pre-application.png',
        as: 'image',
      },
      {
        rel: 'preload',
        href: '/images/countries-application.png',
        as: 'image',
      },
      {
        rel: 'preload',
        href: '/images/post-application.png',
        as: 'image',
      },
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/roadmap`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/roadmap`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/roadmap`,
        hreflang: "x-default",
      },
    ],
  }))
);

onMounted(async () => {
  if (
    !appTrackerStore.preApplication &&
    !appTrackerStore.applicationList.length &&
    !appTrackerStore.postApplication
  ) {
    appTrackerStore.getRoadmapData();
  }
});
</script>
