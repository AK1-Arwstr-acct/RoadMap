<template>
  <StudentOnboarding v-if="isInvitedByCounsellor" />
  <Onboarding v-else />
</template>
<script setup lang="ts">
const isInvitedByCounsellor = useCookie("isInvitedByCounsellor");
</script>