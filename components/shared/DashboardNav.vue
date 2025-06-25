<template>
  <!-- Desktop View -->
  <div
    class="hidden lg:flex justify-between px-8 py-4 border-b-[1.5px] border-gray-200 bg-white"
  >
    <div class="flex gap-8 items-center">
      <NuxtLinkLocale to="/" class="flex gap-2 items-center cursor-pointer">
        <IconArrowsterLogo class="size-8 min-w-8" />
        <img
          class="w-24"
          src="/images/logo/logo.svg"
          alt="Logo"
          loading="eager"
        />
      </NuxtLinkLocale>
      <div class="w-[220px]">
        <FeaturesDropdown
          :placeholder="t('dashboard.navbar.trending_features')"
          :options="features"
          v-model="featureState"
          :isShadowDark="true"
          dropdownWidth="w-[calc(100%+30px)]"
        />
        <!-- @onChange="onFeatureStateChange" -->
      </div>
    </div>
    <div class="flex gap-4">
      <BaseLanguageDropdown />
      <div
        v-if="appStore.authenticatedUser || tokenExists"
        class="flex gap-4 items-center"
      >
        <NuxtLinkLocale to="/pricing">
          <p
            class="px-4 py-2.5 border-[1.5px] border-[#1570EF] rounded-lg font-semibold text-white bg-[#1570EF] cursor-pointer text-sm"
          >
            {{ t("dashboard.talk_to_us") }}
          </p>
        </NuxtLinkLocale>
        <div
          v-if="appStore.authenticatedUser || tokenExists"
          class="cursor-pointer rounded-full overflow-hidden size-10"
        >
          <NuxtLinkLocale to="/profile">
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
          </NuxtLinkLocale>
        </div>
        <div
          v-else
          @click="isMobileSideBarOpen = true"
          class="cursor-pointer rounded-full overflow-hidden size-10"
        >
          <img
            src="/images/chat-bot.png"
            alt="user-icon"
            class="size-full"
            loading="eager"
          />
        </div>
      </div>
      <div v-else class="flex gap-3">
        <NuxtLinkLocale to="/login">
          <button
            class="border border-gray-200 py-[11.5px] px-3.5 rounded-lg text-[#414651] text-sm font-semibold shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            {{ t("dashboard.login") }}
          </button>
        </NuxtLinkLocale>
        <NuxtLinkLocale to="/signup">
          <button
            class="border border-[#1570EF] bg-[#1570EF] py-[11.5px] px-3.5 rounded-lg text-white text-sm font-semibold shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            {{ t("dashboard.signup") }}
          </button>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>

  <!-- Mobile View -->
  <div class="bg-white py-5 px-3 lg:hidden">
    <div class="flex justify-between items-center">
      <NuxtLinkLocale to="/" class="no-underline">
        <div class="cursor-pointer flex items-center gap-2">
          <IconArrowsterLogo class="size-8 min-w-8" />
          <img
            src="/images/logo/logo.svg"
            alt="Logo"
            class="h-5"
            loading="eager"
          />
        </div>
      </NuxtLinkLocale>
      <NuxtLinkLocale
        v-if="appStore.authenticatedUser || tokenExists"
        to="/profile"
        class="cursor-pointer rounded-full overflow-hidden size-10"
      >
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
      </NuxtLinkLocale>
      <NuxtLinkLocale
        v-else
        to="/login"
        class="flex items-center justify-center cursor-pointer size-10 min-w-10 rounded-full border border-[#00000033] bg-[F5F5F5]"
      >
        <IconUser />
      </NuxtLinkLocale>
    </div>
    <!-- <Transition name="fade">
      <div
        v-if="isMobileSideBarOpen"
        @click="isMobileSideBarOpen = false"
        class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />
    </Transition>
    <Transition name="slideModal">
      <component
        :is="MobileSideBar"
        v-if="isMobileSideBarOpen"
        @close="close"
        @updateTab="updateTab"
      />
    </Transition> -->
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import useAppTrackerStore from "~/stores/AppTrackerStore";
import useSophieStore from "~/stores/sophieStore";
import MobileSideBar from "./MobileSideBar.vue";
import type { OptionAttributes } from "~/types/home";
import IconTabSchool from "~/components/icons/IconTabSchool.vue";
import IconTabSophie from "~/components/icons/IconTabSophie.vue";
import IconEssayGenerater from "../icons/IconEssayGenerater.vue";
import IconScholarship from "../icons/IconScholarship.vue";
import IconBookOpen from "../icons/IconBookOpen.vue";
import type { Task } from "~/types/dashboard";

