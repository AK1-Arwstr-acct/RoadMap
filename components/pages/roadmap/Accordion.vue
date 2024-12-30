<template>
  <main
    ref="accordionWrapper"
    class="bg-transparent rounded-xl overflow-hidden border border-[#383838] h-fit"
  >
    <div
      @click="isDropdown = !isDropdown"
      class="bg-[#292929] p-3 cursor-pointer"
      :class="{ 'border-b border-[#383838]': isDropdown }"
    > 
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-3">
        <IconLock v-if="data?.disable" height="30" width="30" />
        <h2
          class="text-xl 2xl:text-2xl font-semibold"
          :class="{ 'text-[#686868]': data?.disable }"
        >
          {{ data?.title }}
        </h2>
        <div class="flex items-center gap-2">
          <div class="w-[260px] h-1.5 bg-[#383838]">
            <div
              v-if="!data?.disable"
              class="bg-green-600 h-full transition-all ease-in-out duration-500"
              :style="{ width: completedTask }"
            />
          </div>
          <p
            class="tracking-widest text-xl font-semibold"
            :class="{ 'text-[#686868]': data?.disable }"
          >
            {{ data?.tasks.filter((item) => item.checked).length }}/{{
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
    <div v-if="data?.description" >
      <p  class="text-[#AEAEAE] font-medium text-xs">
        {{ data?.description }}
      </p>
    </div>
    </div>
    <Transition name="fadeDropdown">
      <div v-if="isDropdown" :class="{ 'pointer-events-none': data?.disable }">
        <table class="w-full divide-y divide-[#383838]">
          <thead class="">
            <tr
              class="text-xs text-[#F3F3F3] font-medium divide-x divide-[#383838]"
            >
              <th class="w-[40%] text-lg 2xl:text-xl font-semibold text-start p-3">Task</th>
              <th class="w-[40%] text-lg 2xl:text-xl text-start p-3">Estimated deadline</th>
              <th class="w-[13%] text-start p-3" />
            </tr>
          </thead>
          <tbody class="divide-y divide-[#383838]">
            <tr v-for="task in data?.tasks" class="divide-x divide-[#383838]">
              <td class="p-3">
                <div
                  class="flex items-center gap-2 font-semibold"
                  :class="[
                    data?.disable
                      ? 'text-[#686868]'
                      : task?.checked
                      ? 'text-[#808080] line-through'
                      : 'text-[#F3F3F3]',
                  ]"
                >
                  <IconLock v-if="data?.disable" />
                  {{ task.heading }}
                </div>
              </td>
              <td class="p-3 text-xs text-[#AEAEAE] font-medium">{{ task.estimated_time }}</td>
              <td class="p-3 flex justify-end">
                <p
                  @click="handelModal(task)"
                  class="text-xs w-fit rounded-lg p-2 border border-[#686868] bg-[#383838] cursor-pointer"
                  :class="[
                    data?.disable
                      ? 'bg-transparent text-[#686868]'
                      : 'bg-[#383838]',
                  ]"
                >
                  View detail
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Transition>
  </main>
</template>
<script setup lang="ts">
const emit = defineEmits(["showTaskModal"]);

const props = defineProps({
  data: {
    type: Object,
  },
});

const accordionWrapper = ref<HTMLDivElement>();
const isDropdown = ref<boolean>(false);

const completedTask = computed(() => {
  let checkedTask = props.data?.tasks.filter((item) => item.checked).length;
  let totalTasks = props.data?.tasks.length;
  let widthClass = (checkedTask / totalTasks) * 100;
  return `${widthClass.toFixed(2)}%`;
});

const handelModal = (data) => {
  emit("showTaskModal", data);
};

//  extra code --- remove after while
// const tabData = ref(props.data);

// const updateChecked = () => {
//   emit('updateCheckItem', tabData.value)
// }

// watch(
//   () => props.data,
//   () => {
//     tabData.value = props.data
//   }
// );

watch(
  () => props.data?.view,
  () => {
    accordionWrapper.value?.scrollIntoView({ behavior: "smooth" });
  }
);
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
