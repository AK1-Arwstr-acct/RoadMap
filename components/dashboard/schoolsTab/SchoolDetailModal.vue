<template>
  <div
    class="bg-[#FDFDFD] rounded-t-xl space-y-5 fixed bottom-0 right-5 w-[90%] md:w-[60%] 2xl:w-1/2 h-[calc(100dvh-20px)] z-40 py-6 pl-6 pr-8 overflow-y-auto custom-scrollbar"
  >
    <div class="py-3 flex justify-between items-center">
      <h1 class="text-[#181D27] font-semibold text-2xl">
        {{ schoolData.name }}
      </h1>
      <div @click="emit('close')" class="cursor-pointer">
        <IconCross fill="#181D27" width="24" height="24" />
      </div>
    </div>
    <!-- admission status -->
    <div class="border border-[#E9EAEB] rounded-2xl p-6 space-y-3">
      <h2 class="text-[#181D27] text-lg font-semibold">Admission Stats</h2>
      <p class="text-[#535862] font-medium">
        Acceptance Rate:
        <span class="text-[#1570EF] ml-2">{{
          schoolData.admission_stats.acceptance_rate || "Coming Soon"
        }}</span>
      </p>
      <p class="text-[#535862] font-medium">
        Average Scores:
        <p
          v-for="(score, key) in schoolData.admission_stats.average_scores"
          :key="key"
          class="text-[#1570EF] px-2 border-r border-[#535862] last:border-r-0 uppercase inline-block"
          >{{ `${key}: ` }}
          <span class="capitalize">
            {{ score || "Coming Soon" }}
          </span>
          </p
        >
      </p>
    </div>
    <!-- carrer -->
    <div class="border border-[#E9EAEB] rounded-2xl p-6 space-y-8">
      <div class="space-y-3">
        <h2 class="text-[#181D27] text-lg font-semibold">Career Outcomes</h2>
        <p class="text-[#535862] font-medium">
          Employment Rate:
          <span class="text-[#1570EF] ml-2">{{
            schoolData.career_outcomes.employment_rate || "Coming Soon"
          }}</span>
        </p>
        <p class="text-[#535862] font-medium">
          Median Salary:
          <span class="text-[#1570EF] ml-2">{{
            schoolData.career_outcomes.median_salary || "Coming Soon"
          }}</span>
        </p>
      </div>
      <div class="space-y-3">
        <h2 class="text-[#181D27] text-lg font-semibold">
          Financial Aid & Costs
        </h2>
        <p class="text-[#535862] font-medium">
          Avg. Financial Aid:
          <span class="text-[#1570EF] ml-2">{{
            schoolData.financial_and_aid_cost.average_financial_aid || "Coming Soon"
          }}</span>
        </p>
        <p class="text-[#535862] font-medium">
          Housing & Meals:
          <span class="text-[#1570EF] ml-2">{{
            schoolData.financial_and_aid_cost.housing_and_meal || "Coming Soon"
          }}</span>
        </p>
      </div>
    </div>
    <!-- campus Overview -->
    <div class="border border-[#E9EAEB] rounded-2xl p-6 space-y-6">
      <div class="h-[242px] rounded-xl overflow-hidden">
        <img
          :src="`/images/school-cover/${randomNumber}.jpg`"
          :alt="schoolData.name"
          class="size-full object-cover"
        />
      </div>
      <div>
        <h2 class="text-[#181D27] text-lg font-semibold mb-3">
          Campus Overview
        </h2>
        <div class="flex gap-6 items-center text-[#535862] font-medium">
          <div class="flex items-center gap-2">
            <IconMap />
            <span>{{ schoolData.campus_overview.location }}</span>
          </div>
          <div class="flex items-center gap-2">
            <IconBuilding />
            <span>{{ schoolData.campus_overview.type || "Coming Soon" }}</span>
          </div>
          <div class="flex items-center gap-2">
            <IconUsers />
            <span
            class="text-nowrap"
              >{{
                schoolData.campus_overview.total_students || "Coming Soon"
              }}
              students</span
            >
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-[#181D27] text-lg font-semibold mb-3">Surroundings</h2>
        <div class="flex gap-6 items-center text-[#535862] font-medium">
          <div class="flex items-center gap-2">
            <IconBus />
            <span>{{ schoolData.surroundings.option_1 || "Coming Soon" }}</span>
          </div>
          <div class="flex items-center gap-2">
            <IconOutdoor />
            <span>{{ schoolData.surroundings.option_2 || "Coming Soon" }}</span>
          </div>
        </div>
      </div>
      <div class="space-y-3">
        <h2 class="text-[#181D27] text-lg font-semibold">Campus Life</h2>
        <p class="text-[#535862] font-medium">
          Housing:
          <span class="text-[#181D27] ml-2">{{
            schoolData.campus_life.housing || "Coming Soon"
          }}</span>
        </p>
        <p class="text-[#535862] font-medium">
          Extracurriculars:
          <span class="text-[#181D27] ml-2">{{
            schoolData.campus_life.extra_curriculum || "Coming Soon"
          }}</span>
        </p>
      </div>
    </div>
    <!-- about school -->
    <div class="border border-[#E9EAEB] rounded-2xl p-6 space-y-6">
      <div v-if="schoolData.cover_photo" class="h-[242px] rounded-xl overflow-hidden">
        <img
          :src="schoolData.cover_photo || undefined"
          :alt="schoolData.name"
          class="size-full object-cover"
        />
      </div>
      <div class="space-y-4">
        <h2 class="text-[#181D27] text-lg font-semibold">
          About {{ schoolData.name }}
        </h2>
        <p class="text-[#1570EF] flex items-center gap-2">
          <IconGlobe />
          <a
            :href="schoolData.about.website || undefined"
            class="underline cursor-pointer"
            >{{ schoolData.about.website || 'Coming Soon' }}</a
          >
        </p>
        <p class="text-[#535862] flex items-center gap-2">
          <IconMap />
          <span>{{
            `${schoolData.about.country}, ${schoolData.about.state}`
          }}</span>
        </p>
        <div v-if="schoolData.about.description" class="text-[#535862]">
          <ClientOnly>
            <vue-markdown
              :source="schoolData.about.description"
              :options="options"
            />
          </ClientOnly>
        </div>
      </div>
    </div>
    <!-- button -->
    <button class="text-white text-sm bg-[#1570EF] rounded-lg w-full py-2.5">
      Scholarships for this school?
    </button>
  </div>
</template>
<script setup lang="ts">
import type { SchoolDetail } from "~/types/program";

const emit = defineEmits(["close"]);

defineProps({
  schoolData: {
    type: Object as PropType<SchoolDetail>,
    default: () => {},
  },
});

let randomNumber = Math.floor(Math.random() * 25) + 1;

const options = {
  html: true,
};
</script>
