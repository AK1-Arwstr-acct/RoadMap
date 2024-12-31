<template>
  <div
    class="h-screen w-screen overflow-x-hidden no-scrollbar"
  >
    <div
      class="size-full flex overflow-hidden min-h-fit"
    >
      <!-- Left Side -->
      <div
        class="w-full lg:w-1/2 h-full min-h-fit bg-radial"
      >
        <div
          class="w-full p-6 md:p-12 flex flex-col h-full min-h-fit"
           :class="[height > 700 ? 'gap-4' : 'gap-10']" 
        >
          <div>
            <NuxtImg
              class="w-[164px]"
              src="/images/logo/logo.svg"
              alt="Logo"
            />
          </div>
          <div class="flex-1">
            <!-- steps -->
            <LogInByEmail
              v-if="steps === 'log_in'"
              @login="(value) => login(value)"
              @reset="(value) => reset(value)"
            />
            <RecoverPassword
              v-else-if="steps === 'recover_password'"
              :email="userData.email"
              @goBack="steps = 'log_in'"
              @recoverPassword = "steps = 'reset_password'"
            />
            <ResetPassword v-else @newPassword="steps = 'log_in'"  :email="userData.email" />
          </div>
        </div>
      </div>
      <!-- Right side  -->
      <div class="hidden lg:block lg:w-1/2 rounded-r-2xl overflow-hidden">
        <RightSideInformation />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface UserData {
  email: string;
  password: string;
}

const userData = ref<UserData>({
  email: "",
  password: "",
});
const steps = ref<"log_in" | "recover_password" | "reset_password">("log_in");
const height = ref<number>(0);

const windowHeight = computed(() => {
  return height.value > 830;
});

const login = (data: UserData) => {
  userData.value = data;
  navigateTo("ai-introduction");
};
const reset = (email: string) => {
  userData.value.email = email;
  steps.value = "recover_password";
};

const windowSize = () => {
  if (typeof window !== "undefined") {
    height.value = window.innerHeight;
  }
};

onMounted(() => {
  windowSize();
  window.addEventListener("resize", windowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", windowSize);
});
</script>

<style scoped>
.bg-radial {
  background: radial-gradient(
      122.03% 137.69% at 74.31% 20.12%,
      rgba(131, 128, 255, 0) 53.55%,
      #8380ff 100%
    ),
    var(--background-page-neutral, #111113);
}
</style>
