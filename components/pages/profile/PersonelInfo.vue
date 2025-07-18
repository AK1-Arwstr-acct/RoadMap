<template>
  <div class="pt-8 md:pt-[42px] border-t-[1.5px] border-gray-200">
    <p class="text-xl md:text-2xl font-semibold text-[#181D27] mb-5">
      {{ $t("profile_page.personal_info") }}
    </p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
      <div
        class="border-[1.5px] border-gray-200 rounded-2xl bg-[#FFFFFF] flex gap-4 px-5 py-3.5 items-center md:items-start"
      >
        <span><IconHeartHexagon class="size-8 md:size-full" /></span>
        <div>
          <p class="md:text-xl text-[#181D27] font-semibold mb-2">
            {{ convertedTo10Gpa }}
          </p>
          <h6 class="text-[#A4A7AE]">{{ $t("profile_page.gpa") }}</h6>
        </div>
      </div>
      <div
        class="border-[1.5px] border-gray-200 rounded-2xl bg-[#FFFFFF] flex gap-4 px-5 py-3.5 items-center md:items-start"
      >
        <span><IconGraduationHat class="size-8 md:size-full" /></span>
        <div>
          <p class="md:text-xl text-[#181D27] font-semibold mb-2">
            {{
              userInfo?.educational_records.next_class_grade.class_name || ""
            }}
          </p>
          <h6 class="text-[#A4A7AE]">{{ $t("profile_page.study_program") }}</h6>
        </div>
      </div>
      <div
        class="border-[1.5px] border-gray-200 rounded-2xl bg-[#FFFFFF] flex gap-4 px-5 py-3.5 items-center md:items-start"
      >
        <span><IconCoins class="size-8 md:size-full" /></span>
        <div>
          <p class="md:text-xl text-[#181D27] font-semibold mb-2">
            $0 - ${{ userInfo?.educational_records.annual_max_budget }}
          </p>
          <h6 class="text-[#A4A7AE]">
            {{ $t("profile_page.annual_total_budget") }}
          </h6>
        </div>
      </div>
      <div
        class="border-[1.5px] border-gray-200 rounded-2xl bg-[#FFFFFF] flex gap-4 px-5 py-3.5 overflow-hidden items-center md:items-start"
      >
        <span><IconBookmark class="size-8 md:size-full" /></span>
        <div class="flex-1">
          <p class="md:text-xl text-[#181D27] font-semibold mb-2 truncate">
            {{ userInfo?.educational_records.super_meta_category.title }}
          </p>
          <h6 class="text-[#A4A7AE]">{{ $t("profile_page.area_of_study") }}</h6>
        </div>
      </div>
      <div
        class="lg:col-span-2 border-[1.5px] border-gray-200 rounded-2xl bg-[#FFFFFF] flex items-center md:items-start gap-4 px-6 pt-[18px] pb-3.5"
      >
        <span><IconGlobeNew class="size-8 md:size-full" /></span>
        <div>
          <p
            class="md:text-xl text-[#181D27] font-semibold mb-2 flex flex-wrap gap-2"
          >
            <span
              class="border-r-2 border-[#181D27] last:border-none pr-2 inline-block leading-[18px]"
              v-for="(country, idx) in countries"
              :key="idx"
            >
              {{ country }}
            </span>
          </p>
          <h6 class="text-[#A4A7AE]">
            {{ $t("profile_page.study_destination") }}
          </h6>
        </div>
      </div>
      <div
        v-if="userInfo?.educational_records.next_program_titles.length"
        class="lg:col-span-2 border-[1.5px] border-gray-200 rounded-2xl bg-[#FFFFFF] flex items-center gap-4 px-6 pt-[18px] pb-3.5"
      >
        <span><IconBookOpen class="size-8 md:size-full" /></span>
        <div>
          <p
            class="md:text-xl text-[#181D27] font-semibold mb-2 flex flex-wrap gap-2"
          >
            <span
              class="border-r-2 border-[#181D27] last:border-none pr-2 inline-block leading-[18px]"
              v-for="(majors, idx) in userInfo?.educational_records
                .next_program_titles"
              :key="idx"
            >
              {{ majors.title }}
            </span>
          </p>
          <h6 class="text-[#A4A7AE]">{{ $t("profile_page.majors") }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserData } from "~/types/home";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();

const userInfo = ref<UserData>();

const countries = computed(() => {
  const currentCountryIds =
    appStore.userData?.educational_records.want_to_study_countries.map(
      (option) => {
        return [67, 68, 62, 63, 88, 78, 191, 80, 90].includes(option.id)
          ? "Europe"
          : option.title;
      }
    );
  return [...new Set(currentCountryIds)];
});

const convertedTo10Gpa = computed(() => {
  const cgpa = parseFloat(String(userInfo.value?.educational_records.cgpa));
  const value = (cgpa / 4) * 10;
  const decimal = value - Math.floor(value);
  return decimal > 0 ? value.toFixed(1) : value.toFixed(0);
});

watch(
  () => appStore.userData,
  () => {
    userInfo.value = appStore.userData;
  }
);

onMounted(() => {
  userInfo.value = appStore.userData;
});
</script>
