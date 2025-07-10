<template>
  <div
    class="bg-[#F5FAFF] rounded-xl p-4 flex gap-4 md:flex-col border border-[#E0EAFF]"
  >
    <div class="order-1 md:order-none">
      <IconIdea />
    </div>
    <div>
      <div class="font-semibold text-[#2563EB] mb-1">
        {{ $t("homepage.need_more_advice?") }}
      </div>
      <div class="text-[#2563EB] text-sm mb-4">
        {{
          $t(
            "homepage.talk_to_a_real_counselor_and_get_honest_helpful_answers_totally_free"
          )
        }}
      </div>
      <NuxtLinkLocale
        to="/pricing"
        class="border border-[#2563EB] md:border-[#93C5FD] bg-[#2563EB] md:bg-transparent text-white md:text-[#1570EF] rounded-lg px-[18px] py-1.5 font-semibold text-sm w-fit"
      >
        {{ $t("homepage.get_mentorship") }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
