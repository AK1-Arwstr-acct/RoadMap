<template>
  <div class="flex flex-col gap-12">
    <!-- header -->
    <div class="flex flex-col items-center text-center">
      <img
        src="/public/images/application.png"
        alt="application"
        class="size-20 pb-4"
      />
      <h1 class="text-text-base text-2xl md:text-[32px] pb-1">
        Schedule first meeting
      </h1>
      <p class="text-text-neutral-subtle text-sm md:text-base">
        Each student will join an onboarding session to get key information for
        their journey and meet mentors as well as fellow Arrowsters. Please pick
        a time that works best for you!
      </p>
    </div>
    <!-- calendly -->
    <div
      class="calendly-inline-widget"
      data-url="https://calendly.com/mohid-khan-arrowster"
      style="min-width: 405px; height: 400px"
    ></div>
    <div class="flex justify-center pt-2">
      <button
        @click="onSubmit"
        :disabled="isDisable"
        class="rounded-lg bg-background-brand py-1.5 px-5 leading-7 min-w-24 text-text-constant-white font-semibold disabled:opacity-70"
      >
        Complete onboarding
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();

const isDisable = ref<boolean>(true);

const onSubmit = () => {};

const initCalendly = () => {
  if ((window as any).Calendly) {
    (window as any).Calendly.initInlineWidget({
      url: "https://calendly.com/mohid-khan-arrowster",
      parentElement: document.querySelector(".calendly-inline-widget"),
      prefill: {},
      utm: {},
    });
  }
};

const handleCalendlyEvent = (event: MessageEvent) => {
  if (event.origin !== "https://calendly.com") return;
  if (event.data.event === "calendly.event_scheduled") {
    isDisable.value = false;
  }
};

onMounted(() => {
  const scriptId = "calendly-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  } else {
    initCalendly();
  }
  window.addEventListener("message", handleCalendlyEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener("message", handleCalendlyEvent);
});
</script>
