<template>
  <div
    class="bg-background-base-subtle border border-border-neutral-subtle text-text-neutral-subtle rounded-xl overflow-hidden w-[240px] shadow-[0px_4px_6px_-2px_#0A0D1208]"
  >
    <p class="uppercase font-semibold text-[10px] px-4 py-2">
      {{ $t("counselor_pages.sort_by") }}
    </p>
    <div class="flex flex-col">
      <div
        v-for="(item, idx) in sortOptions"
        :key="idx"
        @click="selectedOption = item"
        class="cursor-pointer flex items-center justify-between leading-7 py-3 px-4"
        :class="[
          selectedOption?.value === item.value
            ? 'text-text-brand bg-background-brand-subtle'
            : 'hover:bg-background-base-subtle-hovered',
        ]"
      >
        {{ item.label }}
        <span v-if="selectedOption?.value === item.value">
          <IconTick stroke="#1570EF" stroke-width="2" />
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { OptionAttributes } from "~/types/home";

const { t } = useI18n();

const selectedOption = ref<OptionAttributes | null>(null);

const sortOptions = ref<OptionAttributes[]>([
  {
    label: t("counselor_pages.students_page.student_table.name"),
    value: "name",
  },
  {
    label: t("counselor_pages.students_page.student_table.earliest_deadline"),
    value: "earliest deadline",
  },
  {
    label: t("counselor_pages.students_page.student_table.earliest_cycle"),
    value: "earliest cycle",
  },
  {
    label: t("counselor_pages.students_page.student_table.main_counselor"),
    value: "main counselor",
  },
  {
    label: t("counselor_pages.students_page.student_table.status"),
    value: "status",
  },
]);
</script>
