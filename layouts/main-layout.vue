<template>
  <main>
    <Navebar />
    <div class="h-[calc(100dvh-76px)] w-full">
      <slot />
    </div>
  </main>
</template>
<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "en",
  },
});
</script>
