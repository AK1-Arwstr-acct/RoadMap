<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <section class="bg-white">
      <div class="h-full pt-2">
        <Header />
        <div class="max-w-[752px] mx-auto flex flex-col gap-[58px] pb-5 lg:pb-8 px-5">
          <PersonelInfo />
          <div v-show="showAchievements">
            <div class="flex justify-between items-center font-semibold mb-5">
              <p class="text-xl md:text-2xl text-[#181D27]">
                {{ $t("profile_page.your_achievement") }}
              </p>
              <span
                @click="navigateTo(localePath('/profile/achievements'))"
                class="text-sm md:text-[18px] text-[#175CD3] cursor-pointer"
                >{{ $t("profile_page.view_all") }}</span
              >
            </div>
            <Achievements
              @remainingTask="(value) => (showAchievements = value)"
            />
          </div>

          <!-- AI essay -->

          <div v-if="essayStore.userEssayList.length">
            <div class="flex justify-between items-center font-semibold mb-5">
              <p class="text-xl md:text-2xl text-[#181D27]">
                {{ $t("profile_page.your_ai_essay") }}
              </p>
              <NuxtLinkLocale :to="'/profile/essays'">
                <span
                  class="text-sm md:text-[18px] text-[#175CD3] cursor-pointer"
                  >{{ $t("profile_page.view_all") }}</span
                >
              </NuxtLinkLocale>
            </div>
            <div class="flex flex-col gap-6">
              <EssayCard
                v-for="(essay, idx) in essayStore.userEssayList.slice(0, 2)"
                :key="idx"
                :essay="essay"
                @click="openDetail(essay)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";
import type { EssayData } from "~/types/home";

definePageMeta({
  layout: "dashboard-layout",
});

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/profile`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/profile`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/profile`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/profile`,
        hreflang: "x-default",
      },
    ],
  }))
);

const { api } = useApi();
const essayStore = useEssayStore();
const localePath = useLocalePath();

const showAchievements = ref<boolean>(false);

const openDetail = (essayDetail: EssayData) => {
  const details = filterEssay(essayDetail.generated_essay);
  essayStore.setFinalEssay(details);
  navigateTo(localePath(`/profile/essays/${essayDetail.id}`));
};

onMounted(async () => {
  essayStore.getEssayList();
});
</script>
