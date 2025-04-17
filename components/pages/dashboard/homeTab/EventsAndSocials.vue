<template>
  <div class="flex flex-col gap-8 lg:gap-16">
    <!-- events -->
    <div>
      <div class="flex justify-between items-center mb-5">
        <p class="text-xl font-semibold text-[#181D27]">
          {{ $t("dashboard_home_page.program_and_resources_for_you") }}
        </p>
        <a href="https://www.facebook.com/Arrowster.Official" target="_blank">
          <p class="font-semibold text-[#175CD3] cursor-pointer text-nowrap">
            {{ $t("dashboard_home_page.view_all") }}
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
      <p class="text-xl font-semibold text-[#181D27] mb-5">
        {{ $t("dashboard_home_page.join_community") }}
      </p>
      <div class="flex gap-6 flex-wrap">
        <a
          href="https://www.facebook.com/groups/8907362185980576"
          target="_blank"
          class="flex items-center w-full lg:w-[calc(50%-12px)] gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border-[1.5px] border-gray-200 rounded-[14px] shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
        >
          <IconFacebook />
          {{ $t("dashboard_home_page.facebook_community") }}
        </a>
        <a
          href="https://www.threads.net/@arrowster.official"
          target="_blank"
          class="flex items-center w-full lg:w-[calc(50%-12px)] gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border-[1.5px] border-gray-200 rounded-[14px] shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
        >
          <IconThreads />
          {{ $t("dashboard_home_page.threads_community") }}
        </a>
        <a
          href="https://discord.gg/xahYuU2H"
          target="_blank"
          class="flex items-center w-full lg:w-[calc(50%-12px)] gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border-[1.5px] border-gray-200 rounded-[14px] shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
        >
          <IconDiscord />
          {{ $t("dashboard_home_page.discord_community") }}
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n();

const eventList = [
  {
    image: "/images/application-post.png",
    title: t("dashboard_home_page.program_1.title"),
    description: t("dashboard_home_page.program_1.description"),
    link: {
      text: t("dashboard_home_page.program_1.cta_text"),
      value:
        "https://docs.google.com/document/d/1Pl2w7QN0SztPoa-JLdhIUiUBwcmawdaCMJkuYHaNdmQ/edit?usp=sharing",
    },
    locked: false,
  },
  {
    image: "/images/application.png",
    title: t("dashboard_home_page.program_2.title"),
    description: t("dashboard_home_page.program_2.description"),
    link: {
      text: t("dashboard_home_page.program_2.cta_text"),
      value: "/pricing",
    },
    locked: true,
  },
  {
    image: "/images/decision.png",
    title: t("dashboard_home_page.program_3.title"),
    description: t("dashboard_home_page.program_3.description"),
    link: {
      text: t("dashboard_home_page.program_3.cta_text"),
      value: "/pricing",
    },
    locked: true,
  },
];

const handleNavigate = (link: string) => {
  window.open(link, "_blank");
};
</script>
