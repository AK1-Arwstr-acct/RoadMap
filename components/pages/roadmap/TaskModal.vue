<template>
  <div class="fixed inset-0 z-50 h-screen w-screen">
    <div class="size-full flex justify-end">
      <div
        v-click-outside="() => emit('close')"
        class="h-full w-[607px] bg-[#292929] shadow-[-4px_6px_12px_0px_rgba(0,0,0,0.40)]"
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
                {{ modalData.heading }}
              </label>
            </div>
            <!-- dates -->
            <div class="text-xs font-medium flex items-center gap-6">
              <div class="w-fit">
                <p class="text-[#AEAEAE]">Estimated deadline</p>
                <div class="flex items-center mt-1 gap-1">
                  <p
                    class="text-[#5C2C08] w-fit py-1 px-2 bg-[#FFAF38] rounded"
                  >
                    {{ modalData.estimated_time }}
                  </p>
                  <!-- <p class="text-[#FFAF38]">20 days left</p> -->
                </div>
              </div>
            </div>
            <div v-if="modalData.cta" >
              <NuxtLink
                target="_blank"
                :to="modalData.cta.link"
                class="text-[#F3F3F3] p-2 text-xs font-medium cursor-pointer bg-[#8380FF] rounded-lg w-fit flex gap-2 items-center"
              >
                {{ modalData.cta.label }}
                <IconArrowRight />
              </NuxtLink>
            </div>
            <!-- <div>
              <label class="font-medium text-[#E2E6FF]">Result</label>
              <input
                name="result"
                type="text"
                placeholder="Enter your type"
                class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#C5C5C5] py-2 w-full outline-none text-white"
              />
            </div> -->
          </div>
          <div
            class="px-6 border-b border-[#383838] flex items-center font-medium"
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
          <div class="p-6 flex-1 flex flex-col gap-3 overflow-y-auto">
            <Transition name="slide">
              <div v-if="tabView === 'overView'" class="size-full">
                <ClientOnly>
                  <vue-markdown
                    :source="modalData.task_description || ''"
                    :options="options"
                    class="h-fit text-[#F3F3F3] flex flex-col gap-3 pb-6"
                  />
                </ClientOnly>
              </div>
              <div v-else>
                <div>
                  <input
                    name=""
                    type="text"
                    placeholder="Enter Notes"
                    class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#C5C5C5] py-2 w-full outline-none text-white"
                  />
                </div>
              </div>
            </Transition>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["close"]);

defineProps({
  modalData: {
    type: Object,
    default: () => {},
  },
});

const tabView = ref<"overView" | "notes">("overView");

const options = {
  html: true,
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
