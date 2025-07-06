<template>
  <div class="flex flex-col gap-4 animate-pulse">
    <div
      v-for="a in 10"
      class="border border-gray-200 rounded-2xl p-4 shadow-[0px_1px_2px_0px_#1018280D] flex flex-col lg:flex-row lg:items-start gap-4 bg-white"
    >
      <div class="flex gap-4 flex-1 items-center">
        <div class="size-[110px] min-w-[110px] rounded-xl bg-[#D5D7DA]" />
        <div class="w-full flex flex-col gap-2">
          <div class="rounded-[4px] h-[22px] w-2/5 lg:w-[20%] bg-[#D5D7DA]" />
          <div
            class="rounded-[4px] h-[22px] w-full lg:w-[80%] bg-[#D5D7DA]"
          />
          <div
            class="rounded-[4px] h-[22px] w-full lg:w-[80%] bg-[#D5D7DA]"
          />
        </div>
      </div>
      <div
        class="rounded-lg h-[32px] w-full lg:w-[100px] bg-[#D5D7DA] border"
      />
    </div>
  </div>
</template>
