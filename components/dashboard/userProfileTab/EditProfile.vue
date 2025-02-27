<template>
  <div class="max-w-[640px] px-4 mx-auto mt-8 mb-[104px]">
    <div class="text-[#717680] font-medium flex items-center gap-1.5 mb-3">
      <p @click="emit('updateStep', 'profile')" class="cursor-pointer">
        Profile
      </p>
      <IconChevronDown
        class="transform -rotate-90"
        stroke="#717680"
        width="20"
        height="20"
      />
    </div>
    <h3 class="text-[#181D27] text-2xl font-semibold mb-8">Edit profile</h3>
    <div>
      <div>
        <h2 class="text-[#181D27] text-lg font-semibold">Personal Info</h2>
        <p class="text-[#535862] text-sm">
          Update your photo and personal details here.
        </p>
      </div>
      <div class="bg-white shadow-sm mt-6 space-y-6 p-6 rounded-t-xl border">
        <div class="sm:flex gap-6">
          <div class="sm:w-1/2 mb-6 sm:mb-0">
            <label class="block text-[#535862] font-semibold">Name</label>
            <input
              type="text"
              value="Abell Vo"
              class="w-full mt-1.5 px-3.5 py-2.5 border border-[#D5D7DA] text-[#181D27] rounded-lg outline-none"
            />
          </div>
          <div class="sm:w-1/2">
            <label class="block text-[#535862] font-semibold">Grade</label>
            <div class="relative">
              <select
                class="w-full mt-1.5 pl-3.5 py-2.5 text-[#181D27] border border-[#D5D7DA] rounded-lg outline-none appearance-none"
              >
                <option>11</option>
              </select>
              <div
                class="absolute inset-y-0 right-3.5 top-2.5 flex items-center"
              >
                <IconArrowDown />
              </div>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-[#535862] font-semibold">Phone number</label>
          <div class="flex mt-1.5 border border-[#D5D7DA] rounded-lg">
            <div class="relative w-fit">
              <select
                class="px-3.5 py-2.5 text-[#181D27] rounded-l-lg outline-none appearance-none"
              >
                <option>VN</option>
              </select>
              <div
                class="absolute inset-y-0 -right-2 flex items-center pointer-events-none"
              >
                <IconArrowDownThick />
              </div>
            </div>
            <input
              type="text"
              value="+84 915 343 643"
              class="w-full px-3.5 py-2.5 text-[#181D27] outline-none rounded-r-lg"
            />
          </div>
        </div>
        <div>
          <label class="block text-[#535862] font-semibold">Email</label>
          <div
            class="mt-1 px-3.5 py-2.5 flex items-center gap-2 border border-[#D5D7DA] rounded-lg"
          >
            <span><IconEmail /></span>
            <input
              type="email"
              value="abellvo@arrowster.com"
              class="w-full text-[#181D27] outline-none"
            />
          </div>
          <p class="text-sm text-[#535862] mt-1">
            Your email has not been confirmed.
            <a href="#" class="text-sm text-[#535862] border-b border-[#535862]"
              >Verify it now</a
            >
          </p>
        </div>
        <div>
          <label class="block text-[#535862] font-semibold"
            >Current password</label
          >
          <div class="relative">
            <input
              type="password"
              class="w-full mt-1.5 px-3.5 py-2.5 text-[#181D27] border border-[#D5D7DA] rounded-lg outline-none"
            />
            <span class="absolute right-3 top-6 cursor-pointer"
              ><IconOpenEye
            /></span>
          </div>
        </div>
        <div>
          <label class="text-[#535862] font-semibold">New password</label>
          <div class="relative">
            <input
              type="password"
              class="w-full mt-1.5 px-3.5 py-2.5 border border-[#D5D7DA] rounded-lg text-[#181D27] outline-none"
            />
            <span class="absolute right-3 top-6 cursor-pointer"
              ><IconOpenEye
            /></span>
          </div>
        </div>
      </div>
      <div
        class="flex justify-end gap-2 px-6 py-4 mb-[166px] shadow-sm bg-white rounded-b-xl border-b border-x"
      >
        <button
          class="px-4 py-2.5 text-[#414651] font-semibold border border-[#D5D7DA] rounded-lg"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2.5 text-white font-semibold bg-[#B2DDFF] border border-[#B2DDFF] rounded-lg"
        >
          Save changes
        </button>
      </div>
    </div>
    <div>
      <div>
        <h2 class="text-[#181D27] text-lg font-semibold">
          Academic details info
        </h2>
        <p class="text-[#535862] text-sm">
          Update your academic details & information here.
        </p>
      </div>
      <div class="bg-white shadow-sm mt-6 space-y-6 p-6 rounded-t-xl border">
        <div class="sm:flex gap-6">
          <div class="sm:w-1/2 mb-6 sm:mb-0">
            <label class="block text-[#535862] font-semibold">GPA</label>
            <input
              type="text"
              value="7.0"
              class="w-full mt-1.5 px-3.5 py-2.5 border border-[#D5D7DA] text-[#181D27] rounded-lg outline-none"
            />
          </div>
          <div class="sm:w-1/2">
            <label class="block text-[#535862] font-semibold"
              >Study program</label
            >
            <div class="relative">
              <select
                class="w-full mt-1.5 pl-3.5 py-2.5 text-[#181D27] border border-[#D5D7DA] rounded-lg outline-none appearance-none"
              >
                <option>Bachelor's</option>
              </select>
              <div
                class="absolute inset-y-0 right-3.5 top-2.5 flex items-center"
              >
                <IconArrowDown />
              </div>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-[#535862] font-semibold mb-3"
            >Study destination</label
          >
          <div class="space-y-3">
            <div class="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                class="w-5 h-5 rounded-md border border-[#D5D7DA] appearance-none checked:bg-[#1570EF] checked:border-[#1570EF] checked:bg-[url('https://api.iconify.design/mdi/check-bold.svg?color=white')] checked:bg-center"
              />
              <div class="flex items-center gap-1.5">
                <img
                  src="/images/countries/australia.png"
                  alt="Australia Flag"
                  class="w-5 h-5 rounded-full"
                />
                <span class="text-[#414651] font-medium">Australia</span>
              </div>
            </div>
            <div class="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked
                class="w-5 h-5 rounded-md border border-[#D5D7DA] appearance-none checked:bg-[#1570EF] checked:border-[#1570EF] checked:bg-[url('https://api.iconify.design/mdi/check-bold.svg?color=white')] checked:bg-center"
              />
              <div class="flex items-center gap-1.5">
                <img
                  src="/images/countries/canada.png"
                  alt="Australia Flag"
                  class="w-5 h-5 rounded-full"
                />
                <span class="text-[#414651] font-medium">Canada</span>
              </div>
            </div>
            <div class="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked
                class="w-5 h-5 rounded-md border border-[#D5D7DA] appearance-none checked:bg-[#1570EF] checked:border-[#1570EF] checked:bg-[url('https://api.iconify.design/mdi/check-bold.svg?color=white')] checked:bg-center"
              />
              <div class="flex items-center gap-1.5">
                <img
                  src="/images/countries/united-states.png"
                  alt="Australia Flag"
                  class="w-5 h-5 rounded-full"
                />
                <span class="text-[#414651] font-medium">United States</span>
              </div>
            </div>
            <div class="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                class="w-5 h-5 rounded-md border border-[#D5D7DA] appearance-none checked:bg-[#1570EF] checked:border-[#1570EF] checked:bg-[url('https://api.iconify.design/mdi/check-bold.svg?color=white')] checked:bg-center"
              />
              <div class="flex items-center gap-1.5">
                <img
                  src="/images/countries/uk.png"
                  alt="Australia Flag"
                  class="w-5 h-5 rounded-full"
                />
                <span class="text-[#414651] font-medium">United Kingdom</span>
              </div>
            </div>
            <div class="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                class="w-5 h-5 rounded-md border border-[#D5D7DA] appearance-none checked:bg-[#1570EF] checked:border-[#1570EF] checked:bg-[url('https://api.iconify.design/mdi/check-bold.svg?color=white')] checked:bg-center"
              />
              <div class="flex items-center gap-1.5">
                <span class="text-[#414651] font-medium">Europe</span>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:flex gap-6">
          <div class="sm:w-1/2 mb-6 sm:mb-0">
            <label class="block text-[#535862] font-semibold"
              >Annual total budget</label
            >
            <input
              type="text"
              value="$0 - $10,000"
              class="w-full mt-1.5 px-3.5 py-2.5 border border-[#D5D7DA] text-[#181D27] rounded-lg outline-none"
            />
          </div>
          <div class="sm:w-1/2">
            <label class="block text-[#535862] font-semibold"
              >Area of study</label
            >
            <div class="relative">
              <select
                class="w-full mt-1.5 pl-3.5 py-2.5 text-[#181D27] border border-[#D5D7DA] rounded-lg outline-none appearance-none"
              >
                <option>Arts and Design</option>
              </select>
              <div
                class="absolute inset-y-0 right-3.5 top-2.5 flex items-center"
              >
                <IconArrowDown />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex justify-end gap-2 px-6 py-4 mb-[166px] shadow-sm bg-white rounded-b-xl border-b border-x"
      >
        <button
          class="px-4 py-2.5 text-[#414651] font-semibold border border-[#D5D7DA] rounded-lg"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2.5 text-white font-semibold bg-[#B2DDFF] border border-[#B2DDFF] rounded-lg"
        >
          Save changes
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["updateStep"]);
</script>
