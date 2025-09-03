<template></template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();

const route = useRoute();
const localePath = useLocalePath();

onBeforeMount(async () => {
  const token = route.query.token;
  const onboarded = Number(route.query.onboarded);
  const savedtoken = useCookie("token");
  if (!savedtoken.value) {
    savedtoken.value = Array.isArray(token) ? token.join("") : token;
  }
  await nextTick();
  appStore.checkAuthenticatedUser();
  appStore.getUserData();
  appStore.getAuthUserData();
  const parsedOnboarded = onboarded === 1;
  const isStudentnboarded = useCookie("isStudentnboarded", {
    maxAge: 604800,
    httpOnly: false,
    secure: true,
  });
  isStudentnboarded.value = String(appStore.userData?.onboarded || false);
  const isInvitedByCounsellor = useCookie("isInvitedByCounsellor", {
    maxAge: 604800,
    httpOnly: false,
    secure: true,
  });
  isInvitedByCounsellor.value = String(
    appStore.authUserData?.counsellor?.isInvitedByCounsellor || false
  );
  parsedOnboarded
    ? navigateTo(localePath("/"))
    : navigateTo(localePath("/onboarding"));
});
</script>
