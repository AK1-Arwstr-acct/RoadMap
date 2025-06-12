<template>
  <div
    ref="schoolsListWrapper"
    class="size-full overflow-y-auto custom-scrollbar"
  >
    <div class="h-full w-full max-w-[1150px] mx-auto">
      <div class="md:px-6 w-full h-fit">
        <!-- need_more_advice -->
        <div
          class="p-4 flex gap-2 sm:gap-4 items-start rounded-[10px] bg-[#EFF8FF] md:hidden"
        >
          <div class="flex-1">
            <p class="sm:text-lg font-semibold text-[#181D27]">
              {{ $t("schoolList_page.mentorship.need_more_advice") }}
            </p>
            <p class="text-[#535862] text-sm sm:text-base pt-0.5">
              {{ $t("schoolList_page.mentorship.mentorship_description") }}
            </p>
            <NuxtLinkLocale to="/Pricing">
              <button
                class="py-2 px-3 rounded-lg bg-[#1570EF] text-white mt-4 font-semibold text-sm sm:text-base"
              >
                {{ $t("schoolList_page.mentorship.free_mentorship") }}
              </button>
            </NuxtLinkLocale>
          </div>
          <div class="">
            <img
              src="/images/ai-recommendation.png"
              alt="ai-recommendation"
              class="w-full object-contain max-w-[90px] sm:max-w-[106px]"
              loading="eager"
            />
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-14"
          :class="{ 'flex-wrap': appTrackerStore.isSidebarOpen }"
        >
          <div class="flex-1 overflow-hidden">
            <RecommendedSchoolLoading
              v-if="dashboardStore.isSchoolsLoading || isTokenLoading"
            />
            <RecommendedSchools
              v-else
              @getRecommendations="getRecommendations"
            />
          </div>
          <div
            class="w-full"
            :class="[
              appTrackerStore.isSidebarOpen ? 'lg:w-[312px]' : 'md:w-[312px]',
            ]"
          >
            <UserDetails :isTokenLoading="isTokenLoading" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import useAppStore from "~/stores/AppStore";
import useAppTrackerStore from "~/stores/AppTrackerStore";

definePageMeta({
  layout: "home-layout",
});

const appTrackerStore = useAppTrackerStore();
const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/school-list`;
useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/ai-recommendation.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/countries-application.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/sophie-chat.png",
        as: "image",
      },
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/school-list`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/school-list`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/school-list`,
        hreflang: "x-default",
      },
    ],
  }))
);

const appStore = useAppStore();
const dashboardStore = useDashboardStore();
const { api } = useApi();

const isActive = ref<boolean>(false);
const isTokenLoading = ref<boolean>(true);
const schoolsListWrapper = ref<HTMLElement | null>(null);

const checkPrograms = () => {
  if (appStore.userData) {
    if (appStore.userData.educational_records.next_program_titles.length > 0) {
      isActive.value = true;
    } else {
      isActive.value = false;
    }
  }
};

const getRecommendations = async (pageNo: number = 1) => {
  if (dashboardStore.isSchoolListPublic) {
    if (dashboardStore.selectedPublicMajors.length > 0) {
      await dashboardStore.runEngine(pageNo);
    } else {
      await dashboardStore.preRunEngine(pageNo);
    }
    return;
  }
  if (appStore.userData) {
    if (appStore.userData.educational_records.next_program_titles.length > 0) {
      await dashboardStore.runEngine(pageNo);
    } else {
      await dashboardStore.preRunEngine(pageNo);
    }
  }
};

watch(
  () => appStore.userData,
  async () => {
    getRecommendations();
    checkPrograms();
  }
);

watch(
  () => dashboardStore.schoolsList,
  () => {
    schoolsListWrapper.value?.scrollTo({ top: 0, behavior: "smooth" });
  }
);

onMounted(async () => {
  await nextTick();
  if (dashboardStore.isSchoolListPublic) {
    const response = await api.get("/api/v1/session-based-journey/session");
    if (response.data) {
      const token = useCookie("publicToken", {
        maxAge: 10800,
        httpOnly: false,
        secure: true,
      });
      token.value = JSON.stringify(response.data.data.token);
      await nextTick();
      dashboardStore.setProgramListOptions();
      isTokenLoading.value = false;
      dashboardStore.isSchoolsLoading = false;
    }
    return;
  }
  isTokenLoading.value = false;
  getRecommendations();
  if (
    !(
      dashboardStore.programListOptions.length &&
      dashboardStore.locationOptions.length &&
      dashboardStore.budgetList.length &&
      dashboardStore.coursePreferenceOptions.length
    )
  ) {
    dashboardStore.setProgramListOptions();
    dashboardStore.setLocationOptions();
    dashboardStore.setBudgetList();
    dashboardStore.setCoursePreferenceOptions();
  }
});
</script>
