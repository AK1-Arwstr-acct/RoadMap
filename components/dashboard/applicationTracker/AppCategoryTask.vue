<template>
  <section>
    <div
      @click="isOpen = !isOpen"
      class="py-4 px-5 border border-[#D5D7DA] rounded-2xl bg-[#FFFEFC] flex items-center gap-2 cursor-pointer"
    >
      <IconChevronDown
        stroke="#717680"
        class="transform transition-all ease-in-out duration-300"
        :class="{ '-rotate-90': !isOpen }"
      />
      <p class="text-[#111827] text-xl font-semibold flex-1 capitalize">
        {{
          category === "extracurricular" ? "extracurricular activity" : category
        }}
      </p>
      <div
        class="py-0.5 px-3 rounded-full font-semibold tracking-wider"
        :class="[
          category.includes('career') || category.includes('application')
            ? 'bg-[#FFFAEB] text-[#B54708]'
            : category.includes('academics')
            ? 'bg-[#EFF8FF] text-[#175CD3]'
            : category.includes('extracurricular')
            ? 'bg-[#ECFDF3] text-[#027A48]'
            : category.includes('school')
            ? 'bg-[#FDF2FA] text-[#C11574]'
            : category.includes('decision')
            ? 'bg-[#EEF4FF] text-[#3538CD]'
            : 'bg-[#F0F9FF] text-[#026AA2]',
        ]"
      >
        {{
          filteredTask(category).filter((item) => item.checked == true).length
        }}/{{ filteredTask(category).length }}
      </div>
    </div>
    <!-- tasks -->
    <div
      ref="content"
      :style="{ maxHeight: isOpen ? contentHeight + 'px' : '0px' }"
      class="overflow-hidden transition-all ease-in-out duration-500"
    >
      <div
        v-for="(task, idx) in filteredTask(category)"
        :key="idx"
        @click="emit('openTaskDetail', task)"
      >
        <label
          :for="`task-${task.id}`"
          class="mt-6 flex items-center gap-6 size-full rounded-2xl cursor-pointer bg-[#FFFFFF] border border-[#E9EAEB] p-4"
        >
          <input
            :id="`task-${task.id}`"
            type="checkbox"
            name="countries"
            :checked="task.checked"
            class="absolute top-3 right-3 appearance-none"
          />
          <div class="size-[90px]">
            <img
              src="/public//images/task-logo.png"
              alt="task logo"
              class="size-full object-contain"
            />
          </div>
          <div class="flex-1 space-y-2">
            <span
              class="font-medium text-sm py-0.5 px-2.5 rounded-full capitalize"
              :class="[
                category.includes('career') || category.includes('application')
                  ? 'bg-[#FFFAEB] text-[#B54708]'
                  : category.includes('academics')
                  ? 'bg-[#EFF8FF] text-[#175CD3]'
                  : category.includes('extracurricular')
                  ? 'bg-[#ECFDF3] text-[#027A48]'
                  : category.includes('school')
                  ? 'bg-[#FDF2FA] text-[#C11574]'
                  : category.includes('decision')
                  ? 'bg-[#EEF4FF] text-[#3538CD]'
                  : 'bg-[#F0F9FF] text-[#026AA2]',
              ]"
            >
              {{ category.includes("extracurricular") ? "EC" : category }}
            </span>
            <p class="text-xl text-[#414651] font-semibold">
              {{ task.title }}
            </p>
            <div class="flex items-center gap-1.5 text-[#414651] text-sm">
              <IconClock />
              <span> {{ task.estimated_time }} </span>
            </div>
          </div>
          <div
            class="size-6 rounded-full bg-white border border-[#D5D7DA] p-0.5 flex justify-center items-center"
          >
            <div
              v-if="task.checked"
              class="size-full bg-[#1570EF] rounded-full"
            />
          </div>
        </label>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { Application } from "~/types/dashboard";

const emit = defineEmits(["openTaskDetail"]);

const props = defineProps({
  application: {
    type: Object as PropType<Application>,
    default: () => {},
  },
  category: {
    type: String,
    default: "",
  },
});

const isOpen = ref<boolean>(false);
const content = ref<HTMLElement | null>(null);
const contentHeight = ref(0);

const filteredTask = (category: string) => {
  const tasks = props.application.tasks.filter((item) =>
    item.category.title.includes(category)
  );
  return tasks;
};

const calculateHeight = () => {
  if (content.value) {
    contentHeight.value = isOpen.value ? content.value.scrollHeight : 0;
  }
};

watch(() => isOpen.value, calculateHeight);

onMounted(() => {
  calculateHeight();
});
</script>
