<template>
  <div class="flex gap-2">
    <div @click="thumbClicked('like')" class="cursor-pointer">
      <IconThumb
        :fill="activeThumb == 'like' ? '#2563EB' : 'none'"
        :class="{ '!text-icon-brand': activeThumb == 'like' }"
      />
    </div>
    <div
      @click="thumbClicked('dislike')"
      class="transform rotate-180 cursor-pointer"
    >
      <IconThumb
        :fill="activeThumb == 'dislike' ? '#2563EB' : 'none'"
        :class="{ '!text-icon-brand': activeThumb == 'dislike' }"
      />
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
