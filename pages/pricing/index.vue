<template>
	<div class="mx-auto container px-5 mt-5">
		<div class="flex justify-end">
			<span @click="navigateTo(localePath('/dashboard'))" class="cursor-pointer">
				<IconCross fill="#A4A7AE" width="24" height="24" />
			</span>
		</div>
		<h1 class="text-4xl text-[#181D27] font-semibold">A great application journey<br />starts with a plan! </h1>
		<p class="text-lg text-[#535862] font-medium mt-5">We've guided over <span class="text-[#1570EF]">500
				students</span> toward their goals. See how our counsellor can help you!</p>
		<div class="pt-8 pb-16 overflow-x-auto pricing-table">
			<table class="w-full border-collapse min-w-[800px]">
				<tbody>
					<tr>
						<td class="min-w-[500px] w-full"></td>
						<td class="min-w-80 2xl:min-w-[450px]">
							<div>
								<p class="text-[#414651] font-medium text-center">Standard Plan</p>
								<p class="text-lg font-semibold text-center mt-1">Free</p>
								<button class="bg-[#1570EF] text-white p-2.5 rounded-lg w-full mt-4">Get started!</button>
							</div>
						</td>
						<td class="min-w-80 2xl:min-w-[450px]">
							<div>
								<p class="text-[#414651] font-medium text-center">Advanced Plan</p>
								<p class="text-lg font-semibold text-center mt-1">50,000,000 VND</p>
								<button class="bg-[#1570EF] text-white p-2.5 rounded-lg w-full mt-4">Get started!</button>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<p class="text-[#181D27] font-semibold sm:text-xl">Discover the ideal career</p>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
					</tr>
					<tr>
						<td>
							<p class="text-[#181D27] font-semibold sm:text-xl">Find the perfect schools</p>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
					</tr>
					<tr>
						<td>
							<p class="text-[#181D27] font-semibold sm:text-xl">Craft compelling essays recommendation letter</p>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
					</tr>
					<tr>
						<td>
							<p class="text-[#181D27] font-semibold sm:text-xl">Securing scholarship opportunities</p>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
					</tr>
					<tr>
						<td>
							<p class="text-[#181D27] font-semibold sm:text-xl">Navigate visa and paperworks</p>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
					</tr>
					<tr>
						<td>
							<p class="text-[#181D27] font-semibold sm:text-xl">Number of countries supported</p>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
					</tr>
					<tr>
						<td>
							<p class="text-[#181D27] font-semibold sm:text-xl">Number of schools supported</p>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
						<td>
							<span class="flex justify-center">
								<IconCheckmark />
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="flex flex-col md:flex-row gap-8">
			<div class="w-full md:w-1/2">
				<div class="w-full md:w-11/12">
					<h1 class="text-4xl text-[#181D27] font-semibold">Unlock Exclusive Benefits – Join<br />Us for Premium
						Features! </h1>
					<p class="text-xl text-[#535862] font-medium mt-5">Access advanced features that streamline your application.
						Working with us provides all the tools needed for a confident, easy application process!</p>
				</div>
			</div>
			<div class="w-full md:w-1/2 flex flex-col gap-8">
				<div v-for="(item, index) in benefits" :key="index" class="flex gap-5">
					<div>
						<img :src="item.icon" alt="smart school" class="min-w-24 min-h-24" />
					</div>
					<div>
						<p class="font-semibold text-xl">{{ item.title }}</p>
						<p class="mt-2 text-[#414651]">{{ item.description }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();

const benefits = [
	{
		icon: "/images/pricing/smart-school.png",
		title: "Smart school comparison",
		description: "Compare schools with ease! Simply add all your options and see them side by side, with personalized scores to help you find the perfect match."
	},
	{
		icon: "/images/pricing/instant-roadmap.png",
		title: "Instant roadmap check in",
		description: "No more waiting! Send direct updates to your counsellor anytime you need guidance, just with one click. You’re in control, with real-time communication to keep your journey moving forward!"
	},
	{
		icon: "/images/pricing/ai-essay.png",
		title: "AI essay editor",
		description: "Generate 5+ essays per day and get instant feedback whenever you need it. Send your essays to your counsellor with just one click and keep improving!"
	},
	{
		icon: "/images/pricing/sophie.png",
		title: "Sophie – Your AI assistant",
		description: "Get unlimited questions answered with the latest GPT model, tailored just for you. Whether it’s essay feedback or career advice, Sophie is here to help with no limits!"
	}
]
</script>
<style scoped>
.pricing-table table, td, th {
  border: 1px solid #E9EAEB;
}
.pricing-table td {
	padding: 24px;
}
</style>