<template>
  <div class="flex flex-col gap-6 animate-pulse">
    <div class="h-[18px] w-[60%] bg-[#D5D7DA] rounded-lg" />
    <div
      v-for="a in 2"
      class="border border-gray-200 rounded-2xl p-8 shadow-[0px_1px_2px_0px_#1018280D] flex items-center gap-5 bg-white"
    >
      <div class="size-12 rounded-lg bg-[#D5D7DA]" />
      <div class="w-full">
          <div class="rounded-lg h-[30px] w-[60%] bg-[#D5D7DA]" />
          <div class="rounded-lg h-3.5 w-[90%] bg-[#D5D7DA] mt-3.5" />
      </div>
    </div>
  </div>
</template>
