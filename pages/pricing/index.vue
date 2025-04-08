<template>
  <main v-if="stepCount === 1">
    <div class="py-5 px-3 border-b border-gray-200 md:hidden">
      <div class="flex justify-between items-center">
        <div
          @click="navigateTo(localePath('/dashboard'))"
          class="cursor-pointer flex items-center gap-2"
        >
          <IconArrowsterLogo class="size-8 min-w-8" />
          <img
            src="/images/logo/logo.svg"
            alt="Logo"
            class="w-full h-5"
            loading="eager"
          />
        </div>
        <div
          v-if="appStore.authenticatedUser"
          @click="isMobileSideBarOpen = true"
          class="cursor-pointer rounded-full overflow-hidden size-10"
        >
          <img
            v-if="appStore.userData?.avatar"
            :src="appStore.userImagePreview || appStore.userData?.avatar"
            alt="user-icon"
            class="size-full"
          />
          <div
            v-else
            class="size-full bg-orange-500 flex items-center justify-center text-white font-medium uppercase text-xl"
          >
            <span>{{ appStore.userData?.name.charAt(0) }}</span>
          </div>
        </div>
        <div
          v-else
          @click="isMobileSideBarOpen = true"
          class="cursor-pointer rounded-full overflow-hidden size-10"
        >
          <img
            src="/images/chat-bot.png"
            alt="user-icon"
            class="size-full"
            loading="eager"
          />
        </div>
      </div>
    </div>
    <section class="w-full mx-auto max-w-[1216px] px-0 mt-8 mb-10">
      <div class="px-5">
        <div class="hidden md:flex justify-end">
          <span
            @click="navigateTo($localePath('/dashboard'))"
            class="cursor-pointer"
          >
            <IconCross fill="#A4A7AE" width="24" height="24" />
          </span>
        </div>
        <h1 class="text-4xl text-[#181D27] font-semibold">
          Your study abroad success starts <br />here – Get the perfect plan for
          you
        </h1>
        <p class="md:text-lg text-[#535862] mt-5">
          Join
          <span class="text-[#1570EF]">500+ students</span> who secured top
          university admissions with our AI + expert mentorship
        </p>
      </div>
      <div class="pt-8 overflow-x-auto md:px-5">
        <PricingTable
          @selectPlan="selectPlan"
          :plansList="plansList"
          class="hidden md:block"
        />
        <div class="md:hidden px-5 py-5 flex flex-col gap-3">
          <StarterPlanMobile @selectPlan="selectPlan" :plansList="plansList" />
          <StandardPlanMobile @selectPlan="selectPlan" :plansList="plansList" />
          <AdvancedPlanMobile @selectPlan="selectPlan" :plansList="plansList" />
        </div>
      </div>
      <!-- <div class="flex flex-col md:flex-row gap-8 py-16">
        <div class="w-full md:w-1/2">
          <div class="w-full md:w-11/12">
            <h1 class="text-3xl text-[#181D27] font-semibold">
              Unlock Exclusive Benefits – Join <br class="hidden lg:block" />Us
              for Premium Features! 
            </h1>
            <p class="text-xl text-[#535862] font-medium mt-5">
              Access advanced features that streamline your application. Working
              with us provides all the tools needed for a confident, easy
              application process!
            </p>
          </div>
        </div>
        <div class="w-full md:w-1/2 flex flex-col gap-8">
          <div
            v-for="(item, index) in benefits"
            :key="index"
            class="flex items-start gap-5"
          >
            <div class="min-w-[90px] max-w-[90px] h-[90px]">
              <img
                :src="item.icon"
                alt="smart school"
                class="size-full object-contain"
              />
            </div>
            <div>
              <p class="font-semibold text-xl">{{ item.title }}</p>
              <p class="mt-2 text-[#414651]">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div> -->
    </section>
    <section class="py-5 md:py-[70px] w-full max-w-[876px] mx-auto px-5">
      <p
        class="text-[#181D27] md:text-center text-2xl md:text-4xl font-semibold"
      >
        Frequently asked questions
      </p>
      <div
        class="md:border-[1.5px] border-gray-200 rounded-2xl md:px-3 sm:px-6 mt-4 md:mt-14"
      >
        <PricingFaq :faqList="faq" />
      </div>
    </section>
    <section class="bg-[#1849A9]">
      <div
        class="w-full mx-auto max-w-[1216px] px-5 py-12 sm:py-16 md:py-24 mt-8 text-white"
      >
        <h2 class="text-2xl sm:text-3xl xl:text-4xl font-semibold mb-5">
          Let’s start your journey together!
        </h2>
        <!-- steps -->
        <div class="grid grid-cols-1 lg:grid-cols-8 gap-5 mt-10 sm:mt-16">
          <div class="col-span-4 flex flex-col gap-6">
            <div
              v-for="(setp, idx) in stepsDetail"
              :class="[
                'py-2 md:py-4 px-6 border-l-4 transition-all ease-in-out duration-150',
                stepCount === idx + 1 || stepCount === idx + 2
                  ? 'border-white'
                  : 'border-[#2E90FA]',
              ]"
            >
              <h3 class="text-xl font-semibold">
                Step {{ idx + 1 }} : {{ setp.title }}
              </h3>
              <p class="text-[#D1E9FF] mt-2">
                {{ setp.description }}
              </p>
            </div>
          </div>
          <div ref="formWrapper" class="col-span-4 mt-5 lg:mt-0">
            <!-- form -->
            <JourneyForm
              @updateJourney="updateJourney"
              :selectedPlan="selectedPlan"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
  <div
    v-else
    class="bg-[#1849A9] flex justify-center items-center h-dvh w-screen"
  >
    <div
      class="max-w-[484px] mx-auto flex flex-col items-center text-center justify-center"
    >
      <img
        src="/images/countries-application.png"
        class="w-[383px] h-[324px]"
      />
      <p class="font-medium text-lg sm:text-3xl mt-4 text-white">
        Thank you for your submission! We've received your form and will contact
        you soon!
      </p>
      <button
        @click="navigateTo(localePath('/dashboard'))"
        class="bg-white text-sm sm:text-base text-[#175CD3] py-2.5 w-full rounded-lg font-semibold mt-8 max-w-[330px]"
      >
        Back to home
      </button>
    </div>
  </div>
  <!--  -->
  <Transition name="fade">
    <div
      v-if="isMobileSideBarOpen"
      @click="isMobileSideBarOpen = false"
      class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm"
    />
  </Transition>
  <Transition name="slideModal">
    <component :is="MobileSideBar" v-if="isMobileSideBarOpen" @close="close" />
  </Transition>
