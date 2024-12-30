<template>
  <section class="bg-[#1A1A1A] size-full flex text-white">
    <SideBar class="hidden lg:block" />
    <div class="p-6 size-full space-y-9 overflow-y-auto">
      <div v-for="(data, idx) in appStore.DashboardData">
        <Accordion :key="idx" :data="data" @showTaskModal="(data)=>handelTaskModal(data)" />
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

const taskModal = ref<boolean>(false);
const modalData = ref({});

const handelTaskModal = (data) => {
  taskModal.value = !taskModal.value;
  modalData.value = data;
};

const closeModal = () => {
  taskModal.value = false;
};

onMounted(()=>{
  appStore.chekCountry();
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
</style>
