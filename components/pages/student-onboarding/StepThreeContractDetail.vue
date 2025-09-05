<template>
  <div class="flex flex-col gap-5 remove-shadow-bg-white">
    <!-- Name on the contract -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Name on the contract<span class="text-text-error font-medium">
          *</span
        ></label
      >
      <input
        name="Name"
        type="text"
        v-model="counselorStudentStore.onBoardingData.name_on_contract"
        placeholder="Enter name on the contract"
        class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
        data-hj-allow
      />
      <p class="flex items-center gap-2 text-text-neutral-subtle text-xs mt-1">
        <IconInfoFilled class="text-icon-neutral-subtle" />
        Include the family member - country - visa type
      </p>
    </div>
    <!-- legal address -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Legal address<span class="text-text-error font-medium"> *</span></label
      >
      <div class="">
        <textarea
          name="address"
          type="text"
          v-model="counselorStudentStore.onBoardingData.contract_legal_address"
          @input=""
          placeholder="Legal address"
          class="mt-1.5 bg-background-base-subtle resize-none rounded-lg border border-border-neutral-subtle py-3 px-4 w-full outline-none appearance-none text-text-base custom-scrollbar"
          data-hj-allow
        />
      </div>
    </div>
    <!-- Email -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Email<span class="text-text-error font-medium"> *</span></label
      >
      <input
        name="email"
        type="email"
        v-model="counselorStudentStore.onBoardingData.contract_email"
        placeholder="nguyen@example.com"
        class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
        data-hj-allow
      />
    </div>
    <!-- phone number -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Phone number<span class="text-text-error font-medium"> *</span></label
      >
      <input
        name="phone-number"
        type="text"
        v-model="counselorStudentStore.onBoardingData.contract_phoneNumber"
        placeholder="Enter phone number"
        class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
        data-hj-allow
      />
    </div>
    <!-- Contract Holder’s -->
    <div class="flex flex-col gap-3">
      <p class="text-xs font-semibold text-text-brand uppercase">
        Contract Holder’s National ID
      </p>
      <div class="flex flex-col sm:flex-row gap-2">
        <!-- id number -->
        <div class="">
          <label class="font-medium text-text-neutral-subtle text-sm"
            >ID Number<span class="text-text-error font-medium"> *</span></label
          >
          <input
            name="phone-number"
            type="number"
            inputmode="numeric"
            v-model="counselorStudentStore.onBoardingData.contract_holder.id"
            placeholder="e.g. 062199002343"
            class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
            data-hj-allow
          />
        </div>
        <!-- date -->
        <div class="">
          <label class="font-medium text-text-neutral-subtle text-sm"
            >Date of issue<span class="text-text-error font-medium">
              *</span
            ></label
          >
          <input
            @click="openPicker"
            ref="dateRef"
            name="phone-number"
            type="date"
            v-model="
              counselorStudentStore.onBoardingData.contract_holder.issue_date
            "
            class="cursor-pointer mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-[9px] px-[14px] w-full outline-none appearance-none text-text-disabled uppercase"
            data-hj-allow
          />
        </div>
      </div>
      <div class="">
        <label class="font-medium text-text-neutral-subtle text-sm"
          >Place of issue<span class="text-text-error font-medium">
            *</span
          ></label
        >
        <input
          name="place"
          type="text"
          v-model="
            counselorStudentStore.onBoardingData.contract_holder.place_of_issue
          "
          placeholder="Enter Place of issue"
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
    <!-- student's National ID -->
    <div class="flex flex-col gap-3">
      <p class="text-xs font-semibold text-text-brand uppercase">
        student's National ID
      </p>
      <div class="flex flex-col sm:flex-row gap-2">
        <!-- id number -->
        <div class="">
          <label class="font-medium text-text-neutral-subtle text-sm"
            >ID Number<span class="text-text-error font-medium"> *</span></label
          >
          <input
            name="phone-number"
            type="number"
            inputmode="numeric"
            v-model="
              counselorStudentStore.onBoardingData.students_national_id.id
            "
            placeholder="e.g. 062199002343"
            class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
            data-hj-allow
          />
        </div>
        <!-- date -->
        <div class="">
          <label class="font-medium text-text-neutral-subtle text-sm"
            >Date of issue<span class="text-text-error font-medium">
              *</span
            ></label
          >
          <input
            @click="openPicker2"
            ref="dateRef2"
            name="date2"
            type="date"
            v-model="
              counselorStudentStore.onBoardingData.students_national_id
                .issue_date
            "
            class="cursor-pointer mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-[9px] px-[14px] w-full outline-none appearance-none text-text-disabled uppercase"
            data-hj-allow
          />
        </div>
      </div>
      <div class="">
        <label class="font-medium text-text-neutral-subtle text-sm"
          >Place of issue<span class="text-text-error font-medium">
            *</span
          ></label
        >
        <input
          name="place"
          type="text"
          v-model="
            counselorStudentStore.onBoardingData.students_national_id
              .place_of_issue
          "
          placeholder="Enter Place of issue"
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();

const dateRef = ref<HTMLInputElement | null>(null);
const dateRef2 = ref<HTMLInputElement | null>(null);

const openPicker = () => {
  const el = dateRef.value;
  if (!el) return;
  if (typeof el.showPicker === "function") el.showPicker();
  else el.focus();
}
const openPicker2 = () => {
  const el = dateRef2.value;
  if (!el) return;
  if (typeof el.showPicker === "function") el.showPicker();
  else el.focus();
}
</script>
