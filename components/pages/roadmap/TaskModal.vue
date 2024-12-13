<template>
  <div class="fixed inset-0 z-50 h-screen w-screen">
    <div class="size-full flex justify-end">
      <div
        v-click-outside="() => emit('close')"
        class="h-full w-[607px] bg-[#292929] shadow-[-4px_6px_12px_0px_rgba(0,0,0,0.40)]"
      >
        <aside class="size-full flex flex-col">
          <div class="p-6 border-b border-[#686868] flex flex-col gap-3">
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
                    <IconTick v-if="modalData.checked" class="size-5" stroke="#292929" />
                  </div>
                </div>
                {{modalData.heading}}
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
          </div>
          <div class="p-6 flex-1 flex flex-col gap-3 overflow-y-auto">
            <div class="h-fit text-[#F3F3F3] flex flex-col gap-3 custom_style" v-html="modalData.task_description" />
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

</script>
<style>
/* .custom_style{
} */
.custom_style > ul{
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: disc;
  list-style-position: inside;
  padding-left: 0;
}
.custom_style > ul > li {
  text-indent: -25px;
  padding-left: 25px;
}

.custom_style li > ul {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: '-';
  list-style-position: outside;
  padding-left: 0;
}
.custom_style li > ul > li {
  padding-left: 30px;
  isolation: isolate;
}

</style>