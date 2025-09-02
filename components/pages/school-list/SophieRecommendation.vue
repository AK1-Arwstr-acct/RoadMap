<template>
  <button
    :disabled="!isActive || schoolListStore.isSchoolsLoading"
    @click="finalEngine"
    class="border text-[#9333EA] border-[#9333EA] disabled:opacity-50 text-sm font-semibold py-1.5 px-3 flex justify-center items-center gap-1.5 text-nowrap"
    :class="[isOverwhelmed ? 'rounded-lg w-full' : 'rounded-full']"
  >
    <IconSearchAi />
    {{ $t('schoolList_page.ai_match_me') }}
  </button>
  <Transition name="fade">
    <div
      v-if="isPublicPaywall"
      class="fixed z-50 inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-5"
    >
      <div
        class="bg-white p-6 flex flex-col gap-8 rounded-xl w-full max-w-[400px]"
      >
        <div class="flex flex-col items-center">
          <IconTabSophie width="48" height="48" class="text-[#ED77FF] mb-5" />
          <p class="text-[#181D27] text-lg font-semibold text-center">
            {{
              $t("schoolList_page.sign_up_to_continue_using_ai_recommendations")
            }}
          </p>
          <p class="text-[#535862] text-sm text-center mt-2">
            {{
              $t(
                "schoolList_page.get_personalized_school_recommendations_and_ai_recommendations"
              )
            }}
          </p>
        </div>
        <div class="flex gap-3">
          <button
            @click="isPublicPaywall = false"
            class="border border-gray-200 py-2.5 w-full rounded-lg text-[#414651] font-semibold"
          >
            {{ $t("schoolList_page.cancel") }}
          </button>
          <NuxtLinkLocale :to="'/signup'" class="w-full">
            <button
              class="border border-[#1570EF] bg-[#1570EF] py-2.5 w-full rounded-lg text-white font-semibold"
            >
              {{ $t("schoolList_page.sign_up_for_free") }}
            </button>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import useSchoolListStore from "~/stores/SchoolListStore";
import useAppStore from "~/stores/AppStore";

defineProps({
  isOverwhelmed: {
    type: Boolean,
    default: false,
  },
});

const appStore = useAppStore();
const localePath = useLocalePath();
const schoolListStore = useSchoolListStore();

const isPublicPaywall = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);

const finalEngine = async () => {
  if (schoolListStore.isSchoolListPublic) {
    isPublicPaywall.value = true;
    return;
  }
  isSubmitting.value = true;
  await schoolListStore.runFinalEngine();
  isSubmitting.value = false;
  schoolListStore.isFinalEnginCall = true;
};

const isActive = ref<boolean>(false);

const checkPrograms = () => {
  if (schoolListStore.selectedPublicMajors.length > 0) {
    isActive.value = true;
  } else {
    isActive.value = false;
  }
};

watch(
  () => appStore.userData,
  async () => {
    checkPrograms();
  }
);
watch(
  () => schoolListStore.selectedPublicMajors,
  async (newValue) => {
    if (newValue.length > 0) {
      isActive.value = true;
    } else {
      isActive.value = false;
    }
  }
);

onMounted(() => {
  checkPrograms();
});
</script>
