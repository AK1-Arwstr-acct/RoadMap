<template>
  <div class="h-dvh overflow-y-auto custom-scrollbar">
    <div class="h-fit flex justify-center px-5 pt-24 pb-10 relative">
      <ProgressBar @updateStep="previousStep" />
      <AcademicInfo
        v-if="steps === 'academic'"
        @updateStep="steps = 'currentSituation'"
      />
      <CurrentSituation
        v-else-if="steps === 'currentSituation'"
        :situationList="situationList"
        @updateStep="steps = 'schoolListData'"
      />
      <SchoolListData
        v-else-if="steps === 'schoolListData'"
        @updateStep="steps = 'areaOfInterest'"
      />
      <ParentCategory v-else-if="steps === 'areaOfInterest'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { OptionAttributes } from "~/types/home";
import useSchoolListStore from "~/stores/SchoolListStore";

const runtimeConfig = useRuntimeConfig();
const { locale, t } = useI18n();
const schoolListStore = useSchoolListStore();

const canonicalUrl = `${runtimeConfig.public.appMode}${
  locale.value !== "en" ? `/${locale.value}` : ""
}/onboarding`;

useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/academic.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/application.png",
        as: "image",
      },
      {
        rel: "preload",
        href: "/images/school-list.png",
        as: "image",
      },
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/onboarding`,
        hreflang: "en",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/vi/onboarding`,
        hreflang: "vi",
      },
      {
        rel: "alternate",
        href: `${runtimeConfig.public.appMode}/onboarding`,
        hreflang: "x-default",
      },
    ],
  }))
);

const steps = ref<
  "academic" | "currentSituation" | "schoolListData" | "areaOfInterest"
>("academic");

const previousStep = () => {
  if (steps.value === "academic") {
    return;
  } else if (steps.value === "currentSituation") {
    steps.value = "academic";
  } else if (steps.value === "schoolListData") {
    steps.value = "currentSituation";
  } else if (steps.value === "areaOfInterest") {
    steps.value = "schoolListData";
  }
};

const situationList = ref<OptionAttributes[]>([
  {
    value: "A",
    label: "I'm unsure about what major to pursue",
    description: t("onboarding.situationList.label_a"),
  },
  {
    value: "B",
    label: "I have a few majors in mind but need help choosing",
    description: t("onboarding.situationList.label_b"),
  },
  {
    value: "C",
    label: "I know what I want to study, but I still have some concerns",
    description: t("onboarding.situationList.label_c"),
  },
  {
    value: "D",
    label: "I've decided on my major and am now looking for schools",
    description: t("onboarding.situationList.label_d"),
  },
  {
    value: "E",
    label: "I'm just browsing for now",
    description: t("onboarding.situationList.label_e"),
  },
]);

onMounted(async ()=>{
  const publicToken = useCookie("publicToken");
  if (!publicToken.value) {
    await schoolListStore.setPublicToken();
    await nextTick();
  }
})
</script>
