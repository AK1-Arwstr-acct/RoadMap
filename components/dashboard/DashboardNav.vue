<template>
  <div
    class="bg-white flex justify-between px-6 py-4 border-b-[1.5px] border-gray-200"
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
        Upgrade
      </p>
      <!-- <div class="cursor-pointer">
          <IconBell />
      </div> -->
      <div
        @click="emit('updateTab', 'user_profile')"
        class="cursor-pointer rounded-full overflow-hidden size-10"
      >
        <NuxtImg
          v-if="appStore.userData?.avatar"
          :src="appStore.userImagePreview || appStore.userData?.avatar"
          alt="user-icon"
          class="size-full"
          preload
        />
        <div
          v-else
          class="size-full bg-orange-500 flex items-center justify-center text-white font-medium uppercase text-xl"
        >
          <span>{{
            appStore.userData?.name
              .split(" ")
              .map((word) => word[0])
              .join("")
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

const emit = defineEmits(["updateTab"]);

const appStore = useAppStore();

const localePath = useLocalePath();

const time = ref<number>(0);

const pricing = () => {
  navigateTo(localePath("/pricing"));
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
