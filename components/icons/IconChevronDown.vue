<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="stroke"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script setup>
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
    default: "text-icon-neutral-subtle",
  },
  strokeWidth: {
    type: String,
    default: "1.5",
  },
});
</script>
