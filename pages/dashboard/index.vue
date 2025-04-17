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
              <h2 class="text-[#181D27] text-2xl font-semibold">
                {{ $t("dashboard_home_page.section_title") }}
              </h2>
              <p class="text-[#535862] mt-3">
                {{ $t("dashboard_home_page.tagline") }}
              </p>
              <div class="flex justify-center mt-8">
                <img
                  src="/images/home-application.png"
                  class="h-[100px]"
                  loading="eager"
                />
              </div>
            </div>
            <!-- power tool -->
            <div
              class="border border-[#84CAFF] bg-[#EFF8FF] rounded-lg py-4 px-5"
            >
              <p class="text-[#1570EF] font-semibold">
                {{ $t("dashboard_home_page.ai_powered_tools") }}
              </p>
              <div class="mt-4 flex flex-col gap-4">
                <div>
                  <p class="text-[#1849A9] font-semibold">
                    {{ $t("dashboard_home_page.smart_school_matching.title") }}
                  </p>
                  <p class="text-[#1570EF]">
                    {{
                      $t(
                        "dashboard_home_page.smart_school_matching.description"
                      )
                    }}
                  </p>
                </div>
                <div>
                  <p class="text-[#1849A9] font-semibold">
                    {{ $t("dashboard_home_page.ai_essay_generator.title") }}
                  </p>
                  <p class="text-[#1570EF]">
                    {{
                      $t("dashboard_home_page.ai_essay_generator.description")
                    }}
                  </p>
                </div>
                <div>
                  <p class="text-[#1849A9] font-semibold">
                    {{ $t("dashboard_home_page.ai_chat_assistant.title") }}
                  </p>
                  <p class="text-[#1570EF]">
                    {{
                      $t("dashboard_home_page.ai_chat_assistant.description")
                    }}
                  </p>
                </div>
              </div>
            </div>
            <!-- Expert Mentorship Section -->
            <div class="p-5 border border-[#FEC84B] bg-[#FFFAEB] rounded-lg">
              <p class="text-[#DC6803] font-semibold">
                {{ $t("dashboard_home_page.expert_mentorship.title") }}
              </p>
              <p class="mt-5 text-[#93370D] font-semibold">
                {{ $t("dashboard_home_page.expert_mentorship.description") }}
              </p>
              <ul class="mt-3 text-[#DC6803] flex flex-col gap-3">
                <li>{{ $t("dashboard_home_page.mentorship_features[0]") }}</li>
                <li>{{ $t("dashboard_home_page.mentorship_features[1]") }}</li>
                <li>{{ $t("dashboard_home_page.mentorship_features[2]") }}</li>
              </ul>
              <p class="mt-3 text-[#93370D] font-semibold">
                {{ $t("dashboard_home_page.mentorship_features[3]") }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <p class="text-xl text-[#181D27] font-semibold">
              {{ $t("dashboard_home_page.student_achievements_title") }}
            </p>
            <ArticlesCard :articleDetail="articlesList[0]" />
            <div class="h-px bg-gray-200" />
            <ArticlesCard :articleDetail="articlesList[1]" />
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

const runtimeConfig = useRuntimeConfig();
const { locale, t } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/dashboard`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/home-application.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/tell-me-more.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/sophie-chat.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/post-application.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/ai-recommendation.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/v-room-short.png",
        as: "image",
      },
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/dashboard`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/dashboard`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/dashboard`,
        hreflang: "x-default",
      },
    ],
  }))
);

const appStore = useAppStore();

// const upgradePlan = [
//   {
//     image: "/images/dashboard/home/article-img.png",
//     title: "Transform your application with mentors from Harvard, UPenn & more",
//     details:
//       "Strategic training, one-on-one reviews, and exclusive AI tools that deliver results. Our mentees have 100% success rate at top universities worldwide.",
//     buttonText: "View Plan",
//     cta: "",
//   },
// ];
const articlesList = [
  {
    image: "/images/dashboard/home/article-1.png",
    title: "",
    details: t("dashboard_home_page.article1.details"),
    buttonText: t("dashboard_home_page.article1.buttonText"),
    cta: "https://www.facebook.com/Arrowster.Official/posts/pfbid0g7PW9e1wm5iA2T6vqEcAZJnzyT1rUStAaA5SiWfB4NZWPJ9HSy8Ffbyh5sBa2niQl",
  },
  {
    image: "/images/dashboard/home/article-2.png",
    title: "",
    details: t("dashboard_home_page.article2.details"),
    buttonText: t("dashboard_home_page.article2.buttonText"),
    cta: "https://www.facebook.com/share/p/1QVcAcVWQX/",
  },
];

onBeforeMount(async () => {
  if (!appStore.userData) {
    await appStore.getUserData();
  }
});
</script>
