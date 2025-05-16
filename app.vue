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

// declare global {
//   interface Window {
//     hj?: (event: string, action: string) => void;
//   }
// }

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
        a.appendChild(r);
        // r.onload = () => {
        //   if (appStore.userData && window.hj) {
        //     const userId: string = `${appStore.userData.id}`;
        //     window.hj("identify", userId);
        //   }
        // };
        // r.onload = () => {
        //   if (typeof window.hj === "function") {
        //     window.hj("debug", true);
        //     console.log("Hotjar debug mode enabled.");
        //   }
        // };
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    }
  }
};

// watch(
//   () => appStore.userData,
//   async (newValue, oldValue) => {
//     console.log("Assigning Hotjar...");
//     console.log("New Value", newValue, window);
//     if (newValue && newValue.id && window.hj) {
//       const userID = String(newValue.id);
//       console.log("User ID assigned to Hotjar:", userID);
//       console.log("User Attributes", {
//         email: newValue.email || "",
//         name: newValue.name || "",
//       });
//       console.log("Event:", `user_id_${userID}`);
      
//       window.hj("identify", userID, {
//         email: newValue.email || "",
//         name: newValue.name || "",
//       });
//       window.hj("event", `user_id_${userID}`);
//       // hotjarConfig();
//     }
//   },
//   { immediate: true, deep: true }
// );

onMounted(async () => {
  await appStore.getUserData();
  hotjarConfig();
});
</script>
