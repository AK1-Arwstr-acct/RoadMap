<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.33333 9.16699V5.83366C6.33333 4.72859 6.77232 3.66878 7.55372 2.88738C8.33512 2.10598 9.39493 1.66699 10.5 1.66699C11.6051 1.66699 12.6649 2.10598 13.4463 2.88738C14.2277 3.66878 14.6667 4.72859 14.6667 5.83366V9.16699M4.66667 9.16699H16.3333C17.2538 9.16699 18 9.91318 18 10.8337V16.667C18 17.5875 17.2538 18.3337 16.3333 18.3337H4.66667C3.74619 18.3337 3 17.5875 3 16.667V10.8337C3 9.91318 3.74619 9.16699 4.66667 9.16699Z"
      stroke="white"
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
    default: "21",
  },
  height: {
    type: String,
    default: "20",
  },
  strokeWidth: {
    type: String,
    default: "2",
  },
});
</script>
