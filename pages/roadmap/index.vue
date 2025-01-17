<template>
  <section
    class="bg-[#111113] h-[100dvh] w-full overflow-hidden flex text-white"
  >
    <div class="hidden lg:block">
      <SideBar @updateTab="updateTab" />
    </div>
    <div class="flex-1 flex flex-col relative">
      <div class="flex-1 overflow-y-auto">
        <Transition name="fade">
          <div
            v-if="activeTab === 'home'"
            class="flex-1 px-6 pb-6 pt-6 size-full space-y-8 overflow-y-auto"
          >
            <div v-if="infoPopup" class="bg-[#111113] sticky top-0 z-30">
              <div
                class="border border-[#63B3FF] bg-[#0E265C] rounded-lg flex gap-2 p-3"
              >
                <IconInfoCircle stroke="#63B3FF" />
                <div class="flex-1">
                  <h3 class="text-[#E2E6FF] font-semibold">
                    Roadmap Generated!
                  </h3>
                  <p>
                    The provided timeline is for estimation only - exact
                    deadlines depend on schools so you should finish your school
                    list early and contact your counselors for advice!
                  </p>
                </div>
                <div @click="infoPopup = false" class="cursor-pointer">
                  <IconCross />
                </div>
              </div>
            </div>
            <div v-for="(data, idx) in roadmapData">
              <Accordion
                :key="idx"
                :data="data"
                @showTaskModal="(data) => handelTaskModal(data)"
              />
            </div>
          </div>
          <div v-else-if="activeTab === 'user_profile'" class="size-full">
            <ProfileTab />
          </div>
        </Transition>
      </div>
      <!-- <div v-if="activeTab !== 'user_profile'">
        <AiBar />
      </div> -->
    </div>
  </section>
  <Transition name="slideModal">
    <component
      v-if="taskModal"
      :is="TaskModal"
      @close="closeModal"
      :modalData="modalData"
    />
  </Transition>
</template>
<script setup lang="ts">
import TaskModal from "~/components/pages/roadmap/TaskModal.vue";
import useAppStore from "~/stores/AppStore";
import type { Tasks } from "~/types/home";

definePageMeta({
  layout: "auth-layout",
});

const appStore = useAppStore();
const { api } = useApi();

type TabName = "home" | "school_finder" | "counselor_service" | "user_profile";

const roadmapData = ref();
const activeTab = ref<TabName>("home");
const taskModal = ref<boolean>(false);
const infoPopup = ref<boolean>(true);
const modalData = ref({});

const handelTaskModal = (data: Tasks) => {
  taskModal.value = !taskModal.value;
  modalData.value = data;
};

const closeModal = () => {
  taskModal.value = false;
};
const updateTab = (item: TabName) => {
  activeTab.value = item;
};

const fetchTasks = async () => {
  const response = await api.get("/v1/roadmap/tasks");
  roadmapData.value = response.data.data;
};

onMounted(() => {
  fetchTasks();
})
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
</style>
