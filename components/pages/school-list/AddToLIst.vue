<template>
  <button
    v-if="!isInCheckList"
    @click.stop="addToList"
    class="flex justify-center items-center gap-2 py-1.5 px-2.5 bg-[#E5E5E5] rounded-lg leading-3 text-nowrap text-sm w-full lg:w-auto"
  >
    <IconPlus v-if="!isAddingSchol" />
    <IconSpinner
      v-else
      stroke="#A4A7AE"
      bgColor="#ffffff"
      width="16"
      height="17"
    />
    <span> {{ $t("schoolList_page.add_to_list_dropdown.add_to_list") }} </span>
  </button>
  <div v-else class="">
    <AppStatusDropdown
      :options="applicationStatusOptions"
      v-model="selectedStatus"
      dropdownWidth="lg:w-[calc(100%+100px)]"
      :direction="dropdownDirection"
      :loading="isAddingSchol"
    />
  </div>
</template>
<script setup lang="ts">
import type { checklistResponse, Program } from "~/types/program";
import useSchoolListStore from "~/stores/SchoolListStore";
import useAppStore from "~/stores/AppStore";
import type { OptionAttributes } from "~/types/home";
import axios from "axios";

const schoolListStore = useSchoolListStore();
const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();
const route = useRoute();
const { t } = useI18n();

const props = defineProps({
  program: {
    type: Object as PropType<Program>,
    default: () => {},
  },
  checkListData: {
    type: Object as PropType<checklistResponse | null>,
    default: null,
  },
});

const isAddingSchol = ref<boolean>(false);

const applicationStatusOptions = ref<OptionAttributes[]>([
  {
    value: "select_status",
    label: `${t("schoolList_page.add_to_list_dropdown.select_status")}`,
    description: "Select status",
  },
  {
    value: "considering",
    label: `${t("schoolList_page.add_to_list_dropdown.considering")}`,
    description: "considering",
  },
  {
    value: "started_application",
    label: `${t("schoolList_page.add_to_list_dropdown.started_application")}`,
    description: "Started Application",
  },
  {
    value: "applied",
    label: `${t("schoolList_page.add_to_list_dropdown.applied")}`,
    description: "Applied",
  },
  {
    value: "accepted",
    label: `${t("schoolList_page.add_to_list_dropdown.accepted")}`,
    description: "Accepted",
  },
  {
    value: "waitlisted",
    label: `${t("schoolList_page.add_to_list_dropdown.waitlisted")}`,
    description: "Waitlisted",
  },
  // {
  //   value: "denied",
  //   label: `${t('schoolList_page.add_to_list_dropdown.denied')}`,
  //   description: "Denied",
  // },
]);

const width = ref<number>(0);

const setInitialStatus = computed(() => {
  if (route.path.includes("school-list")) {
    return (
      applicationStatusOptions.value.find((item) =>
        item.label.includes(props.program.bookmark?.status ?? "")
      ) ?? applicationStatusOptions.value[0]
    );
  } else {
    return (
      applicationStatusOptions.value.find((item) =>
        item.label.includes(props.checkListData?.status ?? "")
      ) ?? applicationStatusOptions.value[0]
    );
  }
});

const dropdownDirection = computed(() => {
  if (width.value > 1024) {
    const index = schoolListStore.schoolsList.findIndex(
      (item) => item.id === props.program.id
    );
    const listLength = schoolListStore.schoolsList.length;
    return listLength > 3 && index === listLength - 1 ? "upward" : "downward";
  }
  return "upward";
});

const selectedStatus = ref<OptionAttributes>(setInitialStatus.value);

const isInCheckList = computed(() => {
  if (route.path.includes("/school-list")) {
    return props.program.hasBookMark;
  }
  if (appStore.authenticatedUser) {
    return schoolListStore.userSelectedSchoolsList.some(
      (item) => item.program.id === props.program.id
    );
  } else {
    return schoolListStore.userSelectedSchoolsListPublic.some(
      (item) => item.id === props.program.id
    );
  }
});

const addToList = async () => {
  try {
    if (!appStore.authenticatedUser) {
      schoolListStore.userSelectedSchoolsListPublic.push(props.program);
      return;
    }
    isAddingSchol.value = true;
    const response = await api.post("/api/v1/bookmark/program", {
      program_id: props.program.id,
      class_grade_id: props.program.class_grades[0].id,
      status: "",
      note: "",
    });
    if (response.data.data) {
      const program = schoolListStore.schoolsList.find(
        (item) => item.id === response.data.data.program_id
      );
      if (program && program.bookmark) {
        program.bookmark.id = response.data.data.id;
        program.hasBookMark = true;
      }
    }
    showToast("Added to Checklist", {
      type: "success",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isAddingSchol.value = false;
  }
};

const updateStatus = async () => {
  try {
    isAddingSchol.value = true;
    await api.put(
      `/api/v1/bookmark/program/${
        route.path.includes("school-list")
          ? props.program.bookmark?.id
          : props.checkListData?.id
      }`,
      {
        program_id: props.program.id,
        class_grade_id: props.program.class_grades[0].id,
        status: selectedStatus.value.description,
        note: "",
        // order_no: 1
      }
    );
    showToast("Status Updated", {
      type: "success",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isAddingSchol.value = false;
  }
};

watch(
  () => selectedStatus.value.value,
  () => {
    updateStatus();
  }
);

const windowSize = () => {
  if (typeof window !== "undefined") {
    width.value = window.innerWidth;
  }
};

onMounted(() => {
  windowSize();
  window.addEventListener("resize", windowSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", windowSize);
});
</script>
