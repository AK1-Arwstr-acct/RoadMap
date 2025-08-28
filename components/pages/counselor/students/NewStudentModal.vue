<template>
  <div
    class="bg-background-base-subtle fixed z-50 right-0 bottom-0 w-screen md:w-[480px] h-dvh px-4 py-5 md:px-8 md:py-6 flex flex-col gap-4 md:gap-6"
  >
    <div class="flex items-center justify-between gap-2">
      <p class="font-semibold text-xl md:text-2xl text-text-base">
        Create new profile
      </p>
      <div
        @click="counselorStore.isCreateNewStudent = false"
        class="cursor-pointer"
      >
        <IconCross width="24" height="24" />
      </div>
    </div>
    <!-- content -->
    <div class="flex-1 overflow-y-auto flex flex-col gap-5">
      <!-- student name -->
      <div class="">
        <label class="font-medium text-text-neutral-subtle text-sm mb-1.5"
          >Student’s name</label
        >
        <input
          name="name"
          type="text"
          v-model="formData.name"
          placeholder="Enter student’s name"
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
      <!-- phone number -->
      <div class="">
        <label class="font-medium text-text-neutral-subtle text-sm mb-1.5"
          >Phone number</label
        >
        <input
          name="number"
          type="text"
          v-model="formData.name"
          placeholder="Enter phone number"
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
      <!-- email -->
      <div class="">
        <label class="font-medium text-text-neutral-subtle text-sm mb-1.5"
          >Email</label
        >
        <input
          name="Email"
          type="email"
          v-model="formData.name"
          placeholder="nguyen@example.com"
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
      <BaseSelectRadio
        label="Counselor"
        :options="counselorList"
        v-model="formData.counselor"
        :isShadowDark="true"
      />
      <!-- contract type -->
      <div class="">
        <label
          class="font-medium text-text-neutral-subtle text-sm pb-2.5 block"
        >
          Type of contract
        </label>
        <div class="flex gap-8 text-text-neutral-subtle font-medium">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="basic"
              v-model="formData.contractType"
              class="appearance-none hidden"
            />
            <span
              class="size-6 border-2 rounded-md flex items-center justify-center"
              :class="[
                formData.contractType === 'basic'
                  ? 'border-border-brand bg-background-brand'
                  : 'border-border-neutral-subtle',
              ]"
            >
              <IconTick
                v-if="formData.contractType === 'basic'"
                stroke="#ffffff"
                width="16"
                height="16"
                strokeWidth="2"
              />
            </span>
            <span>Basic mentorship</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="advanced"
              v-model="formData.contractType"
              class="appearance-none hidden"
            />
            <span
              class="size-6 border-2 rounded-md flex items-center justify-center"
              :class="[
                formData.contractType === 'advanced'
                  ? 'border-border-brand bg-background-brand'
                  : 'border-border-neutral-subtle',
              ]"
            >
              <IconTick
                v-if="formData.contractType === 'advanced'"
                stroke="#ffffff"
                width="16"
                height="16"
                strokeWidth="2"
              />
            </span>
            <span>Advanced mentorship</span>
          </label>
        </div>
      </div>
    </div>
    <!-- buttons -->
    <div class="flex flex-col gap-2">
      <button
        class="font-semibold text-text-constant-white w-full rounded-lg bg-background-brand py-[13px] hover:bg-background-brand-hovered"
      >
        Send onboarding invite
      </button>
      <button
        @click="counselorStore.isCreateNewStudent = false"
        class="font-semibold text-text-brand border border-border-brand w-full rounded-lg py-[13px]"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStore from "~/stores/counselorStore";
import type { OptionAttributes } from "~/types/home";
import IconAward from "~/components/icons/IconAward.vue";

const counselorStore = useCounselorStore();

interface FormData {
  name: string;
  deadline: string;
  cycle: string;
  counselor: OptionAttributes | null;
  contractType: string;
}

const counselorList: OptionAttributes[] = [
  {
    label: "Hayden Vu",
    value: "Hayden Vu",
    icon: "/images/counselor-img.png",
  },
];

const formData = ref<FormData>({
  name: "",
  deadline: "",
  cycle: "",
  counselor: null,
  contractType: "",
});
</script>
