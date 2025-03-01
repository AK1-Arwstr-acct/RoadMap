<template>
  <div class="flex flex-col gap-16">

    <!-- Faqs -->
    <div>
      <p class="text-xl font-semibold text-[#181D27] mb-6">
        Frequently asked questions
      </p>
      <div class="border border-[#E9EAEB] rounded-2xl px-6 py-8 ">
        <div v-for="(a, idx) in 5" class="flex flex-col">
            <div class="flex items-start gap-4">
              <IconTabSophie class="text-[#ED77FF] size-8" />
              <div>
                <p class="text-lg text-[#181D27] font-semibold">
                  Sed turpis egestas lacus cursus cras.
                </p>
                <p class="text-[#535862]">
                  Venenatis laoreet arcu amet ac ullamcorper. Integer velit faucibus
                  tellus vel nunc lectus amet.
                </p>
              </div>
            </div>
            <div v-if="idx+1 !== 5" class="h-px bg-[#E9EAEB] w-[90%] my-8 self-end" />
        </div>
      </div>
    </div>

    <!-- social -->
    <div>
      <p class="text-xl font-semibold text-[#181D27] mb-5">
        Join Community
      </p>
      <div class="flex gap-6">
        <button class="flex items-center w-full gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border border-[#E9EAEB] rounded-[14px]">
            <IconFacebook />
            Facebook Community
        </button>
        <button class="flex items-center w-full gap-4 text-[#414651] font-semibold text-lg py-[18px] px-5 border border-[#E9EAEB] rounded-[14px]">
            <IconThreads />
            Threads Community
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const questions = [
  {
    question: "Sed turpis egestas lacus cursus cras.",
    answer:
      "Venenatis laoreet arcu amet ac ullamcorper. Integer velit faucibus tellus vel nunc lectus amet.",
  },
];
</script>
