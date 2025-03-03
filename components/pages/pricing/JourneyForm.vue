<template>
  <div
    class="size-full rounded-2xl bg-white text-[#414651] overflow-hidden p-6 flex flex-col gap-6"
  >
    <!-- phoneNumber -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        Parent's phone number (Optional)
      </p>
      <div
        class="flex mt-1.5 border border-[#D5D7DA] rounded-lg overflow-hidden"
      >
        <div class="w-full flex">
          <p
            class="flex justify-center items-center px-4 rounded-lg gap-1 text-[#181D27]"
          >
            VN
            <IconArrowDownThick />
          </p>
          <input
            type="text"
            placeholder="915 343 643"
            v-model="formDetails.phoneNumber"
            class="w-full py-3 text-[#181D27] outline-none"
          />
        </div>
      </div>
    </div>
    <!-- school name -->
    <div>
      <p class="text-[#414651] text-sm font-medium">Your school name</p>
      <input
        type="text"
        placeholder="e.g. THPT Nhân Chính"
        v-model="formDetails.schoolName"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border border-[#D5D7DA] rounded-lg"
      />
    </div>
    <!-- financial support -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        How much financial support can your family provide per year?
      </p>
      <input
        type="text"
        placeholder="e.g. 500,000,000VND"
        v-model="formDetails.financialSupport"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border border-[#D5D7DA] rounded-lg"
      />
      <p class="text-sm text-[#535862] mt-1.5">
        This information will help advisors guide you toward the most suitable
        country, school, and scholarships in the most accurate and effective
        way.
      </p>
    </div>

    <!-- countries -->
    <div>
      <p class="font-medium text-[#414651] text-sm mb-4">I want to study at</p>
      <div class="flex gap-4 flex-wrap">
        <div
          v-for="(option, index) in studyDestinations"
          :key="index"
          class="w-[calc(42%-8px)]"
        >
          <label
            :for="`destination${index}`"
            class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200 text-nowrap"
          >
            <input
              :id="`destination${index}`"
              type="checkbox"
              name="countries"
              :value="option.title"
              :checked="formDetails.selectedLocationOptions.includes(option.title)"
              class="hidden peer"
              @change="toggleDestinationsSelection(option.title)"
            />
            <div
              class="size-5 min-w-5 flex justify-center items-center border-2 rounded-md transition-all"
              :class="[
                formDetails.selectedLocationOptions.includes(option.title)
                  ? 'border-[#1570EF] bg-[#1570EF]'
                  : 'border-[#D5D7DA]',
              ]"
            >
              <IconTick
                v-if="formDetails.selectedLocationOptions.includes(option.title)"
                stroke="#ffffff"
              />
            </div>
            {{ option.title }}
          </label>
        </div>
      </div>
    </div>
    <!-- draem school -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        Share some of your dream schools here
      </p>
      <input
        type="text"
        placeholder="e.g. University of Sydney, University of Melbourne"
        v-model="formDetails.schoolName"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border border-[#D5D7DA] rounded-lg"
      />
    </div>
    <!-- alternative contact -->
    <div>
      <p class="font-medium text-[#414651] text-sm mb-4">
        Alternative contact platform (if you don’t use Zalo)
      </p>
      <div class="flex gap-4 flex-wrap">
        <div
          v-for="(option, index) in alternativeContact"
          :key="index"
          class="w-[calc(42%-8px)]"
        >
          <label
            :for="`contact${index}`"
            class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200 text-nowrap"
          >
            <input
              :id="`contact${index}`"
              type="checkbox"
              name="alternateContact"
              :value="option.title"
              :checked="
                formDetails.selectedAlternativeContact.includes(option.title)
              "
              class="hidden peer"
              @change="toggleAlternativeContact(option.title)"
            />
            <div
              class="size-5 min-w-5 flex justify-center items-center border-2 rounded-md transition-all"
              :class="[
                formDetails.selectedAlternativeContact.includes(option.title)
                  ? 'border-[#1570EF] bg-[#1570EF]'
                  : 'border-[#D5D7DA]',
              ]"
            >
              <IconTick
                v-if="
                  formDetails.selectedAlternativeContact.includes(option.title)
                "
                stroke="#ffffff"
              />
            </div>
            {{ option.title }}
          </label>
        </div>
      </div>
    </div>
    <!-- other phoneNumber -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        If you don't have a Vietnamese phone number, please leave your easiest
        contact information below!
      </p>
      <input
        type="text"
        placeholder="Account information (Phone number/Username)"
        v-model="formDetails.schoolName"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border border-[#D5D7DA] rounded-lg"
      />
    </div>
    <!-- arrowster Info -->
    <div class="">
      <p class="font-medium text-[#414651] text-sm mb-4">
        How did you hear about Arrowster?
      </p>
      <div class="flex gap-4 flex-wrap">
        <div
          v-for="(option, index) in arrowsterInfo"
          :key="index"
          class="w-[calc(50%-8px)]"
        >
          <label
            :for="`arrowsterInfo${index}`"
            class="flex items-center gap-3 size-full font-medium rounded-xl cursor-pointer relative transition-all ease-in-out duration-200 text-nowrap"
          >
            <input
              :id="`arrowsterInfo${index}`"
              type="checkbox"
              name="countries"
              :value="option.title"
              :checked="
                formDetails.selectedArrowsterInfo.includes(option.title)
              "
              class="hidden peer"
              @change="toggleArrowsterInfo(option.title)"
            />
            <div
              class="size-5 min-w-5 flex justify-center items-center border-2 rounded-md transition-all"
              :class="[
                formDetails.selectedArrowsterInfo.includes(option.title)
                  ? 'border-[#1570EF] bg-[#1570EF]'
                  : 'border-[#D5D7DA]',
              ]"
            >
              <IconTick
                v-if="formDetails.selectedArrowsterInfo.includes(option.title)"
                stroke="#ffffff"
              />
            </div>
            {{ option.title }}
          </label>
        </div>
      </div>
    </div>

    <!-- button -->
    <button
      @click="submit"
      class="bg-[#1570EF] rounded-lg py-3 px-5 flex items-center justify-center gap-2 text-white"
    >
      Send to us
      <IconArrowRight fill="#ffffff" />
    </button>
  </div>
</template>
<script setup lang="ts">
interface FormDetails {
  phoneNumber: string;
  schoolName: string;
  financialSupport: string;
  selectedLocationOptions: string[];
  selectedAlternativeContact: string[];
  selectedArrowsterInfo: string[];
}

const formDetails = ref<FormDetails>({
  phoneNumber: "+84",
  schoolName: "",
  financialSupport: "",
  selectedLocationOptions: [],
  selectedAlternativeContact: [],
  selectedArrowsterInfo: [],
});

const studyDestinations = [
  { id: 1, title: "United Kingdom" },
  { id: 2, title: "Canada" },
  { id: 3, title: "Australia" },
  { id: 4, title: "United States" },
  { id: 5, title: "Europe" },
  { id: 6, title: "Vietnam International University" },
  { id: 7, title: "New Zealand" },
];

const alternativeContact = [
  { id: 1, title: "Telegram" },
  { id: 2, title: "Instagram" },
  { id: 3, title: "WhatsApp" },
  { id: 4, title: "Messenger" },
];

const arrowsterInfo = [
  { id: 1, title: "Arrowster’s Fanpage" },
  { id: 2, title: "Shared by friends" },
  { id: 3, title: "Group Trạm xá Du học" },
  { id: 4, title: "Other" },
  { id: 5, title: "Personal Threads posts" },
];

const toggleDestinationsSelection = (title: string) => {
  if (formDetails.value.selectedLocationOptions.includes(title)) {
    let updateIds = formDetails.value.selectedLocationOptions.filter(
      (item) => item !== title
    );
    formDetails.value.selectedLocationOptions = updateIds;
  } else {
    formDetails.value.selectedLocationOptions.push(title);
  }
};
const toggleAlternativeContact = (title: string) => {
  if (formDetails.value.selectedAlternativeContact.includes(title)) {
    let updateIds = formDetails.value.selectedAlternativeContact.filter(
      (item) => item !== title
    );
    formDetails.value.selectedAlternativeContact = updateIds;
  } else {
    formDetails.value.selectedAlternativeContact.push(title);
  }
};
const toggleArrowsterInfo = (title: string) => {
  if (formDetails.value.selectedArrowsterInfo.includes(title)) {
    let updateIds = formDetails.value.selectedArrowsterInfo.filter(
      (item) => item !== title
    );
    formDetails.value.selectedArrowsterInfo = updateIds;
  } else {
    formDetails.value.selectedArrowsterInfo.push(title);
  }
};

const submit = async () => {
  console.log(formDetails.value);
};
</script>
