<template>
  <div class="flex">
    <div
      @click="thumbClicked('like')"
      class="cursor-pointer group p-3 rounded-lg hover:bg-background-neutral-bold-hovered transition-all ease-in-out duration-200"
    >
      <IconThumbFilled v-if="activeThumb == 'like'" />
      <IconThumb v-else />
    </div>
    <div
      @click="thumbClicked('dislike')"
      class="transform rotate-180 cursor-pointer p-3 rounded-lg hover:bg-background-neutral-bold-hovered transition-all ease-in-out duration-200"
    >
      <IconThumbFilled v-if="activeThumb == 'dislike'" />
      <IconThumb v-else />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  supportId: {
    type: String,
    default: "",
  },
});

const { api } = useApi();
const { showToast } = useToast();

const activeThumb = ref<"like" | "dislike">();

const thumbClicked = async (mode: string) => {
  activeThumb.value = mode as "like" | "dislike";
  await api.post("/api/v1/ai-conversation/feedback-response", {
    message_support_id: props.supportId,
    is_liked: activeThumb.value == "like" ? 1 : -1,
  });
};
</script>
