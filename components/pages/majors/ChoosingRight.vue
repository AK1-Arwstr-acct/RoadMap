<template>
  <div class="text-text-base flex flex-col gap-4 leading-7">
    <p class="font-semibold text-xl md:text-2xl">{{ $t("majors_page.guide.choosingRight.heading") }}</p>
    <!-- 1 -->
    <p class="">
      {{ $t("majors_page.guide.choosingRight.the_final_goal_after_choosing") }}
    </p>
    <!-- 2 -->
    <div class="flex flex-col gap-3">
      <div>
        <p class="font-semibold">{{ $t("majors_page.guide.choosingRight.about_your_field") }}</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            {{ $t("majors_page.guide.choosingRight.not_just_the_broad_major_name") }}
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">{{ $t("majors_page.guide.choosingRight.career_prospects") }}</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>{{ $t("majors_page.guide.choosingRight.potential_job_positions") }}</li>
          <li>{{ $t("majors_page.guide.choosingRight.target_companies_for_employment") }}</li>
          <li>{{ $t("majors_page.guide.choosingRight.their_specific_hiring_requirements") }}</li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">{{ $t("majors_page.guide.choosingRight.preparation_process") }}</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            {{ $t("majors_page.guide.choosingRight.year_by_year_development_plan") }}
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">{{ $t("majors_page.guide.choosingRight.about_universities") }}</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>{{ $t("majors_page.guide.choosingRight.specific_criteria_for_choosing_suitable_schools") }}</li>
          <li>{{ $t("majors_page.guide.choosingRight.program_rankings_internship") }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
