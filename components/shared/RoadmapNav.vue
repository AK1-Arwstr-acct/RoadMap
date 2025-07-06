<template>
  <div class="bg-white py-5 px-3 lg:hidden">
    <div class="flex justify-between items-center">
      <div class="cursor-pointer" @click="appTrackerStore.isRoadmapSidebarOPen = !appTrackerStore.isRoadmapSidebarOPen">
        <IconHamburger />
      </div>
      <NuxtLinkLocale to="/" class="no-underline">
        <IconArrowsterLogo class="size-8 min-w-8" />
      </NuxtLinkLocale>
      <div>
        <!-- @click="isMobileSideBarOpen = true" -->
        <div
          v-if="appStore.authenticatedUser || tokenExists"
          @click="handleProfile"
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
        <!-- @click="isMobileSideBarOpen = true" -->
        <div
          v-else
          @click="handleProfile"
          class="cursor-pointer rounded-full overflow-hidden size-10"
        >
          <img
            src="/images/chat-bot.png"
            alt="user-icon"
            class="size-full"
            loading="eager"
          />
        </div>
      </div>
    </div>
    <!-- <Transition name="fade">
      <div
        v-if="isMobileSideBarOpen"
        @click="isMobileSideBarOpen = false"
        class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />
    </Transition>
    <Transition name="slideModal">
      <component
        :is="MobileSideBar"
        v-if="isMobileSideBarOpen"
        @close="close"
        @updateTab="updateTab"
      />
    </Transition> -->
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import useAppTrackerStore from "~/stores/AppTrackerStore";

const appTrackerStore = useAppTrackerStore();
const appStore = useAppStore();
const localePath = useLocalePath();
const tokenExists = useCookie("token");

const handleProfile = () => {
  navigateTo(localePath("/profile"));
};
</script>
