<template>
  <div class="fixed z-50 inset-0 bg-overlay">
    <div class="relative size-full">
      <div
        v-click-outside="() => emits('close')"
        class="bg-background-base rounded-xl px-2 pt-2 pb-6 w-[320px] flex flex-col gap-4 absolute right-8 top-20"
      >
        <div class="border-b border-divider pb-4 px-2">
          <div class="flex items-center gap-4">
            <div class="cursor-pointer rounded-full overflow-hidden size-10">
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
            <div class="py-4">
              <p class="text-text-base font-semibold">
                {{ appStore.userData?.name }}
              </p>
              <p class="text-text-neutral-subtle text-sm">
                {{ appStore.userData?.email }}
              </p>
            </div>
          </div>
          <NuxtLinkLocale
            @click="emits('close')"
            to="/profile"
            class="block rounded-lg bg-background-neutral-bold text-text-base py-2.5 w-full text-center font-semibold"
            >{{ $t("dashboard.view_profile") }}</NuxtLinkLocale
          >
        </div>
        <div class="px-2">
          <p @click="logOut" class="font-semibold cursor-pointer text-text-base">{{ $t("dashboard.logout") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const localePath = useLocalePath();

const emits = defineEmits(["close"]);

const logOut = async () => {
  emits("close");
  const checkToken = useCookie("token");
  if (checkToken.value) {
    checkToken.value = null;
  }
  appStore.checkAuthenticatedUser();
  appStore.userData = undefined;
  await navigateTo(localePath("/login"));
};
</script>
