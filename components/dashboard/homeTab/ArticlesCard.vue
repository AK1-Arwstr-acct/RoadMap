<template>
  <div class="border border-[#E9EAEB] rounded-2xl p-6">
    <NuxtImg
      :src="articleDetail.image"
      alt="article image"
      class=" w-full object-cover object-top rounded-lg"
    />
    <div class="mt-5 flex flex-col gap-2">
      <h2
        v-if="isUpgradePlan"
        class="text-[#181D27] text-lg font-semibold text-center"
      >
        {{ articleDetail.title }}
      </h2>
      <p class="text-[#535862] text-sm" :class="{'text-center': isUpgradePlan}">
        {{articleDetail.details}}
      </p>
    </div>
    <a
      :href="articleDetail.cta"
      :class="[
        'py-2 w-full block mt-5 text-center rounded-lg cursor-pointer border text-sm',
        isUpgradePlan ? 'bg-[#1570EF] text-white border-[$1570EF]' : 'border-[#D5D7DA] text-[#535862]',
      ]"
    >
      {{ articleDetail.buttonText }}
    </a>
  </div>
</template>
<script setup lang="ts">
defineProps({
  articleDetail: {
    type: Object,
    default: () => {},
  },
  isUpgradePlan: {
    type: Boolean,
    default: false,
  },
});
</script>
