<template>
  <div
    class="grid grid-cols-10 gap-6 size-full overflow-y-auto custom-scrollbar p-8 bg-white"
  >
    <div class="col-span-6 xl:col-span-7">home</div>
    <div class="col-span-4 xl:col-span-3 flex flex-col gap-16">
      <ArticlesCard :articleDetail="upgradePlan[0]" :isUpgradePlan="true" />
      <div class="flex flex-col gap-5">
        <p class="text-xl text-[#181D27] font-semibold">Our students achieved</p>
        <ArticlesCard v-for="(article,idx) in articlesList" :articleDetail="article" :key="idx"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const upgradePlan = [
  {
    image: "/images/article-img.png",
    title: "Unlock Exclusive Benefits",
    details:
      "Access advanced features that streamline your application. Working with us provides all the tools needed for a confident, easy application process!",
    buttonText: "Upgrade plan",
    cta: "",
  },
];
const articlesList = [
  {
    image: "/images/article-img.png",
    title: "",
    details:
      "Meet Jennifer, a mentee from Nguyễn Siêu High School, Hanoi. Guided by Hoài Thanh (VinUni 100% scholar, admitted to Harvard Business School) and Đức Toàn (Yonsei 100% scholar), she receives one-on-one support for the U.S. Common App and top Australian scholarships.",
    buttonText: "Read more about Jennifer’s story",
    cta: "",
  },
  {
    image: "/images/article-img.png",
    title: "",
    details: `No pressure" and "not alone" are the key takeaways from Lê Cao Tiến's U.S. application journey. As the first Arrowster Scholarship winner, he is mentored by Hoài Thanh (Harvard Business School, VinUni full scholarship).`,
    buttonText: "Read more about Tien’s story",
    cta: "",
  },
];
</script>
