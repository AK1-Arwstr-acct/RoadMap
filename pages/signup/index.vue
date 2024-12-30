<template>
  <div
    class="relative h-screen flex justify-center py-8 px-5 lg:px-28 overflow-y-auto no-scrollbar"
    :class="{ 'items-center': windowHeight }"
  >
    <div class="fixed inset-0 -z-20">
      <NuxtImg
        src="/images/shared/background-image.png"
        class="size-full object-cover"
        alt="Background Image"
      />
    </div>
    <div
      class="bgGradient size-auto min-h-fit h-full max-h-[800px] w-[1200px] p-0.5 rounded-2xl flex"
    >
      <!-- Left Side -->
      <div
        class="w-full lg:w-1/2 h-full min-h-fit bg-[#1A1A1A] rounded-l-2xl rounded-r-2xl lg:rounded-r-none overflow-hidden"
      >
        <div
          class="w-full p-6 flex flex-col gap-6"
          :class="[steps === 'email_varification' ? 'h-full' : ' h-fit']"
        >
          <div>
            <NuxtImg
              class="w-[164px]"
              src="/images/logo/logo.svg"
              alt="Logo"
            />
          </div>
          <div class="flex-1">
            <CreateAccount
              v-if="steps === 'create_account'"
              @updateStep="updateStep"
            />
            <EmailVerification v-else @goBack="goBack" :email="user.email" />
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
const steps = ref<"create_account" | "email_varification">("create_account");

const height = ref<number>(0);
const user = ref();

const windowHeight = computed(() => {
  return height.value > 830;
});

const goBack = () => {
  steps.value = "create_account";
};
const updateStep = (data) => {
  user.value = data;
  steps.value = "email_varification";
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
.bgGradient {
  background: radial-gradient(
      68.44% 78.44% at 10% 141.23%,
      #ffffff 17.18%,
      rgba(57, 54, 178, 0) 100%
    ),
    radial-gradient(
      97.99% 85.4% at 10% -15.14%,
      rgba(255, 255, 255) 10.18%,
      rgba(26, 26, 26, 0.3) 76.45%
    );
}
</style>
