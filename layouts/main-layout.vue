<template>
  <main>
    <Navebar />
    <div class="h-[calc(100vh-76px)]">
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
