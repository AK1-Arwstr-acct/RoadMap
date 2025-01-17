<template>
  <section
    class="bg-[#111113] h-[100dvh] w-full overflow-hidden flex text-white relative"
  >
    <div class="hidden lg:block relative">
      <div
        class="relative size-full"
        :class="{ 'z-50 bg-[#111113]': isFlowStart && introStep === 3 }"
      >
        <SideBar @updateTab="updateTab" />
        <Transition name="fade">
          <div
            v-if="isFlowStart && introStep === 3"
            class="absolute z-50 top-[124px] -right-[380px]"
          >
            <StepPopup
              :step="introStep"
              direction="left"
              @next="nextStep"
              @previous="previousStep"
            />
          </div>
        </Transition>
      </div>
    </div>
    <div
      class="flex-1 bg-[#111113] size-full flex flex-col transition-all ease-in-out duration-300 relative"
      :class="{ 'z-50': isFlowStart && introStep === 1 }"
    >
      <Transition name="fade">
        <div
          v-if="isFlowStart && introStep === 1"
          class="absolute z-50 top-[70px] -left-[380px]"
        >
          <StepPopup
            :step="introStep"
            @next="nextStep"
            @previous="previousStep"
          />
        </div>
      </Transition>
      <div class="flex-1">
        <Transition name="fade">
          <div
            v-if="activeTab === 'home'"
            class="flex-1 p-6 size-full space-y-8 overflow-y-auto"
          >
            <p class="text-white"></p>
            <div v-for="(data, idx) in appStore.onboardingViewData">
              <ExploreAccordion
                :key="idx"
                :data="data"
                :dropdown="true"
                @showTaskModal="(data) => handelTaskModal(data)"
              />
            </div>
            <Transition name="fade">
              <div
                v-if="!isFlowStart && isAllTaskCompleted"
                class="flex items-center p-3 rounded-xl bg-gradiant"
              >
                <div class="flex-1">
                  <h4>
                    Generate your own personalized Roadmap with our AI feature
                  </h4>
                </div>
                <div>
                  <button
                    @click="navigateTo('/')"
                    class="bg-white text-[#18191B] flex items-center gap-2 p-3 rounded-lg font-semibold text-lg"
                  >
                    <p>Generate</p>
                    <IconArrowRight fill="#18191B" width="24" height="24" />
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>
      <div
        class="relative"
        :class="{ 'z-50 bg-[#111113]': isFlowStart && introStep === 4 }"
      >
        <AiBar />
        <Transition name="fade">
          <div
            v-if="isFlowStart && introStep === 4"
            class="absolute z-50 -top-[250px] left-12"
          >
            <StepPopup
              :step="introStep"
              direction="bottom"
              @next="nextStep"
              @previous="previousStep"
            />
          </div>
        </Transition>
      </div>
    </div>
    <Transition name="fade">
      <div
        v-if="isFlowStart"
        class="absolute z-40 size-full bg-[rgba(26,26,26,0.50)] backdrop-blur-[10px]"
      >
        <div v-if="introStep === 5" class="size-full flex items-end">
          <div
            class="flex items-center gap-2 cursor-pointer w-[400px] p-6 bg-[#111113] relative"
          >
            <div
              class="size-9 min-w-9 border border-white rounded-full overflow-hidden"
            >
              <NuxtImg src="/images/user.png" class="size-full object-cover" />
            </div>
            <div class="text-[#F3F3F3] font-medium text-nowrap">
              Damian Nguyen
            </div>
            <Transition name="fade">
              <div
                v-if="isFlowStart && introStep === 5"
                class="absolute z-50 bottom-[114px] left-[77px]"
              >
                <StepPopup
                  direction="bottom"
                  :step="introStep"
                  @next="nextStep"
                  @previous="previousStep"
                />
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="!isFlowStart && isNotification" class="absolute top-6 right-6">
        <div
          class="border border-[#36C453] bg-[#07422A] p-3 rounded-lg flex gap-2 w-[288px]"
        >
          <div>
            <IconParty />
          </div>
          <div>
            <p class="text-[#E2E6FF] font-semibold">
              You have complete all tasks in this section
            </p>
          </div>
          <div class="pt-1 cursor-pointer" @click="isNotification = false">
            <IconCross />
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="slideModal">
      <component
        v-if="taskModal"
        :is="ExploreTaskModal"
        @close="closeModal"
        :modalData="modalData"
      />
    </Transition>
    <Transition name="fade">
      <component
        v-if="introModal"
        :is="IntroModal"
        @close="closeIntro"
        @startTour="startTour"
      />
    </Transition>
    <Transition name="fade">
      <div
        v-if="isFlowStart && introStep === 2"
        class="fixed z-50 top-[196px] right-[630px]"
      >
        <StepPopup
          :step="introStep"
          @next="nextStep"
          @previous="previousStep"
        />
      </div>
    </Transition>
  </section>
</template>
<script setup lang="ts">
import ExploreTaskModal from "~/components/pages/roadmap/ExploreTaskModal.vue";
import IntroModal from "~/components/pages/explore/IntroModal.vue";
import useAppStore from "~/stores/AppStore";
import type { Tasks } from "~/types/home";

const appStore = useAppStore();

type TabName = "home" | "school_finder" | "counselor_service";

const activeTab = ref<TabName>("home");
const taskModal = ref<boolean>(false);
const introModal = ref<boolean>(true);
const isFlowStart = ref<boolean>(false);
const introStep = ref<number>(1);
const isNotification = ref<boolean>(false);
const modalData = ref({});

const isAllTaskCompleted = computed(() => {
  let totalCount = 0;
  let completeCount = 0;

  appStore.onboardingViewData.forEach((item) => {
    totalCount += item.tasks.length;
    completeCount += item.tasks.filter((task) => task.checked === true).length;
  });
  isNotification.value = completeCount === totalCount;
  return completeCount === totalCount;
});

const handelTaskModal = (data: Tasks) => {
  taskModal.value = !taskModal.value;
  modalData.value = data;
};

const closeIntro = () => {
  introModal.value = false;
};

const startTour = () => {
  introModal.value = false;
  isFlowStart.value = true;
};

const nextStep = () => {
  introStep.value += 1;
  if (introStep.value > 5) {
    isFlowStart.value = false;
  }
};
const previousStep = () => {
  introStep.value -= 1;
};

const closeModal = () => {
  taskModal.value = false;
};
const updateTab = (item: TabName) => {
  activeTab.value = item;
};

watch(
  () => isNotification.value,
  () => {
    if (isNotification.value) {
      setTimeout(() => {
        isNotification.value = false
      }, 3000);
    }
  }
);
watch(
  () => introStep.value,
  () => {
    if (introStep.value === 2) {
      modalData.value = appStore.onboardingViewData[0].tasks[0];
      taskModal.value = true;
    } else taskModal.value = false;
  }
);
</script>
<style scoped>
.slideModal-enter-active,
.slideModal-leave-active {
  transition: all 300ms;
  transform: all 300ms;
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
.fade-enter-active,
.fade-leave-active {
  transition: all 300ms;
  transform: all 300ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.bg-gradiant {
  background: linear-gradient(
    89deg,
    #9c99ff -0.78%,
    #488cdb 57.56%,
    #635fed 99.02%
  );
}
</style>
