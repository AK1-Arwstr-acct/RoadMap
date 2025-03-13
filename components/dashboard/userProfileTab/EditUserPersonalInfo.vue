<template>
  <div>
    <div>
      <h2 class="text-[#181D27] text-lg font-semibold">Personal Info</h2>
      <p class="text-[#535862] text-sm">
        Update your photo and personal details here.
      </p>
    </div>
    <div
      class="bg-white shadow-sm mt-6 rounded-xl border-[1.5px] border-gray-200"
    >
      <div class="p-6 flex flex-col gap-6">
        <div class="sm:flex gap-6">
          <div class="sm:w-1/2 mb-6 sm:mb-0">
            <label class="block text-[#535862] font-semibold">Name</label>
            <input
              type="text"
              v-model="userInitialData.name"
              placeholder="Enter Name"
              class="w-full mt-1.5 px-3.5 py-2.5 border-[1.5px] border-gray-200 text-[#181D27] rounded-lg outline-none"
            />
          </div>
          <div class="sm:w-1/2">
            <label class="block text-[#535862] font-semibold mb-1">Grade</label>
            <BaseSelectRadio
              :options="classGradeList"
              v-model="userInitialData.grade"
            />
          </div>
        </div>
        <div>
          <label class="block text-[#535862] font-semibold">Phone number</label>
          <div class="flex mt-1.5 border-[1.5px] border-gray-200 rounded-lg">
            <div class="relative w-fit">
              <!-- <select
                class="px-3.5 py-2.5 text-[#181D27] rounded-l-lg outline-none appearance-none"
              >
                <option selected disabled>VN</option>
              </select> -->
              <!-- <p class="flex justify-center items-center w-full h-full px-4 bg-[#f8f8f8] rounded-lg">VN</p>
              <div
                class="absolute inset-y-0 -right-2 flex items-center pointer-events-none"
              >
                <IconArrowDownThick />
              </div> -->
            </div>
            <input
              type="text"
              :value="userInitialData.phoneNumber"
              class="w-full px-3.5 py-2.5 text-[#181D27] outline-none rounded-r-lg"
              disabled
            />
          </div>
        </div>
        <div>
          <label class="block text-[#535862] font-semibold">Email</label>
          <div
            class="mt-1 px-3.5 py-2.5 flex items-center gap-2 border-[1.5px] border-gray-200 rounded-lg"
          >
            <span><IconEmail /></span>
            <input
              type="email"
              v-model="userInitialData.email"
              class="w-full text-[#181D27] outline-none"
            />
          </div>
          <p
            v-if="!appStore.userData?.isEmailVerified"
            class="text-sm text-[#535862] mt-1"
          >
            Your email has not been confirmed.
            <span
              @click="verifyEmail"
              class="text-sm text-[#535862] border-b-[1.5px] border-[#535862] cursor-pointer"
              >Verify it now</span
            >
          </p>
        </div>
        <div>
          <label class="block text-[#535862] font-semibold"
            >Current password</label
          >
          <div class="relative">
            <input
              v-model="userInitialData.currentPassword"
              :type="isShowPassword ? 'text' : 'password'"
              class="w-full mt-1.5 px-3.5 py-2.5 text-[#181D27] border-[1.5px] border-gray-200 rounded-lg outline-none"
            />
            <span
              @click="isShowPassword = !isShowPassword"
              class="absolute right-3 top-6 cursor-pointer"
            >
              <component
                :is="!isShowPassword ? IconPasswordEye : IconOpenEye"
              />
            </span>
          </div>
        </div>
        <div>
          <label class="text-[#535862] font-semibold">New password</label>
          <div class="relative">
            <input
              v-model="userInitialData.newPassword"
              :type="isShowPassword ? 'text' : 'password'"
              class="w-full mt-1.5 px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-[#181D27] outline-none"
            />
            <span
              @click="isShowPassword = !isShowPassword"
              class="absolute right-3 top-6 cursor-pointer"
            >
              <component
                :is="!isShowPassword ? IconPasswordEye : IconOpenEye"
              />
            </span>
          </div>
        </div>
      </div>
      <div
        class="flex justify-end gap-2 px-6 py-4 border-t-[1.5px] border-gray-200 text-sm"
      >
        <button
          @click="resetValues"
          class="px-4 py-2.5 text-[#414651] font-semibold border-[1.5px] border-gray-200 rounded-lg"
        >
          Cancel
        </button>
        <button
          @click="submit"
          :disabled="disableSubmit || isSubmitting"
          class="px-4 py-2.5 text-white font-semibold bg-[#1570EF] disabled:bg-[#B2DDFF] border-[1.5px] border-[#B2DDFF] rounded-lg flex items-center gap-2"
        >
          Save changes
          <IconSpinner width="20" bgColor="transparent" v-if="isSubmitting"  />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import axios from "axios";
