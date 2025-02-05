<template></template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();

const route = useRoute();
const localePath = useLocalePath();

const token = ref(route.query.token);
const oldUser = ref(route.query.oldUser);
const onboarded = ref(route.query.onboarded);
const savedtoken = useCookie("token");

onBeforeMount(() => {
  const parsedOldUser = oldUser.value === "true";
  const parsedOnboarded = onboarded.value === "true";
  // parsedOldUser ? navigateTo('/') : navigateTo('/explore');
  parsedOnboarded
    ? navigateTo(localePath("/dashboard"))
    : navigateTo(localePath("/onboarding"));
  if (!savedtoken.value) {
    savedtoken.value = Array.isArray(token.value)
      ? token.value.join("")
      : token.value;
    appStore.setAuthUser({
      ...appStore.authUser,
      oldUser: parsedOldUser,
      onboarded: parsedOnboarded,
    });
  }
});
</script>
