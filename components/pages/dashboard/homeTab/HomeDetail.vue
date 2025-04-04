<template>
  <div class="flex flex-col gap-8 lg:gap-16">
    <!-- ongoing tasks -->
    <!-- <div v-show="isRemainingTask">
      <h2 class="text-[#181D27] text-xl font-semibold mb-5">Ongoing journey</h2>
      <Achievements
        :isDetailPage="true"
        :isOngoingBehaviour="true"
        @remainingTask="handelRemaining"
      />
    </div>
    <PendingTaskSkeleton v-if="isTaskLoading" /> -->

    <!-- all in one place -->

    <div class="">
      <h1 class="text-[#181D27] font-semibold text-3xl">
        Get into your dream school with Sophie AI + Expert mentorship
      </h1>
      <p class="text-[#535862] mt-4">
        Personalized guidance, strategic tools, and 1-on-1 mentorship to help
        you succeed.
      </p>
      <div class="mt-[42px] flex flex-col gap-8">
        <div
          v-for="(step, idx) in stepsList"
          :key="idx"
          class="flex items-center gap-[26px]"
        >
          <div
            class="h-9 w-9 min-w-9 rounded-full bg-[#1570EF] text-white text-xl font-semibold hidden lg:flex items-center justify-center relative"
          >
            <p>{{ idx + 1 }}</p>
            <div
              v-if="idx + 1 != stepsList.length"
              class="h-[100px] w-0 absolute top-11 border-2 border-[#0E69E2]/70 border-dashed"
            ></div>
          </div>
          <div
            class="border-[1.5px] border-gray-200 rounded-2xl p-3 w-full flex flex-col lg:flex-row lg:items-center gap-4"
          >
            <NuxtImg :src="step.image" class="w-24" />
            <div class="">
              <p class="text-[#181D27] font-semibold">{{ step.title }}</p>
              <p class="text-[#535862] mt-1 mb-4">
                {{ step.description }}
              </p>
              <div
                @click="navigateTo($localePath(step.navigate.navigateTo))"
                class="flex items-center gap-2 cursor-pointer"
              >
                <p class="text-[#175CD3] font-semibold text-sm lg:text-base">
                  {{ step.navigate.text }}
                </p>
                <IconArrowRight height="20" width="20" fill="#175CD3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EventsAndSocials class="hidden md:block" />
  </div>
</template>
<script setup lang="ts">
const isRemainingTask = ref<boolean>(false);
const isTaskLoading = ref<boolean>(true);

// const questions = [
//   {
//     img: "/images/visa.png",
//     question: "What countries can Arrowster support me apply to?",
//     answer:
//       "We help students apply to US, Canada, Australia, New Zealand, United Kingdom, and Europe (incl. countries such as France, Netherlands, Germany, etc). In Vietnam, we also help students apply to RMIT and BUV.",
//   },
//   {
//     img: "/images/application.png",
//     question: "What can Arrowster mentors help me with?",
//     answer:
//       "We can help you build your application strategy, school list, extracurricular strategy as well as edit materials such as essays and letters of recommendation! We will also work with your family to help you prepare financial statements and visa application.",
//   },
//   {
//     img: "/images/school-list.png",
//     question: "How many schools will Arrowster help me apply to?",
//     answer:
//       "We usually help students apply to 5 schools (can be in multiple countries) for optimal efficiency. In special cases, we can help students apply to 8 schools.",
//   },
//   {
//     img: "/images/application-post.png",
//     question: "What’s the cost to work with Arrowster?",
//     answer:
//       "For students applying to our partner schools, FREE! We have 2,000+ partner schools around the world, including top institutions like University of Sydney. King’s College London, University of Ottawa, etc. If you aim to apply to schools outside our partner list, please consult our FAQ guide here.",
//   },
//   {
//     img: "/images/academic.png",
//     question: "Will I work with you online or offline?",
//     answer:
//       "For most students, we will work online via messages and online meetings. If needed, you can come meet us at our beautiful office in District 1, Ho Chi Minh City! ",
//   },
// ];

// const eventList = [
//   {
//     image: "/images/dashboard/home/event-1.png",
//     title: "100 pages Study Abroad Handbook",
//     description: "Insider playbook: How to navigate in the process, admission strategies and hacks from students who've been there and won the game",
//     link: {
//       value: "https://docs.google.com/document/d/1Pl2w7QN0SztPoa-JLdhIUiUBwcmawdaCMJkuYHaNdmQ/edit?usp=sharing",
//     },
//   },
//   {
//     image: "/images/dashboard/home/event-2.png",
//     title: "6 steps to ace your study abroad journey",
//     description: "How to approach the application process strategically, avoid common pitfalls, and implement insider techniques that most students don't know about.",
//     link: {
//       value: "https://fb.watch/ysNqZBCNRr/",
//     },
//   },
//   {
//     image: "/images/dashboard/home/event-3.png",
//     title: "Strategic Major Selection Framework",
//     description: "The insider's approach to choosing the right major that aligns with your strengths and maximizes your chances",
//     link: {
//       value: "https://drive.google.com/file/d/19QNdmeAuJ7CLy_5uylI6bA_IksMCLqWH/view?usp=sharing",
//     },
//   },
//   {
//     image: "/images/dashboard/home/event-4.png",
//     title: "Letter of Recommendation Guideline",
//     description: "Master the art of securing powerful recommendations that make admissions officers take notice",
//     link: {
//       value: "https://drive.google.com/file/d/1SclcvXZXTHSLnv2tmWlg_5ivOABAQI9L/view?usp=sharing",
//     },
//   },
// ];

const stepsList = [
  {
    image: "/images/tell-me-more.png",
    title: "Schools list",
    description: "Find your perfect-fit schools with AI recommendations.",
    navigate: {
      text: "Find Your Best-Fit Schools in 60 Seconds",
      navigateTo: "/school-list",
    },
  },
  {
    image: "/images/sophie-chat.png",
    title: "Sophie Assistant",
    description: "Ask questions anytime and get instant guidance.",
    navigate: {
      text: "Chat with Sophie AI for Free",
      navigateTo: "/sophie",
    },
  },
  {
    image: "/images/post-application.png",
    title: "Roadmap",
    description: "See deadlines and track what you need to prepare.",
    navigate: {
      text: "View your Plan",
      navigateTo: "/roadmap",
    },
  },
  {
    image: "/images/ai-recommendation.png",
    title: "AI Essay Editor",
    description: "Get AI-crafted essay drafts tailored to your unique story.",
    navigate: {
      text: "Generate Your Essay Now",
      navigateTo: "/ai-essay",
    },
  },
  {
    image: "/images/v-room-short.png",
    title: "Expert Mentorship",
    description: "1-on-1 mentorship to craft your perfect application plan.",
    navigate: {
      text: "Talk to a Mentor",
      navigateTo: "/pricing",
    },
  },
];

// const handelRemaining = (value: boolean) => {
//   isRemainingTask.value = value;
//   isTaskLoading.value = false;
// };
</script>
