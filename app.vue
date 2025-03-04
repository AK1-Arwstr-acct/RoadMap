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
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})

import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();

const hotjarConfig = () => {
  const runtimeConfig = useRuntimeConfig();
  if (import.meta.client && runtimeConfig.public.appMode == "app.arrowster.com") {
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
  }
};

onMounted(async () => {
  await appStore.getUserData();
  hotjarConfig();
});
</script>