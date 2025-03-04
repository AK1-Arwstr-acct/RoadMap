<template>
  <div
    class="px-6 pb-6 border-r border-[#E9EAEB] h-full w-full bg-[#FDFDFD] flex flex-col overflow-y-auto custom-scrollbar"
  >
  <div class="py-6 bg-[#FFFEFC] sticky top-0 ">
      <button
        @click="emit('newChat')"
        class="border border-[#D5D7DA] bg-white py-2.5 w-full overflow-hidden text-nowrap rounded-lg flex justify-center items-center gap-2 text-sm font-semibold text-[#1570EF]"
      >
        <IconChat />
        Start a new chat with Sophie
      </button>
  </div>
    <div class="flex flex-col gap-4 text-[#414651] text-sm border-t border-[#E9EAEB] pt-6 overflow-x-hidden">
      <h4 class="font-medium">Recents</h4>
      <div
        class="truncate cursor-pointer"
        v-for="(chat, idx) in chatHistoryArray"
        :key="idx"
        @click="emit('chatDetail', chat.id)"
      >
        {{ chat.title }}
      </div>
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
