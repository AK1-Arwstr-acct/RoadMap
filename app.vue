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
import { identifyUserInHotjar } from "@/utils/hotjar";

const appStore = useAppStore();

const hotjarConfig = () => {
  const runtimeConfig = useRuntimeConfig();
  if (import.meta.client) {
    const appMode = runtimeConfig.public.appMode;
    const hotjarId = runtimeConfig.public.hotjarId;

    if (appMode == "https://app.arrowster.com") {
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
        a.appendChild(r);
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    }
  }
};

onMounted(async () => {
  const user = await appStore.getUserData();
  hotjarConfig();
  await nextTick();
  identifyUserInHotjar(user);
});
</script>
