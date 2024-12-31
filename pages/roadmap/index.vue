<template>
  <section class="bg-[#1A1A1A] size-full flex text-white">
    <div
      class="hidden lg:block transition-all duration-500 ease-in-out overflow-hidden"
      :class="isSideBar ? 'w-full max-w-[376px]' : 'w-0'"
    >
      <SideBar class="w-fit" :isSideBar="isSideBar" @toggleSideBar="toggleSideBar" />
    </div>
    <div
      v-if="!isSideBar"
      @click="isSideBar = !isSideBar"
      class="bg-[#292929] size-fit p-3 rounded-lg mt-6 ml-3 cursor-pointer"
    >
      <IconSideBar />
    </div>
    <div class="flex">
      <div class="p-6 size-full space-y-9 overflow-y-auto">
        <div v-for="(data, idx) in appStore.DashboardData">
          <Accordion
            :key="idx"
            :data="data"
            @showTaskModal="(data) => handelTaskModal(data)"
          />
        </div>
      </div>
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
definePageMeta({
  layout: "main-layout",
});

import TaskModal from "~/components/pages/roadmap/TaskModal.vue";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();

const isSideBar = ref<boolean>(true);
const taskModal = ref<boolean>(false);
const modalData = ref({});

const toggleSideBar = () => {
  isSideBar.value = !isSideBar.value;
};

const handelTaskModal = (data) => {
  taskModal.value = !taskModal.value;
  modalData.value = data;
};

const closeModal = () => {
  taskModal.value = false;
};

onMounted(() => {
  appStore.chekCountry();
});
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
</style>
