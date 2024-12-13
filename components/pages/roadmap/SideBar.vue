<template>
  <div class="h-full">
    <Transition name="slide">
      <div
        v-if="isSideBar"
        class="bg-[#292929] w-[376px] h-full p-6 flex flex-col gap-6"
      >
        <div class="flex justify-between items-center">
          <h1 class="text-2xl 2xl:text-3xl font-semibold">Roadmap</h1>
          <!-- <div @click="isSideBar = !isSideBar" class="cursor-pointer">
            <IconSideBar />
          </div> -->
        </div>
        <OverviewCard />
        <!-- <ProfileCard /> -->
      </div>
    </Transition>
    <Transition name="fade">
      <div
        v-if="!isSideBar"
        @click="isSideBar = !isSideBar"
        class="bg-[#292929] size-fit p-3 rounded-lg mt-3 ml-3"
      >
        <IconSideBar />
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
const isSideBar = ref<boolean>(true);
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 400ms;
  transform: all 400ms;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 300ms;
  transform: all 300ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
