<template>
  <section class="md:pt-8 pb-6 h-fit flex flex-col gap-6">
    <div v-if="deviceType === 'desktop'" class="my-6">
      <component :is="desktop.PublicUserDataInfoDemo" />
    </div>
    <WhyTheseSchoolDemo v-if="(demoStore.overViews?.length ?? 0) >= 1" />
    <PublicMajorsSelectionDemo />
    <SophieRecommendationDemo :isActive="isActive" />
  </section>
</template>
<script setup lang="ts">
import useDemoStore from "~/stores/demoStore";

defineProps({
  isTokenLoading: {
    type: Boolean,
    default: false,
  },
});

const demoStore = useDemoStore();
const deviceType = useDeviceType();

const desktop = {
  PublicUserDataInfoDemo: defineAsyncComponent(
    () =>
      import("~/components/pages/demo/schoolList/PublicUserDataInfoDemo.vue")
  ),
};

const isActive = ref<boolean>(false);


watch(
  () => demoStore.selectedPublicMajors,
  async (newValue) => {
    if (newValue.length > 0) {
      isActive.value = true;
    } else {
      isActive.value = false;
    }
  }
);
</script>
