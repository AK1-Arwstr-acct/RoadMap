<template>
  <main
    ref="accordionWrapper"
    class="bg-transparent rounded-xl overflow-hidden border border-[#212225] h-fit w-full"
  >
    <div
      @click="isDropdown = !isDropdown"
      class="bg-[#18191B] p-3 cursor-pointer"
      :class="{ 'border-b border-[#212225]': isDropdown }"
    >
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <IconLock v-if="data?.disable" height="30" width="30" />
          <h2
            class="text-sm md:text-xl 2xl:text-2xl font-semibold"
            :class="{ 'text-[#686868]': data?.disable }"
          >
            {{ data?.title }}
          </h2>
          <div class="flex items-center gap-2">
            <div
              class="w-[100px] md:w-[260px] h-1.5 bg-[#383838] rounded-full overflow-hidden"
            >
              <div
                v-if="!data?.disable"
                class="bg-[#8380FF] h-full transition-all ease-in-out duration-500"
                :style="{ width: completedTask }"
              />
            </div>
            <p
              class="tracking-widest text-xl font-semibold"
              :class="{ 'text-[#686868]': data?.disable }"
            >
              {{ updatedData.filter((item: Tasks) => item.checked).length }}/{{
                data?.tasks.length
              }}
            </p>
          </div>
        </div>
        <div>
          <IconChevronDown
            class="transform transition-all ease-in-out duration-200"
            :class="{ 'rotate-180': isDropdown }"
          />
        </div>
      </div>
      <!-- <div v-if="data?.description">
        <p class="text-[#AEAEAE] font-medium text-xs">
          {{ data?.description }}
        </p>
      </div> -->
    </div>
    <Transition name="fadeDropdown">
      <div v-if="isDropdown" :class="{ 'pointer-events-none': data?.disable }">
        <table class="w-full divide-y divide-[#212225]">
          <tbody class="divide-y divide-[#212225]">
            <tr
              v-for="task in updatedData"
              @click="handelModal(task)"
              class="cursor-pointer"
            >
              <td class="p-3 w-[60%]">
                <label
                  @click.stop
                  class="flex items-center gap-2 font-semibold cursor-pointer transition-all ease-in-out duration-200 w-fit relative z-20"
                  :class="[
                    !!task?.disabled
                      ? 'text-[#43484E]'
                      : task?.checked
                      ? 'text-[#8380FF] line-through'
                      : 'text-[#F3F3F3]',
                  ]"
                >
                  <div v-if="!!!task.disabled" class="relative size-5">
                    <input
                      type="checkbox"
                      :checked="task?.checked"
                      v-model="task.checked"
                      @change="updateTask(task.id, task.checked)"
                      class="appearance-none size-full border-2 rounded border-white checked:bg-[#8380FF] checked:border-[#8380FF]"
                    />
                    <div
                      class="absolute inset-0 flex justify-center items-center"
                    >
                      <IconTick
                        v-if="task.checked"
                        class="size-4"
                        stroke="#111113"
                      />
                    </div>
                  </div>
                  <IconLock v-else />
                  {{ task.title }}
                </label>
              </td>
              <td class="p-3 w-[20%] text-sm text-[#F3F3F3] font-medium">
                <span
                  v-if="task.category"
                  class="p-1 rounded capitalize !leading-4"
                  :class="[
                    task.category.id === 1 || task.category.id === 5
                      ? 'bg-[#FFAF38]/60'
                      : task.category.id === 2
                      ? 'bg-[#FF7575]/60'
                      : task.category.id === 3 || task.category.id === 7
                      ? 'bg-[#64DB71]/60'
                      : task.category.id === 4
                      ? 'bg-[#9C99FF]/60'
                      : task.category.id === 6
                      ? 'bg-[#8ACBFF]/60'
                      : task.category.id === 8
                      ? 'bg-[#FF7575]/60'
                      : task.category.id === 9
                      ? 'bg-[#64DB71]/60'
                      : 'bg-[#9C99FF]/60',
                  ]"
                >
                  {{ task.category.title }}
                </span>
              </td>
              <td
                v-if="task.estimated_time"
                class="p-3 w-[20%] text-sm text-[#f7fdff] font-medium"
              >
                <p class="p-1 rounded inline-block bg-[#272a2d]">
                  {{ task.estimated_time }}
                </p>
              </td>
              <td v-else class="p-3 w-[20%] text-sm text-[#f7fdff] font-medium">
                <span class="text-sm font-medium text-[#43484E] p-1 rounded">
                  No due date
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Transition>
  </main>
</template>
<script setup lang="ts">
import type { Tasks } from "~/types/home";

const {api} = useApi();
const emit = defineEmits(["showTaskModal"]);

const props = defineProps({
  data: {
    type: Object,
  },
  dropdown: {
    type: Boolean,
    default: false,
  },
});

const accordionWrapper = ref<HTMLDivElement>();
const isDropdown = ref<boolean>(props.dropdown);
const updatedData = ref<Tasks[]>([]);

const completedTask = computed(() => {
  let checkedTask = updatedData.value.filter(
    (item: Tasks) => item.checked
  ).length;
  let totalTasks = updatedData.value.length;
  let widthClass = (checkedTask / totalTasks) * 100;
  return `${widthClass.toFixed(2)}%`;
});

const handelModal = (data: Tasks) => {
  emit("showTaskModal", data);
};

const updateTask = async (id: number, isUpdate: boolean) => {
  try {
    await api.post('v1/roadmap/tasks',{
      task_id: id,
      is_complete: isUpdate
    })
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  updatedData.value = props.data?.tasks.map((item: Tasks) => {
    return {
      ...item,
      checked: item.users.length > 0,
    };
  });
});
</script>
<style scoped>
.fadeDropdown-enter-active,
.fadeDropdown-leave-active {
  transition: all 200ms ease-in-out;
}

.fadeDropdown-enter-from,
.fadeDropdown-leave-to {
  height: 0px;
  opacity: 0;
}
</style>
