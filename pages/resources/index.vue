<template>
  <div
    ref="schoolsListWrapper"
    class="size-full overflow-y-auto custom-scrollbar"
  >
    <div class="h-full w-full max-w-[450px] lg:max-w-[1150px] mx-auto">
      <div class="p-6 w-full h-fit">
        <p class="text-xl font-semibold text-[#181D27] mb-5">
          {{ $t("resources_page.program_and_resources_for_you") }}
        </p>
        <div
          v-for="(item, index) in eventList"
          :key="index"
          class="flex flex-col lg:flex-row gap-6 border-[1.5px] border-gray-200 rounded-2xl p-6 shadow-[0px_1px_2px_0px_#0A0D120F,0px_1px_0px_0px_#0A0D121A]"
          :class="{'mb-6': index+1 < eventList.length}"
        >
          <div
            class="w-full lg:w-[144px] min-w-[144px] h-full max-h-[295px] lg:h-[144px] border-[1.5px] border-gray-200 rounded-lg overflow-hidden relative"
          >
            <img
              :src="item.image"
              alt="event"
              class="size-full object-contain"
            />
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
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "home-layout",
});

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/resources`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/application-post.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/application.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/decision.png",
        as: "image",
      },
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/resources`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/resources`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/resources`,
        hreflang: "x-default",
      },
    ],
  }))
);

const { t } = useI18n();

const eventList = [
  {
    image: "/images/application-post.png",
    title: t("resources_page.program_1.title"),
    description: t("resources_page.program_1.description"),
    link: {
      text: t("resources_page.program_1.cta_text"),
      value:
        "https://docs.google.com/document/d/1Pl2w7QN0SztPoa-JLdhIUiUBwcmawdaCMJkuYHaNdmQ/edit?usp=sharing",
    },
    locked: false,
  },
  {
    image: "/images/application.png",
    title: t("resources_page.program_2.title"),
    description: t("resources_page.program_2.description"),
    link: {
      text: t("resources_page.program_2.cta_text"),
      value: "/pricing",
    },
    locked: true,
  },
  {
    image: "/images/decision.png",
    title: t("resources_page.program_3.title"),
    description: t("resources_page.program_3.description"),
    link: {
      text: t("resources_page.program_3.cta_text"),
      value: "/pricing",
    },
    locked: true,
  },
];

const handleNavigate = (link: string) => {
  window.open(link, "_blank");
};
</script>
