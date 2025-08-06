<template>
  <section>
    <p class="text-xl md:text-2xl font-semibold mb-4 text-text-base">
      ❓ Frequently Asked Questions
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
                  Many students focus too much on the name of a program,
                  forgetting that the same major can be taught very differently
                  at different universities.
                </p>
                <p>Example: Bachelor of Commerce in Australia</p>
                <ul class="mt-1 list-disc list-inside pl-8 -indent-6">
                  <li>
                    <span class="font-semibold">University of Sydney: </span>
                    Research and theory-focused, with strong emphasis on
                    finance. Best suited for students interested in deep
                    academic study or pursuing graduate school.
                  </li>
                  <li>
                    <span class="font-semibold">Monash University: </span>
                    More practice-oriented, with strong industry connections and
                    many internship opportunities. A good fit for students who
                    want to enter the workforce early.
                  </li>
                </ul>
                <p>
                  <span class="font-semibold">🔍 Tip: </span>
                  Instead of choosing programs based on their name, like
                  "Business Analytics" because it sounds impressive or
                  "Economics" because it seems prestigious, take time to review
                  each university’s curriculum, available internships, and talk
                  to current students about their experience.
                </p>
              </div>
              <div v-else-if="index === 1" class="flex flex-col gap-2">
                <p>
                  You're not alone, this is a common concern. Here's what you
                  need to know:
                </p>
                <ol
                  class="mt-1 list-decimal list-inside pl-4 -indent-4 flex flex-col gap-2"
                >
                  <li>
                    <span class="font-semibold">
                      You can usually change your major. </span
                    ><br />
                    <span>
                      Most universities allow students to switch majors after
                      the first year or during the first semester of the second
                      year, as long as you maintain a good GPA and meet the new
                      major’s prerequisites.
                    </span>
                  </li>
                  <li>
                    <span class="font-semibold">
                      Your degree does not limit your career. </span
                    ><br />
                    <span>
                      In reality, employers care more about your skills and
                      experience than your exact degree title.
                    </span>
                    <ul class="mt-1 list-disc list-inside pl-8 -indent-6">
                      <li>
                        Many Marketing graduates become successful Product
                        Managers.
                      </li>
                      <li>
                        It's also common to move from Finance into Data
                        Analytics.
                      </li>
                    </ul>
                    <span>
                      The most important factor is your relevant skills and your
                      willingness to learn.
                    </span>
                  </li>
                </ol>

                <p>
                  💡 Don't stress too much about choosing the “perfect” major
                  from the beginning, your path can evolve as you grow.
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
    question: `There are too many programs available. How do I know which one to choose?`,
    answer: ``,
  },
  {
    question: `What if I choose the wrong major? I'm afraid of working in a different field later.`,
    answer: ``,
  },
];

const isOpen = ref<boolean[]>(faqList.map(() => true));

const toggleAnswer = (index: number) => {
  isOpen.value[index] = !isOpen.value[index];
};
</script>
