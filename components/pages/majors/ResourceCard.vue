<template>
  <a
    :href="list.link"
    target="_blank"
    class="w-full rounded-lg p-3 flex flex-col gap-2 bg-background-neutral no-underline"
    style="text-decoration: none"
  >
    <div class="rounded overflow-hidden">
      <img
        src="/images/discover-more.png"
        alt="discover-more"
        class="size-full object-cover"
      />
    </div>
    <div class="flex gap-2 items-center">
      <div class="size-[18px] min-w-[18px] overflow-hidden rounded-full">
        <img
          :src="`https://www.google.com/s2/favicons?sz=64&domain_url=${list.link}`"
          alt="Website Logo"
        />
      </div>
      <p class="text-text-brand text-sm">{{ list.title }}</p>
    </div>
    <p class="text-text-neutral-subtle text-xs leading-[22px]">
      {{ list.detail }}
    </p>
  </a>
</template>
<script setup lang="ts">
defineProps({
  list: {
    type: Object as PropType<{ title: string; detail: string; link: string }>,
    default: () => {},
  },
});
</script>
