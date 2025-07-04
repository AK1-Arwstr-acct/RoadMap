<template>
  <div
    class="fixed w-[92%] right-[2px] top-0 z-50 bottom-0 bg-white flex flex-col gap-6 transition-all transform duration-500 ease-in-out border-r-[1.5px] border-gray-200 overflow-y-auto no-scrollbar"
  >
    <div class="flex justify-between items-center p-4 border-b border-gray-200">
      <div
        v-if="!appStore.authenticatedUser"
        @click="handleLogo"
        class="flex gap-2 items-center cursor-pointer"
      >
        <IconArrowsterLogo class="size-8 min-w-8" />
        <img
          class="w-24"
          src="/images/logo/logo.svg"
          alt="Logo"
          loading="eager"
        />
      </div>
      <div v-else @click="handleProfile" class="flex items-center gap-2">
        <div class="cursor-pointer rounded-full overflow-hidden size-10">
          <img
            v-if="appStore.userData?.avatar"
            :src="appStore.userImagePreview || appStore.userData?.avatar"
            alt="user-icon"
            class="size-full"
          />
          <div
            v-else
            class="size-full bg-orange-500 flex items-center justify-center text-white font-medium uppercase text-xl"
          >
            <span>{{ appStore.userData?.name.charAt(0) }}</span>
          </div>
        </div>
        <p
          class="text-[#1570EF] font-semibold w-fit border-b border-[#1570EF] leading-4 cursor-pointer"
        >
          {{ appStore.userData?.name }}
        </p>
      </div>
      <div class="cursor-pointer" @click="emit('close')">
        <IconCross width="24" height="24" fill="#717680" />
      </div>
    </div>
    <div class="px-4 pb-6">
      <button
        v-if="appStore.authenticatedUser"
        @click="talkToUs"
        class="bg-[#1570EF] w-full text-white py-2.5 font-semibold rounded-lg"
      >
        {{ t("dashboard.talk_to_us") }}
      </button>
      <div v-else class="flex flex-col gap-3">
        <NuxtLinkLocale :to="'/signup'" class="w-full">
          <button
            class="border border-[#1570EF] bg-[#1570EF] p-2.5 px-3.5 rounded-lg w-full text-white text-sm font-semibold shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            {{ t("dashboard.signup") }}
          </button>
        </NuxtLinkLocale>
        <NuxtLinkLocale :to="'/login'" class="w-full">
          <button
            class="border border-gray-200 py-2.5 px-3.5 rounded-lg w-full text-[#414651] text-sm font-semibold shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            {{ t("dashboard.login") }}
          </button>
        </NuxtLinkLocale>
      </div>
      <div class="mt-6">
        <BaseLanguageDropdown :isMobile="true" />
      </div>
      <div class="mt-6">
        <FeaturesDropdown
          placeholder="Trending Features"
          :options="features"
          v-model="featureState"
          :isShadowDark="true"
          @onChange="onFeatureStateChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconTabSophie from "~/components/icons/IconTabSophie.vue";
import IconTabSchool from "~/components/icons/IconTabSchool.vue";
import useAppStore from "~/stores/AppStore";
import type { OptionAttributes } from "~/types/home";
import IconEssayGenerater from "../icons/IconEssayGenerater.vue";
import IconBookOpen from "../icons/IconBookOpen.vue";
import useAppTrackerStore from "~/stores/AppTrackerStore";
import useSophieStore from "~/stores/sophieStore";
import IconScholarship from "../icons/IconScholarship.vue";
import type { Task } from "~/types/dashboard";

const emit = defineEmits(["updateTab", "close"]);

const appStore = useAppStore();
const localePath = useLocalePath();
const appTrackerStore = useAppTrackerStore();
const sophieStore = useSophieStore();
const route = useRoute();
const { t } = useI18n();

const featureState = ref<OptionAttributes | null>(null);

const features: OptionAttributes[] = [
  {
    value: "/school-list",
    label: t("dashboard.navbar.schools_list"),
    icon: IconTabSchool,
  },
  {
    value: "/ai-essay",
    label: t("dashboard.navbar.ai_essay"),
    icon: IconEssayGenerater,
  },
  {
    value: "/resources",
    label: t("dashboard.navbar.resources"),
    icon: IconBookOpen,
  },
  {
    value: "/sophie",
    label: t("dashboard.navbar.ask_sophie"),
    icon: IconTabSophie,
  },
  // {
  //   value: "/scholarship",
  //   label: t("dashboard.navbar.scholarship"),
  //   icon: IconScholarship,
  // },
];

const handleLogo = () => {
  navigateTo(localePath("/school-list"));
  emit("close");
};
const talkToUs = () => {
  navigateTo(localePath("/pricing"));
  emit("close");
};
const handleProfile = () => {
  navigateTo(localePath("/profile"));
  emit("close");
};

const onFeatureStateChange = () => {
  // in case of scholarship option
  if (featureState.value?.value === "/scholarship") {
    appStore.isFeatureChangeFromTasks = true;
    Object.keys(appTrackerStore.taskActiveStates).forEach((key) => {
      appTrackerStore.taskActiveStates[Number(key)] = false;
    });
    sophieStore.roadmapTaskDetail = null;
    return;
  }

  Object.keys(appTrackerStore.taskActiveStates).forEach((key) => {
    appTrackerStore.taskActiveStates[Number(key)] = false;
  });
  const applicationListTasks = (appTrackerStore.applicationList ?? []).flatMap(
    (item) => item.tasks ?? []
  );
  const tasksArray = [
    ...(appTrackerStore.preApplication?.tasks ?? []),
    ...applicationListTasks,
    ...(appTrackerStore.postApplication?.tasks ?? []),
  ];
  const matchedTask: Task | undefined = tasksArray.find((item) => {
    return featureState.value?.value
      .replace("-", " ")
      .includes(item.feature_state.replace("_", " "));
  });
  if (matchedTask) {
    appTrackerStore.taskActiveStates[Number(matchedTask?.id)] = true;
    sophieStore.roadmapTaskDetail = matchedTask;
  }
};

const checkFeatureState = () => {
  const matched = features.find((item) => route.path.includes(item.value));
  featureState.value = matched || null;
};

let isFirstRun = true;
watch(
  () => featureState.value?.value,
  () => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    // in case of scholarship option
    if (featureState.value?.value === "/scholarship") {
      navigateTo(localePath("/sophie"));
    } else {
      navigateTo(localePath(featureState.value?.value || ""));
    }
    emit("close");
  }
);

onMounted(() => {
  checkFeatureState();
});
</script>
