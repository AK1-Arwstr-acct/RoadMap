<template>
  <div class="size-full flex flex-col lg:flex-row">
    <div
      ref="schoolsListWrapper"
      class="flex-1 h-full overflow-y-auto custom-scrollbar pb-5 lg:pb-0"
    >
      <div class="h-fitt w-full max-w-[1150px] mx-auto">
        <div class="px-4 md:px-6 w-full h-fit">
          <div
            class="flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-14"
            :class="{ 'flex-wrap': appTrackerStore.isSidebarOpen }"
          >
            <div class="flex-1 overflow-hidden w-full max-w-[800px] mx-auto">
              <RecommendedSchools
                :isTokenLoading="schoolListStore.isPublicTokenLoading"
                @getRecommendations="getRecommendations"
              />
            </div>
            <div
              v-if="
                (schoolListStore.overViews?.length ?? 0) >= 1 && width <= 1024
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
          (schoolListStore.overViews ?? []).length > 0 &&
          schoolListStore.overViews !== null &&
          width > 1024
        "
      >
        <component :is="OverviewSidebar" />
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import useSchoolListStore from "~/stores/SchoolListStore";
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
const { api } = useApi();
const schoolListStore = useSchoolListStore();

const isActive = ref<boolean>(false);
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
  if (schoolListStore.selectedPublicMajors.length > 0) {
    await schoolListStore.runEngine(pageNo);
  } else {
    await schoolListStore.preRunEngine(pageNo);
  }
};

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

watch(
  () => appStore.userData,
  async () => {
    checkPrograms();
  }
);

watch(
  () => schoolListStore.schoolsList,
  () => {
    schoolsListWrapper.value?.scrollTo({ top: 0, behavior: "smooth" });
  }
);

onMounted(async () => {
  windowSize();
  window.addEventListener("resize", windowSize);
  const publicToken = useCookie("publicToken");
  if (publicToken.value) {
    schoolListStore.isPublicTokenLoading = false;
  }

  if (schoolListStore.isSchoolListPublic) {
    schoolListStore.isSchoolsLoading = false;
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
