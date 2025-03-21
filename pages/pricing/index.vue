<template>
  <main>
    <section class="w-full mx-auto max-w-[1216px] px-5 mt-8">
      <div class="flex justify-end">
        <span
          @click="navigateTo(localePath('/dashboard'))"
          class="cursor-pointer"
        >
          <IconCross fill="#A4A7AE" width="24" height="24" />
        </span>
      </div>
      <h1 class="text-4xl text-[#181D27] font-semibold">
        A great application journey<br />starts with a plan! 
      </h1>
      <p class="text-lg text-[#535862] font-medium mt-5">
        We've guided over
        <span class="text-[#1570EF]">500 students</span> toward their goals. See
        how our counsellor can help you!
      </p>
      <div class="pt-8 overflow-x-auto pricing-table">
        <table class="w-full border-collapse min-w-[800px]">
          <tbody>
            <tr>
              <td class="min-w-[358px] w-full"></td>
              <td
                class="min-w-[358px] max-w-[358px] transition-all ease-in-out duration-150"
                :class="[selectedPlan === 2 ? 'bg-white' : 'bg-[#F5FAFF]']"
              >
                <div>
                  <p class="text-[#414651] text-lg font-medium text-center">
                    Standard Plan
                  </p>
                  <p
                    class="text-[#181D27] text-3xl font-semibold text-center mt-1"
                  >
                    Free
                  </p>
                  <button
                    class="bg-[#1570EF] text-white font-semibold px-[18px] py-2.5 border border-[#1570EF] rounded-lg w-full mt-4 shadow-sm"
                    @click="selectPlan(1)"
                  >
                    Get started!
                  </button>
                </div>
              </td>
              <td
                class="min-w-[358px] max-w-[358px] transition-all ease-in-out duration-150"
                :class="[selectedPlan === 1 ? 'bg-white' : 'bg-[#F5FAFF]']"
              >
                <div>
                  <p class="text-[#414651] text-lg font-medium text-center">
                    Advanced Plan
                  </p>
                  <p
                    class="text-[#181D27] text-3xl font-semibold text-center mt-1"
                  >
                    50,000,000 VND
                  </p>
                  <button
                    class="bg-[#1570EF] text-white font-semibold px-[18px] py-2.5 border border-[#1570EF] rounded-lg w-full mt-4 shadow-sm"
                    @click="selectPlan(2)"
                  >
                    Get started!
                  </button>
                </div>
              </td>
            </tr>
            <tr
              v-for="(plan, idx) in plansList"
              :key="idx"
              class="text-[#181D27] last:text-[#717680] text-center"
            >
              <td>
                <p class="text-[#181D27] font-semibold sm:text-xl text-start">
                  {{ plan.title }}
                </p>
              </td>
              <td :class="[selectedPlan === 2 ? 'bg-white' : 'bg-[#F5FAFF]']">
                <p class="flex justify-center">
                  <IconCheckmark v-if="!plan.standardPlan" />
                  <span
                    v-else
                    :class="{
                      ' rounded-full bg-[#EFF8FF] text-[#175CD3] text-sm font-medium py-1 px-3':
                        plan.standardPlan.toLocaleLowerCase() === 'unlimited',
                    }"
                  >
                    {{ plan.standardPlan }}
                  </span>
                </p>
              </td>
              <td :class="[selectedPlan === 1 ? 'bg-white' : 'bg-[#F5FAFF]']">
                <p class="flex justify-center">
                  <IconCheckmark v-if="!plan.standardPlan" />
                  <span
                    v-else
                    :class="{
                      ' rounded-full bg-[#EFF8FF] text-[#175CD3] text-sm font-medium py-1 px-3 text-center':
                        plan.standardPlan.toLocaleLowerCase() === 'unlimited',
                    }"
                  >
                    {{ plan.advancedPlan }}
                  </span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-col md:flex-row gap-8 py-16">
        <div class="w-full md:w-1/2">
          <div class="w-full md:w-11/12">
            <h1 class="text-3xl text-[#181D27] font-semibold">
              Unlock Exclusive Benefits – Join <br class="hidden lg:block" />Us for Premium Features! 
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
      </div>
    </section>
    <section class="bg-[#1849A9]">
      <div class="w-full mx-auto max-w-[1216px] px-5 py-24 mt-8 text-white">
        <div>
          <h2 class="text-3xl xl:text-4xl font-semibold mb-5">
            Let’s start your journey together!
          </h2>
          <p class="text-[#D1E9FF] text-lg xl:text-xl">
            You can reach us anytime via &nbsp;
            <span class="text-white">+84 915 343 643</span>
          </p>
        </div>
        <!-- steps -->
        <div class="grid grid-cols-1 lg:grid-cols-8 gap-5 mt-16">
          <div class="lg:col-span-4 flex flex-col gap-6">
            <div
              v-for="(setp, idx) in stepsDetail"
              :class="[
                'py-4 px-6 border-l-4 transition-all ease-in-out duration-150',
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
          <div
            ref="formWrapper"
            class="col-span-4"
            :class="{
              '-mt-8': stepCount === 2,
            }"
          >
            <Transition name="fade">
              <!-- form -->
              <div v-if="stepCount === 1">
                <JourneyForm
                  @updateJourney="updateJourney"
                  :selectedPlan="selectedPlan"
                />
              </div>
              <!-- chat -->
              <div v-else-if="stepCount === 2" class="max-w-[484px] mx-auto">
                <div
                  class="size-full flex flex-col items-center text-center justify-center"
                >
                  <NuxtImg
                    src="/images/countries-application.png"
                    class="w-[308px] h-[260px]"
                    loading="eager"
                    preload
                  />
                  <p class="font-medium text-3xl mt-4">
                    Thank you for your submission! We've received your form and
                    will contact you soon!
                  </p>
                  <button
                    @click="navigateTo(localePath('/dashboard'))"
                    class="bg-white text-[#175CD3] py-2.5 w-full rounded-lg font-semibold mt-8"
                  >
                    Back to home
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
const localePath = useLocalePath();

const stepCount = ref<number>(1);
const selectedPlan = ref<number>(2);
const formWrapper = ref<HTMLElement | null>(null);

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

const plansList = [
  {
    title: "Discover the ideal career",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: "Find the perfect schools",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: "Craft compelling essays recommendation letter",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: "Securing scholarship opportunities",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: "Navigate visa and paperworks",
    standardPlan: "",
    advancedPlan: "",
  },
  {
    title: "Number of countries supported",
    standardPlan: "Unlimited",
    advancedPlan: "Unlimited",
  },
  {
    title: "Number of schools supported",
    standardPlan: "5-8 partner schools of Arrowster",
    advancedPlan: "10 schools, not limited to partner schools",
  },
  {
    title: "",
    standardPlan: "*5,000,000VND deposit",
    advancedPlan:
      "*The Advanced Plan is only open to students with SAT of 1500 and above. Contact us for details!",
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

const updateJourney = () => {
  stepCount.value = 2;
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
.pricing-table table,
td,
th {
  border: 1.5px solid #d1d5db;
}
.pricing-table td {
  padding: 24px;
}
</style>
