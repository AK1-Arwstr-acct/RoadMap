<template>
  <div
    class="bg-[#2E90FABF] rounded-[32px] lg:flex items-center gap-4 pt-6 px-7 pb-7"
  >
    <div class="flex justify-center items-center">
      <img
        src="/public/images/ApplicationTracker1.png"
        alt=""
        class="lg:w-full lg:h-full object-contain"
      />
    </div>
    <div class="w-full lg:h-full h-[150px] overflow-y-scroll no-scrollbar">
      <div class="flex justify-between">
        <h3 class="text-white text-3xl font-semibold">Grade 11s</h3>
        <span class="bg-gray-100 rounded-2xl px-3 py-1 text-gray-700"
          >0 / 7</span
        >
      </div>
      <div class="text-white mt-5 mb-6">
        <p>
          Lorem ipsum dolor sit amet consectetur. Parturient leo magna elementum
          at viverra vel.
        </p>
        <p>
          Libero eu neque egestas at morbi adipiscing tristique sit diam. Nunc
          pellentesque amet molestie integer turpis elit feugiat enim.
        </p>
      </div>
      <div class="flex justify-between items-center gap-3 mb-7">
        <div class="w-full bg-white rounded-[20px] h-4">
          <div class="bg-blue-500 h-full rounded-[20px] w-[15%]"></div>
        </div>
        <IconTrophy />
      </div>
      <button
        class="bg-white text-[#175CD3] border border-white rounded-xl px-5 py-3 w-full"
      >
        Start here
      </button>
    </div>
  </div>
</template>
