<template>
  <div class="h-full">
    <Transition name="slide">
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
.slide-enter-active,
.slide-leave-active {
  transition: all 900ms ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  /* width: 0px; */
  /* opacity: 0; */
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  /* width: 100%; */
  /* opacity: 1; */
}
</style>
