<template>
  <div class="bg-[#EEF4FF] border border-[#E0EAFF] rounded-lg py-5 px-4">
    <div class="flex items-center justify-between gap-3">
      <p class="text-[#181D27] text-sm font-semibold">Why These Schools?</p>
      <div @click="openSophieModal = true" class="cursor-pointer">
        <IconDoubleArrows />
      </div>
    </div>
    <div class="mt-4 relative">
      <div>
        <vue-markdown ref="typingText" :source="typedText" :options="options" />
      </div>
    </div>
  </div>
  <!-- sophie modal -->
  <Transition name="fade">
      <div
        v-if="openSophieModal"
        class="fixed bg-black/50 inset-0 z-20 backdrop-blur py-[60px] px-[68px]"
      >
        <ChatWithSophie
          :isModal="true"
          @openSophieModal="openSophieModal = false"
        />
      </div>
    </Transition>
</template>

<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";

const dashboardStore = useDashboardStore();

const text =
  "A 4.0 GPA is fantastic! It shows your dedicate and capability to handle rigorous coursework.<br/> With your interest in law, this strong academic foundation will be crucial as law studies demand a lot of reading, critical thinking, and attention to detail.A 4.0 GPA is fantastic! It shows your dedicate and capability to handle rigorous coursework. With your interest in law, this strong academic foundation will be crucial as law studies demand a lot of reading, critical thinking, and attention to detail.";
const typedText = ref("");
const index = ref(0);
const typingText = ref<HTMLElement | null>(null);
const speed = 10;
const readMore = ref<boolean>(false);
const openSophieModal = ref<boolean>(false);
const textLimit = ref<number>(500);

const options = {
  html: true,
};

const observeReadMore = () => {
  nextTick(() => {
    const readMoreEl = document.querySelector("[data-action='read-more']");
    if (readMoreEl) {
      readMoreEl.addEventListener("click", handleReadMore);
    }
  });
};

const typeEffect = () => {
  if (index.value < textLimit.value && typingText.value) {
    const text1: string = dashboardStore.overViews
      ? dashboardStore.overViews.join("<br/>")
      : "";
    typedText.value += text1.charAt(index.value);
    index.value++;
    setTimeout(typeEffect, speed);
  } else {
    typedText.value +=
      "<span class='text-[#1570EF] text-nowrap cursor-pointer custom-readmore' data-action='read-more' ><span class='text-[#181D27]'>...</span>Read more</span>";
    readMore.value = true;
    observeReadMore();
  }
};

const handleReadMore = () => {
  // typedText.value = typedText.value.replace(
  //   /<span[^>]*data-action=['"]read-more['"][^>]*>.*?Read more.*?<\/span>/,
  //   ""
  // );
  // textLimit.value += 5000;
  // typeEffect();
  openSophieModal.value = true;
};

onMounted(() => {
  typeEffect();
  const observer = new MutationObserver(() => {
    observeReadMore();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
</script>
