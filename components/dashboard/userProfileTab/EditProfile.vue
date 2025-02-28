<template>
  <section class="bg-[#FAFAFA] h-full overflow-y-auto no-scrollbar">
    <div class="max-w-[640px] px-4 mx-auto mt-8 mb-16">
      <div class="text-[#717680] font-medium flex items-center gap-1.5 mb-3">
        <p @click="emit('updateStep', 'profile')" class="cursor-pointer">
          Profile
        </p>
        <IconChevronDown
          class="transform -rotate-90"
          stroke="#717680"
          width="20"
          height="20"
        />
      </div>
      <h3 class="text-[#181D27] text-2xl font-semibold mb-8">Edit profile</h3>
      <div class="mb-8">
        <div>
          <h2 class="text-[#181D27] text-lg font-semibold">Personal Info</h2>
          <p class="text-[#535862] text-sm">
            Update your photo and personal details here.
          </p>
        </div>
        <div class="bg-white shadow-sm mt-6 space-y-6 p-6 rounded-t-xl border">
          <div class="sm:flex gap-6">
            <div class="sm:w-1/2 mb-6 sm:mb-0">
              <label class="block text-[#535862] font-semibold">Name</label>
              <input
                type="text"
                v-model="userInitialData.name"
                placeholder="Enter Name"
                class="w-full mt-1.5 px-3.5 py-2.5 border border-[#D5D7DA] text-[#181D27] rounded-lg outline-none"
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
            <div class="flex mt-1.5 border border-[#D5D7DA] rounded-lg">
              <div class="relative w-fit">
                <select
                  class="px-3.5 py-2.5 text-[#181D27] rounded-l-lg outline-none appearance-none"
                >
                  <option>VN</option>
                </select>
                <div
                  class="absolute inset-y-0 -right-2 flex items-center pointer-events-none"
                >
                  <IconArrowDownThick />
                </div>
              </div>
              <input
                type="text"
                value="+84 915 343 643"
                class="w-full px-3.5 py-2.5 text-[#181D27] outline-none rounded-r-lg"
              />
            </div>
          </div>
          <div>
            <label class="block text-[#535862] font-semibold">Email</label>
            <div
              class="mt-1 px-3.5 py-2.5 flex items-center gap-2 border border-[#D5D7DA] rounded-lg"
            >
              <span><IconEmail /></span>
              <input
                type="email"
                value="abellvo@arrowster.com"
                class="w-full text-[#181D27] outline-none"
              />
            </div>
            <p class="text-sm text-[#535862] mt-1">
              Your email has not been confirmed.
              <a href="#" class="text-sm text-[#535862] border-b border-[#535862]"
                >Verify it now</a
              >
            </p>
          </div>
          <div>
            <label class="block text-[#535862] font-semibold"
              >Current password</label
            >
            <div class="relative">
              <input
                type="password"
                class="w-full mt-1.5 px-3.5 py-2.5 text-[#181D27] border border-[#D5D7DA] rounded-lg outline-none"
              />
              <span class="absolute right-3 top-6 cursor-pointer"
                ><IconOpenEye
              /></span>
            </div>
          </div>
          <div>
            <label class="text-[#535862] font-semibold">New password</label>
            <div class="relative">
              <input
                type="password"
                class="w-full mt-1.5 px-3.5 py-2.5 border border-[#D5D7DA] rounded-lg text-[#181D27] outline-none"
              />
              <span class="absolute right-3 top-6 cursor-pointer"
                ><IconOpenEye
              /></span>
            </div>
          </div>
        </div>
        <div
          class="flex justify-end gap-2 px-6 py-4 shadow-sm bg-white rounded-b-xl border-b border-x"
        >
          <button
            class="px-4 py-2.5 text-[#414651] font-semibold border border-[#D5D7DA] rounded-lg"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2.5 text-white font-semibold bg-[#B2DDFF] border border-[#B2DDFF] rounded-lg"
          >
            Save changes
          </button>
        </div>
      </div>
      <!-- academic -->
      <UserAcademicProfile />
    </div>
  </section>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import axios from "axios";
import useAppStore from "~/stores/AppStore";
import type { ClassGrades, CurrentClassGrade, UserData } from "~/types/home";

const appStore = useAppStore();
const dashboardStore = useDashboardStore();
const { api } = useApi();
const { showToast } = useToast();

const emit = defineEmits(["updateStep"]);

interface UserInitailData {
  name: string;
  gpa: string;
  grade: ClassGrades;
  phoneNumber: string;
  email: string;
  currentPassword: string;
  password: string;
}

const classGradeList = ref<ClassGrades[]>([]);
const userInitialData = ref<UserInitailData>({
  name: "",
  gpa: "",
  grade: {
    value: "",
    label: "",
  },
  phoneNumber: "",
  email: "",
  currentPassword: "",
  password: "",
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
  (userInitialData.value.name = userData?.name),
    (userInitialData.value.gpa = userData?.educational_records.cgpa
      ? `${userData?.educational_records.cgpa}`
      : "");
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
    dashboardStore.setProgramListOptions();
    dashboardStore.setLocationOptions();
    dashboardStore.setBudgetList();
    dashboardStore.setCoursePreferenceOptions();
  }
});
</script>
