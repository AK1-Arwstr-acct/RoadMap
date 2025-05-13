<template>
  <div>
    <div class="flex gap-3 items-center cursor-pointer" @click="handelDropdown">
      <IconChevronDown
        stroke="#181D27"
        strokeWidth="2"
        class="transition-all ease-in-out duration-200"
        :class="{ '-rotate-90': !isListOpen }"
      />
      <p class="text-[#181D27] text-lg font-semibold">
        {{ heading }}
      </p>
    </div>
    <div
      ref="content"
      :style="{ maxHeight: isListOpen ? contentHeight + 'px' : '0px' }"
      class="overflow-hidden transition-all ease-in-out duration-500"
      :class="{ '!h-fit !min-h-fit': isInnerListOpen }"
    >
      <div class="mt-3 flex flex-col gap-6">
        <div v-for="(category, index) in categoryList" :key="index">
          <AppCategoryTask
            v-if="Array.isArray(application) && filterByCountry(category)"
            :application="filterByCountry(category)[0]"
            category="country"
            @hightChanged="() => (isInnerListOpen = true)"
          />
          <AppCategoryTask
            v-else-if="!Array.isArray(application)"
            :application="application"
            :category="category || ''"
            @hightChanged="() => (isInnerListOpen = true)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Application } from "~/types/dashboard";

const props = defineProps({
  heading: {
    type: String,
    default: "",
  },
  application: {
    type: Object as PropType<Application | Application[]>,
    default: () => {},
  },
});

const isInnerListOpen = ref<boolean>(false);
const isListOpen = ref<boolean>(false);
const content = ref<HTMLElement | null>(null);
const contentHeight = ref(0);

const categoryList = computed(() => {
  if (Array.isArray(props.application)) {
    const countries = props.application.map((item) => item.country_title);
    return [...new Set(countries)];
  } else if (props.application?.tasks) {
    const categories = props.application.tasks.map(
      (item) => item.category?.title || ""
    );
    return [...new Set(categories)];
  }
  return [];
});

const handelDropdown = () => {
  isInnerListOpen.value = false;
  isListOpen.value = !isListOpen.value;
};

const filterByCountry = (name: string | null): Application[] => {
  if (Array.isArray(props.application)) {
    return (
      props.application.filter((item) =>
        item.country_title?.includes(name || "")
      ) || []
    );
  }
  return [];
};

const calculateHeight = () => {
  if (content.value) {
    contentHeight.value = isListOpen.value ? content.value.scrollHeight : 0;
  }
};

watch(() => isListOpen.value, calculateHeight);

onMounted(() => {
  calculateHeight();
  window.addEventListener("resize", calculateHeight);

  const resizeObserver = new ResizeObserver(calculateHeight);
  if (content.value) resizeObserver.observe(content.value);

  onUnmounted(() => {
    window.removeEventListener("resize", calculateHeight);
    resizeObserver.disconnect();
  });
});
</script>
