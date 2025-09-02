<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="w-full h-fit py-6 md:py-8 px-4 md:px-12 flex flex-col gap-4">
      <Toolbar />
      <StudentsTable />
    </div>
  </div>
</template>
<script setup lang="ts">
// import useCounselorStore from '~/stores/counselorStore';
definePageMeta({
  layout: "counselor-layout",
});

// const counselorStore = useCounselorStore();

onMounted(()=>{
  // counselorStore.getUserData();
})
</script>