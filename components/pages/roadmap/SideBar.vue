<template>
  <div
    class="h-full p-6 flex flex-col gap-3 transition-all transform duration-500 ease-in-out"
    :class="[isSideBar ? 'w-[400px]' : 'w-[110px] group hover:w-[400px]']"
  >
    <div
      :class="{ 'hidden group-hover:flex ': !isSideBar }"
      class="flex justify-between items-center py-[14px]"
    >
      <NuxtLink to="/">
        <NuxtImg
          class="w-[164px] h-[26px]"
          src="/images/logo/logo.svg"
          alt="Logo"
        />
      </NuxtLink>
      <div @click="isSideBar = !isSideBar" class="cursor-pointer">
        <IconSideBar width="32" height="32" />
      </div>
    </div>
    <div
      @click="isSideBar = !isSideBar"
      :class="{ hidden: isSideBar }"
      class="flex justify-center h-[60px] cursor-pointer py-[14px] group-hover:hidden"
    >
      <IconLogoArrowster />
    </div>
    <!-- tabs -->
    <div class="flex-1">
      <div
        class="p-3 flex gap-3 items-center justify-start rounded-lg cursor-pointer overflow-hidden"
        :class="{
          'text-[#8380FF] bg-[rgba(131,128,255,0.20)]': activeTab === 'home',
        }"
        @click="updateTab('home')"
      >
        <div>
          <IconChecklist />
        </div>
        <span
          class="text-xl font-medium"
          :class="[isSideBar ? 'block' : 'hidden group-hover:block']"
          >Home</span
        >
      </div>
      <!-- <div
        class="p-3 flex gap-3 items-center justify-start rounded-lg cursor-pointer overflow-hidden"
        :class="{
          'text-[#8380FF] bg-[rgba(131,128,255,0.20)]':
            activeTab === 'school_finder',
        }"
        @click="updateTab('school_finder')"
      >
        <div>
          <IconSearch />
        </div>
        <span
          class="text-xl font-medium text-nowrap"
          :class="[isSideBar ? 'block' : 'hidden group-hover:block']"
          >School Finder</span
        >
      </div>
      <div
        class="p-3 flex gap-3 items-center justify-start rounded-lg cursor-pointer overflow-hidden"
        :class="{
          'text-[#8380FF] bg-[rgba(131,128,255,0.20)]':
            activeTab === 'counselor_service',
        }"
        @click="updateTab('counselor_service')"
      >
        <div>
          <IconCap />
        </div>
        <span
          class="text-xl font-medium text-nowrap"
          :class="[isSideBar ? 'block' : 'hidden group-hover:block']"
          >Counselor Service</span
        >
      </div> -->
    </div>
    <!--  -->
    <div class="bg-[#212121] h-[1px] w-full" />
    <div class="flex items-center " :class="[isSideBar ? 'justify-between' : 'group-hover:justify-between justify-center' ]">
      <div
        @click="updateTab('user_profile')"
        class="flex items-center group-hover:justify-start gap-2 cursor-pointer"
        :class="{ 'justify-center': !isSideBar }"
      >
        <div
          class="size-9 min-w-9 border border-white rounded-full overflow-hidden"
        >
          <NuxtImg src="/images/user.png" class="size-full object-cover" />
        </div>
        <div
          class="text-[#F3F3F3] font-medium text-nowrap"
          :class="[isSideBar ? 'block' : 'hidden group-hover:block']"
        >
          Damian Nguyen
        </div>
      </div>
      <div :class="{ 'hidden': !isSideBar }" class="cursor-pointer group-hover:block" @click="logout">
        <IconLogOut />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["toggleSideBar", "updateTab"]);

const isSideBar = ref<boolean>(true);
const activeTab = ref<"home" | "school_finder" | "counselor_service">("home");

const updateTab = (item) => {
  activeTab.value = item;
  emit("updateTab", item);
};

const logout = () => {
  const token = useCookie("token");
  token.value = "";
  navigateTo("/login");
};
</script>
