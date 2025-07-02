<template>
  <div class="size-full flex flex-col lg:flex-row">
    <div
      ref="schoolsListWrapper"
      class="flex-1 h-full overflow-y-auto custom-scrollbar pb-5 lg:pb-0"
    >
      <div class="h-fitt w-full max-w-[1150px] mx-auto">
        <div class="px-4 mt-4 lg:mt-10 md:px-6 w-full h-fit">
          <div
            class="flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-14"
            :class="{ 'flex-wrap': appTrackerStore.isSidebarOpen }"
          >
            <div class="flex-1 overflow-hidden">
              <RecommendedSchools
                :isTokenLoading="isTokenLoading"
                @getRecommendations="getRecommendations"
              />
            </div>
            <div
              v-if="
                (dashboardStore.overViews?.length ?? 0) >= 1 && width <= 1024
              "
            >
              <WhyTheseSchool />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- review side bar -->
    <Transition name="overview">
      <div
        v-if="
          (dashboardStore.overViews ?? []).length > 0 &&
          dashboardStore.overViews !== null &&
          width > 1024
        "
      >
        <component :is="OverviewSidebar" />
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import useAppStore from "~/stores/AppStore";
import useAppTrackerStore from "~/stores/AppTrackerStore";
import OverviewSidebar from "~/components/pages/school-list/OverviewSidebar.vue";

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
        href: "/images/lets-go.png",
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
const width = ref<number>(0);

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

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

const firstRun = ref<boolean>(true);

watch(
  () => appStore.userData,
  async () => {
    if (firstRun.value) {
      getRecommendations();
      firstRun.value = false;
    }
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
  windowSize();
  window.addEventListener("resize", windowSize);
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

onUnmounted(async () => {
  window.removeEventListener("resize", windowSize);
});
</script>
<style scoped>
.overview-enter-active,
.overview-leave-active {
  transition: width 500ms ease-in-out;
}

.overview-enter-from,
.overview-leave-to {
  width: 0;
}

.overview-enter-to,
.overview-leave-from {
  width: 424px;
}
</style>
