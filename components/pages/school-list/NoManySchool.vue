<template>
  <div class="flex flex-col items-center text-center w-[276px]">
    <IconTabSophie width="56" height="56" class="text-[#ED77FF] mb-5" />
    <p class="text-[#181D27] font-medium mb-2">Not seeing many schools?</p>
    <p class="text-[#535862] text-sm">
      {{
        $t(
          "schoolList_page.if_youd_like_more_guidance_or_personalized_suggestions_our_team_is_here_to_help"
        )
      }}
    </p>
    <div class="mt-5">
      <NuxtLinkLocale
        :to="'/pricing'"
        class="text-sm font-semibold text-white py-2 px-3.5 bg-[#1570EF] rounded-lg"
      >
        {{ $t("schoolList_page.talk_to_our_team") }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
