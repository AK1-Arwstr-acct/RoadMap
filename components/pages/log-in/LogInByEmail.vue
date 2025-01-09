<template>
  <div class="size-full flex items-center">
    <div class="flex flex-col gap-6 w-full">
      <div>
        <h1
          class="text-6xl md:text-[72px] md:leading-[80px] text-[#9C99FF] font-semibold mb-3"
        >
          Log in
        </h1>
        <p class="text-[#F3F3F3]">
          Kickstart your adventure to study abroad with AI!
        </p>
      </div>
      <!-- input -->
      <div class="flex flex-col gap-6 remove-shadow">
        <div class="w-full">
          <label class="uppercase font-medium text-[#E2E6FF]">Your name</label>
          <input
            name="email"
            type="email"
            v-model="userData.email"
            autofocus
            placeholder="Enter your email"
            class="mt-[7px] bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
          />
        </div>
        <div>
          <label class="uppercase font-medium text-[#E2E6FF]">PASSWORD</label>
          <div class="relative">
            <input
              name="userName"
              :type="isPassword ? 'password' : 'text'"
              v-model="userData.password"
              placeholder="********"
              class="bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
            />
            <div
              @click="isPassword = !isPassword"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer py-1 pl-1"
            >
              <IconCloseEye />
            </div>
          </div>
        </div>
      </div>
      <!-- button -->
      <div>
        <button
          @click="onSubmit"
          type="submit"
          class="w-full disabled:bg-opacity-60 bg-[#8380FF] text-white rounded-lg font-medium p-3 flex text-xl gap-2 justify-center items-center"
        >
          Log in
          <BaseSpinner v-if="isSubmitting" color="#FFFFFF" />
        </button>
        <button
          type="submit"
          class="cursor-pointer mt-6 disabled:opacity-70 w-full text-xl bg-white text-[#18191B] rounded-lg font-semibold py-3 flex gap-2 justify-center items-center transition-all ease-in-out duration-200"
        >
          <span>Sign up with Google Account</span>
          <img src="../../../public/images/googleIcon.png" alt="google" />
        </button>
        <p class="text-[#B0B4BA] mt-3">
          Forgot your password?
          <button
            @click="reset"
            class="text-[#8380FF] cursor-pointer underline disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(["login", "reset"]);

const { api } = useApi();
const { showToast } = useToast();

const isPassword = ref<boolean>(true);
const isSubmitting = ref<boolean>(false);
const userData = ref({
  email: "",
  password: "",
});

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    const response = await api.post("/v1/login", {
      email: userData.value.email,
      password: userData.value.password,
    });
    if (response) {
      const token = useCookie("token", {
        maxAge: 3600,
      });
      token.value = JSON.stringify(response.data.token);
    }
    emits("login", userData.value);
  } catch (error) {
    showToast(error.message, {
      type: "warning",
    });
  } finally {
    isSubmitting.value = false;
  }
};

const reset = () => {
  emits("reset", userData.value.email);
};
</script>
