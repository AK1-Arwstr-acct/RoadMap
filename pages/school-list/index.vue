<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="h-full w-full max-w-[1150px] mx-auto">
      <div class="px-6 w-full h-fit">
        <div class="w-full h-2 rounded-full bg-[#D1E9FF] md:hidden mt-6">
          <div
            class="bg-[#1570EF] rounded-full h-full transition-all ease-in-out duration-1000"
            :style="{ width: isActive ? '100%' : '80%' }"
          />
        </div>
        <div class="flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-14">
          <div class="flex-1">
            <RecommendedSchoolSkeleton
              v-if="dashboardStore.isSchoolsLoading || isTokenLoading"
            />
            <RecommendedSchools
              v-else
              @getRecommendations="getRecommendations"
            />
          </div>
          <div class="w-full md:w-[312px]">
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

definePageMeta({
  layout: "dashboard-layout",
});

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

onMounted(async () => {
  if (dashboardStore.isSchoolListPublic) {
    const response = await api.get("/api/v1/session-based-journey/session");
    if (response.data) {
      const token = useCookie("publicToken", {
        maxAge: 604800,
        httpOnly: false,
        secure: true,
      });
      token.value = JSON.stringify(response.data.data.token);
      await nextTick();
      dashboardStore.setProgramListOptions();
      isTokenLoading.value = false;
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