</template>
<script setup lang="ts">
import type { Plan } from "~/types/home";
import useAppStore from "~/stores/AppStore";
import MobileSideBar from "~/components/shared/MobileSideBar.vue";

const appStore = useAppStore();
const localePath = useLocalePath();

const stepCount = ref<number>(1);
const selectedPlan = ref<number>(3);
const formWrapper = ref<HTMLElement | null>(null);
const isMobileSideBarOpen = ref<boolean>(false);

const stepsDetail = [
  {
    title: "Fill out this form",
    description: "This helps us understand your profile and goals better.",
  },
  {
    title: "Meet us for a 15’ chat",
    description:
      "Our mentors will answer your questions and see if you’re a good fit for Arrowster.",
  },
  {
    title: "Confirm your study abroad plan",
    description: "We will confirm your study abroad plan with your parents",
  },
  {
    title: "Welcome to Arrowster!",
    description:
      "If selected, you will be onboarded to our exclusive student community and start working with us for your application!",
  },
];

const benefits = [
  {
    icon: "/images/school-list.png",
    title: "Smart school comparison",
    description:
      "Compare schools with ease! Simply add all your options and see them side by side, with personalized scores to help you find the perfect match.",
  },
  {
    icon: "/images/decision.png",
    title: "Instant roadmap check in",
    description:
      "No more waiting! Send direct updates to your counsellor anytime you need guidance, just with one click. You’re in control, with real-time communication to keep your journey moving forward!",
  },
  {
    icon: "/images/application.png",
    title: "AI essay editor",
    description:
      "Generate 5+ essays per day and get instant feedback whenever you need it. Send your essays to your counsellor with just one click and keep improving!",
  },
  {
    icon: "/images/ai-recommendation.png",
    title: "Sophie – Your AI assistant",
    description:
      "Get unlimited questions answered with the latest GPT model, tailored just for you. Whether it’s essay feedback or career advice, Sophie is here to help with no limits!",
  },
];

