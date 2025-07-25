<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Transition name="fade">
      <component
        v-if="appStore.isMentorshipPopup"
        :is="MentorshipPopup"
        @close="appStore.isMentorshipPopup = false"
      />
    </Transition>
  </div>
</template>
<script setup lang="ts">
import MentorshipPopup from "~/components/pages/school-list/MentorshipPopup.vue";
import useAppStore from "~/stores/AppStore";
import useSophieStore from "./stores/sophieStore";
import useSchoolListStore from "./stores/SchoolListStore";
import { identifyUserInHotjar } from "@/utils/hotjar";
import { identifyUserInTiktok, trackPageView } from "@/utils/tiktokPixel";

const { locale } = useI18n();
const { t } = useI18n();
const route = useRoute();
const schoolListStore = useSchoolListStore();

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

const appStore = useAppStore();
const sophieStore = useSophieStore();

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

const tiktokConfig = () => {
  const runtimeConfig = useRuntimeConfig();
  if (import.meta.client) {
    const appMode = runtimeConfig.public.appMode;
    const tiktokPixelId = runtimeConfig.public.tiktokPixelId;

    if (appMode === "https://app.arrowster.com") {
      !(function (w, d, t) {
        w.TiktokAnalyticsObject = t;
        var ttq = (w[t] = w[t] || []);
        ttq.methods = [
          "page",
          "track",
          "identify",
          "instances",
          "debug",
          "on",
          "off",
          "once",
          "ready",
          "alias",
          "group",
          "enableCookie",
          "disableCookie",
        ];
        ttq.setAndDefer = function (t, e) {
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments)));
          };
        };
        for (var i = 0; i < ttq.methods.length; i++)
          ttq.setAndDefer(ttq, ttq.methods[i]);
        ttq.instance = function (t) {
          var e = ttq._i[t] || [];
          for (var n = 0; n < ttq.methods.length; n++)
            ttq.setAndDefer(e, ttq.methods[n]);
          return e;
        };
        ttq.load = function (e, n) {
          var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
          ttq._i = ttq._i || {};
          ttq._i[e] = [];
          ttq._i[e]._u = i;
          ttq._t = ttq._t || {};
          ttq._t[e] = +new Date();
          ttq._o = ttq._o || {};
          ttq._o[e] = n || {};
          var o = document.createElement("script");
          o.type = "text/javascript";
          o.async = true;
          o.src = i + "?sdkid=" + e + "&lib=" + t;
          var a = document.getElementsByTagName("script")[0];
          a.parentNode.insertBefore(o, a);
        };

        ttq.load(tiktokPixelId);
        ttq.page();
      })(window, document, "ttq");
    }
  }
};

let timeoutId: ReturnType<typeof setTimeout> | null = null;
const excludedRoutes = ["/pricing", "/login", "/signup"];

const handleMouseMove = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  if (
    excludedRoutes.some((path) => route.fullPath.includes(path)) ||
    sophieStore.openSophieModal ||
    schoolListStore.isSchoolDetailModal
  ) {
    return;
  }

  if (appStore.isMentorshipPopup === false) {
    timeoutId = setTimeout(() => {
      appStore.isMentorshipPopup = true;
    }, appStore.popupTimer);
  }
};

let clickTimestamps: number[] = [];
const handleClick = () => {
  if (
    excludedRoutes.some((path) => route.fullPath.includes(path)) ||
    sophieStore.openSophieModal
  ) {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    return;
  }
  const now = Date.now();
  clickTimestamps.push(now);

  // Remove clicks older than 2 seconds
  clickTimestamps = clickTimestamps.filter((ts) => now - ts <= 2000);

  if (clickTimestamps.length >= 5) {
    appStore.isMentorshipPopup = true;
    clickTimestamps = [];
  }
};

watch(
  () => appStore.isMentorshipPopup,
  () => {
    if (appStore.isMentorshipPopup === false) {
      timeoutId = setTimeout(() => {
        appStore.isMentorshipPopup = true;
      }, appStore.popupTimer);
    }
  }
);

onMounted(async () => {
  const user = await appStore.getUserData();
  const tokenExists = useCookie("token");
  if (tokenExists.value) {
    await appStore.getAuthUserData();
  }
  hotjarConfig();
  tiktokConfig();
  await nextTick();
  identifyUserInHotjar(user);
  identifyUserInTiktok(user);
  trackPageView();
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("keydown", handleMouseMove);
  window.addEventListener("click", handleClick);
  timeoutId = setTimeout(() => {
    appStore.isMentorshipPopup = true;
  }, appStore.popupTimer);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("keydown", handleMouseMove);
  window.removeEventListener("click", handleClick);
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
</script>
