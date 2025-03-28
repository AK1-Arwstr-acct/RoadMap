<template>
  <div class="h-dvh flex relative">
    <Sidebar class="hidden md:block" />
    <div class="flex-1 flex flex-col">
      <DashboardNav />
      <div class="flex-1 w-screen md:w-full overflow-hidden">
        <slot />
      </div>
    </div>
    <div
      v-if="!route.path.includes('/sophie')"
      @click="openSophieModal = !openSophieModal"
      class="size-14 absolute bottom-5 right-5 rounded-2xl bg-[#ED77FF] flex justify-center items-center shadow-md cursor-pointer"
    >
      <IconTabSophie class="text-white" width="32" height="32" />
    </div>
    <!-- sophie modal -->
    <Transition name="fade">
      <div
        v-if="openSophieModal"
        class="fixed bg-black/50 inset-0 z-50 isolate backdrop-blur py-10 lg:py-[60px] px-4 lg:px-[68px] flex justify-center items-center"
      >
        <ChatWithSophie
          :isModal="true"
          @openSophieModal="openSophieModal = false"
        />
      </div>
    </Transition>
  </div>
  <!-- <div
    class="!hidden flex flex-col items-center gap-4 h-dvh bg-[#f5faff] overflow-y-auto no-scrollbar w-screen"
  >
    <div class="mt-8">
      <NuxtImg src="/images/logo/logo.svg" class="w-[130px] h-[22px]" />
    </div>
    <div class="flex-1 w-full flex flex-col items-center px-5">
      <div class="flex flex-col items-center">
        <NuxtImg src="/images/pre-application.png" class="max-w-[310px]" />
        <p class="font-medium text-[#181D27] text-center w-[80%]">
          To fully experience our website, we recommend accessing it via a
          desktop or larger device.
        </p>
      </div>
      <div class="bg-white p-4 mt-4 w-full max-w-[350px] rounded-xl">
        <div class="border border-[#E9EAEB] rounded-lg overflow-hidden">
          <NuxtImg src="/images/handbook.png" class="w-full h-[200px]" />
        </div>
        <div class="mt-4">
          <h2 class="text-lg font-semibold text-[#181D27] text-center">
            100 pages Study Abroad Handbook
          </h2>
          <p class="text-center text-sm text-[#535862] mt-2">
            Insider playbook: How to navigate in the process, admission
            strategies and hacks from students who've been there and won the
            game.
          </p>
        </div>
        <div class="mt-6">
          <a
            href="https://docs.google.com/document/d/1Pl2w7QN0SztPoa-JLdhIUiUBwcmawdaCMJkuYHaNdmQ/edit?tab=t.6lmrdwvzpzo5"
            target="_blank"
            download
            class="font-semibold text-white bg-[#1570EF] rounded-lg py-2.5 px-5 text-center block"
          >
            View Handbook
          </a>
        </div>
      </div>
    </div>
    <div>
      <p class="text-[#EE46BC] text-sm font-medium pb-4">
        {{ `Thank you <3` }}
      </p>
    </div>
  </div> -->
</template>
<script setup lang="ts">
const route = useRoute();

const openSophieModal = ref<boolean>(false);
</script>