const faq = [
  {
    question: "What countries can Arrowster support me in applying to?",
    answer:
      "We help students apply to US, Canada, Australia, New Zealand, United Kingdom, and Europe (incl. countries such as France, Netherlands, Germany, etc). In Vietnam, we also help students apply to RMIT and BUV.",
  },
  {
    question: "What are partner schools?",
    answer:
      "These are schools we partner with - this means we can help students secure higher admission rates and exclusive scholarships. Since partner universities provide Arrowster with a commission upon successful enrollment, we only require a refundable deposit from students to ensure commitment.",
  },
  {
    question: "What schools do you partner with?",
    answer:
      "We partner with top institutions in the world, including all schools in Australia & UK (except Oxford & Cambridge), Top 10 Universities in Canada, Top 50-150 Universities in US, Applied Science Universities in Europe, and more. View our partner school lists here.",
  },
  {
    question: "Who are my mentors?",
    answer:
      "You’ll work with mentors who have studied abroad and won scholarships at best universities such as Harvard University, Yonsei University, University of Pennsylvania, etc. We also connect students with experts in their majors to learn about their careers.",
  },
  {
    question: "Will I work with you online or offline?",
    answer:
      "For most students, we will work online via messages and online meetings. If needed, you can come meet us at our beautiful office in District 1, Ho Chi Minh City!",
  },
];

const plansList: Plan[] = [
  {
    title: "Pre-Application Support",
    starterPlan: "",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: "Study Abroad Roadmap (Step-by-Step Guide)",
    starterPlan: "available",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: "Career & Major Discovery",
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: "Exclusive Training Sessions",
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: "Application Support",
    starterPlan: "",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: "Shortlisting Schools with 1-1 Mentor Review",
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: "Extracurricular & Scholarship Mentorship",
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: "Direct 1:1 Counselor (private chat; weekly calls)",
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: "Exclusive Resources",
    starterPlan: "Limited Access",
    standardPlan: "Full Access",
    advancedPlan: "Full Access",
  },
  {
    title: "Drafting Essays with AI",
    starterPlan: "3 essays/month, no feedback",
    standardPlan: "Unlimited, 1-1 mentor feedback",
    advancedPlan: "Unlimited, 1-1 mentor feedback",
  },
  {
    title: "Post-Application Support",
    starterPlan: "",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: "Visa & Financial Proof Paperwork",
    starterPlan: "N/A",
    standardPlan: "available",
    advancedPlan: "available",
  },
  {
    title: "Number of School Applications Supported",
    starterPlan: "N/A",
    standardPlan: "5 Partner Schools of Arrowster",
    advancedPlan: "10 Schools (Not Limited to Partner Schools)",
  },
  {
    title: "",
    starterPlan: "",
    standardPlan: "*5,000,000 VND refundable deposit for slot reservation",
    advancedPlan: "*Requires SAT 1500+, limited slots",
  },
];

const updateJourney = () => {
  stepCount.value = 2;
};
const close = () => {
  isMobileSideBarOpen.value = false;
};

const selectPlan = (id: number) => {
  selectedPlan.value = id;
  nextTick(() => {
    formWrapper.value?.scrollIntoView({ behavior: "smooth" });
  });
};
// onMounted( async()=>{
//   await api.get('/api/v1/plans/bundle')
// })
</script>
<style scoped>
.slideModal-enter-active,
.slideModal-leave-active {
  transition: all 400ms;
  transform: all 400ms;
}

.slideModal-enter-from,
.slideModal-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slideModal-enter-to,
.slideModal-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
