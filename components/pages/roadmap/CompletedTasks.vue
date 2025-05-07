<template>
    <div class="py-0.5 px-3 rounded-full font-semibold tracking-wider text-sm w-fit" :class="[
        category === 'country'
            ? 'bg-[#F5F5F5] text-[#414651]'
            : categoryClass(category),
    ]">
        {{
            filteredTask(category).filter((item) => item.checked == true).length
        }}/{{ filteredTask(category).length }}
    </div>
</template>
<script setup lang="ts">
import type { Application } from "~/types/dashboard";

const props = defineProps({
    application: {
        type: Object as PropType<Application>,
        default: () => { },
    },
    category: {
        type: String,
        default: "",
    },
});

const categoryClass = (category: string) => {
    if (category.includes("career") || category.includes("application")) {
        return "bg-[#FFFAEB] text-[#B54708]";
    } else if (category.includes("academics") || category.includes("decision")) {
        return "bg-[#EFF8FF] text-[#175CD3]";
    } else if (
        category.includes("extracurricular") ||
        category.includes("finances") ||
        category.includes("scholarships")
    ) {
        return "bg-[#ECFDF3] text-[#027A48]";
    } else if (category.includes("school")) {
        return "bg-[#FDF2FA] text-[#C11574]";
    } else if (category.includes("decision")) {
        return "bg-[#EEF4FF] text-[#3538CD]";
    } else {
        return "bg-[#F0F9FF] text-[#026AA2]";
    }
};

const filteredTask = (category: string) => {
    if (props.category === "country") {
        return props.application.tasks;
    }
    const tasks = props.application.tasks.filter((item) =>
        item.category.title.includes(category)
    );
    return tasks;
};
</script>
