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
        class="flex mt-1.5 border-[1.5px] border-gray-200 rounded-lg overflow-hidden"
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
      <p class="text-[#414651] text-sm font-medium">Your school name *</p>
      <input
        type="text"
        placeholder="e.g. THPT Nhân Chính"
        v-model="formDetails.schoolName"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
      />
    </div>
    <!-- financial support -->
    <div>
      <p class="text-[#414651] text-sm font-medium">
        How much financial support can your family provide per year? *
      </p>
      <input
        type="text"
        placeholder="e.g. 500,000,000VND"
        v-model="formDetails.financialSupport"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
      />
      <p class="text-sm text-[#535862] mt-1.5">
        This information will help advisors guide you toward the most suitable
        country, school, and scholarships in the most accurate and effective
        way.
      </p>
    </div>

    <!-- countries -->
    <div>
      <p class="font-medium text-[#414651] text-sm mb-4">I want to study at *</p>
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
              :checked="
                formDetails.selectedLocationOptions.includes(option.title)
              "
              class="hidden peer"
              @change="toggleDestinationsSelection(option.title)"
            />
            <div
              class="size-5 min-w-5 flex justify-center items-center border-2 rounded-md transition-all"
              :class="[
                formDetails.selectedLocationOptions.includes(option.title)
                  ? 'border-[#1570EF] bg-[#1570EF]'
                  : 'border-gray-200',
              ]"
            >
              <IconTick
                v-if="
                  formDetails.selectedLocationOptions.includes(option.title)
                "
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
        Share some of your dream schools here *
      </p>
      <input
        type="text"
        placeholder="e.g. University of Sydney, University of Melbourne"
        v-model="formDetails.dreamSchool"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
      />
    </div>
    <!-- alternative contact -->
    <div>
      <p class="font-medium text-[#414651] text-sm mb-4">
        Alternative contact platform (if you don’t use Zalo) *
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
              :value="option.id"
              :checked="
                formDetails.selectedAlternativeContact.includes(option.id)
              "
              class="hidden peer"
              @change="toggleAlternativeContact(option.id)"
            />
            <div
              class="size-5 min-w-5 flex justify-center items-center border-2 rounded-md transition-all"
              :class="[
                formDetails.selectedAlternativeContact.includes(option.id)
                  ? 'border-[#1570EF] bg-[#1570EF]'
                  : 'border-gray-200',
              ]"
            >
              <IconTick
                v-if="
                  formDetails.selectedAlternativeContact.includes(option.id)
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
        contact information below! *
      </p>
      <input
        type="text"
        placeholder="Account information (Phone number/Username)"
        v-model="formDetails.otherPhoneOrEmail"
        class="w-full px-4 py-3 text-[#181D27] outline-none mt-1.5 border-[1.5px] border-gray-200 rounded-lg"
      />
    </div>
    <!-- arrowster Info -->
    <div class="">
      <p class="font-medium text-[#414651] text-sm mb-4">
        How did you hear about Arrowster? *
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
                  : 'border-gray-200',
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
      :disabled="isDisable"
      @click="submit"
      class="bg-[#1570EF] rounded-lg py-3 px-5 flex items-center justify-center gap-2 text-white disabled:opacity-70"
    >
      Send to us
      <IconArrowRight v-if="!isSubmitting" fill="#ffffff" />
      <IconSpinner v-else stroke="#ffffff" bgColor="transparent" width="20" />
    </button>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";

const props = defineProps({
  selectedPlan: {
    type: Number,
    default: 2
  }
})

const emits = defineEmits(["updateJourney"]);

const { api } = useApi();
const { showToast } = useToast();

const isSubmitting = ref<boolean>(false);

interface FormDetails {
  phoneNumber: string;
  schoolName: string;
  financialSupport: string;
  otherPhoneOrEmail: string;
  dreamSchool: string;
  selectedLocationOptions: string[];
  selectedAlternativeContact: string[];
  selectedArrowsterInfo: string[];
}

const formDetails = ref<FormDetails>({
  phoneNumber: "+84",
  schoolName: "",
  financialSupport: "",
  dreamSchool: "",
  otherPhoneOrEmail: "",
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
  { id: "telegram", title: "Telegram" },
  { id: "instagram", title: "Instagram" },
  { id: "whatsapp", title: "WhatsApp" },
  { id: "messenger", title: "Messenger" },
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
const toggleAlternativeContact = (id: string) => {
  if (formDetails.value.selectedAlternativeContact.includes(id)) {
    let updateIds = formDetails.value.selectedAlternativeContact.filter(
      (item) => item !== id
    );
    formDetails.value.selectedAlternativeContact = updateIds;
  } else {
    formDetails.value.selectedAlternativeContact.push(id);
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

const isDisable = computed(() => {
  return (
    !formDetails.value.schoolName ||
    !formDetails.value.financialSupport ||
    !formDetails.value.dreamSchool ||
    !formDetails.value.otherPhoneOrEmail ||
    formDetails.value.selectedLocationOptions.length === 0 ||
    formDetails.value.selectedAlternativeContact.length === 0 ||
    formDetails.value.selectedArrowsterInfo.length === 0
  );
});

const submit = async () => {
  try {
    isSubmitting.value = true;
    await api.post("/api/v1/plans/bundle", {
      plan_id: props.selectedPlan,
      parent_phone: formDetails.value.phoneNumber.length > 6 ? formDetails.value.phoneNumber : null ,
      current_school_name: formDetails.value.schoolName,
      financial_support_amount: formDetails.value.financialSupport,
      financial_support_amount_unit: "vnd",
      want_to_study_at: formDetails.value.selectedLocationOptions,
      dream_schools: formDetails.value.dreamSchool,
      contact_platform: formDetails.value.selectedAlternativeContact,
      contact_info: formDetails.value.otherPhoneOrEmail,
      lead_incoming_platform: formDetails.value.selectedArrowsterInfo,
    });
    emits("updateJourney");
    formDetails.value = {
      phoneNumber: "+84",
      schoolName: "",
      financialSupport: "",
      dreamSchool: "",
      otherPhoneOrEmail: "",
      selectedLocationOptions: [],
      selectedAlternativeContact: [],
      selectedArrowsterInfo: [],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>
