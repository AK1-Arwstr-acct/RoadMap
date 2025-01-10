<template>
  <div class="h-screen w-full overflow-x-hidden no-scrollbar">
    <div class="size-full flex overflow-hidden min-h-fit">
      <!-- Left Side -->
      <div class="w-full lg:w-1/2 h-full min-h-fit bg-radial">
        <div
          class="w-full p-6 md:p-12 flex flex-col h-full min-h-fit"
          :class="[height > 700 ? 'gap-6' : 'gap-10']"
        >
          <div>
            <NuxtImg class="w-[164px]" src="/images/logo/logo.svg" alt="Logo" />
          </div>
          <div class="flex-1">
            <CreateAccount
              v-if="steps === 'create_account'"
              @updateStep="updateStep"
              @signupToken="setSignupToken"
            />
            <EmailVerification
              v-else
              @goBack="goBack"
              :email="user.email"
              :signupToken="signupToken"
            />
          </div>
        </div>
      </div>
      <!-- Right side  -->
      <div class="hidden lg:block lg:w-1/2">
        <RightSideInformation />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const steps = ref<"create_account" | "email_varification">("create_account");
const height = ref<number>(0);
const signupToken = ref<string>("");
const user = ref();

const goBack = () => {
  steps.value = "create_account";
};
const updateStep = (data) => {
  user.value = data;
  steps.value = "email_varification";
};
const setSignupToken = (token: string) => {
  signupToken.value = token;
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
