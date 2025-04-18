<template>
  <!-- Desktop View -->
  <div
    class="bg-white hidden lg:flex justify-between px-6 py-4 border-b-[1.5px] border-gray-200"
  >
    <div class="flex items-center text-xl font-medium text-[#535862]">
      <IconMorning v-if="time >= 5 && time < 12" />
      <IconAfternoon v-else-if="time >= 12 && time < 18" />
      <IconEvening v-else-if="time >= 18 && time < 22" />
      <IconNight v-else />
      <p class="inline-block ml-1">{{ getGreeting }}</p>
      <p v-if="appStore.userData?.name" class="text-[#181D27]">
        <span class="text-[#535862]">,&nbsp;</span>{{ appStore.userData?.name }}
      </p>
    </div>
    <div v-if="appStore.authenticatedUser" class="flex gap-6 items-center">
      <NuxtLinkLocale to="/pricing">
        <p
          class="px-4 py-2.5 border-[1.5px] border-[#1570EF] rounded-lg font-semibold text-white bg-[#1570EF] cursor-pointer text-sm"
        >
          {{ t('dashboard.talk_to_us') }}
        </p>
      </NuxtLinkLocale>
      <div
        v-if="appStore.authenticatedUser"
        class="cursor-pointer rounded-full overflow-hidden size-10"
      >
        <NuxtLinkLocale to="/dashboard/profile">
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
        </NuxtLinkLocale>
      </div>
      <div
        v-else
        @click="isMobileSideBarOpen = true"
        class="cursor-pointer rounded-full overflow-hidden size-10"
      >
        <img src="/images/chat-bot.png" alt="user-icon" class="size-full" loading="eager" />
      </div>
    </div>
    <div v-else class="flex gap-3">
      <NuxtLinkLocale to="/login">
        <button
          class="border border-gray-200 py-2.5 px-3.5 rounded-lg text-[#414651] text-sm font-semibold shadow-[0px_1px_2px_0px_#0A0D120D]"
        >
          {{ t("dashboard.login") }}
        </button>
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/signup">
        <button
          class="border border-[#1570EF] bg-[#1570EF] p-2.5 px-3.5 rounded-lg text-white text-sm font-semibold shadow-[0px_1px_2px_0px_#0A0D120D]"
        >
        {{ t("dashboard.signup") }}
        </button>
      </NuxtLinkLocale>
    </div>
  </div>

  <!-- Mobile View -->
  <div class="py-5 px-3 border-b border-gray-200 lg:hidden">
    <div class="flex justify-between items-center">
      <NuxtLinkLocale to="/dashboard" class="no-underline">
        <div
          class="cursor-pointer flex items-center gap-2"
        >
          <IconArrowsterLogo class="size-8 min-w-8" />
          <img
            src="/images/logo/logo.svg"
            alt="Logo"
            class="w-full h-5"
            loading="eager"
          />
        </div>
      </NuxtLinkLocale>
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
        <img src="/images/chat-bot.png" alt="user-icon" class="size-full" loading="eager" />
      </div>
    </div>
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
        @updateTab="updateTab"
      />
    </Transition>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import MobileSideBar from "./MobileSideBar.vue";

const emit = defineEmits(["updateTab"]);

const appStore = useAppStore();
const { t } = useI18n();

const time = ref<number>(0);
const isMobileSideBarOpen = ref<boolean>(false);

const close = () => {
  isMobileSideBarOpen.value = false;
};

const getGreeting = computed(() => {
  const hours = new Date().getHours();
  time.value = hours;
  if (hours >= 5 && hours < 12) {
    return t("dashboard.navbar.morning");
  } else if (hours >= 12 && hours < 18) {
    return t("dashboard.navbar.afternoon");
  } else if (hours >= 18 && hours < 22) {
    return t("dashboard.navbar.evening");
  } else {
    return t("dashboard.navbar.night");
  }
});

const updateTab = (value: string) => {
  emit('updateTab', value)
}
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
