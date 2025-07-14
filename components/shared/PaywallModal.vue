<template>
  <div
    class="fixed z-50 inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-5"
  >
    <div
      class="bg-white p-6 flex flex-col gap-8 rounded-xl w-full max-w-[400px] relative"
    >
      <button
        @click="emit('close')"
        class="absolute top-3 md:top-[18px] right-3 md:right-[18px]"
        aria-label="Close"
      >
        <IconCross fill="#111827" height="24" width="24" />
      </button>
      <div class="flex flex-col items-center">
        <IconTabSophie width="48" height="48" class="text-[#ED77FF] mb-5" />
        <p class="text-[#181D27] text-lg font-semibold text-center">
          {{ heading }}
        </p>
        <p class="text-[#535862] text-sm text-center mt-2">
          {{ detail }}
        </p>
      </div>
      <div class="flex gap-3">
        <NuxtLinkLocale
          :to="'/pricing'"
          class="border border-gray-200 py-2.5 w-full rounded-lg text-[#414651] font-semibold text-center"
        >
          {{ $t("schoolList_page.mentorship.free_mentorship") }}
        </NuxtLinkLocale>
        <button
          @click="hangelNavigation"
          class="border border-[#1570EF] text-center bg-[#1570EF] py-2.5 w-full rounded-lg text-white font-semibold"
        >
          {{ $t("roadmap_page.paywall_resources.sign_up_for_free") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const route = useRoute();

defineProps({
  heading: {
    type: String,
    default: "",
  },
  detail: {
    type: String,
    default: "",
  },
});

const localePath = useLocalePath();

const hangelNavigation = () => {
  appStore.paywallOnLastScreen = route.path;
  navigateTo(localePath("/signup"));
  emit("close");
};

const emit = defineEmits(["close"]);
</script>
