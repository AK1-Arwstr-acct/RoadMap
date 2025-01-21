<template>
  <div class="h-full">
    <div
      class="bg-[#292929] w-[376px] h-full p-6 flex flex-col gap-6 overflow-y-auto"
    >
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
              :disabled="data.name === ''"
              class="cursor-pointer p-2 border border-[#8380FF] bg-[#8380FF] rounded-lg w-[62px] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex flex-col gap-2 2xl:gap-3">
        <div
          class="flex justify-between items-center gap-1 2xl:gap-2 text-xl font-semibold"
        >
          <div class="h-1.5 w-full bg-[#383838] rounded-full overflow-hidden">
            <div
              :style="{ width: completedProfile }"
              class="bg-[#36C453] h-full transition-all ease-in-out duration-1000"
            />
          </div>
          <p>{{ completedProfile }}</p>
        </div>
        <div
          class="h-[250px] 2xl:h-[328px] rounded-xl overflow-hidden relative"
        >
          <NuxtImg
            :src="imagePreview || '/images/user.png'"
            class="size-full object-contain"
          />
          <input
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="size-full absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
        <div
          class="flex flex-col gap-2 2xl:gap-3"
          :class="{ 'pointer-events-none': !editMode }"
        >
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
              placeholder="N/A"
              class="text-[#AEAEAE] py-2 w-full bg-transparent border-b outline-none"
              :class="[editMode ? 'border-[#C5C5C5]' : 'border-transparent']"
            />
          </div>
          <!--  -->
          <BaseSelectRadio
            v-if="editMode"
            label="Current Grade"
            :options="appStore.currentClassGrade"
            v-model="data.grade"
          />
          <div v-else>
            <h3 class="font-medium text-[#E2E6FF]">Current Grade</h3>
            <input
              type="text"
              v-model="data.grade.label"
              class="text-[#AEAEAE] py-3 w-full bg-transparent border-b outline-none"
              :class="[editMode ? 'border-[#C5C5C5]' : 'border-transparent']"
            />
          </div>
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
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal.vue";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();

const editMode = ref<boolean>(false);
const isConfirmationModal = ref<boolean>(false);
const data = ref({
  name: appStore.userData?.name,
  phoneNumber: appStore.userData?.phone_number,
  grade: {
    value: `${appStore.userData?.educational_records.current_class_grade.id}`,
    label: `${appStore.userData?.educational_records.current_class_grade.class_name}`,
  },
});
const selectedImage = ref<File | null>(null);
const imagePreview = ref<string | null>(appStore.userData?.avatar || null);

const completedProfile = computed(() => {
  const totalPoints = 10;
  let profileProgress = 0;

  const conditions = [
    !!appStore.userData?.phone_number,
    !!appStore.userData?.avatar,
    !!appStore.userData?.name,
    !!appStore.userData?.educational_records?.current_class_grade?.id,
    !!appStore.userData?.educational_records?.cgpa,
    !!appStore.userData?.educational_records?.want_to_study_countries?.length,
  ];
  profileProgress += conditions.filter(Boolean).length;
  const testScores = appStore.userData?.educational_records?.test_scores || [];
  profileProgress += testScores.length;
  const widthClass = (profileProgress / totalPoints) * 100;
  return `${widthClass.toFixed(0)}%`;
});

const handleImageChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedImage.value = input.files[0];
    imagePreview.value = URL.createObjectURL(selectedImage.value);
    try {
      const formData = new FormData();
      formData.append("avatar", selectedImage.value);
      if (appStore.userData?.educational_records.cgpa !== undefined) {
        formData.append(
          "cgpa",
          appStore.userData.educational_records.cgpa.toString()
        );
      }
      await api.post("/v1/student/update-profile-basic-info", formData, {
        headers: {
          "Content-Type": "form-data",
        },
      });
      appStore.setUserImagePreview(imagePreview.value);
    } catch (error) {
      imagePreview.value = appStore.userData?.avatar || null;
      if (axios.isAxiosError(error)) {
        showToast(error.message, {
          type: "warning",
        });
      }
    }
  }
};

const discadChanges = () => {
  data.value = {
    name: appStore.userData?.name,
    phoneNumber: appStore.userData?.phone_number,
    grade: {
      value: `${appStore.userData?.educational_records.current_class_grade.id}`,
      label: `${appStore.userData?.educational_records.current_class_grade.class_name}`,
    },
  };
  isConfirmationModal.value = false;
  editMode.value = false;
};
const saveChanges = async () => {
  try {
    editMode.value = !editMode;
    await api.post("/v1/student/update-profile-basic-info", {
      name: data.value.name,
      phone_number: data.value.phoneNumber || -1,
      current_class_grade: data.value.grade.value,
      cgpa: appStore.userData?.educational_records.cgpa,
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
    data.value = {
      name: appStore.userData?.name,
      phoneNumber: appStore.userData?.phone_number,
      grade: {
        value: `${appStore.userData?.educational_records.current_class_grade.id}`,
        label: `${appStore.userData?.educational_records.current_class_grade.class_name}`,
      },
    };
  }
);

onMounted(() => {
  appStore.getClassGrades();
});
</script>
