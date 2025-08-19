<template>
  <div class="text-text-base flex flex-col gap-4 leading-7">
    <p class="font-semibold text-xl md:text-2xl">
      {{ $t("majors_page.guide.srengthGuide.heading") }}
    </p>
    <!-- 1 -->
    <div>
      <span class="font-semibold">{{
        $t("majors_page.guide.srengthGuide.analyze_your_personal_capabilities")
      }}</span>
      <div class="mt-1">
        {{
          $t(
            "majors_page.guide.srengthGuide.to_understand_yourself_better_we_recommend_taking_the"
          )
        }}
        <span class="text-text-brand font-semibold">{{
          $t("majors_page.guide.srengthGuide.big_five_personality_test")
        }}</span
        >.
        {{
          $t(
            "majors_page.guide.srengthGuide.this_tool_is_more_reliable_than_mbti"
          )
        }}
      </div>
    </div>
    <!-- 2 -->
    <div class="flex flex-col gap-3">
      <span class="font-semibold">{{
        $t(
          "majors_page.guide.srengthGuide.choose_based_on_career_clusters_framework"
        )
      }}</span>
      <div>
        {{
          $t(
            "majors_page.guide.srengthGuide.personality_tests_alone_arent_enough_for_major_selection"
          )
        }}
      </div>
      <div>
        <p class="font-semibold">
          {{ $t("majors_page.guide.srengthGuide.natural_abilities") }}
        </p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            {{
              $t(
                "majors_page.guide.srengthGuide.skills_you_learn_faster_than_others"
              )
            }}
          </li>
          <li>
            {{
              $t(
                "majors_page.guide.srengthGuide.example_quick_math_comprehension_trend_analysis_insight"
              )
            }}
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">
          {{ $t("majors_page.guide.srengthGuide.genuine_interests") }}
        </p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            {{
              $t(
                "majors_page.guide.srengthGuide.activities_you_never_tire_of_and_willingly_invest_time_learning_even_when_difficult"
              )
            }}
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">
          {{ $t("majors_page.guide.srengthGuide.extracurricular_activities") }}
        </p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            {{
              $t(
                "majors_page.guide.srengthGuide.closest_to_real_work_experience"
              )
            }}
          </li>
          <li>
            {{
              $t(
                "majors_page.guide.srengthGuide.example_enjoying_project_leadership_suggests_management_potential_debate_skills_might_suit_law_or_consulting"
              )
            }}
          </li>
        </ul>
      </div>
    </div>
    <div>
      {{
        $t(
          "majors_page.guide.srengthGuide.this_framework_helps_you_understand_why_you_are_suited_for_a_particular_field_extremely_useful_for_application_essays_and_interviews"
        )
      }}
    </div>
    <div
      class="rounded-2xl overflow-hidden border border-border-neutral-subtle bg-background-neutral-subtle flex items-center"
    >
      <div class="h-full md:min-h-[140px] w-[140px] p-3 md:p-0">
        <img
          src="/images/sophieQuiz.png"
          alt="application"
          class="size-full object-cover rounded-xl md:rounded-none"
        />
      </div>
      <div
        class="p-2 md:p-6 flex-1 flex flex-col md:flex-row items-start md:justify-between md:items-center gap-2 md:gap-6"
      >
        <div>
          <p
            class="text-xs font-semibold uppercase bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent"
          >
            {{
              $t(
                "majors_page.guide.srengthGuide.want_to_try_out_this_framework"
              )
            }}
          </p>
          <p class="text-text-base text-lg md:text-xl font-semibold">
            {{
              $t(
                "majors_page.guide.srengthGuide.find_your_major_with_sophie_ai"
              )
            }}
          </p>
          <p class="text-text-neutral-subtle text-sm">
            {{
              $t(
                "majors_page.guide.srengthGuide.identify_work_cluster_strengths_and_career_goals"
              )
            }}
          </p>
        </div>
        <button
          @click="startQuiz"
          class="rounded-lg px-4 py-2 bg-background-brand text-text-constant-white text-nowrap text-sm md:text-base font-semibold"
        >
          {{ $t("majors_page.guide.srengthGuide.start_your_quiz") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useMajorStore from "~/stores/majorStore";

const majorStore = useMajorStore();

const startQuiz = () => {
  majorStore.showQuiz = true;
  majorStore.isQuizStart = true;
  majorStore.activeTab = "chat";
};
</script>
