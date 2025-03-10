<template>
  <div class="flex flex-col gap-8">
    <!-- question -->
    <div class="flex items-center gap-3">
      <div class="size-8 rounded-full bg-black overflow-hidden">
        <NuxtImg
          src="/images/chat-bot.png"
          alt="chat bot"
          class="object-cover object-center size-full"
          loading="eager"
          preload
        />
      </div>
      <p class="text-[#414651]">
        {{ question }}
      </p>
    </div>
    <!-- answer -->
    <div v-if="tempData" class="flex justify-end">
      <div
        v-if="!editMode"
        class="flex items-center gap-3 group w-fit max-w-[578px] relative pl-10"
      >
        <IconPencil
          @click="editMode = true"
          class="hidden cursor-pointer group-hover:block absolute left-1 top-1/2 transform -translate-y-1/2"
        />
        <div v-html="tempData" class="py-3 px-4 rounded-lg w-fit bg-[#E8E8E8]/50 text-[#414651]" />
      </div>
      <div v-else class="py-3 px-4 rounded-lg bg-[#E8E8E8]/50 border w-full">
        <div
          ref="editableDiv"
          contenteditable="true"
          v-html="tempData"
          class="w-full text-[#414651] bg-transparent outline-none mb-3"
        />
        <div class="flex justify-end gap-3">
          <button
            @click="cancelEdit"
            class="py-2 px-3.5 text-[#414651] text-sm font-semibold border border-[#D5D7DA] bg-white rounded-lg"
          >
            Cancel
          </button>
          <button
            @click="updateAnswer"
            class="py-2 px-3.5 text-white text-sm font-semibold border border-[#1570EF] bg-[#1570EF] rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(["editAnswer"]);

const props = defineProps({
  question: {
    type: String,
    default: "",
  },
  answer: {
    type: String,
    default: "",
  },
});

const tempData = ref<string>(props.answer);
const editMode = ref<boolean>(false);
const editableDiv = ref<HTMLDivElement | null>(null);

const updateAnswer = () => {
  if (editableDiv.value) {
    tempData.value = editableDiv.value.innerText.trim();
    emits("editAnswer", tempData.value);
  }
  editMode.value = false;
};

const cancelEdit = () => {
  editMode.value = false;
  tempData.value = props.answer;
};

watch(
  () => props.answer,
  (newValue) => {
    tempData.value = newValue;
  }
);
</script>
