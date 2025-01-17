<template>
  <div class="fixed inset-0 z-50 h-screen w-full">
    <div class="size-full flex justify-end">
      <div
        v-click-outside="() => emit('close')"
        class="h-full w-[607px] bg-[#18191B] shadow-[-4px_6px_12px_0px_rgba(0,0,0,0.40)]"
      >
        <aside class="size-full flex flex-col">
          <div class="p-6 flex flex-col gap-3">
            <!-- icons -->
            <div class="flex gap-3 items-center">
              <div @click="emit('close')" class="cursor-pointer">
                <IconDoubleChevronRight />
              </div>
              <!-- <IconDoubleArrows /> -->
            </div>
            <!-- heading -->
            <div>
              <label
                class="flex items-center gap-2 font-semibold cursor-pointer text-2xl 2xl:text-3xl text-[#F3F3F3]"
              >
                <div class="relative size-6 2xl:size-8">
                  <input
                    type="checkbox"
                    v-model="modalData.checked"
                    @change="updateTask(modalData.id, modalData.checked)"
                    class="absolute inset-0 appearance-none size-full border-[3px] 2xl:border-4 rounded border-white checked:bg-[#8380FF] checked:border-[#8380FF]"
                  />
                  <div
                    class="absolute inset-0 flex justify-center items-center"
                  >
                    <IconTick
                      v-if="modalData.checked"
                      class="size-5"
                      stroke="#292929"
                    />
                  </div>
                </div>
                {{ modalData.title }}
              </label>
            </div>
            <!-- dates -->
            <div class="text-xs font-medium flex items-center gap-6">
              <div class="w-fit">
                <p class="text-[#AEAEAE]">Ideal deadline</p>
                <div class="flex items-center mt-1 gap-1">
                  <p
                    v-if="modalData.estimated_time"
                    class="w-fit py-1 px-2 text-[#f7fdff] bg-[#272a2d] rounded"
                  >
                    {{ modalData.estimated_time }}
                  </p>
                  <span
                    v-else
                    class="text-sm font-medium text-[#F7FDFF] bg-[#272A2D] p-1 rounded"
                  >
                    No due date
                  </span>
                </div>
              </div>
            </div>
            <div v-if="modalData.cta">
              <NuxtLink
                target="_blank"
                :to="modalData.cta.link"
                class="text-[#F3F3F3] p-2 text-xs font-medium cursor-pointer bg-[#8380FF] rounded-lg w-fit flex gap-2 items-center"
              >
                {{ modalData.cta.label }}
                <IconArrowRight />
              </NuxtLink>
            </div>
          </div>
          <div
            class="px-6 border-b border-[#383838]/50 flex items-center font-medium"
          >
            <div
              class="p-2 cursor-pointer transition-all ease-in-out duration-200"
              @click="tabView = 'overView'"
              :class="[
                tabView === 'overView' ? 'text-[#8380FF]' : 'text-[#F3F3F3]',
              ]"
            >
              Overview
            </div>
            <div
              class="p-1 cursor-pointer transition-all ease-in-out duration-200"
              @click="tabView = 'notes'"
              :class="[
                tabView === 'notes' ? 'text-[#8380FF]' : 'text-[#F3F3F3]',
              ]"
            >
              Notes
            </div>
          </div>
          <div class="p-6 flex-1 overflow-hidden">
            <div
              class="size-full flex flex-col gap-3 overflow-y-auto no-scrollbar"
            >
              <Transition name="slide">
                <div v-if="tabView === 'overView'" class="size-full">
                  <ClientOnly>
                    <vue-markdown
                      :source="modalData.description || ''"
                      :options="options"
                      class="h-fit text-[#F3F3F3] flex flex-col gap-3 pb-6"
                    />
                    <!-- <p>Take this MBTI test to discover your true self!</p>
                    <ul class="flex flex-col gap-1 list-inside list-disc">
                      <li class="-indent-6 pl-6 marker:content-['-']">
                        One of the most important elements of a compelling college
                        application is authentic self-reflection. The ability to
                        understand and convey your true identity shapes every
                        aspect of your application.
                      </li>
                      <li class="-indent-6 pl-6 marker:content-['+']">
                        This test serves as a starting point for deeper
                        self-exploration. Rather than accepting the results at
                        face value, use them as a catalyst to examine who you are
                        and what you aspire to achieve. These insights will not
                        only strengthen your college applications but also guide
                        your broader life journey.
                      </li>
                    </ul> -->
                  </ClientOnly>
                  <div class="mt-3 flex flex-col gap-1">
                    <NuxtLink
                      :to="resource.link"
                      target="blank"
                      v-for="(resource, idx) in modalData.resources"
                      :key="idx"
                      class="text-[#F3F3F3] bg-[#212225] py-2 pl-2 pr-2.5 rounded-lg flex items-center gap-2 w-fit"
                    >
                      <div v-if="resource.link">
                        <IconGlobe width="18" height="18" />
                      </div>
                      <div>
                        {{ resource.text }}
                      </div>
                    </NuxtLink>
                  </div>
                </div>
                <div v-else>
                  <div>
                    <input
                      name=""
                      type="text"
                      placeholder="Enter Notes"
                      v-model="note"
                      @keydown.enter="updateTaskNotes(modalData.id)"
                      class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#C5C5C5] py-2 w-full outline-none text-white"
                      />
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { api } = useApi();

const emit = defineEmits(["close"]);

defineProps({
  modalData: {
    type: Object,
    default: () => {},
  },
});

const tabView = ref<"overView" | "notes">("overView");
const note = ref<string>("");

const options = {
  html: true,
};

const updateTask = async (id: number, isUpdate: boolean) => {
  try {
    await api.post("v1/roadmap/tasks", {
      task_id: id,
      is_complete: isUpdate,
    });
  } catch (error) {
    console.error(error);
  }
};
const updateTaskNotes = async (id: number) => {
  try {
    await api.post("v1/roadmap/tasks", {
      task_id: id,
      remarks: note.value,
    });
    note.value = "";
  } catch (error) {
    console.error(error);
  }
};
</script>
<style>
/* transition style */

.slide-enter-active,
.slide-leave-active {
  transition: all 300ms;
  transform: all 300ms;
}

.slide-enter-from {
  opacity: 0;
}

.slide-leave-to {
  display: none;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
}
</style>
