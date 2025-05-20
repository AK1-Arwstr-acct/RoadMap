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
        <BaseSelectRadio
          placeholder="Trending Features"
          :options="features"
          v-model="featureState"
          :isShadowDark="true"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconTabHome from "~/components/icons/IconTabHome.vue";
import IconTabSophie from "~/components/icons/IconTabSophie.vue";
import IconTabApplication from "~/components/icons/IconTabApplication.vue";
import IconTabSchool from "~/components/icons/IconTabSchool.vue";
import IconTabEssayEditor from "../icons/IconTabEssayEditor.vue";
import IconProfileTab from "../icons/IconProfileTab.vue";
import type { TabList } from "~/types/dashboard";
import useAppStore from "~/stores/AppStore";
import type { OptionAttributes } from "~/types/home";

const emit = defineEmits(["updateTab", "close"]);

const appStore = useAppStore();
const localePath = useLocalePath();
const route = useRoute();
const { t } = useI18n();

const featureState = ref<OptionAttributes | null>(null);

const features: OptionAttributes[] = [
  // { value: "/roadmap", label: "Roadmap", icon: IconTabApplication },
  { value: "/school-list", label: "School List", icon: IconTabSchool },
  { value: "/ai-essay", label: "AI Essay", icon: IconTabEssayEditor },
  { value: "/sophie", label: "Sophie", icon: IconTabSophie },
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

watch(
  () => featureState.value?.value,
  () => {
    if (featureState.value?.value === "/roadmap") {
      navigateTo(localePath("/school-list"));
    } else {
      navigateTo(localePath(featureState.value?.value || ""));
    }
    emit("close");
  }
);
</script>
