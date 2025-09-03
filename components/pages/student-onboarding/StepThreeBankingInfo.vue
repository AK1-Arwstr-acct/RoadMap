<template>
  <div class="flex flex-col gap-5 remove-shadow-bg-white">
    <!-- heading -->
    <div class="flex gap-2 items-center">
      <div class="p-2 rounded-lg bg-background-warning-subtle">
        <IconBankCard class="!text-icon-warning" />
      </div>
      <p class="font-semibold text-xl text-text-base">Banking information</p>
    </div>
    <p class="text-text-neutral-subtle text-sm">
      We’ll return the deposit to the bank account you provided
    </p>
    <!-- Name -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm">Name<span class="text-text-error font-medium"> *</span></label>
      <input
        name="Name"
        type="text"
        v-model="counselorStudentStore.onBoardingData.name_on_bank_account"
        placeholder="Enter name on bank account"
        class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
        data-hj-allow
      />
    </div>
    <!-- Bank account number -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Bank account number<span class="text-text-error font-medium"> *</span></label
      >
      <input
        name="account-number"
        type="text"
        v-model="counselorStudentStore.onBoardingData.bank_account_number"
        placeholder="Enter bank account number"
        class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
        data-hj-allow
      />
    </div>
    <!-- Bank name -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Bank name<span class="text-text-error font-medium"> *</span></label
      >
      <input
        name="account-number"
        type="text"
        v-model="counselorStudentStore.onBoardingData.bank_name"
        placeholder="Enter Bank name"
        class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
        data-hj-allow
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();
</script>
