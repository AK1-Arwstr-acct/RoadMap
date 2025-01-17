<template>
  <slot />
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const route = useRoute();

useHead({
  htmlAttrs: {
    lang: "en",
  },
});

onBeforeMount(async () => {
  appStore.getUserData();
});
</script>
