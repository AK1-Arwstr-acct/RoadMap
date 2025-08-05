<template>
  <div class="h-dvh flex flex-col overflow-hidden relative">
    <div class="lg:hidden">
      <!-- <DashboardNav /> -->
      <RoadmapNav />
    </div>
    <div class="flex-1 w-full overflow-hidden flex relative">
      <!-- <component
        v-if="deviceType === 'desktop' || deviceType === 'tablet'"
        :is="desktop.DashboardSidebar"
      /> -->
      <DashboardSidebar />
      <RoadmapSidebar />
      <div class="flex-1 h-full overflow-hidden pb-16 lg:pb-0 flex flex-col">
        <PageTitleNav />
        <div class="h-full overflow-hidden">
          <slot />
        </div>
      </div>
    </div>
    <!-- Sophie Modal -->
    <SophieModal />
  </div>
  <Transition name="fade">
    <component
      :is="PaywallModal"
      v-if="appStore.progressSoftPaywall"
      :heading="t('roadmap_page.paywall_progress.heading')"
      :detail="t('roadmap_page.paywall_progress.detail')"
      @close="appStore.progressSoftPaywall = false"
    />
  </Transition>
  <Transition name="fade">
    <component
      :is="PaywallModal"
      v-if="appStore.resourcesSoftPaywall"
      :heading="t('roadmap_page.paywall_resources.heading')"
      :detail="t('roadmap_page.paywall_resources.detail')"
      @close="appStore.resourcesSoftPaywall = false"
    />
  </Transition>
  <Transition name="fade">
    <component
      :is="PaywallModal"
      v-if="appStore.featureSoftPaywall"
      heading="Sign up to access all feature"
      detail="Create an account to save changes, track progress, and unlock personalized tools."
      @close="appStore.featureSoftPaywall = false"
    />
  </Transition>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import PaywallModal from "~/components/shared/PaywallModal.vue";

const appStore = useAppStore();
const deviceType = useDeviceType();
const { t } = useI18n();
const route = useRoute();

const desktop = {
  DashboardSidebar: defineAsyncComponent(
    () => import("~/components/shared/DashboardSidebar.vue")
  ),
};
</script>
