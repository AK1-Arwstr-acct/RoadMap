<template>
  <div
    class="bg-white flex justify-between px-6 py-4 border-b border-[#E9EAEB]"
  >
    <div class="flex items-center text-lg font-medium text-[#535862]">
      <IconSun />
      <h4 class="text-base inline-block">Good morning</h4>
      <p v-if="appStore.userData?.name" class="text-[#181D27] text-base"><span class="text-[#535862]">,&nbsp;</span>{{ appStore.userData?.name }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p @click="pricing" class="px-4 py-2.5 border border-[#D5D7DA] rounded-lg font-medium text-[#414651] cursor-pointer text-sm">Pricing</p>
      <!-- <div class="cursor-pointer">
          <IconBell />
      </div> -->
      <div class="cursor-pointer">
        <NuxtImg :src=" appStore.userImagePreview || appStore.userData?.avatar || '/images/avatar-profile-photo.png'" alt="user-icon" class="size-10 rounded-full" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from '~/stores/AppStore';

const emit = defineEmits(["updateTab"]);

const appStore = useAppStore();

const localePath = useLocalePath()

const pricing = () => {
  // navigateTo(localePath("/pricing"))
}
</script>