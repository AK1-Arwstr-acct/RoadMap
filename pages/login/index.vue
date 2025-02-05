<template>
  <div
    class="h-screen min-h-fit w-full flex justify-center items-center p-5 pt-24 pb-16"
  >
    <LoginScreen v-if="steps === 'login'" @forgetPassword="forgetPassword" />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});

const steps = ref<"login" | "forget_password">("login")

const forgetPassword = () => {
  // steps.value = "forget_password"
}
</script>
