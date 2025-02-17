<template>
  <div
    class="bg-[#FDFDFD] rounded-t-xl space-y-5 fixed bottom-0 right-5 w-[90%] md:w-[70%] h-[calc(100dvh-20px)] z-40 py-6 pl-6 pr-8 overflow-y-auto custom-scrollbar"
  >
    <div class="py-3 flex justify-between items-center">
      <h1 class="text-[#181D27] font-semibold text-2xl">
        {{ schoolData.school.name }}
      </h1>
      <div @click="emit('close')" class="cursor-pointer">
        <IconCross fill="#181D27" width="24" height="24" />
      </div>
    </div>
    <!-- admission status -->
    <div class="border border-[#E9EAEB] rounded-2xl p-6 space-y-3">
      <h2 class="text-[#181D27] text-lg font-semibold">Admission Stats</h2>
      <p class="text-[#535862] font-medium">
        Acceptance Rate: <span class="text-[#1570EF] ml-2">44%</span>
      </p>
      <p class="text-[#535862] font-medium">
        Average Scores:
        <span class="text-[#1570EF] px-2 border-r border-[#535862]"
          >SAT 1350</span
        >
        <span class="text-[#1570EF] px-2 border-r border-[#535862]"
          >IELTS 7.5</span
        >
        <span class="text-[#1570EF] px-2">GPA 3.8</span>
      </p>
    </div>
    <!-- carrer -->
    <div class="border border-[#E9EAEB] rounded-2xl p-6 space-y-8">
      <div class="space-y-3">
        <h2 class="text-[#181D27] text-lg font-semibold">Career Outcomes</h2>
        <p class="text-[#535862] font-medium">
          Employment Rate:
          <span class="text-[#1570EF] ml-2">92% within 6 months</span>
        </p>
        <p class="text-[#535862] font-medium">
          Median Salary: <span class="text-[#1570EF] ml-2">$65,000/year</span>
        </p>
      </div>
      <div class="space-y-3">
        <h2 class="text-[#181D27] text-lg font-semibold">
          Financial Aid & Costs
        </h2>
        <p class="text-[#535862] font-medium">
          Avg. Financial Aid:
          <span class="text-[#1570EF] ml-2">$15,000/year</span>
        </p>
        <p class="text-[#535862] font-medium">
          Housing & Meals:
          <span class="text-[#1570EF] ml-2">$12,500/year</span>
        </p>
      </div>
    </div>
    <!-- campus Overview -->
    <div class="border border-[#E9EAEB] rounded-2xl p-6 space-y-6">
      <div class="h-[242px] rounded-xl overflow-hidden">
        <img
          src="/public/images/school-campus.png"
          alt="school campus"
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
            <span
              >{{ schoolData.school.address.state }},
              {{ schoolData.school.address.country }}</span
            >
          </div>
          <div class="flex items-center gap-2">
            <IconBuilding />
            <span>Urban</span>
          </div>
          <div class="flex items-center gap-2">
            <IconUsers />
            <span>25,000 students</span>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-[#181D27] text-lg font-semibold mb-3">Surroundings</h2>
        <div class="flex gap-6 items-center text-[#535862] font-medium">
          <div class="flex items-center gap-2">
            <IconBus />
            <span>Subway & buses</span>
          </div>
          <div class="flex items-center gap-2">
            <IconOutdoor />
            <span>Cafes, museums, shopping</span>
          </div>
        </div>
      </div>
      <div class="space-y-3">
        <h2 class="text-[#181D27] text-lg font-semibold">Campus Life</h2>
        <p class="text-[#535862] font-medium">
          Housing:
          <span class="text-[#181D27] ml-2">On & off-campus</span>
        </p>
        <p class="text-[#535862] font-medium">
          Extracurriculars:
          <span class="text-[#181D27] ml-2"
            >300+ student clubs & sports teams</span
          >
        </p>
      </div>
    </div>
    <!-- about school -->
    <div class="border border-[#E9EAEB] rounded-2xl p-6 space-y-6">
      <div class="h-[242px] rounded-xl overflow-hidden">
        <img
          src="/public/images/school-campus.png"
          alt="school campus"
          class="size-full object-cover"
        />
      </div>
      <div class="space-y-4">
        <h2 class="text-[#181D27] text-lg font-semibold">
          About University of South Florida
        </h2>
        <p class="text-[#1570EF] flex items-center gap-2">
          <IconGlobe />
          <span class="underline">usf.edu</span>
        </p>
        <p class="text-[#535862] flex items-center gap-2">
          <IconMap />
          <span>4202 E Fowler Ave, Tampa, FL 33620, United States</span>
        </p>
        <div class="text-[#535862]">
          <ClientOnly>
            <vue-markdown :source="text" :options="options" />
          </ClientOnly>
        </div>
      </div>
    </div>
    <!-- button -->
    <button class="text-white text-sm bg-[#1570EF] rounded-lg w-full py-2.5">
      Interested? Chat with us now &lt;3
    </button>
  </div>
</template>
<script setup lang="ts">
import type { Program } from "~/types/program";

const emit = defineEmits(["close"]);

defineProps({
  isDetailModal: {
    type: Boolean,
    default: false,
  },
  schoolData: {
    type: Object as PropType<Program>,
    default: () => {},
  },
});

const text =
  "Florida International University is Miami’s Carnegie R1 public research university focused on making a real impact in teaching and research. We are defined by our proven student success techniques, groundbreaking research and high social mobility that uplifts students and accelerates their success. FIU serves a student body of more than 56,000 and 290,000 Panther alumni, with over 10,000 faculty and staff members.";

const options = {
  html: true,
};
</script>
