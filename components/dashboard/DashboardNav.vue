<template>
  <div
    class="bg-white flex justify-between px-6 py-4 border-b border-[#E9EAEB]"
  >
    <div class="flex items-center text-xl font-medium text-[#535862]">
      <IconSun />
      <h4 class="inline-block ml-1">{{ getGreeting }}</h4>
      <p v-if="appStore.userData?.name" class="text-[#181D27]">
        <span class="text-[#535862]">,&nbsp;</span>{{ appStore.userData?.name }}
      </p>
    </div>
    <div class="flex gap-4 items-center">
      <p
        @click="pricing"
        class="px-4 py-2.5 border border-[#175CD3] rounded-lg font-semibold text-[#175CD3] cursor-pointer text-sm"
      >
        Upgrade
      </p>
      <!-- <div class="cursor-pointer">
          <IconBell />
      </div> -->
      <div @click="emit('updateTab', 'user_profile')" class="cursor-pointer">
        <NuxtImg
          :src="
            appStore.userImagePreview ||
            appStore.userData?.avatar ||
            '/images/avatar-profile-photo.png'
          "
          alt="user-icon"
          class="size-10 rounded-full"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

const emit = defineEmits(["updateTab"]);

const appStore = useAppStore();

const localePath = useLocalePath();

const pricing = () => {
  navigateTo(localePath("/pricing"))
};

const getGreeting = computed(() => {
  const hours = new Date().getHours();

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