import useAppStore from "~/stores/AppStore";
import type { ClassGrades, CurrentClassGrade, UserData } from "~/types/home";
import IconPasswordEye from "~/components/icons/IconPasswordEye.vue";
import IconOpenEye from "~/components/icons/IconOpenEye.vue";

const appStore = useAppStore();
const dashboardStore = useDashboardStore();
const { api } = useApi();
const { showToast } = useToast();

interface UserInitailData {
  name: string;
  grade: ClassGrades;
  phoneNumber: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}

const isShowPassword = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);
const classGradeList = ref<ClassGrades[]>([]);
const userInitialData = ref<UserInitailData>({
  name: "",
  grade: {
    value: "",
    label: "",
  },
  phoneNumber: "",
  email: "",
  currentPassword: "",
  newPassword: "",
});

const getClassGrades = async () => {
  try {
    const response = await api.get(`/api/v1/sign-up/get-class-grades`);
    classGradeList.value = response.data.data.map((item: CurrentClassGrade) => {
      return {
        value: item.id,
        label: item.class_name,
      };
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const setAcademicInfo = (userData: UserData) => {
  userInitialData.value.grade = {
    value: userData?.educational_records.current_class_grade
      ? `${userData?.educational_records.current_class_grade.id}`
      : "",
    label: userData?.educational_records.current_class_grade
      ? `${userData?.educational_records.current_class_grade.class_name}`
      : "",
  };
  userInitialData.value.name = userData?.name;
  userInitialData.value.email = userData.email;
  userInitialData.value.phoneNumber = userData?.phone_number || "";
};

const resetValues = () => {
  if (appStore.userData) {
    setAcademicInfo(appStore.userData);
  }
  userInitialData.value.newPassword = "";
  userInitialData.value.currentPassword = "";
};

const disableSubmit = computed(() => {
  const data = userInitialData.value;
  const initialData = appStore.userData;

  const isOneFilled = !!data.currentPassword !== !!data.newPassword;
  if (isOneFilled) {
    return true;
  } else if (
    data.currentPassword.split("").length &&
    data.newPassword.split("").length
  ) {
    return false;
  } else {
    return (
      data.name === initialData?.name &&
      Number(data.grade.value) ===
        initialData.educational_records.current_class_grade.id &&
      data.email === initialData.email
    );
  }
});

const verifyEmail = async () => {
  try {
    await api.get('/api/v1/verify-via-email-retry')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  }
};

const submit = async () => {
  try {
    isSubmitting.value = true;
    const payload = {
      name: userInitialData.value.name,
      cgpa: appStore.userData?.educational_records.cgpa,
      current_class_grade: userInitialData.value.grade.value,
      email:
        userInitialData.value.email === appStore.userData?.email
          ? undefined
          : userInitialData.value.email,
      current_password: userInitialData.value.currentPassword
        ? userInitialData.value.currentPassword
        : undefined,
      password: userInitialData.value.newPassword
        ? userInitialData.value.newPassword
        : undefined,
    };
    await api.post("/api/v1/student/update-profile-basic-info", payload);
    await appStore.getUserData();
    showToast("Profile updated successfully", {
      type: "success",
    });
    resetValues();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        autoClose: 5000,
        type: "error",
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};

watch(
  () => appStore.userData,
  (newValue) => {
    if (newValue) {
      setAcademicInfo(newValue);
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  getClassGrades();
  if (appStore.userData) {
    setAcademicInfo(appStore.userData);
  }
});
</script>
