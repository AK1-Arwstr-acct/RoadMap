<template>
  <div class="max-w-[1000px] w-full flex justify-center">
    <div class="flex-1 max-w-[400px] flex flex-col gap-8 md:gap-10">
      <div class="flex flex-col items-center gap-4">
        <img
          src="/images/application.png"
          alt="academic"
          class="size-20 min-w-20"
        />
        <h1 class="text-text-base text-xl md:text-2xl font-medium text-center">
          {{ $t("onboarding.what_best_describes_your_current_situation") }}
        </h1>
      </div>
      <div class="flex flex-col gap-3">
        <div v-for="(option, index) in situationList" :key="index">
          <label
            :for="option.label"
            class="flex items-center gap-5 size-full font-medium rounded-lg cursor-pointer relative border p-4 transition-all ease-in-out duration-200"
            :class="[
              selectedOption?.value === option.value
                ? 'border-background-brand-subtle-selected bg-background-brand-subtle text-text-brand'
                : 'border-border-neutral-subtle text-text-base',
            ]"
          >
            <input
              :id="option.label"
              type="radio"
              name="budget"
              :value="option"
              v-model="selectedOption"
              class="absolute top-3 right-3 appearance-none"
            />
            <span
              class="size-10 min-w-10 rounded-lg font-semibold text-2xl flex items-center justify-center transition-all ease-in-out duration-200"
              :class="[
                selectedOption?.value === option.value
                  ? 'bg-background-brand-subtle-selected'
                  : 'bg-background-neutral-bold',
              ]"
            >
              {{ option.value }}
            </span>
            <p>
              {{ option.description }}
            </p>
          </label>
        </div>
      </div>
      <div class="flex items-center gap-10">
        <button
          @click="onSubmit"
          :disabled="isSubmitting || !selectedOption"
          class="text-text-constant-white font-semibold bg-background-brand rounded-lg flex gap-3 items-center justify-center py-2.5 px-[18px] disabled:opacity-50"
        >
          {{ $t('onboarding.next') }}
        </button>
        <p class="w-fit flex items-center gap-2 text-text-base text-xs">
          {{ $t('onboarding.press_enter') }}
          <IconEnter />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import type { PropType } from "vue";
import type { OptionAttributes } from "~/types/home";
import useAppStore from "~/stores/AppStore";
import useOnboardingStore from "~/stores/OnboardingStore";
import IconTabHome from "~/components/icons/IconTabHome.vue";

const props = defineProps({
  situationList: {
    type: Array as PropType<OptionAttributes[]>,
    default: () => [],
  },
});

const emit = defineEmits(["updateStep"]);

const { api } = useApi();
const appStore = useAppStore();
const { showToast } = useToast();
const onboardingStore = useOnboardingStore();

const isSubmitting = ref<boolean>(false);
const selectedOption = ref<OptionAttributes>();

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/student/update-profile-partial-info", {
      // cgpa: appStore.userData?.educational_records.cgpa,
      current_situation: selectedOption.value?.label,
    });
    appStore.getUserData();
    emit("updateStep");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && selectedOption.value) {
    onSubmit();
  }
};

onMounted(() => {
  onboardingStore.onboardingStep = 2;
  document.addEventListener("keydown", onKeydown);
  selectedOption.value = props.situationList.find(
    (item) => item.label === appStore.userData?.current_situation
  );
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
});
</script>
