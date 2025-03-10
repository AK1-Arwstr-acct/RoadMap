<template>
  <div class="border-[1.5px] border-gray-200 rounded-2xl p-6">
    <NuxtImg
      :src="articleDetail.image"
      alt="article image"
      class="w-full object-cover object-top rounded-lg"
      loading="eager"
    />
    <div class="mt-5 flex flex-col gap-2">
      <h2
        v-if="isUpgradePlan"
        class="text-[#181D27] text-lg font-semibold text-center"
      >
        {{ articleDetail.title }}
      </h2>
      <p
        class="text-[#535862] text-sm"
        :class="{ 'text-center': isUpgradePlan }"
      >
        {{ articleDetail.details }}
      </p>
    </div>
    <button
      @click="handleClick"
      :class="[
        'py-2 w-full block mt-5 text-center rounded-lg cursor-pointer border text-sm shadow-[0px_1px_2px_0px_#0A0D120D]',
        isUpgradePlan
          ? 'bg-[#1570EF] text-white border-[$1570EF]'
          : 'border-gray-300 text-[#535862]',
      ]"
    >
      {{ articleDetail.buttonText }}
    </button>
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();

const props = defineProps({
  articleDetail: {
    type: Object,
    default: () => {},
  },
  isUpgradePlan: {
    type: Boolean,
    default: false,
  },
});

const handleClick = () => {
  if (props.isUpgradePlan) {
    navigateTo(localePath("/pricing"));
  } else {
    window.open(props.articleDetail.cta, "_blank");
  }
};
</script>
