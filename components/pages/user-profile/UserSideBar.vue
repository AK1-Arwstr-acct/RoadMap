<template>
  <div class="h-full">
    <div class="bg-[#292929] w-[376px] h-full p-6 flex flex-col gap-6 overflow-y-auto">
      <div class="flex justify-between items-center min-h-[54px]">
        <h1 class="text-2xl 2xl:text-3xl font-semibold">Your Profile</h1>
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
      <!--  -->
      <div
        class="flex flex-col gap-2 2xl:gap-3"
        :class="{ 'pointer-events-none': !editMode }"
      >
        <div
          class="flex justify-between items-center gap-1 2xl:gap-2 text-xl font-semibold"
        >
          <div class="h-1.5 w-full bg-[#383838] rounded-full overflow-hidden">
            <div :style="{ width: '100px' }" class="bg-[#36C453] h-full" />
          </div>
          <p>30%</p>
        </div>
        <div class="h-[250px] 2xl:h-[328px] rounded-xl overflow-hidden">
          <NuxtImg src="/images/user.png" class="size-full object-cover" />
        </div>
        <div>
          <h3 class="font-medium text-[#E2E6FF]">Name</h3>
          <input
            type="text"
            v-model="data.name"
            class="text-[#AEAEAE] py-2 w-full bg-transparent border-b outline-none"
            :class="[editMode ? 'border-[#C5C5C5]' : 'border-transparent']"
          />
        </div>
        <div>
          <h3 class="font-medium text-[#E2E6FF]">Phone number</h3>
          <input
            type="text"
            v-model="data.phoneNumber"
            class="text-[#AEAEAE] py-2 w-full bg-transparent border-b outline-none"
            :class="[editMode ? 'border-[#C5C5C5]' : 'border-transparent']"
          />
        </div>
        <!--  -->
        <div>
          <h3 class="font-medium text-[#E2E6FF]">Current Grade</h3>
          <input
            type="text"
            v-model="data.grade"
            class="text-[#AEAEAE] py-2 w-full bg-transparent border-b outline-none"
            :class="[editMode ? 'border-[#C5C5C5]' : 'border-transparent']"
          />
        </div>
      </div>
    </div>
    <Transition name="fade">
      <component
        :is="ConfirmationModal"
        v-if="isConfirmationModal"
        @cancel="cancel"
        @discard="discadChanges"
      />
    </Transition>
  </div>
</template>
<script setup lang="ts">
import ConfirmationModal from "./ConfirmationModal.vue";

const editMode = ref<boolean>(false);
const isConfirmationModal = ref<boolean>(false);

const data = ref({
  name: "Damian Nguyen",
  phoneNumber: "+84 251 437 663",
  grade: "11",
});

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
