<template>
  <div class="size-full overflow-hidden">
    <div class="size-full p-5 overflow-y-auto custom-scrollbar">
      <div class="w-full max-w-[920px] mx-auto flex flex-col gap-10">
        <!-- header  -->
        <div
          class="w-full h-[152px] md:h-[252px] rounded-2xl overflow-hidden relative"
        >
          <img
            src="/images/guides-header.png"
            alt="guides-header"
            class="size-full object-cover object-top"
          />
          <div class="absolute z-10 inset-0 flex items-center px-[84px]">
            <div class="flex flex-col md:gap-2">
              <h1
                class="text-text-constant-white font-semibold text-xl md:text-[40px] leading-[44px]"
              >
                {{ $t("majors_page.guide.how_to_choose_your_major") }}
              </h1>
              <p class="text-text-constant-white font-semibold">
                {{ $t("majors_page.guide.curated_by_arrowster") }}
              </p>
            </div>
          </div>
        </div>
        <!-- body -->
        <div class="flex-1 flex gap-10">
          <div class="flex-1 flex flex-col gap-14 pb-5">
            <div ref="section0">
              <MajorsGuide />
            </div>
            <div ref="section1">
              <SrengthGuide />
            </div>
            <div ref="section2">
              <ResearchGuide />
            </div>
            <div ref="section3">
              <FaqGuide />
            </div>
            <div ref="section4">
              <ChoosingRight />
            </div>
            <P class="text-text-base leading-7 text-wrap">
              {{ $t("majors_page.guide.use_this_guide") }}
            </P>
            <div class="p-6 rounded-2xl bg-background-neutral text-text-base">
              <p class="text-xl md:text-2xl font-semibold mb-1 text-wrap">
                {{ $t("majors_page.guide.lock_in_major_card.heding") }}
              </p>
              <p class="leading-7 mb-6 text-sm text-wrap">
                {{ $t("majors_page.guide.lock_in_major_card.detail") }}
              </p>
              <NuxtLinkLocale
                to="/profile"
                class="py-2 text-wrap px-4 rounded-lg font-semibold bg-background-brand flex items-center gap-2 text-text-constant-white w-fit text-sm md:text-base"
              >
                {{ $t("majors_page.guide.lock_in_major_card.button") }}
                <IconChevronDown
                  class="transform -rotate-90"
                  stroke="text-text-constant-white"
                />
              </NuxtLinkLocale>
            </div>
          </div>
          <div class="w-[200px] hidden lg:block">
            <GuidesStepper
              :activeStep="activeStep"
              @stepClick="scrollToSection"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NuxtLinkLocale } from "#components";
import useMajorStore from "~/stores/majorStore";

const majorStore = useMajorStore();

const section0 = ref<HTMLElement | null>(null);
const section1 = ref<HTMLElement | null>(null);
const section2 = ref<HTMLElement | null>(null);
const section3 = ref<HTMLElement | null>(null);
const section4 = ref<HTMLElement | null>(null);
const sectionRefs = [section0, section1, section2, section3, section4];
const activeStep = ref(0);

const handleScroll = () => {
  for (let i = sectionRefs.length - 1; i >= 0; i--) {
    const el = sectionRefs[i].value;
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 500) {
        activeStep.value = i;
        break;
      }
    }
  }
};

const scrollToSection = (idx: number) => {
  const el = sectionRefs[idx].value;
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, true);
  if (majorStore.navigateFromTabInside) {
    setTimeout(() => {
      section1.value?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
    majorStore.navigateFromTabInside = false;
  }
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, true);
});
</script>
