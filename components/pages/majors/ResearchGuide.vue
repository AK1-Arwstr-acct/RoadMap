<template>
  <div class="text-text-base flex flex-col gap-4 leading-7">
    <p class="font-semibold text-xl md:text-2xl">
      {{ $t("majors_page.guide.researchGuide.heading") }}
    </p>
    <!-- 1 -->
    <p class="">
      {{ $t("majors_page.guide.researchGuide.details") }}
    </p>
    <!-- 2 -->
    <div class="flex flex-col gap-3">
      <span class="font-semibold">{{
        $t("majors_page.guide.researchGuide.key_notes_on_popular_majors")
      }}</span>
      <div>
        <p class="font-semibold">
          {{
            $t(
              "majors_page.guide.researchGuide.information_technology_computer_science"
            )
          }}
        </p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            {{
              $t("majors_page.guide.researchGuide.need_clear_specialization")
            }}
          </li>
          <li>
            {{
              $t(
                "majors_page.guide.researchGuide.require_early_personal_projects_for_job_applications"
              )
            }}
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">
          {{ $t("majors_page.guide.researchGuide.business") }}
        </p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            {{ $t("majors_page.guide.researchGuide.need_clear_direction") }}
          </li>
          <li>
            {{ $t("majors_page.guide.researchGuide.typical_specializations") }}
          </li>
          <li>
            {{
              $t(
                "majors_page.guide.researchGuide.prioritize_internship_experience_early"
              )
            }}
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">
          {{
            $t(
              "majors_page.guide.researchGuide.health_sciences_pharmacy_nursing_physical_therapy"
            )
          }}
        </p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            {{
              $t(
                "majors_page.guide.researchGuide.find_schools_ensuring_employment"
              )
            }}
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">
          {{
            $t(
              "majors_page.guide.researchGuide.research_aiming_for_masters_phd"
            )
          }}
        </p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            {{
              $t(
                "majors_page.guide.researchGuide.clearly_define_research_topics"
              )
            }}
          </li>
          <li>
            {{
              $t(
                "majors_page.guide.researchGuide.find_universities_with_high_research"
              )
            }}
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">
          {{ $t("majors_page.guide.researchGuide.law_medicine") }}
        </p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            {{
              $t(
                "majors_page.guide.researchGuide.generally_not_recommended_for_study_abroad"
              )
            }}
          </li>
        </ul>
      </div>
    </div>
    <!-- Sophie Help Section -->
    <div class="mt-9">
      <div class="flex items-center gap-3 mb-3">
        <div
          class="size-8 min-w-8 rounded-full overflow-hidden border border-border-neutral"
        >
          <img
            src="/images/chat-bot.png"
            alt="chat bot"
            class="object-cover object-center size-full"
            loading="eager"
          />
        </div>
        <div class="flex-1 flex items-center gap-2">
          <IconStar />
          <span
            class="font-semibold bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent"
            >{{ $t("majors_page.guide.researchGuide.need_help_deciding") }}{{ appStore.userData?.name ? `, ${appStore.userData?.name} ` : '' }}?
            {{
              $t("majors_page.guide.researchGuide.ask_sophie_for_your_case")
            }}</span
          >
        </div>
        <div class="transform -rotate-90 cursor-pointer">
          <IconChevronDown width="16" height="16" stroke="text-icon-neutral" />
        </div>
      </div>
      <!-- cards -->
      <div class="flex gap-4 flex-col md:flex-row">
        <div
          v-for="(question, idx) in commonQuestion"
          :key="idx"
          @click="handleCard(question.label)"
          class="flex-1 bg-background-neutral rounded-lg p-3 flex flex-col gap-2 cursor-pointer"
        >
          <component :is="question.icon" />
          <div class="font-semibold text-text-base text-sm">
            {{ question.label }}
          </div>
          <div class="text-text-neutral-subtle text-xs">
            {{ question.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useMajorStore from "~/stores/majorStore";
import type { OptionAttributes } from "~/types/home";
import IconBlueBag from "~/components/icons/IconBlueBag.vue";
import IconBooks from "~/components/icons/IconBooks.vue";
import IconColorPen from "~/components/icons/IconColorPen.vue";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const majorStore = useMajorStore();

const commonQuestion = ref<OptionAttributes[]>([
  {
    label: `Explore ${appStore.userMajors} in more detail`,
    value: "Sophie can find details of job focus, salary, and demand",
    icon: IconBlueBag,
  },
  {
    label: `What do students say about ${appStore.userMajors}`,
    value:
      "Sophie can dig into real stories and insights from students and professionals in the field on Reddit, forums, and more.",
    icon: IconBooks,
  },
  {
    label: "Compare majors",
    value:
      "Sophie compares fields, work, salary, and demand in the US & Vietnam to help you decide.",
    icon: IconColorPen,
  },
]);

const handleCard = (text: string) => {
  majorStore.inputText = text;
  majorStore.navigateFromTabInside = true;
  majorStore.activeTab = "chat";
};
</script>
