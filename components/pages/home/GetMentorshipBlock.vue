<template>
  <div
    class="bg-[#F5FAFF] rounded-xl p-4 flex gap-4 md:flex-col border border-[#E0EAFF]"
  >
    <div class="order-1 md:order-none">
      <IconIdea />
    </div>
    <div>
      <div class="font-semibold text-[#2563EB] mb-1">Need more advice?</div>
      <div class="text-[#2563EB] text-sm mb-4">
        Talk to a real counselor and get honest, helpful answers, totally free.
      </div>
      <NuxtLinkLocale
        to="/pricing"
        class="border border-[#2563EB] md:border-[#93C5FD] bg-[#2563EB] md:bg-transparent text-white md:text-[#1570EF] rounded-lg px-[18px] py-1.5 font-semibold text-sm w-fit"
      >
        Get mentorship
      </NuxtLinkLocale>
    </div>
  </div>
</template>
