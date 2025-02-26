<template>
  <div
    class="p-6 border-r border-[#E9EAEB] h-full bg-[#FFFEFC] flex flex-col gap-6 overflow-y-auto"
  >
    <button
      @click="emit('newChat')"
      class="border border-[#D5D7DA] bg-white py-2.5 w-full rounded-lg flex justify-center items-center gap-2 text-sm font-semibold text-[#1570EF]"
    >
      <IconChat />
      Start a new chat with Sophie
    </button>
    <div class="h-[1px] bg-[#E9EAEB]" />
    <div class="flex flex-col gap-4 text-[#414651] text-sm">
      <h4 class="font-medium">Recents</h4>
      <p
        class="truncate cursor-pointer"
        v-for="(chat, idx) in chatHistoryArray"
        :key="idx"
        @click="emit('chatDetail', chat.id)"
      >
        {{ chat.title }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["newChat", "chatDetail"]);
defineProps({
  chatHistoryArray: {
    type: Array as PropType<{ id: number; title: string }[]>,
    default: () => [],
  },
});
</script>
