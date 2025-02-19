<template>
    <div
      class="bg-[#2E90FABF]/75 rounded-[32px] grid grid-cols-1 lg:grid-cols-2 items-center gap-4 pt-6 px-7 pb-7 max-w-[800px]"
    >
      <div class="flex justify-center items-center">
        <img
          src="../../../public/images/application-tracker.png"
          alt=""
          class="w-full h-full max-h-[274px] object-contain"
        />
      </div>
      <div class="">
        <div class="flex justify-between items-center">
          <h3 class="text-white text-3xl font-semibold capitalize">{{ application.title }}</h3>
          <span class="bg-[#F5F5F5] rounded-2xl px-3 py-1 text-gray-700"
            >0 / {{ application.tasks.length }}</span
          >
        </div>
        <div class="text-white mt-5 mb-6">
          <p class="truncate-paragraph" >{{ application.description }}</p>
        </div>
        <div class="flex justify-between items-center gap-3 mb-7">
          <div class="w-full bg-white rounded-full h-4">
            <div class="bg-[#1570EFD9]/85 h-full rounded-full w-[15%]"></div>
          </div>
          <IconTrophy />
        </div>
        <button
          class="bg-white text-[#1570EF] font-semibold border border-white rounded-xl px-5 py-3 w-full"
        >
          Start here
        </button>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  defineProps({
    application: {
      type: Object,
      default: () => {},
    },
  });
  </script>
  <style scoped>
  .truncate-paragraph {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>