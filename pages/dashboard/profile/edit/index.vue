<template>
  <section class="bg-white md:bg-[#FAFAFA] h-full overflow-y-auto no-scrollbar">
    <div class="max-w-[640px] px-4 mx-auto mt-8 mb-16">
      <p class="text-[#181D27] text-2xl font-semibold mb-8">Edit profile</p>
      <div class="flex flex-col gap-8">
        <EditUserPersonalInfo />
        <UserAcademicProfile />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";

definePageMeta({
  layout: "dashboard-layout",
});

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const canonicalUrl = `${runtimeConfig.public.appMode}${locale.value !== "en" ? `/${locale.value}` : ""}/dashboard/profile/edit`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/dashboard/profile/edit`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/dashboard/profile/edit`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/dashboard/profile/edit`,
        hreflang: "x-default",
      },
    ],
  }))
);

const dashboardStore = useDashboardStore();

onMounted(() => {
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
