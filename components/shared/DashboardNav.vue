<template>
  <!-- Desktop View -->
  <div
    class="bg-white hidden lg:flex justify-between px-8 py-4 border-b-[1.5px] border-gray-200"
  >
    <NuxtLinkLocale
      to="/"
      class="flex gap-2 items-center cursor-pointer"
    >
      <IconArrowsterLogo class="size-8 min-w-8" />
      <img
        class="w-24"
        src="/images/logo/logo.svg"
        alt="Logo"
        loading="eager"
      />
    </NuxtLinkLocale>
    <div class="flex gap-4">
      <BaseLanguageDropdown />
      <div v-if="appStore.authenticatedUser || tokenExists" class="flex gap-4 items-center">
        <NuxtLinkLocale to="/pricing">
          <p
            class="px-4 py-2.5 border-[1.5px] border-[#1570EF] rounded-lg font-semibold text-white bg-[#1570EF] cursor-pointer text-sm"
          >
            {{ t("dashboard.talk_to_us") }}
          </p>
        </NuxtLinkLocale>
        <div
          v-if="appStore.authenticatedUser || tokenExists"
          class="cursor-pointer rounded-full overflow-hidden size-10"
        >
          <NuxtLinkLocale to="/profile">
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
          <img
            src="/images/chat-bot.png"
            alt="user-icon"
            class="size-full"
            loading="eager"
          />
        </div>
      </div>
      <div v-else class="flex gap-3">
        <NuxtLinkLocale to="/login">
          <button
            class="border border-gray-200 py-[11.5px] px-3.5 rounded-lg text-[#414651] text-sm font-semibold shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            {{ t("dashboard.login") }}
          </button>
        </NuxtLinkLocale>
        <NuxtLinkLocale to="/signup">
          <button
            class="border border-[#1570EF] bg-[#1570EF] py-[11.5px] px-3.5 rounded-lg text-white text-sm font-semibold shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            {{ t("dashboard.signup") }}
          </button>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>

  <!-- Mobile View -->
  <div class="bg-white py-5 px-3 border-b border-gray-200 lg:hidden">
    <div class="flex justify-between items-center">
      <NuxtLinkLocale to="/" class="no-underline">
        <div class="cursor-pointer flex items-center gap-2">
          <IconArrowsterLogo class="size-8 min-w-8" />
          <img
            src="/images/logo/logo.svg"
            alt="Logo"
            class="h-5"
            loading="eager"
          />
        </div>
      </NuxtLinkLocale>
      <div
        v-if="appStore.authenticatedUser || tokenExists"
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
        <img
          src="/images/chat-bot.png"
          alt="user-icon"
          class="size-full"
          loading="eager"
        />
      </div>
    </div>
    <Transition name="fade">
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
    </Transition>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import MobileSideBar from "./MobileSideBar.vue";

const emit = defineEmits(["updateTab"]);

const appStore = useAppStore();
const { t } = useI18n();

const isMobileSideBarOpen = ref<boolean>(false);
const tokenExists = useCookie("token");

const close = () => {
  isMobileSideBarOpen.value = false;
};

const updateTab = (value: string) => {
  emit("updateTab", value);
};
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
