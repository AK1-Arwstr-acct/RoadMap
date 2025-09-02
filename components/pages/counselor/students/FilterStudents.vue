<template>
  <div
    class="bg-background-base-subtle border border-border-neutral-subtle text-text-neutral-subtle px-4 rounded-xl w-[304px] shadow-[0px_4px_6px_-2px_#0A0D1208]"
  >
    <p class="uppercase font-semibold text-[10px] py-2">{{ $t("counselor_pages.filter_by") }}</p>
    <div class="flex flex-col gap-4 py-4">
      <div class="">
        <label class="font-medium text-text-neutral-subtle text-sm mb-1.5"
          >{{ $t("counselor_pages.students_page.student_table.name") }}</label
        >
        <input
          name="name"
          type="text"
          v-model="formData.name"
          :placeholder="t('counselor_pages.enter_name')"
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
      <BaseSelectRadio
        :label="t('counselor_pages.students_page.student_table.earliest_deadline')"
        :options="deadlines"
        v-model="formData.deadline"
        :isShadowDark="true"
        :openDropdown="openDropdown"
        dropdownName="deadline"
        @open="(value: string) => (openDropdown = value as string)"
      />
      <BaseSelectRadio
        :label="t('counselor_pages.students_page.student_table.earliest_cycle')"
        :options="deadlines"
        v-model="formData.cycle"
        :isShadowDark="true"
        :openDropdown="openDropdown"
        dropdownName="cycle"
        @open="(value: string) => (openDropdown = value as string)"
      />
      <BaseSelectRadio
        :label="t('counselor_pages.students_page.student_table.main_counselor')"
        :options="deadlines"
        v-model="formData.counselor"
        :isShadowDark="true"
        :openDropdown="openDropdown"
        dropdownName="counselor"
        @open="(value: string) => (openDropdown = value as string)"
      />
      <BaseSelectRadio
        :label="t('counselor_pages.students_page.student_table.status')"
        :options="deadlines"
        v-model="formData.status"
        :isShadowDark="true"
        direction="upward"
        :openDropdown="openDropdown"
        dropdownName="status"
        @open="(value: string) => (openDropdown = value as string)"
      />
      <div class="flex gap-2 leading-7 font-semibold">
        <button
          @click="onReset"
          class="bg-background-neutral-bold text-text-base px-5 py-1.5 rounded-lg w-full"
        >
          {{ $t('counselor_pages.reset') }}
        </button>
        <button
            @submit="onSubmit"
          class="bg-background-brand text-text-constant-white px-5 py-1.5 rounded-lg w-full"
        >
          {{ $t('counselor_pages.apply') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { OptionAttributes } from '~/types/home';

const { t } = useI18n();

interface FormData {
  name: string;
  deadline: OptionAttributes | null;
  cycle: OptionAttributes | null;
  counselor: OptionAttributes | null;
  status: OptionAttributes | null;
}

// for dropdown open
const openDropdown = ref<string>("");

const formData = ref<FormData>({
  name: "",
  deadline: null,
  cycle: null,
  counselor: null,
  status: null,
});

const deadlines = [
  {
    label: "15 sep",
    value: "15 sep",
  },
  {
    label: "16 sep",
    value: "16 sep",
  },
  {
    label: "17 sep",
    value: "17 sep",
  },
];

const onReset = () => {
  formData.value = {
    name: "",
    deadline: null,
    cycle: null,
    counselor: null,
    status: null,
  };
};

const onSubmit = () => {
    
}
</script>
