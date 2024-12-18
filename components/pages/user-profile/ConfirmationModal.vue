<template>
  <div class="fixed inset-0 bg-black/10 flex justify-center items-center">
    <div class="w-[466px] p-6 bg-[#292929] rounded-xl flex flex-col gap-6 shadow-2xl">
      <div>
        <h3>Discard unsaved changes?</h3>
        <p class="mt-3">Your unsaved changes will be discarded.</p>
      </div>
      <div class="flex gap-3 justify-end">
        <button
          @click="emit('cancel')"
          class="cursor-pointer px-3 py-2 border border-[#686868] bg-[#383838] rounded-lg"
        >
          Cancel
        </button>
        <button
          @click="emit('discard')"
          class="cursor-pointer px-3 py-2 border border-[#8380FF] bg-[#8380FF] rounded-lg"
        >
          Discard
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["cancel", "discard"]);
</script>
