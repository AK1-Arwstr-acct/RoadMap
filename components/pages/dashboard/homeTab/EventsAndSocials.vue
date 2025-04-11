<template>
  <div class="flex flex-col gap-8 lg:gap-16">
    <!-- events -->
    <div>
      <div class="flex justify-between items-center mb-5">
        <p class="text-xl font-semibold text-[#181D27]">
          Programs and resources for you
        </p>
        <a href="https://www.facebook.com/Arrowster.Official" target="_blank">
          <p class="font-semibold text-[#175CD3] cursor-pointer text-nowrap">
            View All
          </p>
        </a>
      </div>
      <div
        v-for="(item, index) in eventList"
        :key="index"
        class="flex flex-col lg:flex-row gap-6 border-[1.5px] border-gray-200 rounded-2xl p-6 mb-6 shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
      >
        <div
          class="w-full lg:w-[144px] min-w-[144px] h-full max-h-[295px] lg:h-[144px] border-[1.5px] border-gray-200 rounded-lg overflow-hidden relative"
        >
          <img :src="item.image" alt="event" class="size-full object-contain" />
          <div
            v-if="item.locked"
            class="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <IconLock class="size-[42px]" strokeWidth="1.5" />
          </div>
        </div>
        <div class="flex flex-col gap-5 w-full">
          <p class="lg:text-lg font-semibold">{{ item.title }}</p>
          <p class="text-[#535862] flex-1">{{ item.description }}</p>
          <div
            v-if="!item.locked"
            class="flex gap-3 justify-between items-center"
          >
            <p
              class="text-[#1570EF] flex items-center gap-1.5 cursor-pointer text-sm lg:text-base"
              @click="handleNavigate(item.link.value)"
            >
              <span class="min-w-4 min-h-4">
                <IconLink width="16" height="16" strokeWidth="2.5" />
              </span>
              <span class="border-b border-[#1570EF]">
                {{ item.link.text }}
              </span>
            </p>
            <div
              class="transform -rotate-45 translate-y-2 cursor-pointer -mt-4"
            >
              <IconArrowRight
                height="24"
                width="24"
                fill="#1570EF"
                @click="handleNavigate(item.link.value)"
              />
            </div>
          </div>
          <div v-else class="flex items-center gap-2 cursor-pointer">
            <NuxtLinkLocale
              class="text-[#1570EF] font-semibold cursor-pointer"
              :to="item.link.value"
            >
              {{ item.link.text }}
            </NuxtLinkLocale>
            <IconArrowRight height="20" width="20" fill="#1570EF" />
          </div>
        </div>
      </div>
    </div>
    <!-- social -->
    <div>
      <p class="text-xl font-semibold text-[#181D27] mb-5">Join Community</p>
      <div class="flex gap-6 flex-wrap">
        <a
          href="https://www.facebook.com/groups/8907362185980576"
          target="_blank"
          class="flex items-center w-full lg:w-[calc(50%-12px)] gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border-[1.5px] border-gray-200 rounded-[14px] shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
        >
          <IconFacebook />
          Facebook Community
        </a>
        <a
          href="https://www.threads.net/@arrowster.official"
          target="_blank"
          class="flex items-center w-full lg:w-[calc(50%-12px)] gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border-[1.5px] border-gray-200 rounded-[14px] shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
        >
          <IconThreads />
          Threads Community
        </a>
        <a
          href="https://discord.gg/xahYuU2H"
          target="_blank"
          class="flex items-center w-full lg:w-[calc(50%-12px)] gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border-[1.5px] border-gray-200 rounded-[14px] shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
        >
          <IconDiscord />
          Discord Community
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const eventList = [
  {
    image: "/images/application-post.png",
    title: "Arrowster Exclusive Study Abroad Handbook",
    description:
      "100 pages covering every topic of study abroad: choosing major, building profile, applying for scholarships, writing essays, and more!",
    link: {
      text: "Read here",
      value:
        "https://docs.google.com/document/d/1Pl2w7QN0SztPoa-JLdhIUiUBwcmawdaCMJkuYHaNdmQ/edit?usp=sharing",
    },
    locked: false,
  },
  {
    image: "/images/application.png",
    title:
      "Training Session 1: How to Select the Best Major for Jobs after Graduation",
    description:
      "Sharing session by our mentor Thanh (Harvard MBA) on a strategic framework to choose the right major and prepare to get a job after graduation.",
    link: {
      text: "Exclusive Content – Work with us to access",
      value: "/pricing",
    },
    locked: true,
  },
  {
    image: "/images/decision.png",
    title: "Centralised Scholarship (2025-2026)",
    description:
      "List of scholarships for Vietnamese students across all countries (US, Australia, Canada, Europe, etc).",
    link: {
      text: "Exclusive Content – Work with us to access",
      value: "/pricing",
    },
    locked: true,
  },
];

const handleNavigate = (link: string) => {
  window.open(link, "_blank");
};
</script>
