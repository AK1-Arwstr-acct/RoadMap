<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="h-full w-full max-w-[1150px] mx-auto">
      <div
        class="flex flex-col md:flex-row gap-8 lg:gap-16 w-full px-5 md:px-8 pt-8 pb-24 bg-white"
      >
        <div class="flex-1">
          <HomeDetail />
        </div>
        <div
          class="md:max-w-[364px] flex flex-col gap-5 md:border-[1.5px] border-gray-200 md:p-6 rounded-2xl h-fit"
        >
          <!-- <ArticlesCard :articleDetail="upgradePlan[0]" :isUpgradePlan="true" /> -->
          <div class="pb-5 border-b border-gray-200 flex flex-col gap-5">
            <div class="">
              <h3 class="text-[#181D27] text-2xl font-semibold">
                Trusted by students from Top Universities
              </h3>
              <p class="text-[#535862] mt-3">
                AI tools + Expert guidance = Success
              </p>
              <div class="flex justify-center mt-8">
                <NuxtImg src="/images/home-application.png" class="h-[100px]" />
              </div>
            </div>
            <!-- power tool -->
            <div
              class="border border-[#84CAFF] bg-[#EFF8FF] rounded-lg py-4 px-5"
            >
              <h2 class="text-[#1570EF] font-semibold">AI-Powered Tools</h2>
              <div class="mt-4 flex flex-col gap-4">
                <div>
                  <h3 class="text-[#1849A9] font-semibold">
                    Smart School Matching
                  </h3>
                  <p class="text-[#1570EF]">
                    Get AI-recommended best-fit schools.
                  </p>
                </div>
                <div>
                  <h3 class="text-[#1849A9] font-semibold">
                    AI Essay Generator
                  </h3>
                  <p class="text-[#1570EF]">
                    Instantly draft high-quality essays.
                  </p>
                </div>
                <div>
                  <h3 class="text-[#1849A9] font-semibold">
                    AI Chat Assistant
                  </h3>
                  <p class="text-[#1570EF]">
                    Ask anything and get instant help.
                  </p>
                </div>
              </div>
            </div>
            <!-- Expert Mentorship Section -->
            <div class="p-5 border border-[#FEC84B] bg-[#FFFAEB] rounded-lg">
              <h2 class="text-[#DC6803] font-semibold">Expert Mentorship</h2>
              <p class="mt-5 text-[#93370D] font-semibold">
                Besides this AI product, we also offer mentoring services!
              </p>
              <ul class="mt-3 text-[#DC6803] flex flex-col gap-3">
                <li>1-1 support for essays, scholarships, extracurriculars</li>
                <li>Exclusive training & resources</li>
                <li>With mentors from Harvard, UPenn, Yonsei, and more</li>
              </ul>
              <p class="mt-3 text-[#93370D] font-semibold">For free!</p>
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <p class="text-xl text-[#181D27] font-semibold">
              Our students' achievements
            </p>
            <ArticlesCard :articleDetail="articlesList[0]" />
            <div class="h-px bg-gray-200" />
            <ArticlesCard :articleDetail="articlesList[1]" />
            <!-- <div class="h-px bg-gray-200" /> -->
            <!-- <button
              @click="navigateTo($localePath('/pricing'))"
              class="font-semibold text-sm text-white bg-[#1570EF] rounded-lg py-2.5 px-4 shadow-[0px_1px_2px_0px_#0A0D120D]"
            >
              Get Your Personalized Plan in 60 Seconds
            </button> -->
          </div>
        </div>
        <EventsAndSocials class="md:hidden" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

definePageMeta({
  layout: "dashboard-layout",
});

const appStore = useAppStore();

const upgradePlan = [
  {
    image: "/images/dashboard/home/article-img.png",
    title: "Transform your application with mentors from Harvard, UPenn & more",
    details:
      "Strategic training, one-on-one reviews, and exclusive AI tools that deliver results. Our mentees have 100% success rate at top universities worldwide.",
    buttonText: "View Plan",
    cta: "",
  },
];
const articlesList = [
  {
    image: "/images/dashboard/home/article-1.png",
    title: "",
    details: `Meet Quỳnh Anh, who secured scholarships worth $176,000 at Depauw and $167,000 at Augustana! Once ready to abandon her US dreams due to fears and complex applications, she found transformation with Arrowster mentors. "Thanh showed me countless pathways when lost, Toàn provided 24/7 support, and Ken (Oxford, Harvard) offered straightforward guidance. Previously traumatized by counselors, now I comfortably ask anything—even sending midnight essays with detailed feedback by morning."`,
    buttonText: "Read more about Jennifer’s story",
    cta: "https://www.facebook.com/Arrowster.Official/posts/pfbid0g7PW9e1wm5iA2T6vqEcAZJnzyT1rUStAaA5SiWfB4NZWPJ9HSy8Ffbyh5sBa2niQl",
  },
  {
    image: "/images/dashboard/home/article-2.png",
    title: "",
    details: `Meet Cao Tiến, who secured scholarships worth $100,000 at Franklin & Marshall, $120,000 at Baylor, and $80,000 at Arizona State. Working with mentor Hoài Thanh, he navigated through 8-9 revisions—even during holidays—to craft an authentic essay that stood out. "Online guides say 'tell your story' but few show HOW within 650 words. Having a knowledgeable mentor helped me see my story from different angles, despite the 'intense' feedback."`,
    buttonText: "Read more about Tien’s story",
    cta: "https://www.facebook.com/share/p/1QVcAcVWQX/",
  },
];

onBeforeMount(async () => {
  if (!appStore.userData) {
    await appStore.getUserData();
  }
});
</script>
