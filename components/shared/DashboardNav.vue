<template>
  <!-- Desktop View -->
  <div
    class="bg-white hidden md:flex justify-between px-6 py-4 border-b-[1.5px] border-gray-200"
  >
    <div class="flex items-center text-xl font-medium text-[#535862]">
      <IconMorning v-if="time >= 5 && time < 12" />
      <IconAfternoon v-else-if="time >= 12 && time < 18" />
      <IconEvening v-else-if="time >= 18 && time < 22" />
      <IconNight v-else />
      <h4 class="inline-block ml-1">{{ getGreeting }}</h4>
      <p v-if="appStore.userData?.name" class="text-[#181D27]">
        <span class="text-[#535862]">,&nbsp;</span>{{ appStore.userData?.name }}
      </p>
    </div>
    <div class="flex gap-6 items-center">
      <p
        @click="pricing"
        class="px-4 py-2.5 border-[1.5px] border-[#1570EF] rounded-lg font-semibold text-white bg-[#1570EF] cursor-pointer text-sm"
      >
        Get Started – Talk to Us
      </p>
      <!-- <div class="cursor-pointer">
          <IconBell />
      </div> -->
      <div
        v-if="appStore.authenticatedUser"
        @click="navigateTo(localePath('/dashboard/profile'))"
        class="cursor-pointer rounded-full overflow-hidden size-10"
      >
        <img
          v-if="appStore.userData?.avatar"
          :src="appStore.userImagePreview || appStore.userData?.avatar"
          alt="user-icon"
          class="size-full"
        />
        <div
          v-else
          class="size-full bg-orange-500 flex items-center justify-center text-white font-medium uppercase text-xl"
        >
          <span>{{ appStore.userData?.name.charAt(0) }}</span>
        </div>
      </div>
      <div
        v-else
        @click="isMobileSideBarOpen = true"
        class="cursor-pointer rounded-full overflow-hidden size-10"
      >
        <NuxtImg src="/images/chat-bot.png" alt="user-icon" class="size-full" />
      </div>
    </div>
  </div>

  <!-- Mobile View -->
  <div class="py-5 px-3 border-b border-gray-200 md:hidden">
    <div class="flex justify-between items-center">
      <div
        @click="navigateTo(localePath('/dashboard'))"
        class="cursor-pointer flex items-center gap-2"
      >
        <IconArrowsterLogo class="size-8 min-w-8" />
        <NuxtImg
          src="/images/logo/logo.svg"
          alt="Logo"
          class="w-full h-5"
          loading="eager"
          preload
        />
      </div>
      <div
        v-if="appStore.authenticatedUser"
        @click="isMobileSideBarOpen = true"
        class="cursor-pointer rounded-full overflow-hidden size-10"
      >
        <img
          v-if="appStore.userData?.avatar"
          :src="appStore.userImagePreview || appStore.userData?.avatar"
          alt="user-icon"
          class="size-full"
        />
        <div
          v-else
          class="size-full bg-orange-500 flex items-center justify-center text-white font-medium uppercase text-xl"
        >
          <span>{{ appStore.userData?.name.charAt(0) }}</span>
        </div>
      </div>
      <div
        v-else
        @click="isMobileSideBarOpen = true"
        class="cursor-pointer rounded-full overflow-hidden size-10"
      >
        <NuxtImg src="/images/chat-bot.png" alt="user-icon" class="size-full" />
      </div>
    </div>
    <!--  -->
    <Transition name="fade">
      <div
        v-if="isMobileSideBarOpen"
        @click="isMobileSideBarOpen = false"
        class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm"
      />
    </Transition>
    <Transition name="slideModal">
      <component
        :is="MobileSideBar"
        v-if="isMobileSideBarOpen"
        @close="close"
      />
    </Transition>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import MobileSideBar from "./MobileSideBar.vue";

const appStore = useAppStore();

const localePath = useLocalePath();

const time = ref<number>(0);
const isMobileSideBarOpen = ref<boolean>(false);

const pricing = () => {
  navigateTo(localePath("/pricing"));
};

const close = () => {
  isMobileSideBarOpen.value = false;
};

const getGreeting = computed(() => {
  const hours = new Date().getHours();
  time.value = hours;
  if (hours >= 5 && hours < 12) {
    return "Good Morning";
  } else if (hours >= 12 && hours < 18) {
    return "Good Afternoon";
  } else if (hours >= 18 && hours < 22) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
});
</script>
<style scoped>
.slideModal-enter-active,
.slideModal-leave-active {
  transition: all 400ms;
  transform: all 400ms;
}

.slideModal-enter-from,
.slideModal-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slideModal-enter-to,
.slideModal-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
