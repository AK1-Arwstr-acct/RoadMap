<template>
  <main
    class="bg-transparent rounded-xl overflow-hidden border border-[#383838] h-fit"
  >
    <div class="bg-[#292929] p-3 min-h-[68px] flex items-center">
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-3">
          <h2 class="text-xl 2xl:text-2xl font-semibold">Scores</h2>
        </div>
        <div>
          <div v-if="!editMode" @click="editMode = true" class="cursor-pointer">
            <IconEdit />
          </div>
          <div v-else class="flex gap-3 text-[#F3F3F3] font-semibold">
            <button
              @click="confirmationPopup"
              class="cursor-pointer p-2 border border-[#686868] bg-[#383838] rounded-lg"
            >
              Discard
            </button>
            <button
              @click="saveChanges"
              class="cursor-pointer p-2 border border-[#8380FF] bg-[#8380FF] rounded-lg w-[62px]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ 'pointer-events-none': !editMode }">
      <div class="p-3 border-b border-[#383838]">
        <h3 class="font-medium">Majors</h3>
        <div class="flex gap-2 items-center mt-1">
          <div v-for="m in majors" class="bg-[#383838] rounded-full px-2 py-1">
            {{ m }}
          </div>
        </div>
      </div>
      <!--  -->
      <div class="p-3 border-b border-[#383838]">
        <h3 class="font-medium">SAT Score</h3>
        <div class="flex gap-2 items-center mt-1">
          <div
            v-for="c in countries"
            class="bg-[#383838] rounded-full px-2 py-1"
          >
            {{ c }}
          </div>
        </div>
      </div>
    </div>
  </main>
  <Transition name="fade">
    <component
      :is="ConfirmationModal"
      v-if="isConfirmationModal"
      @cancel="cancel"
      @discard="discadChanges"
    />
  </Transition>
</template>
<script setup lang="ts">
import ConfirmationModal from "./ConfirmationModal.vue";

const editMode = ref<boolean>(false);
const majors = ["Arts & Design", "Architecture", "Engineering"];
const countries = ["United States", "Australia"];

const isConfirmationModal = ref<boolean>(false);

const discadChanges = () => {
  isConfirmationModal.value = false;
  editMode.value = false;
};
const saveChanges = () => {
  editMode.value = !editMode;
};

const confirmationPopup = () => {
  isConfirmationModal.value = true;
};

const cancel = () => {
  isConfirmationModal.value = false;
};
</script>
