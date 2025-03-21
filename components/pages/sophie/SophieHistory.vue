<template>
  <div
    class="px-4 pb-6 border-r-[1.5px] border-gray-200 h-full w-full flex flex-col overflow-y-auto custom-scrollbar"
    :class="[isModal ? 'bg-[#FFFEFC]' : 'bg-white']"
  >
    <div
      class="py-6 mx-2 sticky top-0 border-b-[1.5px] border-gray-200"
      :class="[isModal ? 'bg-[#FFFEFC]' : 'bg-white']"
    >
      <button
        @click="handleNewChat"
        class="border-[1.5px] border-gray-200 bg-white py-2.5 w-full overflow-hidden text-nowrap rounded-lg flex justify-center items-center gap-2 text-sm font-semibold text-[#1570EF]"
      >
        <IconChat />
        Start a new chat with Sophie
      </button>
    </div>
    <div class="text-[#414651] text-sm pt-6 overflow-x-hidden">
      <h4 class="font-medium px-2 mb-4">Recents</h4>
      <div class="flex flex-col">
        <div
          class="truncate cursor-pointer p-2 rounded-lg"
          :class="{ 'bg-[#F5F5F5]': activeHistory === chat.id }"
          v-for="(chat, idx) in chatHistoryArray"
          :key="idx"
          @click="handleClick(chat.id)"
        >
          {{ chat.title }}
        </div>
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

const activeHistory = ref<number | null>(null);

const handleClick = (id: number) => {
  activeHistory.value = id;
  emit("chatDetail", id);
};

const handleNewChat = () => {
  activeHistory.value = null;
  emit("newChat");
};
</script>
