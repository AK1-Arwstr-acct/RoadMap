<template>
  <div class="flex flex-col gap-16">
    <!-- ongoing tasks -->
    <div class="">
        <h2 class="text-[#181D27] text-xl font-semibold mb-5">
            Ongoing journey
        </h2>
        <Achievements :isDetailPage="true" :isOngoingBehaviour="true" />
    </div>
    <!-- events -->
    <div>
      <div class="flex justify-between items-center">
        <p class="text-xl font-semibold text-[#181D27] mb-6">
          Upcoming events and programs for you
        </p>
        <p class="font-semibold text-[#175CD3] cursor-pointer">View All</p>
      </div>
      <div v-for="(item, index) in eventList" :key="index" class="flex gap-6 border border-[#E9EAEB] rounded-2xl p-6 mt-2">
        <img :src="item.image" alt="event" />
        <div class="flex flex-col gap-5">
          <p class="text-lg font-semibold">{{ item.title }}</p>
          <div class="cursor-pointer font-medium">
            <p class="text-[#1570EF]">{{ item.link.label }}</p>
          </div>
          <p class="text-[#535862]">Deadline: {{ item.deadline }}</p>
        </div>
      </div>
    </div>
    <!-- Faqs -->
    <div>
      <p class="text-xl font-semibold text-[#181D27] mb-6">
        Frequently asked questions
      </p>
      <div class="border border-[#E9EAEB] rounded-2xl px-6 py-8 ">
        <div v-for="(a, idx) in 5" class="flex flex-col">
            <div class="flex items-start gap-4">
              <IconTabSophie class="text-[#ED77FF] size-8" />
              <div>
                <p class="text-lg text-[#181D27] font-semibold">
                  Sed turpis egestas lacus cursus cras.
                </p>
                <p class="text-[#535862]">
                  Venenatis laoreet arcu amet ac ullamcorper. Integer velit faucibus
                  tellus vel nunc lectus amet.
                </p>
              </div>
            </div>
            <div v-if="idx+1 !== 5" class="h-px bg-[#E9EAEB] w-[90%] my-8 self-end" />
        </div>
      </div>
    </div>

    <!-- social -->
    <div>
      <p class="text-xl font-semibold text-[#181D27] mb-5">
        Join Community
      </p>
      <div class="flex gap-6">
        <button class="flex items-center w-full gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border border-[#E9EAEB] rounded-[14px]">
            <IconFacebook />
            Facebook Community
        </button>
        <button class="flex items-center w-full gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border border-[#E9EAEB] rounded-[14px]">
            <IconThreads />
            Threads Community
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const questions = [
  {
    question: "Sed turpis egestas lacus cursus cras.",
    answer:
      "Venenatis laoreet arcu amet ac ullamcorper. Integer velit faucibus tellus vel nunc lectus amet.",
  },
];

const eventList = [
  {
    image: "/images/dashboard/home/event-1.png",
    title: "Mentorship program level-up: Study abroad while becoming a co-creator!",
    link: {
      label: "Mentorship program level-up",
      value: ""
    },
    deadline: "07/03/2024"
  },
  {
    image: "/images/dashboard/home/event-2.png",
    title: "Mentorship program season 2: The journey from ordinary to extraordinary",
    link: {
      label: "Mentorship program season 2",
      value: ""
    },
    deadline: "23:59 | 07/03/2024"
  },
  {
    image: "/images/dashboard/home/event-3.png",
    title: "Mentorship program level-up: Study abroad while becoming a co-creator!",
    link: {
      label: "Arrowster crash course 2024",
      value: ""
    },
    deadline: "23:59 | 03/01/2025"
  },
];
</script>
