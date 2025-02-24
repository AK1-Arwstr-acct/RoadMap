<template></template>
<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const localePath = useLocalePath();

onBeforeMount(() => {
  const token = route.query.token;
  const onboarded = Number(route.query.onboarded);
  const savedtoken = useCookie("token");
  if (!savedtoken.value) {
    savedtoken.value = Array.isArray(token) ? token.join("") : token;
  }
  const parsedOnboarded = onboarded === 1;
  parsedOnboarded ? navigateTo(localePath("/dashboard")) : navigateTo(localePath("/onboarding"));
});
</script>
