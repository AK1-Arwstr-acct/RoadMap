<template>
  <div class="flex flex-col gap-16">
    <!-- ongoing tasks -->
    <div v-show="isRemainingTask">
      <h2 class="text-[#181D27] text-xl font-semibold mb-5">Ongoing journey</h2>
      <Achievements
        :isDetailPage="true"
        :isOngoingBehaviour="true"
        @remainingTask="handelRemaining"
      />
    </div>
    <PendingTaskSkeleton v-if="isTaskLoading" />
    <!-- events -->
    <div>
      <div class="flex justify-between items-center mb-5">
        <p class="text-xl font-semibold text-[#181D27]">
          Upcoming programs and resources for you
        </p>
        <a href="https://www.facebook.com/Arrowster.Official" target="_blank">
          <p class="font-semibold text-[#175CD3] cursor-pointer">View All</p>
        </a>
      </div>
      <div
        v-for="(item, index) in eventList"
        :key="index"
        class="flex gap-6 border-[1.5px] border-gray-200 rounded-2xl p-6 mb-6 shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
      >
        <img :src="item.image" alt="event" class="w-40 h-40" />
        <div class="flex flex-col gap-5 w-full">
          <p class="text-lg font-semibold">{{ item.title }}</p>
          <p class="text-[#535862]">{{ item.description }}</p>
          <div class="flex gap-3 justify-between items-center">
            <p class="text-[#1570EF] flex items-center gap-1.5 cursor-pointer" @click="handleNavigate(item.link.value)">
              <span class="min-w-4 min-h-4">
                <IconLink width="16" height="16" strokeWidth="2.5" />
              </span>
              <span class="border-b border-[#1570EF]">
                {{ item.title }}
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
        </div>
      </div>
    </div>
    <!-- Faqs -->
    <div>
      <p class="text-xl font-semibold text-[#181D27] mb-6">
        Frequently asked questions
      </p>
      <div class="border-[1.5px] border-gray-200 rounded-2xl px-6 py-8">
        <div v-for="(faq, idx) in questions" class="flex flex-col">
          <div class="flex items-start gap-4">
            <NuxtImg
              :src="faq.img"
              class="size-[52px] min-w-[52px]"
              loading="eager"
              preload
            />
            <div>
              <p class="text-lg text-[#181D27] font-semibold">
                {{ faq.question }}
              </p>
              <p class="text-[#535862]">
                {{ faq.answer }}
              </p>
            </div>
          </div>
          <div
            v-if="idx + 1 !== questions.length"
            class="h-px bg-[#E9EAEB] w-[90%] my-8 self-end"
          />
        </div>
      </div>
    </div>

    <!-- social -->
    <div>
      <p class="text-xl font-semibold text-[#181D27] mb-5">Join Community</p>
      <div class="flex gap-6">
        <a
          href="https://www.facebook.com/groups/8907362185980576"
          target="_blank"
          class="flex items-center w-full gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border-[1.5px] border-gray-200 rounded-[14px] shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
        >
          <IconFacebook />
          Facebook Community
        </a>
        <a
          href="https://www.threads.net/@arrowster.official"
          target="_blank"
          class="flex items-center w-full gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border-[1.5px] border-gray-200 rounded-[14px] shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
        >
          <IconThreads />
          Threads Community
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const isRemainingTask = ref<boolean>(false);
const isTaskLoading = ref<boolean>(true);

const questions = [
  {
    img: "/images/visa.png",
    question: "What countries can Arrowster support me apply to?",
    answer:
      "We help students apply to US, Canada, Australia, New Zealand, United Kingdom, and Europe (incl. countries such as France, Netherlands, Germany, etc). In Vietnam, we also help students apply to RMIT and BUV.",
  },
  {
    img: "/images/application.png",
    question: "What can Arrowster mentors help me with?",
    answer:
      "We can help you build your application strategy, school list, extracurricular strategy as well as edit materials such as essays and letters of recommendation! We will also work with your family to help you prepare financial statements and visa application.",
  },
  {
    img: "/images/school-list.png",
    question: "How many schools will Arrowster help me apply to?",
    answer:
      "We usually help students apply to 5 schools (can be in multiple countries) for optimal efficiency. In special cases, we can help students apply to 8 schools.",
  },
  {
    img: "/images/application-post.png",
    question: "What’s the cost to work with Arrowster?",
    answer:
      "For students applying to our partner schools, FREE! We have 2,000+ partner schools around the world, including top institutions like University of Sydney. King’s College London, University of Ottawa, etc. If you aim to apply to schools outside our partner list, please consult our FAQ guide here.",
  },
  {
    img: "/images/academic.png",
    question: "Will I work with you online or offline?",
    answer:
      "For most students, we will work online via messages and online meetings. If needed, you can come meet us at our beautiful office in District 1, Ho Chi Minh City! ",
  },
];

const eventList = [
  {
    image: "/images/dashboard/home/event-1.png",
    title: "100 pages Study Abroad Handbook",
    description: "Insider playbook: How to navigate in the process, admission strategies and hacks from students who've been there and won the game",
    link: {
      value: "https://docs.google.com/document/d/1Pl2w7QN0SztPoa-JLdhIUiUBwcmawdaCMJkuYHaNdmQ/edit?usp=sharing",
    },
  },
  {
    image: "/images/dashboard/home/event-2.png",
    title: "6 steps to ace your study abroad journey",
    description: "How to approach the application process strategically, avoid common pitfalls, and implement insider techniques that most students don't know about.",
    link: {
      value: "https://fb.watch/ysNqZBCNRr/",
    },
  },
  {
    image: "/images/dashboard/home/event-3.png",
    title: "Strategic Major Selection Framework",
    description: "The insider's approach to choosing the right major that aligns with your strengths and maximizes your chances",
    link: {
      value: "https://drive.google.com/file/d/19QNdmeAuJ7CLy_5uylI6bA_IksMCLqWH/view?usp=sharing",
    },
  },
  {
    image: "/images/dashboard/home/event-4.png",
    title: "Letter of Recommendation Guideline",
    description: "Master the art of securing powerful recommendations that make admissions officers take notice",
    link: {
      value: "https://drive.google.com/file/d/1SclcvXZXTHSLnv2tmWlg_5ivOABAQI9L/view?usp=sharing",
    },
  },
];

const handelRemaining = (value: boolean) => {
  isRemainingTask.value = value;
  isTaskLoading.value = false;
};

const handleNavigate = (link: string) => {
  window.open(link, "_blank");
};
</script>
