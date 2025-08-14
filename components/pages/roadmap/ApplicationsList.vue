<template>
  <div>
    <p
      class="text-text-brand-bold text-xs uppercase font-semibold px-2"
    >
      {{ heading }}
    </p>
    <div class="overflow-hidden transition-all ease-in-out duration-500">
      <div class="mt-3 flex flex-col">
        <div v-for="(category, index) in categoryList" :key="index">
          <AppCategoryTask
            :application="application"
            :category="category || ''"
            @hightChanged="() => (isInnerListOpen = true)"
            @scrollDown="scrollDown"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Application } from "~/types/dashboard";

const emit = defineEmits(["scrollDown"]);

const props = defineProps({
  heading: {
    type: String,
    default: "",
  },
  application: {
    type: Object as PropType<Application>,
    default: () => {},
  },
});

const isInnerListOpen = ref<boolean>(false);

const categoryList = computed(() => {
  if (props.application?.tasks) {
    const categories = props.application.tasks.map(
      (item) => item.category?.title || ""
    );
    return [...new Set(categories)];
  }
  return [];
});

const scrollDown = async () => {
  setTimeout(() => {
    emit("scrollDown");
  }, 450);
};
</script>
