<template>
  <div
    class="bg-white size-full overflow-hidden flex"
    :class="{ 'rounded-xl drop-shadow-lg relative': isModal }"
  >
    <div
      v-if="isModal"
      @click="emit('openSophieModal')"
      class="absolute right-4 top-4 cursor-pointer"
    >
      <IconCross fill="#A4A7AE" width="28" height="28" />
    </div>
    <div class="w-[25%] min-w-[300px]">
      <SophieHistory />
    </div>
    <div class="flex-1 pb-4 px-5 w-full max-w-[710px] mx-auto" :class="[isModal ? 'pt-[68px]' : 'pt-4']">
      <SophieChat />
    </div>
  </div>
</template>
<script setup lang="ts">
const { api } = useApi();
const { showToast } = useToast();

const emit = defineEmits(["openSophieModal"]);

defineProps({
  isModal: {
    type: Boolean,
    default: false,
  },
});

// Get All History
// {{base}}/api/v1/ai-conversation/get-sophie-sessions
// GET Single History
// {{base}}/api/v1/ai-conversation/get-sophie-sessions/chat/33182

onMounted( async()=>{
    await api.get('/api/v1/ai-conversation/get-sophie-sessions')
})
</script>
