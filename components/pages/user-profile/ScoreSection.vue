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
      <div class="grid grid-cols-2 gap-3 p-3 border-b border-[#383838]">
        <div>
          <h3 class="font-medium">GPA Score</h3>
          <input
            type="text"
            v-model="scores.gpa"
            placeholder="N/A"
            class="text-[#AEAEAE] py-2 w-full bg-transparent border-b outline-none"
            :class="[editMode ? 'border-[#C5C5C5]' : 'border-transparent']"
          />
        </div>
        <div>
          <h3 class="font-medium">IELTS Score</h3>
          <input
            type="text"
            v-model="scores.ielts"
            placeholder="N/A"
            class="text-[#AEAEAE] py-2 w-full bg-transparent border-b outline-none"
            :class="[editMode ? 'border-[#C5C5C5]' : 'border-transparent']"
          />
        </div>
      </div>
      <!--  -->
      <div class="grid grid-cols-2 gap-3 p-3 border-b border-[#383838]">
        <div>
          <h3 class="font-medium">SAT Score</h3>
          <input
            type="text"
            v-model="scores.sat"
            placeholder="N/A"
            class="text-[#AEAEAE] py-2 w-full bg-transparent border-b outline-none"
            :class="[editMode ? 'border-[#C5C5C5]' : 'border-transparent']"
          />
        </div>
        <div>
          <h3 class="font-medium">ACT Score</h3>
          <input
            type="text"
            v-model="scores.act"
            placeholder="N/A"
            class="text-[#AEAEAE] py-2 w-full bg-transparent border-b outline-none"
            :class="[editMode ? 'border-[#C5C5C5]' : 'border-transparent']"
          />
        </div>
      </div>
      <!--  -->
      <div class="grid grid-cols-2 gap-3 p-3">
        <div>
          <h3 class="font-medium">AP Score</h3>
          <input
            type="text"
            v-model="scores.ap"
            placeholder="N/A"
            class="text-[#AEAEAE] py-2 w-full bg-transparent border-b outline-none"
            :class="[editMode ? 'border-[#C5C5C5]' : 'border-transparent']"
          />
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
import useAppStore from "~/stores/AppStore";
import ConfirmationModal from "./ConfirmationModal.vue";
import type { TestScores } from "~/types/home";

const { api } = useApi();
const {showToast} = useToast();
const appStore = useAppStore();
const testScores = ref<TestScores[] | null>(
  appStore.userData?.educational_records.test_scores ?? null
);

const findScore = (data: TestScores[] | null = null, test: string) => {
  return data?.find((item) => item.title.toLowerCase() === test)?.score || "";
};
const editMode = ref<boolean>(false);
const scores = ref({
  gpa: appStore.userData?.educational_records.cgpa,
  ielts: findScore(testScores.value, "ielts"),
  sat: findScore(testScores.value, "sat"),
  act: findScore(testScores.value, "act"),
  ap: findScore(testScores.value, "ap"),
});
const isConfirmationModal = ref<boolean>(false);

const discadChanges = () => {
  scores.value = {
    gpa: appStore.userData?.educational_records.cgpa,
    ielts: findScore(testScores.value, "ielts"),
    sat: findScore(testScores.value, "sat"),
    act: findScore(testScores.value, "act"),
    ap: findScore(testScores.value, "ap"),
  };
  isConfirmationModal.value = false;
  editMode.value = false;
};
const saveChanges = async () => {
  try {
    editMode.value = !editMode;
    await api.post("/v1/student/update-profile-basic-info", {
      ielts_score: scores.value.ielts || -1,
      sat_score: scores.value.sat || -1,
      act_score: scores.value.act || -1,
      ap_score: scores.value.ap || -1,
      cgpa: scores.value.gpa || -1,
    });
  } catch (error) {
    console.error(error);
    showToast("Something went wrong while updating your profile", {
        type: "warning",
      });
  } finally {
    await appStore.getUserData();
  }
};

const confirmationPopup = () => {
  isConfirmationModal.value = true;
};

const cancel = () => {
  isConfirmationModal.value = false;
};

watch(
  () => appStore.userData,
  () => {
    testScores.value =  appStore.userData?.educational_records.test_scores ?? null
    scores.value = {
      gpa: appStore.userData?.educational_records.cgpa,
      ielts: findScore(testScores.value, "ielts"),
      sat: findScore(testScores.value, "sat"),
      act: findScore(testScores.value, "act"),
      ap: findScore(testScores.value, "ap"),
    };
  }
);
</script>
