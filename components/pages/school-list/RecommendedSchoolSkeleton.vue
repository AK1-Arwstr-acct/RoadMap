<template>
  <div class="py-8 animate-pulse">
    <div class="bg-[#D5D7DA] rounded-lg h-[30px] w-[80%]" />
    <div class="bg-[#D5D7DA] rounded-lg h-[18px] w-[40%] mt-3" />
    <div class="mt-12 flex flex-col gap-6">
      <div
        v-for="a in 10"
        class="border border-gray-200 rounded-2xl p-8 shadow-[0px_1px_2px_0px_#1018280D] flex flex-col lg:flex-row lg:items-center gap-5 bg-white"
      >
        <div class="size-12 rounded-lg bg-[#D5D7DA]" />
        <div class="rounded-lg h-[30px] w-[80%] bg-[#D5D7DA]" />
      </div>
    </div>
  </div>
</template>
