<template>
  <section>
    <p class="text-xl md:text-2xl font-semibold mb-4 text-text-base">
      {{ $t("majors_page.guide.faqGuide.heading") }}
    </p>
    <div
      class="border-[1.5px] border-border-neutral-subtle rounded-2xl px-6 text-text-base bg-background-base"
    >
      <div v-for="(faq, index) in faqList" :key="index" class="">
        <div
          class="flex items-start gap-4 py-4"
          :class="[{ 'border-b border-divider': index + 1 != faqList.length }]"
        >
          <div class="flex-1">
            <p
              class="sm:text-xl font-medium cursor-pointer"
              @click="toggleAnswer(index)"
            >
              {{ faq.question }}
            </p>
            <div
              class="overflow-hidden transition-all duration-300 ease-in-out leading-7"
              :class="
                isOpen[index]
                  ? 'max-h-[1200px] opacity-100 mt-2'
                  : 'max-h-0 opacity-0'
              "
            >
              <div v-if="index == 0" class="flex flex-col gap-2 pb-[18px]">
                <p>
                  {{
                    $t(
                      "majors_page.guide.faqGuide.answer1.many_students_focus_too_much"
                    )
                  }}
                </p>
                <p>
                  {{
                    $t(
                      "majors_page.guide.faqGuide.answer1.example_bachelor_of_commerce"
                    )
                  }}
                </p>
                <ul class="mt-1 list-disc list-inside pl-8 -indent-6">
                  <li>
                    <span class="font-semibold"
                      >{{
                        $t(
                          "majors_page.guide.faqGuide.answer1.university_of_sydney"
                        )
                      }}
                    </span>
                    {{
                      $t(
                        "majors_page.guide.faqGuide.answer1.research_and_theory_focused"
                      )
                    }}
                  </li>
                  <li>
                    <span class="font-semibold"
                      >{{
                        $t(
                          "majors_page.guide.faqGuide.answer1.monash_university"
                        )
                      }}
                    </span>
                    {{
                      $t(
                        "majors_page.guide.faqGuide.answer1.more_practice_oriented_with_strong"
                      )
                    }}
                  </li>
                </ul>
                <p>
                  <span class="font-semibold"
                    >{{ $t("majors_page.guide.faqGuide.answer1.tip") }}
                  </span>
                  {{
                    $t("majors_page.guide.faqGuide.answer1.instead_of_choosing")
                  }}
                </p>
              </div>
              <div v-else-if="index === 1" class="flex flex-col gap-2">
                <p>
                  {{ $t("majors_page.guide.faqGuide.answer2.youre_not_alone") }}
                </p>
                <ol
                  class="mt-1 list-decimal list-inside pl-4 -indent-4 flex flex-col gap-2"
                >
                  <li>
                    <span class="font-semibold">
                      {{
                        $t(
                          "majors_page.guide.faqGuide.answer2.you_can_usually_change"
                        )
                      }} </span
                    ><br />
                    <span>
                      {{
                        $t(
                          "majors_page.guide.faqGuide.answer2.most_universities_allow_students"
                        )
                      }}
                    </span>
                  </li>
                  <li>
                    <span class="font-semibold">
                      {{
                        $t(
                          "majors_page.guide.faqGuide.answer2.your_degree_does_not"
                        )
                      }} </span
                    ><br />
                    <span>
                      {{
                        $t(
                          "majors_page.guide.faqGuide.answer2.in_reality_employers"
                        )
                      }}
                    </span>
                    <ul class="mt-1 list-disc list-inside pl-8 -indent-6">
                      <li>
                        {{
                          $t(
                            "majors_page.guide.faqGuide.answer2.many_marketing_graduates_become"
                          )
                        }}
                      </li>
                      <li>
                        {{
                          $t(
                            "majors_page.guide.faqGuide.answer2.its_also_common"
                          )
                        }}
                      </li>
                    </ul>
                    <span>
                      {{
                        $t(
                          "majors_page.guide.faqGuide.answer2.the_most_important_factor"
                        )
                      }}
                    </span>
                  </li>
                </ol>

                <p>
                  {{ $t("majors_page.guide.faqGuide.answer2.dont_stress_too") }}
                </p>
              </div>
            </div>
          </div>
          <div class="cursor-pointer" @click="toggleAnswer(index)">
            <IconMinusCircle v-if="isOpen[index]" />
            <IconPlusCircle v-else />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const { t } = useI18n();

const faqList: { question: string; answer: string }[] = [
  {
    question: `${t("majors_page.guide.faqGuide.question1")}`,
    answer: ``,
  },
  {
    question: `${t("majors_page.guide.faqGuide.question2")}`,
    answer: ``,
  },
];

const isOpen = ref<boolean[]>(faqList.map(() => false));

const toggleAnswer = (index: number) => {
  isOpen.value[index] = !isOpen.value[index];
};
</script>
