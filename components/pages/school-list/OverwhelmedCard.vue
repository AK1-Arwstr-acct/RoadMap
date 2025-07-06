<template>
  <div
    class="border-[1.5px] border-[#0000001A] rounded-2xl p-[16px] shadow-[0px_1px_2px_0px_#1018280D] flex flex-col lg:flex-row lg:items-start gap-4 bg-white"
  >
    <div class="flex gap-4 flex-1 items-center">
      <div
        class="rounded-xl overflow-hidden w-[108px] h-[78px] lg:min-w-[150px] lg:w-[150px] lg:h-[109px] flex justify-center items-center"
      >
        <img
          src="/images/pre-application.png"
          alt="pre-application"
          class="size-full object-contain"
        />
      </div>
      <div class="w-full flex flex-col">
        <p class="text-[#111827] font-semibold">Overwhelmed by options?</p>
        <p class="text-[#535862] text-sm mt-0.5">
          Select your major and our AI will match you with the ones that match
          100%
        </p>
        <div class="hidden lg:block max-w-[142px] mt-3">
          <SophieRecommendation :isOverwhelmed="true" />
        </div>
      </div>
    </div>
    <div class="lg:hidden">
      <SophieRecommendation :isOverwhelmed="true" />
    </div>
  </div>
</template>
