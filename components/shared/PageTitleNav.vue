<template>
  <div
    class="hidden lg:flex justify-between items-center px-9 py-4 bg-surface"
  >
    <div class="text-2xl font-semibold text-text-base">Choose your major</div>
    <div class="flex gap-4">
      <div
        v-if="appStore.authenticatedUser || tokenExists"
        class="flex gap-4 items-center"
      >
        <NuxtLinkLocale to="/pricing">
          <p
            class="px-5 py-2.5 rounded-lg font-semibold text-text-base bg-background-neutral-bold cursor-pointer text-sm"
          >
            <!-- {{ t("dashboard.talk_to_us") }} -->
              Book a Meeting
          </p>
        </NuxtLinkLocale>
        <div>
          <IconNotification />
        </div>
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
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

const emit = defineEmits(["updateTab"]);
const localePath = useLocalePath();

const appStore = useAppStore();
const { t } = useI18n();
const route = useRoute();

const isMobileSideBarOpen = ref<boolean>(false);
const tokenExists = useCookie("token");

watch(
  () => route.path,
  () => {}
);

onMounted(() => {});
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
