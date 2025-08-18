<template>
  <div
    class="bg-background-brand-subtle rounded-xl p-4 flex gap-4 md:flex-col"
  >
    <div class="order-1 md:order-none">
      <IconIdea />
    </div>
    <div>
      <div class="font-semibold text-text-brand mb-1">
        {{ $t("homepage.need_more_advice?") }}
      </div>
      <div class="text-sm text-text-brand mb-4">
        {{
          $t(
            "homepage.talk_to_a_real_counselor_and_get_honest_helpful_answers_totally_free"
          )
        }}
      </div>
      <NuxtLinkLocale
        to="/pricing"
        class="border border-border-brand bg-background-brand md:bg-transparent text-text-constant-white md:text-text-brand rounded-lg px-[18px] py-1.5 font-semibold text-sm w-fit"
      >
        {{ $t("homepage.get_mentorship") }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
