<template>
  <div
    class="flex gap-16 w-full px-8 pt-8 pb-24 bg-white"
  >
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
</template>
<script setup lang="ts">
const upgradePlan = [
  {
    image: "/images/dashboard/home/article-img.png",
    title: "Unlock Exclusive Benefits",
    details:
      "Access advanced features that streamline your application. Working with us provides all the tools needed for a confident, easy application process!",
    buttonText: "Upgrade plan",
    cta: "",
  },
];
const articlesList = [
  {
    image: "/images/dashboard/home/article-1.png",
    title: "",
    details:
      "Meet Jennifer, a mentee from Nguyễn Siêu High School, Hanoi. Guided by Hoài Thanh (VinUni 100% scholar, admitted to Harvard Business School) and Đức Toàn (Yonsei 100% scholar), she receives one-on-one support for the U.S. Common App and top Australian scholarships.",
    buttonText: "Read more about Jennifer’s story",
    cta: "https://www.facebook.com/share/p/1BrHQXX6Zh/",
  },
  {
    image: "/images/dashboard/home/article-2.png",
    title: "",
    details: `No pressure" and "not alone" are the key takeaways from Lê Cao Tiến's U.S. application journey. As the first Arrowster Scholarship winner, he is mentored by Hoài Thanh (Harvard Business School, VinUni full scholarship).`,
    buttonText: "Read more about Tien’s story",
    cta: "https://www.facebook.com/share/p/19D1nPiU41/",
  },
];
</script>
