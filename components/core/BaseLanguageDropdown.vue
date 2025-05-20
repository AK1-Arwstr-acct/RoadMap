<template>
  <div class="relative">
    <div
      @click="isDropdownOpen = !isDropdownOpen"
      @touchstart.prevent="isDropdownOpen = !isDropdownOpen"
      class="bg-white rounded-lg border-[1.5px] border-gray-200 py-2.5 px-4 w-fit transition-colors duration-150 ease-in-out flex justify-between gap-2 items-center cursor-pointer"
      :class="{
        'shadow-[0px_0px_0px_4px_rgba(225,225,225,0.24)]': isDropdownOpen,
        '!w-full' : isMobile
      }"
    >
      <div class="size-5 rounded-full overflow-hidden">
        <img
          :src="selectedOption?.icon"
          alt="country-flag"
          class="size-full object-cover"
          loading="eager"
        />
      </div>
      <div class="flex-1">
        <p class="text-[#252629] text-left truncate w-full">
          {{ selectedOption?.label }}
        </p>
      </div>
      <div
        class="transition-transform duration-200 ease-in-out transform"
        :class="{ ' rotate-180': isDropdownOpen }"
      >
        <IconChevronDown stroke="#414651" />
      </div>
    </div>
    <div
      v-if="isDropdownOpen"
      v-click-outside="closeDropdown"
      class="absolute right-0 w-[240px] border-[1.5px] border-gray-200 bg-white z-20 overflow-y-auto px-1.5 py-1.5 rounded-xl top-[54px]"
      :class="{'!w-full' : isMobile}"
    >
      <div
        v-for="(item, index) in ALL_LOCALES"
        :key="index"
        class="flex items-center cursor-pointer rounded-md"
      >
        <label
          class="text-[#414651] text-left cursor-pointer w-full flex items-center gap-2 py-2.5 px-2 truncate justify-between"
        >
          <input
            type="radio"
            :value="item"
            v-model="selectedOption"
            @change="setLanguage(item.value)"
            :checked="selectedOption?.id === item.id"
            class="min-w-5 h-5 cursor-pointer hidden"
          />
          <span
            class="truncate text-[#414651] font-medium flex items-center gap-2"
          >
            <div class="size-5 rounded-full overflow-hidden">
              <img :src="item?.icon" alt="" class="size-full object-cover" />
            </div>
            {{ item.label }}</span
          >
          <span v-if="selectedOption?.id === item.id">
            <IconTick stroke="#1570EF" strokeWidth="2" />
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const route = useRoute();

defineProps({
  isMobile: {
    type: Boolean ,
    defauldt: false
  },
})

const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref(
  route.path.includes("/vi") ? ALL_LOCALES[1] : ALL_LOCALES[0]
);

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const setLanguage = (language: string) => {
  appStore.setLocale(language);
  closeDropdown();
};
watch(
  () => route.path,
  () => {
    selectedOption.value = route.path.includes("/vi")
      ? ALL_LOCALES[1]
      : ALL_LOCALES[0];
  }
);
</script>
