<template>
  <div class="bg-white size-full overflow-hidden flex">
    <div class="w-full flex flex-col gap-1">
      <div class="flex-1 overflow-hidden">
        <div class="flex-1 md:x-6 pb-2 md:pt-6 w-full h-full px-4">
          <SophieScholarshipChat />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useSophieStore from "~/stores/sophieStore";

useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/sophie-chat.png",
        as: "image",
      },
    ],
  }))
);

const sophieStore = useSophieStore();

definePageMeta({
  layout: "home-layout",
});

onMounted(async () => {
  if (sophieStore.isSophiePublic) {
    await sophieStore.checkPublicToken();
  }
});
</script>
