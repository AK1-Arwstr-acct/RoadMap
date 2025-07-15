<template>
  <div class="h-dvh flex relative">
    <component :is="desktop.DashboardSidebar" />
    <div class="flex-1 overflow-hidden flex flex-col">
      <div class="lg:hidden">
        <DashboardNav />
      </div>
      <div class="flex-1 w-screen lg:w-full overflow-hidden pb-[70px] lg:pb-0">
        <slot />
      </div>
    </div>
    <!-- Sophie Modal -->
    <!-- <SophieModal /> -->
  </div>
  <Transition name="fade">
    <component
      :is="PaywallModal"
      v-if="appStore.resourcesSoftPaywall"
      :heading="t('roadmap_page.paywall_resources.heading')"
      :detail="t('roadmap_page.paywall_resources.detail')"
      @close="appStore.resourcesSoftPaywall = false"
    />
  </Transition>
</template>
<script setup lang="ts">
import PaywallModal from "~/components/shared/PaywallModal.vue";
import useAppStore from "~/stores/AppStore";

const deviceType = useDeviceType();
const appStore = useAppStore();
const { t } = useI18n();

const desktop = {
  DashboardSidebar: defineAsyncComponent(
    () => import("~/components/shared/DashboardSidebar.vue")
  ),
};
</script>
