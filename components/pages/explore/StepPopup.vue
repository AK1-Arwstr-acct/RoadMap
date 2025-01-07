<template>
  <div
    class="flex flex-col gap-6 p-6 w-[370px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.40)] bg-[#212225] rounded-xl relative"
  >
    <div
      class="absolute bg-[#212225] size-5"
      :class="[
        direction === 'right'
          ? 'top-8 -right-2 transform rotate-45'
          : direction === 'left'
          ? 'top-8 -left-2 transform rotate-45'
          : 'left-8 -bottom-2 transform rotate-45',
      ]"
    />
    <div class="text-[#F3F3F3]">
      <h2 class="font-semibold text-2xl">
        {{ curentStep?.heading }}
      </h2>
      <div class="mt-3" v-html="curentStep?.detail" />
    </div>
    <div class="flex justify-between items-center">
      <div class="text-[#B0B4BA]">{{ step }}/5</div>
      <div class="flex gap-3 text-[#F3F3F3] font-semibold">
        <button
          v-if="step > 1"
          @click="emits('previous')"
          class="border-2 border-[#43484E] py-2 px-6 bg-[#212225] rounded-lg"
        >
          Back
        </button>
        <button
          @click="emits('next')"
          class="py-2 bg-[#8380FF] rounded-lg"
          :class="[step === 5 ? 'px-8' : 'px-3']"
        >
          {{ step === 5 ? "Finish" : "Continue" }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(["next", "previous"]);
const props = defineProps({
  direction: {
    type: String,
    default: "right",
  },
  step: {
    type: Number,
    default: 1,
  },
});

const stepsContent = [
  {
    heading: "Your Roadmap to Study Abroad 🎯",
    detail:
      "One clear path. Every essential step. Nothing extra.<br/>We've mapped out exactly what you need to do and when to do it. Each task is ranked by importance and carefully placed in your journey's timeline - so you'll always know your next move.",
  },
  {
    heading: "Side note 🗒️",
    detail:
      "Click the note icon to unlock pro tips and useful resources. Each task has its own mini-library - just one click away.",
  },
  {
    heading: "Side Bar Navigation 🧭",
    detail:
      "Add task to Roadmap feature; find your school and connect with a counselor in the sidebar.",
  },
  {
    heading: "AI Task bar",
    detail:
      "An AI bar where you can ask anything, from trivia to complex topics. It's a hub for curiosity and technology, sparking engaging conversations and new insights.",
  },
  {
    heading: "Your profile",
    detail: "All your personal information, data are stored in Your Profile",
  },
];

const curentStep = computed(() => {
  if (props.step === 1) {
    return stepsContent[0];
  } else if (props.step === 2) {
    return stepsContent[1];
  } else if (props.step === 3) {
    return stepsContent[2];
  } else if (props.step === 4) {
    return stepsContent[3];
  } else {
    return stepsContent[4];
  }
});
</script>
