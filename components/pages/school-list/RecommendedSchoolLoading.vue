<template>
  <div class="flex flex-col items-center text-center mt-20 md:mt-32">
    <img
      src="/images/countries-application.png"
      alt="countries-application"
      class="max-w-[200px] md:max-w-[352px]"
      loading="eager"
    />
    <p class="text-[#181D27] text-xl md:text-2xl font-semibold mt-6">
      {{ $t('schoolList_page.loading_title') }}
    </p>
    <p class="mt-2 text-[#535862] md:text-lg">
      {{ $t('schoolList_page.loading_description') }}
    </p>
  </div>
</template>
