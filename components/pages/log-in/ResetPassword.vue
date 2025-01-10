<template>
  <div class="flex items-center size-full">
    <div class="w-full flex flex-col gap-6">
      <div>
        <h1 class="text-5xl lg:text-6xl font-semibold mb-3 text-[#F3F3F3]">
          Reset <span class="block text-[#9C99FF]">password</span>
        </h1>
        <!-- <p class="text-[#B0B4BA] mt-4">
          For email {{ email }}
        </p> -->
      </div>
      <div class="remove-shadow flex flex-col gap-6">
        <div>
          <label class="uppercase font-medium text-[#E2E6FF]"
            >NEW PASSWORD <span class="text-[#FF4759]">*</span></label
          >
          <div class="relative">
            <input
              name="userName"
              :type="isPassword ? 'password' : 'text'"
              v-model="newPassword"
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
            Password should be at least 8 charaters
          </p>
        </div>
        <div>
          <label class="uppercase font-medium text-[#E2E6FF]"
            >CONFIRM PASSWORD <span class="text-[#FF4759]">*</span></label
          >
          <div class="relative">
            <input
              name="userName"
              :type="isConfirmPassword ? 'password' : 'text'"
              v-model="confirmPassword"
              placeholder="********"
              class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
            />
            <div
              @click="isConfirmPassword = !isConfirmPassword"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer py-1 pl-1"
            >
              <IconCloseEye />
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          @click="onSubmit"
          type="submit"
          :disabled="
            newPassword == '' || confirmPassword == '' || passwordMatch
          "
          class="cursor-pointer disabled:opacity-70 w-full text-xl bg-[#8380FF] text-[#F3F3F3] rounded-lg font-semibold py-3 flex gap-2 justify-center items-center transition-all ease-in-out duration-200"
        >
          Reset password
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["newPassword"]);

const { api } = useApi();

const props = defineProps({
  token: {
    type: String,
  },
});

const newPassword = ref<string>("");
const confirmPassword = ref<string>("");
const isPassword = ref<boolean>(true);
const isConfirmPassword = ref<boolean>(true);

const passwordMatch = computed(() => {
  return newPassword.value !== confirmPassword.value;
});

const onSubmit = async () => {
  try {
    await api.post(
      "/v1/update-password",
      {
        password: newPassword.value,
      },
      {
        headers: {
          sessionid: `${props.token}`,
        },
      }
    );
    navigateTo("/login");
  } catch (error) {
    console.error(error);
  }
};
</script>
