<template>
  <div class="text-text-base flex flex-col gap-4 leading-7">
    <p class="font-semibold text-xl md:text-2xl">📚 Research Your Field</p>
    <!-- 1 -->
    <p class="">
      After understanding yourself clearly, the next step is to research your
      field and career thoroughly to see if you're truly suitable for the field
      group and what the prospects after graduation look like.
    </p>
    <!-- 2 -->
    <div class="flex flex-col gap-3">
      <span class="font-semibold">Key Notes on Popular Majors:</span>
      <div>
        <p class="font-semibold">💻 Information Technology/Computer Science</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            Need clear specialization focus due to high competition
            (front-end/back-end, AI/ML/data)
          </li>
          <li>Require early personal projects for job applications</li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">📊 Business</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            Need clear direction on which branch to study - shouldn't study
            general business administration because it's too broad.
          </li>
          <li>
            Typical specializations: Marketing, Finance, Logistics/Supply Chain,
            Accounting/Auditing, HR
          </li>
          <li>Prioritize internship experience early</li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">
          🏥 Health Sciences (Pharmacy, Nursing, Physical Therapy)
        </p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            Find schools ensuring employment outcomes - each country has
            different regulations for international students in these fields
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">🔬 Research (aiming for Master's/PhD)</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>Clearly define research topics</li>
          <li>
            Find universities with high research activity and faculty who can
            guide your research
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">⚖️ Law/Medicine</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            Generally not recommended for study abroad unless planning to settle
            permanently
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
            >Need help deciding, {{ appStore.userData?.name }}? Ask Sophie for your case</span
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
