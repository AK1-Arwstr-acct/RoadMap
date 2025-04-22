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
            {{ $t("schoolList_page.coming_soon") }}
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
      <div class="border-[1.5px] border-gray-200 rounded-2xl p-6 flex flex-col gap-3 overflow-hidden">
        <h2 class="text-[#181D27] text-lg font-semibold">{{ $t('schoolList_page.admission_stats') }}</h2>
        <p class="text-[#535862] font-medium">
          {{ $t("schoolList_page.acceptance_rate") }}
          <span class="text-[#1570EF] ml-2">{{
            schoolData.admission_stats.acceptance_rate || `${$t("schoolList_page.coming_soon")}`
          }}</span>
        </p>
        <div class="text-[#535862] font-medium flex flex-col md:flex-row gap-2">
          {{ $t("schoolList_page.average_scores") }}
          <div class="flex">
            <div v-for="(score, key, idx) in schoolData.admission_stats.average_scores" :key="key"
              class="text-[#1570EF] last:border-r-0 uppercase flex">{{ `${key}: ` }}
              <span class="capitalize">
                {{ score || `${$t("schoolList_page.coming_soon")}` }}
              </span>
              <span v-if="Object.keys(schoolData.admission_stats.average_scores).length > idx + 1"
                class="block w-0.5 h-full mx-2 bg-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <!-- carrer -->
      <div class="border-[1.5px] border-gray-200 rounded-2xl p-6 flex flex-col gap-8 overflow-hidden">
        <div class="space-y-3">
          <h2 class="text-[#181D27] text-lg font-semibold">{{ $t("schoolList_page.career_outcomes") }}</h2>
          <p class="text-[#535862] font-medium flex flex-wrap">
            {{ $t("schoolList_page.employment_rate") }}
            <span class="text-[#1570EF] ml-2">{{
              schoolData.career_outcomes.employment_rate || `${$t("schoolList_page.coming_soon")}`
            }}</span>
          </p>
          <p class="text-[#535862] font-medium">
            {{ $t("schoolList_page.median_salary") }}
            <span class="text-[#1570EF] ml-2">{{
              schoolData.career_outcomes.median_salary || `${$t("schoolList_page.coming_soon")}`
            }}</span>
          </p>
        </div>
        <div class="space-y-3">
          <h2 class="text-[#181D27] text-lg font-semibold">
            {{ $t("schoolList_page.financial_aid_and_costs") }}
          </h2>
          <p class="text-[#535862] font-medium">
            {{ $t("schoolList_page.avg_financial_aid") }}
            <span class="text-[#1570EF] ml-2">{{
              schoolData.financial_and_aid_cost.average_financial_aid || `${$t("schoolList_page.coming_soon")}`
            }}</span>
          </p>
          <p class="text-[#535862] font-medium">
            {{ $t("schoolList_page.housing_and_meals") }}
            <span class="text-[#1570EF] ml-2">{{
              schoolData.financial_and_aid_cost.housing_and_meal || `${$t("schoolList_page.coming_soon")}`
            }}</span>
          </p>
        </div>
      </div>
      <!-- campus Overview -->
      <div class="border-[1.5px] border-gray-200 rounded-2xl p-6 flex flex-col gap-6 overflow-hidden">
        <div class="h-[242px] rounded-xl overflow-hidden hidden md:block">
          <img :src="`/images/school-cover/${randomNumber}.jpg`" :alt="schoolData.name"
            class="size-full object-cover" loading="eager" />
        </div>
        <div>
          <h2 class="text-[#181D27] text-lg font-semibold mb-3">
            {{ $t("schoolList_page.campus_overview") }}
          </h2>
          <div class="flex flex-col md:flex-row gap-6 md:items-center text-[#535862] font-medium">
            <div class="flex items-center gap-2">
              <IconMap />
              <span>{{ schoolData.campus_overview.location }}</span>
            </div>
            <div class="flex items-center gap-2">
              <IconBuilding />
              <span>{{ schoolData.campus_overview.type || `${$t("schoolList_page.coming_soon")}` }}</span>
            </div>
            <div class="flex items-center gap-2">
              <IconUsers />
              <span class="text-nowrap">{{
                schoolData.campus_overview.total_students || `${$t("schoolList_page.coming_soon")}`
              }}
                {{ $t("schoolList_page.students") }}</span>
            </div>
          </div>
        </div>
        <div>
          <h2 class="text-[#181D27] text-lg font-semibold mb-3">{{ $t("schoolList_page.surroundings") }}</h2>
          <div class="flex gap-6 items-center text-[#535862] font-medium">
            <div class="flex items-center gap-2">
              <IconBus />
              <span>{{ schoolData.surroundings.option_1 || `${$t("schoolList_page.coming_soon")}` }}</span>
            </div>
            <div class="flex items-center gap-2">
              <IconOutdoor />
              <span>{{ schoolData.surroundings.option_2 || `${$t("schoolList_page.coming_soon")}` }}</span>
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <h2 class="text-[#181D27] text-lg font-semibold">{{ $t("schoolList_page.campus_life") }}</h2>
          <p class="text-[#535862] font-medium flex flex-wrap">
            {{ $t("schoolList_page.housing") }}
            <span class="text-[#181D27] ml-2">{{
              schoolData.campus_life.housing || `${$t("schoolList_page.coming_soon")}`
            }}</span>
          </p>
          <p class="text-[#535862] font-medium flex flex-wrap">
            {{ $t("schoolList_page.extracurriculars") }}
            <span class="text-[#181D27] ml-2">{{
              schoolData.campus_life.extra_curriculum || `${$t("schoolList_page.coming_soon")}`
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
            {{ $t("schoolList_page.about") }} {{ schoolData.name }}
          </h2>
          <p class="text-[#1570EF] hidden md:flex items-center gap-2">
            <IconGlobe />
            <a v-if="schoolData.about.website" :href="schoolData.about.website" class="underline cursor-pointer">{{
              schoolData.about.website }}
            </a>
          <p v-else class="text-[#535862]">
            {{ $t("schoolList_page.coming_soon") }}
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
      <NuxtLinkLocale
      :to="'/pricing'"
        class="text-white text-sm bg-[#1570EF] rounded-lg w-full p-2.5 text-center -order-1 md:order-none">
        {{ $t("schoolList_page.scholarships_for_this_school") }}
      </NuxtLinkLocale>
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

const {t} = useI18n();

let randomNumber = Math.floor(Math.random() * 25) + 1;

const options = {
  html: true,
};
</script>
