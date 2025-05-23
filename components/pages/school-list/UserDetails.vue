<template>
  <section class="md:pt-8 pb-6 h-fit flex flex-col gap-6">
    <div v-if="deviceType === 'desktop'" class="my-6">
      <component
        v-if="dashboardStore.isSchoolListPublic || route.path.includes('/demo')"
        :is="desktop.PublicUserDataInfo"
      />
      <component v-else :is="desktop.UserDataInfo" />
    </div>
    <WhyTheseSchool v-if="(dashboardStore.overViews?.length ?? 0) >= 1" />
    <MajorSekeleton v-if="isTokenLoading" />
    <PublicMajorsSelection
      v-else-if="
        dashboardStore.isSchoolListPublic || route.path.includes('/demo')
      "
    />
    <MajorSelection v-else />
    <SophieRecommendation :isActive="isActive" />
  </section>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import useDashboardStore from "~/stores/dashboardStore";

defineProps({
  isTokenLoading: {
    type: Boolean,
    default: false,
  },
});

const appStore = useAppStore();
const dashboardStore = useDashboardStore();
const deviceType = useDeviceType();
const route = useRoute();

const desktop = {
  PublicUserDataInfo: defineAsyncComponent(
    () => import("~/components/pages/school-list/PublicUserDataInfo.vue")
  ),
  UserDataInfo: defineAsyncComponent(
    () => import("~/components/pages/school-list/UserDataInfo.vue")
  ),
};

const isActive = ref<boolean>(false);

const checkPrograms = () => {
  if (appStore.userData) {
    if (appStore.userData.educational_records.next_program_titles.length > 0) {
      isActive.value = true;
    } else {
      isActive.value = false;
    }
  }
};

watch(
  () => appStore.userData,
  async () => {
    checkPrograms();
  }
);
watch(
  () => dashboardStore.selectedPublicMajors,
  async (newValue) => {
    if (newValue.length > 0) {
      isActive.value = true;
    } else {
      isActive.value = false;
    }
  }
);

onMounted(() => {
  checkPrograms();
});
</script>
