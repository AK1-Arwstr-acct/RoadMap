<template>
  <div
    @click="sophieStore.openSophieModal = !sophieStore.openSophieModal"
    class="size-14 absolute bottom-5 right-5 rounded-2xl bg-[#ED77FF] flex justify-center items-center shadow-md cursor-pointer"
  >
    <IconTabSophie class="text-white" width="32" height="32" />
  </div>
  <Transition name="fade">
    <div
      v-if="sophieStore.openSophieModal"
      class="fixed bg-black/50 inset-0 z-50 isolate backdrop-blur py-10 lg:py-[60px] px-4 lg:px-[68px] flex justify-center items-center"
    >
      <ChatWithSophie
        :isModal="true"
        @openSophieModal="sophieStore.openSophieModal = false"
      />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import useSophieStore from "~/stores/sophieStore";
const sophieStore = useSophieStore();
</script>
