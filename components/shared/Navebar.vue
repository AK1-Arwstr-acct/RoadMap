<template>
  <div
    class="h-[76px] py-4 px-6 bg-[#292929] flex justify-between items-center border-b border-[#686868]"
  >
    <NuxtLink to="/">
      <NuxtImg
        class="w-[164px]"
        src="/images/logo/logo.svg"
        alt="Logo"
      />
    </NuxtLink>
    <NuxtLink to="/my-profile" class="flex items-center gap-2">
        <div class="size-9 border border-white rounded-full overflow-hidden" >
            <NuxtImg src="/images/user.png" class="size-full object-cover" />
        </div>
        <div class="text-[#F3F3F3] font-medium">
            Damian Nguyen
        </div>
    </NuxtLink>
  </div>
</template>
