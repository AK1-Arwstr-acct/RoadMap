<template></template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();

const route = useRoute();

const token = ref(route.params.token);
const oldUser = ref(route.params.oldUser);
const savedtoken = useCookie("token");

onBeforeMount(() => {
  const parsedOldUser = oldUser.value === "true";
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
