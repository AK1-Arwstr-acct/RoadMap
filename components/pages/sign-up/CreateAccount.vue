<template>
  <div class="flex flex-col gap-6 mt-10">
    <div>
      <h1
        class="text-5xl md:text-6xl font-semibold mb-3 text-white"
      >
        Create <br /> account
      </h1>
    </div>
    <!--  -->
    <div class="remove-shadow flex flex-col gap-6">
      <div>
        <label class="uppercase font-medium text-[#E2E6FF]">Your name</label>
        <input
          name="userName"
          type="text"
          v-model="answers.userName"
          autofocus
          placeholder="Enter your name"
          class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
        />
      </div>
      <BaseSelectRadio
        label="GRADE"
        :options="grade"
        v-model="answers.selectedGrade"
      />
      <div>
        <label class="uppercase font-medium text-[#E2E6FF]"
          >CREATE PASSWORD</label
        >
        <div>
          <div class="relative">
            <input
              name="password"
              :type="isPassword ? 'password' : 'text'"
              v-model="answers.password"
              placeholder="********"
              class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
            />
            <div @click="isPassword = !isPassword" class="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer py-1 pl-1">
              <IconCloseEye />
            </div>
          </div>
          <p class="text-[#AEAEAE] text-sm mt-1">
            Recommend password be at least 8 charaters
          </p>
        </div>
      </div>
      <div>
        <label class="uppercase font-medium text-[#E2E6FF]"
          >CONFIRM PASSWORD</label
        >
        <div class="relative">
          <input
            name="confirmPassword"
            :type="isConfirmPassword ? 'password' : 'text'"
            v-model="confirmPassword"
            :oninput="checkPassword"
            placeholder="********"
            class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
          />
          <div @click="isConfirmPassword = !isConfirmPassword" class="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer py-1 pl-1">
            <IconCloseEye />
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div>
      <button
        @click="onSubmit"
        type="submit"
        :disabled="isDisable"
        class="cursor-pointer disabled:opacity-70 w-full text-xl bg-[#8380FF] text-[#F3F3F3] rounded-lg font-semibold py-3 flex gap-2 justify-center items-center transition-all ease-in-out duration-200"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  phoneNumber: {
    type: String,
    default: "",
  },
})

const answers = ref({
  userName: "",
  selectedGrade: null,
  password: "",
});
const confirmPassword = ref<string>("");
const isPassword = ref<boolean>(true);
const isConfirmPassword = ref<boolean>(true);
const isPasswordMatch = ref<boolean>(false);

const grade = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "11",
    label: "11",
  },
  {
    value: "12",
    label: "12",
  },
];

const isDisable = computed(() => {
  return !answers.value.userName || !answers.value.selectedGrade || !isPasswordMatch.value;
});

const checkPassword = () => {
  if (answers.value.password !== confirmPassword.value) {
    isPasswordMatch.value = false;
  } else {
    isPasswordMatch.value = true;
  }
};

const onSubmit = () => {
    navigateTo('/ai-introduction')
}
</script>
