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
import useAppStore from '~/stores/AppStore';

const appStore = useAppStore();

onMounted(async () => {
  await appStore.getUserData();
});
</script>