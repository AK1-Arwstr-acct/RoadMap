<template>
  <div
    class="bg-[#FDFDFD] md:rounded-t-xl fixed left-0 md:left-auto bottom-0 md:right-5 w-screen md:w-[60%] 2xl:w-1/2 h-dvh md:h-[calc(100dvh-20px)] z-40 pb-6 overflow-y-auto custom-scrollbar">
    <!-- mobile corss -->
    <div @click="emit('close')" class="cursor-pointer md:hidden absolute z-10 right-2 top-2 bg-white p-1.5 rounded-lg shadow-lg">
      <IconCross fill="#181D27" width="24" height="24" />
    </div>
    <!-- mobile header -->
    <div class="h-[200px] md:hidden -order-3 relative isolate mb-10">
      <img :src="`/images/school-cover/${randomNumber}.jpg`" :alt="schoolData.name" class="size-full object-cover"
        loading="eager" />
      <div
        class="size-24 min-w-24 absolute -bottom-10 left-4 z-10 border-2 border-white bg-white rounded-[200px] shadow-lg overflow-hidden">
        <img :src="schoolData.avatar" :alt="schoolData.name" class="size-full object-contain" />
      </div>
    </div>
    <!--  -->
    <div class="flex flex-col gap-5 pl-4 pr-4 md:pl-6 md:pr-8 ">
      <div class="py-3 flex flex-col md:flex-row justify-between gap-3 md:items-center -order-2 md:order-none">
        <h1 class="text-[#181D27] font-semibold text-2xl">
          {{ schoolData.name }}
        </h1>
        <div @click="emit('close')" class="cursor-pointer hidden md:block">
          <IconCross fill="#181D27" width="24" height="24" />
        </div>
        <div class="flex md:hidden flex-col gap-3">
          <p class="text-[#1570EF] flex items-center gap-2">
            <IconGlobe />
            <a v-if="schoolData.about.website" :href="schoolData.about.website" class="underline cursor-pointer">{{
              schoolData.about.website }}
            </a>
          <p v-else class="text-[#535862]">
            Coming Soon
          </p>
          </p>
          <p class="text-[#535862] flex items-center gap-2">
            <IconMap />
            <span>{{
              `${schoolData.about.country}, ${schoolData.about.state}`
            }}</span>
          </p>
        </div>
      </div>
      <!-- admission status -->
      <div class="border-[1.5px] border-gray-200 rounded-2xl p-6 flex flex-col gap-3">
        <h2 class="text-[#181D27] text-lg font-semibold">Admission Stats</h2>
        <p class="text-[#535862] font-medium">
          Acceptance Rate:
          <span class="text-[#1570EF] ml-2">{{
            schoolData.admission_stats.acceptance_rate || "Coming Soon"
          }}</span>
        </p>
        <div class="text-[#535862] font-medium flex flex-col md:flex-row gap-2">
          Average Scores:
          <div class="flex">
            <div v-for="(score, key, idx) in schoolData.admission_stats.average_scores" :key="key"
              class="text-[#1570EF] last:border-r-0 uppercase flex">{{ `${key}: ` }}
              <span class="capitalize">
                {{ score || "Coming Soon" }}
              </span>
              <span v-if="Object.keys(schoolData.admission_stats.average_scores).length > idx + 1"
                class="block w-0.5 h-full mx-2 bg-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <!-- carrer -->
      <div class="border-[1.5px] border-gray-200 rounded-2xl p-6 flex flex-col gap-8">
        <div class="space-y-3">
          <h2 class="text-[#181D27] text-lg font-semibold">Career Outcomes</h2>
          <p class="text-[#535862] font-medium flex flex-wrap">
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
      <div class="border-[1.5px] border-gray-200 rounded-2xl p-6 flex flex-col gap-6">
        <div class="h-[242px] rounded-xl overflow-hidden hidden md:block">
          <img :src="`/images/school-cover/${randomNumber}.jpg`" :alt="schoolData.name"
            class="size-full object-cover" loading="eager" />
        </div>
        <div>
          <h2 class="text-[#181D27] text-lg font-semibold mb-3">
            Campus Overview
          </h2>
          <div class="flex flex-col md:flex-row gap-6 md:items-center text-[#535862] font-medium">
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
              <span class="text-nowrap">{{
                schoolData.campus_overview.total_students || "Coming Soon"
              }}
                students</span>
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
          <p class="text-[#535862] font-medium flex flex-wrap">
            Housing:
            <span class="text-[#181D27] ml-2">{{
              schoolData.campus_life.housing || "Coming Soon"
            }}</span>
          </p>
          <p class="text-[#535862] font-medium flex flex-wrap">
            Extracurriculars:
            <span class="text-[#181D27] ml-2">{{
              schoolData.campus_life.extra_curriculum || "Coming Soon"
            }}</span>
          </p>
        </div>
      </div>
      <!-- about school -->
      <div class="border-[1.5px] border-gray-200 rounded-2xl p-6 flex flex-col gap-6">
        <div v-if="schoolData.cover_photo" class="h-[242px] rounded-xl overflow-hidden">
          <img :src="schoolData.cover_photo || undefined" :alt="schoolData.name" class="size-full object-cover"
            loading="eager" preload />
        </div>
        <div class="flex flex-col gap-4">
          <h2 class="text-[#181D27] text-lg font-semibold">
            About {{ schoolData.name }}
          </h2>
          <p class="text-[#1570EF] hidden md:flex items-center gap-2">
            <IconGlobe />
            <a v-if="schoolData.about.website" :href="schoolData.about.website" class="underline cursor-pointer">{{
              schoolData.about.website }}
            </a>
          <p v-else class="text-[#535862]">
            Coming Soon
          </p>
          </p>
          <p class="text-[#535862] hidden md:flex items-center gap-2">
            <IconMap />
            <span>{{
              `${schoolData.about.country}, ${schoolData.about.state}`
            }}</span>
          </p>
          <div v-if="schoolData.about.description" class="text-[#535862]">
            <ClientOnly>
              <vue-markdown :source="schoolData.about.description" :options="options" />
            </ClientOnly>
          </div>
        </div>
      </div>
      <!-- button -->
      <button @click="handleClick"
        class="text-white text-sm bg-[#1570EF] rounded-lg w-full py-2.5 -order-1 md:order-none">
        Scholarships for this school?
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SchoolDetail } from "~/types/program";

const emit = defineEmits(["close"]);

defineProps({
  schoolData: {
    type: Object as PropType<SchoolDetail>,
    default: () => { },
  },
});

const localePath = useLocalePath();

let randomNumber = Math.floor(Math.random() * 25) + 1;

const options = {
  html: true,
};

const handleClick = () => {
  navigateTo(localePath('/pricing'))
}
</script>
