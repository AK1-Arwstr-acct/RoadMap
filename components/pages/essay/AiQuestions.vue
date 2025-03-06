<template>
  <section class="size-full overflow-hidden flex flex-col items-center">
    <div class="py-7 px-10 sm:px-20 xl:px-[170px] flex flex-col gap-10 w-full">
      <div class="flex items-center gap-6">
        <div @click="emit('goBack')" class="cursor-pointer">
          <IconCross fill="#717680" width="32" height="32" />
        </div>
        <div class="flex-1 rounded-full bg-[#F5F5F5] overflow-hidden h-3">
          <div
            class="h-full bg-[#1570EF] rounded-full transition-all ease-in-out duration-700"
            :style="{ maxWidth: '200px' }"
          />
        </div>
        <div class="w-7 h-[42px]">
          <NuxtImg src="/images/bulb.png" class="size-full object-contain" />
        </div>
      </div>
      <h1 class="text-[#181D27] text-2xl 2xl:text-3xl font-medium text-center">
        Let's Get to Know You a Little Bit
      </h1>
    </div>
    <!-- chat -->
    <div class="w-[60%] xl:w-[50%] flex-1 flex flex-col gap-2 overflow-hidden">
      <div class="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-8">
        <!-- question 1 -->
        <div class="flex items-center gap-3">
          <div class="size-8 rounded-full bg-black overflow-hidden">
            <NuxtImg
              src="/images/chat-bot.png"
              alt="chat bot"
              class="object-cover object-center size-full"
            />
          </div>
          <p class="text-[#414651]">
            Hi there, can you tell me about your year of birth?
          </p>
        </div>
        <!-- answer 1 -->
        <div v-if="answersList.birthYear" class="flex justify-end">
          <div
            v-if="!editBirth"
            class="flex items-center gap-3 group w-fit max-w-[538px]"
          >
            <IconPencil
              @click="editBirthYear"
              class="hidden cursor-pointer group-hover:block"
            />
            <p
              class="py-3 px-4 rounded-lg w-fit bg-[#E8E8E8]/50 text-[#414651]"
            >
              {{ answersList.birthYear }}
            </p>
          </div>
          <div
            v-else
            class="py-3 px-4 rounded-lg bg-[#E8E8E8]/50 border w-full"
          >
            <input
              type="text"
              v-model="tempBirthYear"
              class="w-full text-[#414651] bg-transparent outline-none mb-3"
            />
            <div class="flex justify-end gap-3">
              <button
                @click="cancelBirthEdit"
                class="py-2 px-3.5 text-[#414651] text-sm font-semibold border border-[#D5D7DA] bg-white rounded-lg"
              >
                Cancel
              </button>
              <button
                @click="updateBirthYear"
                class="py-2 px-3.5 text-white text-sm font-semibold border border-[#1570EF] bg-[#1570EF] rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          class="border-[1.5px] border-[#E9EAEB] py-1.5 pr-1.5 pl-3.5 rounded-xl flex gap-2 shadow-[0px_1px_2px_0px_#0A0D120F]"
        >
          <input
            type="text"
            :placeholder="questionStep === 1 ? '2.g. 2007' : ''"
            class="flex-1 outline-none"
            v-model="inputText"
          />
          <button
            @click="handleNext"
            :disabled="!inputText"
            class="flex items-center gap-2 text-white py-2 px-3.5 bg-[#1570EF] rounded-lg disabled:opacity-40"
          >
            Next
            <IconArrowRight fill="#ffffff" />
          </button>
        </div>
        <p class="text-sm text-[#A4A7AE] text-center pt-4 pb-6">
          No need to rush here, take your time to think
        </p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const emit = defineEmits(["goBack"]);

const inputText = ref<string>("");

const questionStep = ref<number>(1);
const editBirth = ref<boolean>(false);

const answersList = ref({
  birthYear: "",
  schoolName: "",
  major: "",
  message: "",
});

const tempBirthYear = ref<string>('');

const editBirthYear = () => {
  editBirth.value = true;
  tempBirthYear.value = answersList.value.birthYear;
};
const updateBirthYear = () => {
  answersList.value.birthYear = tempBirthYear.value;
  editBirth.value = false;
};

const cancelBirthEdit = () => {
  editBirth.value = false;
  tempBirthYear.value = answersList.value.birthYear;
};

const handleNext = () => {
  if (questionStep.value === 1) {
    answersList.value.birthYear = inputText.value;
  } else if (questionStep.value === 2) {
    answersList.value.schoolName = inputText.value;
  } else if (questionStep.value === 3) {
    answersList.value.major = inputText.value;
  } else if (questionStep.value === 4) {
    answersList.value.message = inputText.value;
  }
  questionStep.value += 1;
  console.log(answersList.value);
};

watch(
  () => questionStep.value,
  () => {
    if (questionStep.value === 1) {
      inputText.value = "2008";
    } else if (questionStep.value === 4) {
      inputText.value =
        "I love solving puzzles, and coding feels like one big puzzle! I want to study computer science at this university so I can build cool apps that help people and make life easier.";
    } else {
      inputText.value = "";
    }
  },
  {
    immediate: true,
  }
);
</script>