const emit = defineEmits(["updateTab"]);
const localePath = useLocalePath();

const appStore = useAppStore();
const appTrackerStore = useAppTrackerStore();
const sophieStore = useSophieStore();
const { t } = useI18n();
const route = useRoute();

const isMobileSideBarOpen = ref<boolean>(false);
const tokenExists = useCookie("token");
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
  {
    value: "/scholarship",
    label: t("dashboard.navbar.scholarship"),
    icon: IconScholarship,
  },
];

const close = () => {
  isMobileSideBarOpen.value = false;
};

const updateTab = (value: string) => {
  emit("updateTab", value);
};

const checkFeatureState = () => {
  const matched = features.find((item) => route.path.includes(item.value));
  featureState.value = matched || null;
};

// const onFeatureStateChange = () => {
//   // in case of scholarship option
//   if (featureState.value?.value === "/scholarship") {
//     appStore.isFeatureChangeFromTasks = true;
//     Object.keys(appTrackerStore.taskActiveStates).forEach((key) => {
//       appTrackerStore.taskActiveStates[Number(key)] = false;
//     });
//     sophieStore.roadmapTaskDetail = null;
//     return;
//   }

//   Object.keys(appTrackerStore.taskActiveStates).forEach((key) => {
//     appTrackerStore.taskActiveStates[Number(key)] = false;
//   });
//   const applicationListTasks = (appTrackerStore.applicationList ?? []).flatMap(
//     (item) => item.tasks ?? []
//   );
//   const tasksArray = [
//     ...(appTrackerStore.preApplication?.tasks ?? []),
//     ...applicationListTasks,
//     ...(appTrackerStore.postApplication?.tasks ?? []),
//   ];
//   const matchedTask: Task | undefined = tasksArray.find((item) => {
//     return featureState.value?.value
//       .replace("-", " ")
//       .includes(item.feature_state.replace("_", " "));
//   });
//   if (matchedTask) {
//     appTrackerStore.taskActiveStates[Number(matchedTask?.id)] = true;
//     sophieStore.roadmapTaskDetail = matchedTask;
//   }
// };

watch(
  () => featureState.value?.value,
  () => {
    if (route.path !== featureState.value?.value) {
      // in case of scholarship option
      if (featureState.value?.value === "/scholarship") {
        navigateTo(localePath("/sophie"));
        return;
      }
      navigateTo(localePath(featureState.value?.value || ""));
    } else {
      checkFeatureState();
    }
  }
);

watch(
  () => route.path,
  () => {
    checkFeatureState();
    // if (appStore.isFeatureChangeFromTasks) {
    //   appStore.isFeatureChangeFromTasks = false;
    //   return;
    // }
    // onFeatureStateChange();
  }
);

// watch(
//   () => appTrackerStore.roadmapData,
//   () => {
//     onFeatureStateChange();
//   },
//   { deep: true, immediate: true }
// );

onMounted(() => {
  checkFeatureState();
});
</script>
<style scoped>
.slideModal-enter-active,
.slideModal-leave-active {
  transition: all 400ms;
  transform: all 400ms;
}

.slideModal-enter-from,
.slideModal-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slideModal-enter-to,
.slideModal-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
