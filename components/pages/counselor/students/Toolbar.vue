<template>
  <div class="flex items-center gap-4 relative">
    <div class="flex-1 flex">
      <div
        @click="isSortOpen = true"
        class="p-2 cursor-pointer flex items-center hover:bg-background-neutral-bold-hovered rounded-lg"
      >
        <IconDubleArrowBlack />
      </div>
      <div
        @click="isFilterOpen = true"
        class="p-2 cursor-pointer flex items-center hover:bg-background-neutral-bold-hovered rounded-lg"
      >
        <IconFilterLines width="24" height="24" />
      </div>
      <div
        @click="isSearchOpen = true"
        class="cursor-pointer flex gap-2 items-center"
        :class="[
          isSearchOpen
            ? 'border-b border-divider-subtle w-full max-w-[204px] py-2 ml-2'
            : 'hover:bg-background-neutral-bold-hovered rounded-lg p-2',
        ]"
      >
        <span class="size-6 min-w-6">
          <IconSearch width="24" height="24" />
        </span>
        <div v-if="isSearchOpen" v-click-outside="() => (isSearchOpen = false)">
          <input
            class="text-sm w-full border-l border-text-brand outline-none bg-transparent text-text-base"
            :placeholder="t('counselor_pages.search')"
          />
        </div>
      </div>
    </div>
    <button
        @click="counselorStore.isCreateNewStudent = true"
      class="flex items-center gap-2 bg-background-brand text-text-constant-white px-3 py-1.5 rounded-lg font-semibold leading-7 hover:bg-background-brand-hovered"
    >
      <IconPlus width="24" height="24" class="!text-text-constant-white" />
      {{ $t("counselor_pages.create_new") }}
    </button>
    <Transition name="fade">
      <div
        v-if="isFilterOpen"
        v-click-outside="() => (isFilterOpen = false)"
        class="size-fit absolute left-10 top-14 z-10"
      >
        <FilterStudents />
      </div>
    </Transition>
    <Transition name="fade">
      <div
        v-if="isSortOpen"
        v-click-outside="() => (isSortOpen = false)"
        class="size-fit absolute left-0 top-14 z-10"
      >
        <SortStudents />
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import useCounselorStore from '~/stores/counselorStore';

const counselorStore = useCounselorStore();
const { t } = useI18n();

const isSearchOpen = ref<boolean>(false);
const isFilterOpen = ref<boolean>(false);
const isSortOpen = ref<boolean>(false);
</script>
