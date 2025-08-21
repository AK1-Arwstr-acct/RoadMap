<template>
  <div class="h-dvh flex relative">
    <component :is="desktop.DashboardSidebar" />
    <div class="flex-1 overflow-hidden flex flex-col">
      <div class="lg:hidden">
        <DashboardNav />
      </div>
      <PageTitleNav title="Profile" />
      <div class="h-fit">
        <TabsList
          :tabs="tabs"
          :activeTab="activeTab"
          @changeTab="(value) => (activeTab = value)"
        />
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
import type { Tabs } from "~/types/home";
import IconUser from "~/components/icons/IconUser.vue";
import IconSchoolBuilding from "~/components/icons/IconSchoolBuilding.vue";

const deviceType = useDeviceType();
const appStore = useAppStore();
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const desktop = {
  DashboardSidebar: defineAsyncComponent(
    () => import("~/components/shared/DashboardSidebar.vue")
  ),
};

const tabs: Tabs[] = [
  {
    name: "profile",
    label: "Personal Information",
    icon: IconUser,
  },
  {
    name: "college-list",
    label: "College List",
    icon: IconSchoolBuilding,
  },
];

const activeTab = ref<(typeof tabs)[number]["name"]>("");

const checkActiveTab = () => {
  if (route.path === "/") {
    activeTab.value = "";
  } else if (route.path === "/profile/checklist") {
    activeTab.value = "college-list";
  } else {
    activeTab.value = "profile";
  }
};

watch(
  () => route.path,
  () => {
    checkActiveTab();
  }
);

watch(
  () => activeTab.value,
  (newValue) => {
    if (newValue === "profile") {
      navigateTo(localePath("/profile"));
    } else if (newValue === "college-list") {
      navigateTo(localePath("/profile/checklist"));
    }
  }
);

onMounted(() => {
  checkActiveTab();
});
</script>
