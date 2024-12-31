<template>
  <div class="flex items-center size-full">
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-5xl md:text-6xl font-semibold mb-3 text-[#9C99FF]">
          Sign up
        </h1>
        <p class="text-[#F3F3F3]">
          Kickstart your adventure to study abroad with AI!
        </p>
      </div>
      <!--  -->
      <div class="remove-shadow flex flex-wrap gap-6">
        <div class="w-[calc(50%-12px)]">
          <label class="uppercase font-medium text-[#E2E6FF]">Your name</label>
          <input
            name="userName"
            type="text"
            v-model="answers.userName"
            autofocus
            placeholder="Enter your name"
            class="mt-[7px] bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
          />
        </div>
        <BaseSelectRadio
          class="w-[calc(50%-12px)]"
          label="GRADE"
          :options="grade"
          v-model="answers.selectedGrade"
        />
        <div class="w-full">
          <label class="uppercase font-medium text-[#E2E6FF]">Your name</label>
          <input
            name="email"
            type="email"
            v-model="answers.email"
            autofocus
            placeholder="Enter your email"
            class="mt-[7px] bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
          />
        </div>
        <div class="w-full">
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
              <div
                @click="isPassword = !isPassword"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer py-1 pl-1"
              >
                <IconCloseEye />
              </div>
            </div>
            <p class="text-[#AEAEAE] text-sm mt-1">
              Recommend password be at least 8 charaters
            </p>
          </div>
        </div>
      </div>
      <!--  -->
      <div>
        <button
          @click="onSubmit"
          type="submit"
          :disabled="isDisable"
          class="cursor-pointer disabled:opacity-70 w-full text-xl bg-[#8380FF] text-[#F3F3F3] rounded-lg font-semibold py-3 transition-all ease-in-out duration-200"
        >
          Create Account
        </button>
        <button
          type="submit"
          class="cursor-pointer mt-4 disabled:opacity-70 w-full text-xl bg-white text-[#18191B] rounded-lg font-semibold py-3 flex gap-2 justify-center items-center transition-all ease-in-out duration-200"
        >
          <span>Sign up with Google Account</span>
          <img src="../../../public/images/googleIcon.png" alt="google" />
        </button>
      </div>
      <p class="text-white text-center">
        Already have account?
        <NuxtLink to="/login" class="text-[#8380FF] cursor-pointer"
          >Log in</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["updateStep"]);

const props = defineProps({
  phoneNumber: {
    type: String,
    default: "",
  },
});

const answers = ref({
  userName: "",
  selectedGrade: null,
  email: "",
  password: "",
});
const isPassword = ref<boolean>(true);

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
  return (
    !answers.value.userName ||
    !answers.value.selectedGrade ||
    !answers.value.password ||
    !answers.value.email
  );
});

const onSubmit = () => {
  emit("updateStep", answers.value);
};
</script>
