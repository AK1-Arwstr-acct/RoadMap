<template>
  <div class="bg-[#EEF4FF] border border-[#E0EAFF] rounded-lg py-5 px-4">
    <div class="flex items-center justify-between gap-3">
      <p class="text-[#181D27] text-sm font-semibold">Why These Schools?</p>
      <div @click="showDetailModal = true" class="cursor-pointer">
        <IconDoubleArrows />
      </div>
    </div>
    <div class="mt-4 relative truncate-paragraph">
      <!-- <ClientOnly>
        <vue-markdown ref="typingText" :source="typedText" :options="options" />
    </ClientOnly> -->
      <vue-markdown ref="typingText" :source="typedText" :options="options" />
      <!-- <span class="text-[#1570EF] cursor-pointer">Read more</span> -->
    </div>
  </div>
  <div
    v-if="showDetailModal"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 flex justify-center items-center"
  >
    <div
      v-click-outside="() => (showDetailModal = false)"
      class="bg-white rounded-xl w-[95%] md:w-[80%] h-[80%] py-5 px-4"
    >
      <vue-markdown :source="text" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
const text =
  "A 4.0 GPA is fantastic! It shows your dedicate and capability to handle rigorous coursework.<br/> With your interest in law, this strong academic foundation will be crucial as law studies demand a lot of reading, critical thinking, and attention to detail.A 4.0 GPA is fantastic! It shows your dedicate and capability to handle rigorous coursework. With your interest in law, this strong academic foundation will be crucial as law studies demand a lot of reading, critical thinking, and attention to detail.";
const typedText = ref("");
const index = ref(0);
const typingText = ref<HTMLElement | null>(null);
const speed = 10;
const readMore = ref<boolean>(false);
const showDetailModal = ref<boolean>(false);

const options = {
  html: true,
};

const typeEffect = () => {
  if (index.value < 500 && typingText.value) {
    typedText.value += text.charAt(index.value);
    index.value++;
    setTimeout(typeEffect, speed);
  } else {
    readMore.value = true;
  }
};

onMounted(() => {
  typeEffect();
});
</script>
<style scoped>
.truncate-paragraph {
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
