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
    <span> Add to List </span>
  </button>
  <div v-else class="">
    <AppStatusDropdown
      :options="applicationStatusOptions"
      v-model="selectedStatus"
      dropdownWidth="lg:w-[calc(100%+100px)]"
      :direction="width > 1024 ? 'downward' : 'upward'"
      :loading="isAddingSchol"
    />
  </div>
</template>
<script setup lang="ts">
import type { checklistResponse, Program } from "~/types/program";
import useDashboardStore from "~/stores/dashboardStore";
import useAppStore from "~/stores/AppStore";
import type { OptionAttributes } from "~/types/home";
import axios from "axios";

const dashboardStore = useDashboardStore();
const appStore = useAppStore();
const { api } = useApi();
const { showToast } = useToast();
const route = useRoute();

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
    label: "Select status",
  },
  {
    value: "considering",
    label: "considering",
  },
  {
    value: "started_application",
    label: "Started Application",
  },
  {
    value: "applied",
    label: "Applied",
  },
  {
    value: "accepted",
    label: "Accepted",
  },
  {
    value: "waitlisted",
    label: "Waitlisted",
  },
  // {
  //   value: "denied",
  //   label: "Denied",
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

const selectedStatus = ref<OptionAttributes>(setInitialStatus.value);

const isInCheckList = computed(() => {
  if (route.path.includes("/school-list")) {
    return props.program.hasBookMark;
  }
  if (appStore.authenticatedUser) {
    return dashboardStore.userSelectedSchoolsList.some(
      (item) => item.program.id === props.program.id
    );
  } else {
    return dashboardStore.userSelectedSchoolsListPublic.some(
      (item) => item.id === props.program.id
    );
  }
});

const addToList = async () => {
  try {
    if (!appStore.authenticatedUser) {
      dashboardStore.userSelectedSchoolsListPublic.push(props.program);
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
      const program = dashboardStore.schoolsList.find(
        (item) => item.id === response.data.data.program_id
      );
      if (program && program.bookmark) {
        program.bookmark.id = response.data.data.id;
        program.hasBookMark = true;
      }
    }
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
        status: selectedStatus.value.label,
        note: "",
        // order_no: 1
      }
    );
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
