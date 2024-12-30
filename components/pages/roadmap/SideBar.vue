<template>
  <div class="h-full">
    <Transition name="slideBar">
      <div
        v-if="isSideBar"
        class="bg-[#292929] w-[376px] h-full p-6 flex flex-col gap-6"
      >
        <div class="flex justify-between items-center">
          <h1 class="text-2xl 2xl:text-3xl font-semibold">Roadmap</h1>
          <div @click="isSideBar = !isSideBar" class="cursor-pointer">
            <IconSideBar />
          </div>
        </div>
        <OverviewCard />
        <!-- <ProfileCard /> -->
      </div>
    </Transition>
    <div
      v-if="!isSideBar"
      @click="isSideBar = !isSideBar"
      class="bg-[#292929] size-fit p-3 rounded-lg mt-6 ml-3"
    >
      <IconSideBar />
    </div>
  </div>
</template>
<script setup lang="ts">
const isSideBar = ref<boolean>(true);
</script>
<style>
.slideBar-enter-active,
.slideBar-leave-active {
  transition: all 300ms ease-in-out;
}

.slideBar-enter-from,
.slideBar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slideBar-enter-to,
.slideBar-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
