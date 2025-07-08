<template>
  <div class="border border-gray-200 rounded-md bg-[#FAFAFA] p-4 mb-8">
    <p class="text-lg text-[#414651] font-semibold pb-4">
      {{ sophieStore.roadmapTaskDetail?.title }}
    </p>
    <div
      v-if="sophieStore.roadmapTaskDetail?.description"
      class="text-[#181D27]"
    >
      <ClientOnly>
        <vue-markdown
          :source="sophieStore.roadmapTaskDetail?.description"
          :options="options"
          class="h-fit flex flex-col gap-4"
        />
        <!-- <p>Take this MBTI test to discover your true self!</p>
                    <ul class="flex flex-col gap-1 list-inside list-disc">
                      <li class="-indent-6 pl-6 marker:content-['-']">
                        One of the most important elements of a compelling college
                        application is authentic self-reflection. The ability to
                        understand and convey your true identity shapes every
                        aspect of your application.
                      </li>
                      <li class="-indent-6 pl-6 marker:content-['+']">
                        This test serves as a starting point for deeper
                        self-exploration. Rather than accepting the results at
                        face value, use them as a catalyst to examine who you are
                        and what you aspire to achieve. These insights will not
                        only strengthen your college applications but also guide
                        your broader life journey.
                      </li>
                    </ul> -->
      </ClientOnly>
    </div>
    <div class="flex flex-col gap-6 mt-4">
      <div
        @click="handelResources(resource.link)"
        v-for="(
          resource, idx
        ) in sophieStore.roadmapTaskDetail?.resources.filter(
          (item) => item.link
        )"
        :key="idx"
        class="flex flex-col gap-2 font-medium cursor-pointer w-fit"
      >
      <div class="flex items-center gap-2">
        <IconLink class="min-w-5" />
        <p class="text-[#175CD3]">Resource: {{ resource.text }}</p>
      </div>
        <p
          v-if="!sophieStore.isSophiePublic"
          class="text-sm bg-[#F5F5F5] rounded-full py-0.5 px-2.5"
        >
          {{ resource.link }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useSophieStore from "~/stores/sophieStore";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const sophieStore = useSophieStore();

const options = {
  html: true,
};

const handelResources = (link: string) => {
  if (!appStore.authenticatedUser) {
    appStore.resourcesSoftPaywall = true;
    return;
  }
  window.open(link, "_blank");
};
</script>
