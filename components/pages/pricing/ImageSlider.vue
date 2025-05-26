<template>
  <div class="relative size-full overflow-hidden rounded-lg">
    <!-- Main slider container -->
    <div
      class="relative h-full min-h-[400px] w-full"
      @mouseenter="pauseAutoSlide"
      @mouseleave="resumeAutoSlide"
    >
      <!-- Image slides -->
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
        :class="{
          'opacity-100': currentSlide === index,
          'opacity-0': currentSlide !== index,
        }"
      >
        <img
          :src="slide.image"
          :alt="slide.overlayText.name"
          class="object-cover w-full h-full"
        />
        <!-- Overlay text -->
        <div v-if="slide.overlayText.name" class="absolute inset-0 flex items-end px-8 py-14">
          <div class="text-white">
            <p class="text-lg lg:text-2xl font-semibold">
              {{ slide.overlayText.name }}
            </p>
            <p class="lg:text-lg">
                {{ slide.overlayText.position }}
            </p>
            <p class="text-sm lg:text-lg mt-2 lg:mt-[15px]">
                {{ slide.overlayText.details }}
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation arrows -->
      <!-- <button 
        @click="prevSlide" 
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white transition-colors duration-300"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button 
        @click="nextSlide" 
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white transition-colors duration-300"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
      </button> -->
    </div>

    <!-- Navigation dots -->
    <div
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 px-3 py-2 rounded-full bg-black"
    >
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-colors duration-300"
        :class="
          currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
        "
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

interface Slide {
  image: string;
  overlayText: {
    name: string;
    position: string;
    details: string;
  };
}

// Define props with validation
const props = defineProps<{
  slides: Slide[];
  autoSlideInterval?: number;
}>();

// Set default values for optional props
const autoSlideInterval = props.autoSlideInterval || 5000;

// Reactive state
const currentSlide = ref(0);
const autoSlideTimer = ref<number | null>(null);
const isPaused = ref(false);

// Methods
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length;
};

// const prevSlide = () => {
//   currentSlide.value =
//     (currentSlide.value - 1 + props.slides.length) % props.slides.length;
// };

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

const startAutoSlide = () => {
  if (autoSlideTimer.value) clearInterval(autoSlideTimer.value);

  autoSlideTimer.value = window.setInterval(() => {
    if (!isPaused.value) {
      nextSlide();
    }
  }, autoSlideInterval);
};

const pauseAutoSlide = () => {
  isPaused.value = true;
};

const resumeAutoSlide = () => {
  isPaused.value = false;
};

// Lifecycle hooks
onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  if (autoSlideTimer.value) {
    clearInterval(autoSlideTimer.value);
  }
});

// Watch for changes in slides array to reset the slider
watch(
  () => props.slides,
  () => {
    currentSlide.value = 0;
    startAutoSlide();
  },
  { deep: true }
);
</script>
