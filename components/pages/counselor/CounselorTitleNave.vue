<template>
  <div
    class="flex justify-between items-center px-4 md:px-9 py-4 bg-surface border-b border-divider"
  >
    <div class="text-2xl font-semibold text-text-base leading-[36px]">
      {{ title }}
    </div>
    <div class="flex gap-4">
      <div
        v-if="appStore.authenticatedUser || tokenExists"
        class="flex gap-4 items-center"
      >
        <!-- <div>
          <IconNotification />
        </div> -->
        <div
          v-if="appStore.authenticatedUser || tokenExists"
          @click="counselorStore.isCounselorMenuOpen = true"
          class="cursor-pointer rounded-full overflow-hidden size-10 min-h-10 min-w-10"
        >
          <img
            v-if="appStore.userData?.avatar"
            :src="appStore.userImagePreview || appStore.userData?.avatar"
            alt="user-icon"
            class="size-full object-cover"
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
          class="cursor-pointer rounded-full overflow-hidden size-10 min-h-10 min-w-10"
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
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import useCounselorStore from "~/stores/counselorStore";

const emit = defineEmits(["updateTab"]);

const appStore = useAppStore();
const counselorStore = useCounselorStore();
const route = useRoute();

defineProps({
  title: {
    type: String,
    default: "",
  },
});

const isMobileSideBarOpen = ref<boolean>(false);
const tokenExists = useCookie("token");

watch(
  () => route.path,
  () => {}
);

onMounted(() => {});
</script>
