<template>
  <div
    class="hidden lg:flex flex-col h-full py-6 justify-between gap-6 transition-all transform duration-500 ease-in-out border-r-[1.5px] border-gray-200 overflow-y-auto no-scrollbar"
    :class="[
      route.path.includes('/sophie')
        ? 'w-[64px] px-3'
        : 'w-[64px] px-3 xl:w-[224px] xl:min-w-[224px] xl:px-4',
    ]"
  >
    <div class="flex flex-col gap-6">
      <div
        :class="[
          !route.path.includes('/sophie')
            ? 'px-1 xl:px-2'
            : 'px-2 flex justify-center',
        ]"
      >
        <NuxtLinkLocale to="/school-list" class="flex gap-2 items-center cursor-pointer">
          <IconArrowsterLogo class="size-8 min-w-8" />
          <img
            v-if="!route.path.includes('/sophie')"
            class="w-24"
            :class="{ 'hidden xl:block': !route.path.includes('/sophie') }"
            src="/images/logo/logo.svg"
            alt="Logo"
            loading="eager"
          />
        </NuxtLinkLocale>
      </div>
      <!-- tabs -->
      <div class="flex flex-col gap-1">
        <NuxtLinkLocale :to="tab.route" v-for="(tab, idx) in tabList" :key="idx">
          <div
            class="py-2 flex items-center rounded-lg cursor-pointer overflow-hidden"
            :class="[
              route.path.includes(tab.route) && !route.path.includes('/profile')
                ? 'text-[#1570EF] bg-[#EFF8FF]'
                : 'text-[#414651]',

              route.path.includes('/sophie')
                ? 'px-2 justify-between'
                : 'px-2 justify-between xl:px-3 xl:justify-start xl:gap-3',
            ]"
          >
            <div>
              <component
                :is="tab.icon"
                class="size-6"
                :class="[
                  route.path.includes(tab.route) &&
                  !route.path.includes('/profile')
                    ? 'text-[#1570EF]'
                    : 'text-[#717680]',
                ]"
              />
            </div>
            <span
              v-if="!route.path.includes('/sophie')"
              class="font-medium text-base text-nowrap hidden xl:block"
            >
              {{ tab.name }}
            </span>
          </div>
        </NuxtLinkLocale>
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
import type { TabList } from "~/types/dashboard";

const emit = defineEmits(["updateTab"]);

const route = useRoute();
const { t } = useI18n();

const tabList: TabList[] = [
  {
    name: t("dashboard.sidebar.menu.home"),
    icon: IconTabHome,
    route: "/dashboard",
  },
  {
    name: t("dashboard.sidebar.menu.roadmap"),
    icon: IconTabApplication,
    route: "/roadmap",
  },
  {
    name: t("dashboard.sidebar.menu.schools_list"),
    icon: IconTabSchool,
    route: "/school-list",
  },
  {
    name: t("dashboard.sidebar.menu.sophie"),
    icon: IconTabSophie,
    route: "/sophie",
  },
  {
    name: t("dashboard.sidebar.menu.ai_essay"),
    icon: IconTabEssayEditor,
    route: "/ai-essay",
  },
];
</script>
