<template>
  <div
    class="px-6 pb-6 border-r-[1.5px] border-gray-200 h-full w-full flex flex-col overflow-y-auto custom-scrollbar"
    :class="[isModal ? 'bg-[#FFFEFC]' : 'bg-white']" 
  >
  <div class="py-6 sticky top-0" :class="[isModal ? 'bg-[#FFFEFC]' : 'bg-white']">
      <button
        @click="emit('newChat')"
        class="border-[1.5px] border-gray-200 bg-white py-2.5 w-full overflow-hidden text-nowrap rounded-lg flex justify-center items-center gap-2 text-sm font-semibold text-[#1570EF]"
      >
        <IconChat />
        Start a new chat with Sophie
      </button>
  </div>
    <div class="flex flex-col gap-4 text-[#414651] text-sm border-t-[1.5px] border-gray-200 pt-6 overflow-x-hidden">
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
  isModal: {
    type: Boolean,
    default: false,
  },
});
</script>
