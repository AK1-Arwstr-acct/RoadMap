<template>
  <div>
    <NuxtRouteAnnouncer />
    <BaseLayoutWrapper>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </BaseLayoutWrapper>
  </div>
</template>
<script setup lang="ts">
const { locale } = useI18n();
const { t } = useI18n();

declare global {
  interface Window {
    hj?: (event: string, action: string) => void;
  }
}

useHead(
  computed(() => ({
    htmlAttrs: {
      lang: locale.value,
    },
    title: t("meta.homepage.title"),
    meta: [
      {
        name: "description",
        content: t("meta.homepage.description"),
      },
      { property: "og:image", content: "/images/ogimage.png" },
    ],
    link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  }))
);

import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();

const hotjarConfig = () => {
  const runtimeConfig = useRuntimeConfig();
  if (import.meta.client) {
    const appMode = runtimeConfig.public.appMode;
    const hotjarId = runtimeConfig.public.hotjarId;

    if (
      appMode == "https://app.arrowster.com" ||
      appMode == "https://roadmap.arrowster.com"
    ) {
      (function (h, o, t, j, a, r) {
        h.hj =
          h.hj ||
          function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: hotjarId, hjsv: 6 };
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script");
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        r.onload = () => {
          if (appStore.userData && window.hj) {
            const userId: string = `${appStore.userData.id}`;
            window.hj("identify", userId);
          }
        };
        a.appendChild(r);
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    }
  }
};

watch(
  () => appStore.authenticatedUser,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      await hotjarConfig();
    }
  }
);

onMounted(async () => {
  await appStore.getUserData();
  await hotjarConfig();
});
</script>
