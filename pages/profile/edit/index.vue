<template>
  <section class="bg-white md:bg-[#FAFAFA] h-full overflow-y-auto no-scrollbar">
    <div class="max-w-[640px] px-4 mx-auto mt-8 mb-16">
      <div @click="$router.push(`${ $i18n.locale != 'en' ? `/${$i18n.locale}/profile` : `/profile`}`)" class="text-[#717680] cursor-pointer font-medium flex items-center gap-1.5 mb-3">
        <IconChevronDown
          class="transform rotate-90"
          stroke="#717680"
          width="20"
          height="20"
        />
        <p>
          {{ $t('profile_page.profile') }}
        </p>
      </div>
      <p class="text-[#181D27] text-2xl font-semibold mb-8">{{ $t('profile_page.edit_profile') }}</p>
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
  layout: "nav-layout",
});

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const router = useRouter();

const canonicalUrl = `${runtimeConfig.public.appMode}${locale.value !== "en" ? `/${locale.value}` : ""}/profile/edit`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/profile/edit`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/profile/edit`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/profile/edit`,
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
