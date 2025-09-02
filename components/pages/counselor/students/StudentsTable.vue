<template>
  <div class="rounded-xl overflow-hidden">
    <div class="overflow-x-auto custom-scrollbar">
      <table class="w-full">
        <caption class="hidden">student table</caption>
        <thead class="">
          <tr
            class="bg-background-neutral font-semibold text-[10px] text-text-base text-nowrap"
          >
            <th class="text-left pl-6 pr-3 py-4">{{ $t("counselor_pages.students_page.student_table.name") }}</th>
            <th class="text-left px-3 py-4">{{ $t("counselor_pages.students_page.student_table.earliest_deadline") }}</th>
            <th class="text-left px-3 py-4">{{ $t("counselor_pages.students_page.student_table.earliest_cycle") }}</th>
            <th class="text-left px-3 py-4">{{ $t("counselor_pages.students_page.student_table.main_counselor") }}</th>
            <th class="text-left px-3 py-4">{{ $t("counselor_pages.students_page.student_table.status") }}</th>
            <th class="text-left pl-3 pr-6 py-4">{{ $t("counselor_pages.students_page.student_table.progress") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="student in students"
            :key="student.id"
            class="text-sm text-text-base border-b border-divider cursor-pointer"
          >
            <td class="py-3 pl-6 pr-3 font-semibold">
              <div class="flex items-center gap-2">
                <img
                  :src="student.avatar"
                  alt="avatar"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <span class="inline-block flex-1 truncate">
                  {{ student.name }}
                </span>
              </div>
            </td>
            <td class="py-3 px-3 text-nowrap">
              {{ student.deadline }}
            </td>
            <td class="py-3 px-3 text-nowrap">
              {{ student.cycle }}
            </td>
            <td class="py-3 px-3 text-nowrap">
              <div class="flex items-center gap-2">
                <div class="size-[18px] min-w-[18px] rounded-full overflow-hidden">
                <div
                  class="size-full bg-orange-500 flex items-center justify-center text-text-constant-white font-medium text-[8px] leading-3"
                >
                  <span>{{ student.name.charAt(0).toUpperCase() }}</span>
                </div>
              </div>
                {{ student.counselor }}
              </div>
            </td>
            <td class="py-3 px-3 text-nowrap font-semibold text-xs">
              <span
                :class="[
                  'px-1 py-0.5 rounded-[4px] text-xs inline-block',
                  student.status.toLowerCase().includes('applying') ||
                  student.status.toLowerCase().includes('submitting')
                    ? 'bg-background-warning-subtle text-text-warning'
                    : student.status.toLowerCase().includes('receiving')
                    ? 'bg-background-info-subtle text-text-info'
                    : 'bg-background-neutral-bold text-text-neutral-subtle',
                ]"
                >{{ student.status }}</span
              >
            </td>
            <td class="py-3 pl-3 pr-6 text-xs">
              <div class="flex items-center gap-2">
                <div
                  class="inline-block align-middle mr-2 bg-progress-track-brand rounded w-20 h-1"
                >
                  <div
                    class="bg-progress-indicator-brand h-full rounded-full transition-all"
                    :style="{ width: student.progressPercent + '%' }"
                  ></div>
                </div>
                {{ student.progress }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="flex justify-end items-center gap-6 mt-4 text-xs text-text-base"
    >
      <span>1-10 {{ $t("counselor_pages.students_page.student_table.of") }} 120</span>
      <div class="flex items-center gap-2">
        <button class="transform rotate-90"><IconChevronDown /></button>
        <button class="transform -rotate-90"><IconChevronDown /></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const students = ref([
  {
    id: 1,
    name: "Phạm Nguyễn Bảo Trân",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    deadline: "15 June, 2025",
    cycle: "Spring 2025",
    counselor: "Thanh Hoang",
    counselorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Invitation sent",
    statusClass: "status-gray",
    progress: "3/10",
    progressPercent: 30,
  },
  {
    id: 2,
    name: "Phạm Nguyễn Bảo Trân",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    deadline: "15 June, 2025",
    cycle: "Spring 2025",
    counselor: "Thanh Hoang",
    counselorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Form completed",
    statusClass: "status-gray",
    progress: "3/10",
    progressPercent: 30,
  },
  {
    id: 3,
    name: "Nguyễn Thị Mai Anh",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    deadline: "15 June, 2025",
    cycle: "Spring 2025",
    counselor: "Thanh Hoang",
    counselorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Signed",
    statusClass: "status-gray",
    progress: "3/10",
    progressPercent: 30,
  },
  {
    id: 4,
    name: "Nguyễn Thị Mai Anh",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    deadline: "15 June, 2025",
    cycle: "Spring 2025",
    counselor: "Thanh Hoang",
    counselorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Joined onboarding",
    statusClass: "status-gray",
    progress: "3/10",
    progressPercent: 30,
  },
  {
    id: 5,
    name: "Nguyễn Thị Mai Anh",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    deadline: "15 June, 2025",
    cycle: "Spring 2025",
    counselor: "Thanh Hoang",
    counselorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Schools confirmed",
    statusClass: "status-gray",
    progress: "3/10",
    progressPercent: 30,
  },
  {
    id: 6,
    name: "Trần Văn Hóa",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    deadline: "15 June, 2025",
    cycle: "Fall 2025",
    counselor: "Thanh Hoang",
    counselorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Applying",
    statusClass: "status-orange",
    progress: "3/10",
    progressPercent: 30,
  },
  {
    id: 7,
    name: "Lê Hoàng Minh",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    deadline: "15 June, 2025",
    cycle: "Fall 2025",
    counselor: "Thanh Hoang",
    counselorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Submitting to MA",
    statusClass: "status-orange",
    progress: "3/5",
    progressPercent: 60,
  },
  {
    id: 8,
    name: "Đỗ Thị Ngọc",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    deadline: "15 June, 2025",
    cycle: "Fall 2025",
    counselor: "Thanh Hoang",
    counselorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Submitting to school",
    statusClass: "status-orange",
    progress: "1/5",
    progressPercent: 20,
  },
  {
    id: 9,
    name: "Phan Văn Dũng",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    deadline: "15 June, 2025",
    cycle: "Spring 2025",
    counselor: "Thanh Hoang",
    counselorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Submitting to school",
    statusClass: "status-orange",
    progress: "1/5",
    progressPercent: 20,
  },
  {
    id: 10,
    name: "Nguyễn Văn Phúc",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    deadline: "15 June, 2025",
    cycle: "Spring 2025",
    counselor: "Thanh Hoang",
    counselorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Receiving decisions",
    statusClass: "status-blue",
    progress: "3/5",
    progressPercent: 60,
  },
]);
</script>
