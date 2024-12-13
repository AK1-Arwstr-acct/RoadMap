<template>
  <div>
    <label
      class="flex items-center justify-between gap-6 font-semibold transition-all ease-out duration-200 cursor-pointer"
      :class="[task?.disable ? 'text-[#686868]' : isCompleted && 'text-[#36C453]']"
    >
      <div class="flex items-center gap-2">
        <div
          class="size-6 min-w-6 rounded-full border-2 relative"
          :class="[
            task?.disable
              ? 'border-[#686868]'
              : isCompleted
              ? 'border-[#36C453] bg-[#36C453]'
              : 'border-white',
          ]"
        >
          <div class="absolute inset-0 flex justify-center items-center">
            <IconTick class="size-4" stroke="#383838" />
          </div>
        </div>
        <h4 class="font-semibold">{{ task.title }}</h4>
      </div>
      <p>{{ completedTask }}</p>
      <!-- for toggel view value  -->
      <input
        type="checkbox"
        v-model="task.view"
        class="hidden"
      />
    </label>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  task: {
    type: Object,
    default: () => {},
  },
});

const isCompleted = ref<boolean>(false);

const completedTask = computed(() => {
  const totalTasks = props.task.tasks.length;
  const checkedCount = props.task.tasks.filter((item) => item.checked).length;
  if (totalTasks === checkedCount) {
    isCompleted.value = true;
  } else isCompleted.value = false;
  return `${checkedCount}/${totalTasks}`;
});
</script>
