<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 100 104"
    fill="none"
  >
    <g filter="url(#filter0_d_12452_5358)">
      <path
        d="M50.224 36.192L31.334 76.4481H20L50.224 13L80.4733 76.4359H69.1392L50.224 36.192Z"
        fill="#F1F5F9"
      />
      <path
        d="M55.2267 76.4115H45.2213V63.5007L50.224 53.0123L55.2267 63.5007V76.4115Z"
        fill="#F1F5F9"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_12452_5358"
        x="0.468218"
        y="0.792637"
        width="99.5372"
        height="102.512"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="7.32442" />
        <feGaussianBlur stdDeviation="9.76589" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.611765 0 0 0 0 0.635294 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_12452_5358"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_12452_5358"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>
<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: "188",
  },
  height: {
    type: String,
    default: "193",
  },
});
</script>
