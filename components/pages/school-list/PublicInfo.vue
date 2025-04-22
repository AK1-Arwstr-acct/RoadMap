<template>
  <div class="pt-4 pb-1 h-full flex flex-col">
    <div class="flex justify-center pt-10 md:pt-40">
      <div class="w-full max-w-[338px] flex flex-col items-center">
        <img
          src="/public/images/sophie-chat.png"
          alt="sophie Icon"
          class="w-[223px]"
          loading="eager"
        />
        <p class="text-center text-[#414651] text-xl font-medium mt-5">
          {{
            $t(
              "schoolList_page.fill_in_your_details_on_the_right_to_generate_your_personalized_school_matches"
            )
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
