<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="transform rotate-180"
  >
    <path
      d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: "24",
  },
  height: {
    type: String,
    default: "24",
  },
  stroke: {
    type: String,
    default: "#98A2B3",
  },
  strokeWidth: {
    type: String,
    default: "2.5",
  },
});
</script>
