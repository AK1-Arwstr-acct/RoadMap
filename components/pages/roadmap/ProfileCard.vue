<template>
  <div class="bg-[#383838] rounded-xl overflow-hidden">
    <div class="p-2 bg-[#4D4D4D]">
      <h2 class="text-xl font-semibold">Profile</h2>
    </div>
    <div class="p-3">
      <h2 class="mb-2 font-semibold">Scores</h2>
      <ul class="flex flex-col gap-2 text-[#AEAEAE]">
        <li class="flex justify-between items-center">
          <p>Current GPA</p>
          <p class="text-white">{{ userData?.gpa || '---' }}</p>
        </li>
        <li class="flex justify-between items-center">
          <p>IELTS</p>
          <p class="text-white">{{ userData?.ielts || '---' }}</p>
        </li>
        <li class="flex justify-between items-center">
          <p>SAT Score</p>
          <p>---</p>
        </li>
        <li class="flex justify-between items-center">
          <p>AP Score</p>
          <p>---</p>
        </li>
      </ul>
    </div>
    <div class="p-3 border-y border-[#686868]">
      <h2 class="mb-2 font-semibold">Personal Information</h2>
      <div class="flex justify-between items-center">
        <p>Budget</p>
        <p>{{ userData?.budget?.label || '---' }}</p>
      </div>
    </div>
    <div class="p-3">
        <h2 class="mb-2 font-semibold">Countries</h2>
      <div class="flex gap-2">
        <p v-for="country in userData?.countries" class="text-xs py-1 px-2 bg-[#4D4D4D] rounded-full">{{ country }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormData } from '~/types/home';

const userData = ref<FormData | null>(null)

onMounted(()=>{
    const data = sessionStorage.getItem('formData') || null
    if(data){
        userData.value = JSON.parse(data);
    }
})
</script>
