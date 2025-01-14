<template></template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();

const route = useRoute();

const token = ref(route.query.token);
const oldUser = ref(route.query.oldUser);
const savedtoken = useCookie("token");

onBeforeMount(() => {
  const parsedOldUser = oldUser.value === "1";
  parsedOldUser ? navigateTo('/') : navigateTo('/explore');
  if (!savedtoken.value) {
    savedtoken.value = Array.isArray(token.value) ? token.value.join('') : token.value;
    appStore.setUserData({
      ...appStore.UserData,
      oldUser: parsedOldUser,
    });
  }
});
</script>
