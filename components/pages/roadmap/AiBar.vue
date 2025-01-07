<template>
  <div class="px-6 pt-6 pb-4">
    <div
      class="p-3 bg-[#18191B] shadow-[0px_4px_24px_0px_rgba(26,26,26,0.60)] border border-[#212121] rounded-2xl"
    >
      <div class="bg-[#212225] rounded-full p-3 flex gap-2 items-center">
        <IconPaperClip />
        <div class="flex-1">
          <input
            type="text"
            placeholder="Ask Sophie..."
            class="w-full border-none bg-transparent outline-none placeholder:text-white"
          />
        </div>
        <IconSendArrow />
      </div>
    </div>
  </div>
</template>
