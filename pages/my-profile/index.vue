<template>
  <section class="bg-[#1A1A1A] size-full flex text-white">
    <UserSideBar />
    <div class="p-6 size-full space-y-9 overflow-y-auto">
      <ScoreSection />
      <GoalsSection />
    </div>
  </section>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});
</script>
