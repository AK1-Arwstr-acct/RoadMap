<template>
  <div class="text-text-base flex flex-col gap-6 leading-7">
    <div class="flex flex-col gap-2 text-wrap">
      <div>
        {{ $t("majors_page.guide.majorsGuide.p1.when_preparing_to_study") }}
        <span class="font-semibold">{{
          $t("majors_page.guide.majorsGuide.p1.education_quality")
        }}</span>
        and
        <span class="font-semibold">{{
          $t(
            "majors_page.guide.majorsGuide.p1.career_prospects_settlement_opportunities"
          )
        }}</span
        >.
      </div>
      <div>
        {{ $t("majors_page.guide.majorsGuide.p2") }}
      </div>
      <div>
        {{ $t("majors_page.guide.majorsGuide.p3.light") }}
        <span class="font-semibold">{{
          $t("majors_page.guide.majorsGuide.p3.bold")
        }}</span
        >.
      </div>
      <div>
        {{ $t('majors_page.guide.majorsGuide.p4') }}
      </div>
    </div>

    <div class="bg-background-neutral rounded-2xl p-4 flex items-start gap-4">
      <div class="flex-shrink-0 mt-1">
        <IconIdea />
      </div>
      <div>
        <div class="font-semibold mb-1 text-text-brand">{{ $t('majors_page.guide.majorsGuide.key_principle') }}</div>
        <div>
          {{ $t('majors_page.guide.majorsGuide.there_are_no_hot_majors') }}
        </div>
      </div>
    </div>
    <div>{{ $t('majors_page.guide.majorsGuide.so_how_do_you_choose_a_major') }}</div>
  </div>
</template>
