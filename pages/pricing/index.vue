<template>
  <main>
    <section class="mx-auto container px-5 mt-5">
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
              <td class="min-w-[500px] w-full"></td>
              <td class="min-w-80 2xl:min-w-[450px]">
                <div>
                  <p class="text-[#414651] font-medium text-center">
                    Standard Plan
                  </p>
                  <p class="text-lg font-semibold text-center mt-1">Free</p>
                  <button
                    class="bg-[#1570EF] text-white p-2.5 rounded-lg w-full mt-4"
                  >
                    Get started!
                  </button>
                </div>
              </td>
              <td class="min-w-80 2xl:min-w-[450px] bg-[#F5FAFF]">
                <div>
                  <p class="text-[#414651] font-medium text-center">
                    Advanced Plan
                  </p>
                  <p class="text-lg font-semibold text-center mt-1">
                    50,000,000 VND
                  </p>
                  <button
                    class="bg-[#1570EF] text-white p-2.5 rounded-lg w-full mt-4"
                  >
                    Get started!
                  </button>
                </div>
              </td>
            </tr>
            <tr
              v-for="(plan, idx) in plansList"
              :key="idx"
              class="text-[#181D27] last:text-[#717680] text-sm text-center"
            >
              <td>
                <p class="text-[#181D27] font-semibold sm:text-xl text-start">
                  {{ plan.title }}
                </p>
              </td>
              <td>
                <p class="flex justify-center">
                  <IconCheckmark v-if="!plan.standardPlan" />
                  <span
                    v-else
                    :class="{
                      ' rounded-full bg-[#EFF8FF] text-[#175CD3] py-1 px-3':
                        plan.standardPlan.toLocaleLowerCase() === 'unlimited',
                    }"
                  >
                    {{ plan.standardPlan }}
                  </span>
                </p>
              </td>
              <td class="bg-[#F5FAFF]">
                <p class="flex justify-center">
                  <IconCheckmark v-if="!plan.standardPlan" />
                  <span
                    v-else
                    :class="{
                      ' rounded-full bg-[#EFF8FF] text-[#175CD3] py-1 px-3 text-center':
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
            <h1 class="text-4xl text-[#181D27] font-semibold">
              Unlock Exclusive Benefits – Join<br />Us for Premium Features! 
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
            class="flex gap-5"
          >
            <div>
              <img
                :src="item.icon"
                alt="smart school"
                class="min-w-24 min-h-24"
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
      <div class="mx-auto container px-5 py-24 text-white">
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
        <div class="grid grid-cols-1 lg:grid-cols-7 gap-5 mt-16">
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
          <div class="col-span-3" :class="{
            '-mt-8': stepCount === 2
          }">
            <Transition name="fade">
              <!-- form -->
              <div v-if="stepCount === 1">
                <JourneyForm @updateJourney="updateJourney" />
              </div>
              <!-- chat -->
              <div
                v-else-if="stepCount === 2"
                class="max-w-[484px] mx-auto"
              >
              <div class="size-full flex flex-col items-center text-center justify-center">
                <NuxtImg
                  src="/images/countries-application.png"
                  class="w-[308px] h-[260px]"
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

const stepsDetail = [
  {
    title: "Fill out this form",
    description: "This helps us understand your profile and goals better.",
  },
  {
    title: "Meet us for a 30' chat",
    description:
      "Our mentors will answer your questions and see if you’re a good fit for Arrowster.",
  },
  {
    title: "Connect us with your family",
    description: "We will confirm your study abroad plans with your parents",
  },
  {
    title: "Welcome to Arrowster!",
    description:
      "If selected, you will be onboarded to our exclusive student community and get early access to new AI features!",
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
    icon: "/images/pricing/smart-school.png",
    title: "Smart school comparison",
    description:
      "Compare schools with ease! Simply add all your options and see them side by side, with personalized scores to help you find the perfect match.",
  },
  {
    icon: "/images/pricing/instant-roadmap.png",
    title: "Instant roadmap check in",
    description:
      "No more waiting! Send direct updates to your counsellor anytime you need guidance, just with one click. You’re in control, with real-time communication to keep your journey moving forward!",
  },
  {
    icon: "/images/pricing/ai-essay.png",
    title: "AI essay editor",
    description:
      "Generate 5+ essays per day and get instant feedback whenever you need it. Send your essays to your counsellor with just one click and keep improving!",
  },
  {
    icon: "/images/pricing/sophie.png",
    title: "Sophie – Your AI assistant",
    description:
      "Get unlimited questions answered with the latest GPT model, tailored just for you. Whether it’s essay feedback or career advice, Sophie is here to help with no limits!",
  },
];
const updateJourney = () => {
  stepCount.value = 2;
};
// onMounted( async()=>{
//   await api.get('/api/v1/plans/bundle')
// })
</script>
<style scoped>
.pricing-table table,
td,
th {
  border: 1px solid #e9eaeb;
}
.pricing-table td {
  padding: 24px;
}
</style>
