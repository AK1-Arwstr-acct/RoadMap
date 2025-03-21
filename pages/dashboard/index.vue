<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="h-full w-full max-w-[1150px] mx-auto">
      <div class="flex gap-16 w-full px-8 pt-8 pb-24 bg-white">
        <div class="flex-1">
          <HomeDetail />
        </div>
        <div class="max-w-[364px] flex flex-col gap-16">
          <ArticlesCard :articleDetail="upgradePlan[0]" :isUpgradePlan="true" />
          <div class="flex flex-col gap-5">
            <p class="text-xl text-[#181D27] font-semibold">
              Our students achieved
            </p>
            <ArticlesCard
              v-for="(article, idx) in articlesList"
              :articleDetail="article"
              :key="idx"
            />
          </div>
        </div>
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
