<template>
  <div
    @click="onClick"
    class="w-full rounded-lg p-3 flex flex-col gap-2 bg-background-neutral no-underline"
    style="text-decoration: none"
  >
    <div class="rounded overflow-hidden w-full h-[112px]">
      <img
        :src="list.thumbnail"
        alt="discover-more"
        class="size-full object-cover"
      />
    </div>
    <div class="flex gap-2 items-center">
      <div class="size-[18px] min-w-[18px] overflow-hidden rounded-full">
        <img src="/images/discover-user-img.png" alt="discover-user-img" />
      </div>
      <p class="text-text-brand text-sm">{{ list.title }}</p>
    </div>
    <p class="text-text-neutral-subtle text-xs leading-[22px]">
      {{ list.detail }}
    </p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  list: {
    type: Object as PropType<{
      title: string;
      detail: string;
      link: string;
      thumbnail: string;
    }>,
    default: () => {},
  },
});

const onClick = () => {
  window.open(props.list.link, "_blank");
};

// const thumbnail = ref<string>("");

// onMounted(async () => {
//     const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(props.list.link)}&screenshot=true&meta=false`);
//     const data = await res.json();
//     thumbnail.value = data?.data?.screenshot?.url || '';
//     console.log(thumbnail.value);

//   });
</script>
