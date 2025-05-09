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
    if (runtimeConfig.public.appMode == "https://app.arrowster.com") {
      (function (h, o, t, j, a, r) {
        h.hj =
          h.hj ||
          function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: 5320387, hjsv: 6 };
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script");
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    } else if (
      runtimeConfig.public.appMode == "https://roadmap.arrowster.com"
    ) {
      (function (h, o, t, j, a, r) {
        h.hj =
          h.hj ||
          function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: 6372129, hjsv: 6 };
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script");
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    }
  }
};

function getHotjarSessionId() {
  const siteId = 6372129;
  // const hotjarUserCookie = useCookie(`_hjSessionUser_6372129`); // Exact match of the cookie name

  // console.log(hotjarUserCookie.value); // Check if it returns the expected cookie value

  // console.log("check:", `_hjSessionUser_${siteId}`);
  // // const hotjarId =
  // //   hotjarCookie && hotjarCookie.split("=")[0] === `_hjSession_${siteId}`
  // //     ? hotjarCookie.split("=")[1]
  // //     : null;

  // // console.log("Hotjar Session ID:", hotjarId);
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  console.log("Cookies:", cookies);
  const hotjarCookie = cookies.find((cookie) => cookie.startsWith(`_hjSession_${siteId}`));
  console.log("hotjarCookie:", hotjarCookie);
}

onMounted(async () => {
  await appStore.getUserData();
  await hotjarConfig();
  setTimeout(() => {
    getHotjarSessionId();
  }, 3000);
});
</script>
