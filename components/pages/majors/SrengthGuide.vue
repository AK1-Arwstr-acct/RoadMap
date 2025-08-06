<template>
  <div class="text-text-base flex flex-col gap-4 leading-7">
    <p class="font-semibold text-2xl">🔍 Evaluate your strengths</p>
    <!-- 1 -->
    <div>
      <span class="font-semibold">1. Analyze Your Personal Capabilities</span>
      <div class="mt-1">
        To understand yourself better, we recommend taking the
        <span class="text-text-brand font-semibold"
          >Big Five personality test</span
        >. This tool is more reliable than MBTI because it evaluates personality
        on a spectrum rather than just categorizing into two extremes. Instead
        of saying you’re “completely introverted” or “completely extroverted,”
        Big Five shows you where you fall on the introversion-extroversion
        scale, providing a more nuanced and scientific self-understanding.
      </div>
    </div>
    <!-- 2 -->
    <div class="flex flex-col gap-3">
      <span class="font-semibold"
        >2. Choose Based on Career Clusters Framework</span
      >
      <div>
        Personality tests alone aren’t enough for major selection. While MBTI
        might suggest an INTJ suits technology, you might not excel at math or
        logic. Here’s a simpler framework looking at three factors:
      </div>
      <div>
        <p class="font-semibold">🧠 Natural Abilities</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>Skills you learn faster than others</li>
          <li>Example: Quick math comprehension, trend analysis insight</li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">❤️ Genuine Interests</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>
            Activities you never tire of and willingly invest time learning,
            even when difficult
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">🎯 Extracurricular Activities</p>
        <ul class="mt-1 list-disc list-inside pl-9 -indent-6">
          <li>Closest to real work experience</li>
          <li>
            Example: Enjoying project leadership suggests management potential;
            debate skills might suit law or consulting
          </li>
        </ul>
      </div>
    </div>
    <div>
      This framework helps you understand WHY you’re suited for a particular
      field – extremely useful for application essays and interviews!
    </div>
    <div
      class="rounded-2xl overflow-hidden border border-border-neutral-subtle bg-background-neutral-subtle flex items-center"
    >
      <div class="h-full min-h-[140px] w-[140px]">
        <img
          src="/images/sophieQuiz.png"
          alt="application"
          class="size-full object-cover"
        />
      </div>
      <div class="p-6 flex-1 flex justify-between items-center gap-6">
        <div>
          <p
            class="text-xs font-semibold uppercase bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent"
          >
            Want to try out this framework?
          </p>
          <p class="text-text-base text-xl font-semibold">
            Find your major with Sophie AI
          </p>
          <p class="text-text-neutral-subtle text-sm">
            Identify work cluster, strengths, and career goals
          </p>
        </div>
        <button
          @click="startQuiz"
          class="rounded-lg px-[18px] py-1 bg-background-brand text-text-constant-white text-nowrap"
        >
          Start your quiz
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
