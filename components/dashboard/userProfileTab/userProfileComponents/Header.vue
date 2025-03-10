<template>
  <div class="pb-[42px] px-4">
    <div
      class="group h-60 bg-[#E0EAFF] relative flex overflow-hidden rounded-xl mx-auto  max-w-[1050px]"
      :class="{ 'justify-end': !coverPhotoPreview }"
    >
      <img
        v-if="coverPhotoPreview"
        :src="coverPhotoPreview"
        alt="Cover Picture"
        class="size-full object-cover object-center"
      />
      <img
        v-else
        :src="'/images/v-room.png'"
        alt="Profile Picture"
        class="object-contain transform scale-150 -translate-x-20 translate-y-3"
      />
      <input
        type="file"
        accept="image/*"
        @change="handleCoverPhotoChange"
        class="size-full absolute z-10 inset-0 cursor-pointer opacity-0"
      />
      <div
        class="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-[#0000004D] opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
      >
        <span class="cursor-pointer"><IconCamera /></span>
        <p class="text-[#FFFFFF] cursor-pointer">
          Edit cover image.<span class="font-bold"> Upload file</span>
        </p>
      </div>
    </div>
    <div class="flex justify-center px-5">
      <div
        class="flex items-center gap-6 w-full max-w-[752px] -mt-10 relative z-10"
      >
        <div
          class="border-4 border-white bg-white rounded-[200px] shadow-lg relative"
        >
          <div
            class="relative rounded-[200px] min-w-[160px] w-[160px] h-[160px] overflow-hidden group"
          >
            <img
              v-if="imagePreview"
              :src="imagePreview || ''"
              alt="Profile Picture"
              class="object-cover"
            />
            <div
              v-else
              class="size-full bg-orange-500 flex items-center justify-center text-white font-medium uppercase text-8xl"
            >
              <span>{{
                appStore.userData?.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
              }}</span>
            </div>
            <input
              type="file"
              accept="image/*"
              @change="handleImageChange"
              class="size-full absolute z-10 inset-0 cursor-pointer opacity-0"
            />
            <span
              class="absolute inset-0 flex items-center justify-center bg-[#00000066] opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out cursor-pointer"
              ><IconCamera
            /></span>
          </div>
        </div>
        <div
          class="pt-16 whitespace-nowrap max-[250px] sm:w-full flex justify-between items-start"
        >
          <div>
            <h2 class="text-2xl xl:text-3xl font-semibold text-[#181D27] mb-4">
              {{ appStore.userData?.name }}
            </h2>
            <div class="flex items-center text-[#535862] font-medium mb-[18px]">
              <span class="flex items-center gap-1.5">
                <IconAwardNew />
                {{
                  appStore.userData?.educational_records.current_class_grade
                    .class_name
                }}
              </span>
              <span class="mx-2 text-[#535862]">•</span>
              <span class="flex items-center gap-1.5">
                <IconMap />
                {{ appStore.userData?.current_location.title }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="emit('updateStep', 'edit_profile')"
              class="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#414651] bg-[#FFFFFF] border-[1.5px] rounded-lg border-gray-200"
            >
              <span><IconPencil /></span><span>Edit profile</span>
            </button>
            <div class="relative">
              <button
                @click="toggleDropdown"
                class="border-[1.5px] border-gray-200 rounded-lg bg-[#FAFAFA] p-2"
              >
                <span><IconDots /></span>
              </button>
              <!-- Dropdown -->
              <div
                v-click-outside="() => (isDropdownOpen = false)"
                @click="logOut"
                v-if="isDropdownOpen"
                class="absolute z-10 right-0 translate-y-2 bg-[#FFFFFF] border-[1.5px] border-gray-200 rounded-lg shadow-md"
              >
                <a
                  href="#"
                  class="flex items-center gap-3 w-60 px-4 py-2.5 text-sm text-[#414651] font-medium"
                >
                  <IconLogout />
                  Log out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import { ref } from "vue";
import axios from "axios";

const emit = defineEmits(["updateStep"]);

const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();

const isDropdownOpen = ref(false);
const selectedImage = ref<File | null>(null);
const imagePreview = ref<string | null>(appStore.userData?.avatar || null);
const coverPhotoPreview = ref<string | null>(
  appStore.userData?.cover_photo || null
);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logOut = () => {
  const checkToken = useCookie("token");
  if (checkToken.value) {
    checkToken.value = null;
  }
};

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
      await api.post("/api/v1/student/update-profile-basic-info", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      appStore.setUserImagePreview(imagePreview.value);
    } catch (error) {
      imagePreview.value = appStore.userData?.avatar || null;
      if (axios.isAxiosError(error)) {
        const errorMessage = errorList(error);
        showToast(errorMessage, {
          type: "error",
        });
      }
    }
  }
};

const handleCoverPhotoChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedImage.value = input.files[0];
    coverPhotoPreview.value = URL.createObjectURL(selectedImage.value);
    try {
      const formData = new FormData();
      formData.append("cover_photo", selectedImage.value);
      if (appStore.userData?.educational_records.cgpa !== undefined) {
        formData.append(
          "cgpa",
          appStore.userData.educational_records.cgpa.toString()
        );
      }
      await api.post("/api/v1/student/update-profile-basic-info", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      appStore.setUserCoverPhotoPreview(coverPhotoPreview.value);
    } catch (error) {
      coverPhotoPreview.value = appStore.userData?.cover_photo || null;
      if (axios.isAxiosError(error)) {
        const errorMessage = errorList(error);
        showToast(errorMessage, {
          type: "error",
        });
      }
    }
  }
};
</script>
