<template>
  <div class="max-w-[752px] py-3 px-4 mx-auto mt-8 mb-16">
    <div class="text-[#717680] font-medium flex items-center gap-1.5 mb-8">
      <p @click="emit('updateStep', 'essay')" class="cursor-pointer">All your AI Essay</p>
      <IconChevronDown
        class="transform -rotate-90"
        stroke="#717680"
        width="20"
        height="20"
      />
    </div>
    <h3 class="text-3xl font-medium text-[#181D27] my-8">
      Beyond the Title: How Embracing Setbacks Transformed My Understanding of
      Leadership and Success
    </h3>
    <div class="text-lg text-[#414651] flex flex-col gap-3 rounded-lg">
      <p>
        Losing the debate team leadership position was a humbling experience,
        but it ultimately shaped me in ways I didn’t expect. At first, I saw it
        as a failure, questioning whether I was good enough. However, as time
        passed, I realized that leadership is not just about holding a title —
        it’s about contributing to a team in meaningful ways.
      </p>
      <p>
        This experience taught me resilience. Instead of dwelling on
        disappointment, I focused on how I could still add value to the team. I
        continued helping newer members with research, refining argument
        structures, and sharing strategies. Through this, I gained a new
        perspective on leadership — one that is defined by actions rather than
        recognition.
      </p>
      <p>
        I also became more adaptable. Initially, I had a fixed idea of success,
        believing that being captain was the only way to make an impact. But
        stepping into a supporting role showed me that leadership comes in many
        forms. I gained confidence in my ability to influence and support others
        without needing a title.
      </p>
      <p>
        Most importantly, I learned that setbacks are not the end of the road —
        they are opportunities to grow. This shift in mindset has stayed with
        me, making me more open to challenges and ready to embrace unexpected
        paths. As I step into university, I carry this lesson with me: success
        isn’t just about reaching a position, but about the difference I make
        along the way.
      </p>
      <p>
        This realization has shaped how I approach new opportunities. Rather
        than focusing solely on the outcome, I now prioritize the process — how
        I can contribute, learn, and grow in any given situation. Whether it’s
        collaborating on a group project, joining a new organization, or
        tackling unfamiliar challenges, I embrace the chance to make an impact,
        no matter my role.
      </p>
      <p>
        As I prepare for university, I am eager to apply this mindset in a
        dynamic environment, where leadership isn’t confined to titles but is
        instead demonstrated through initiative, collaboration, and
        perseverance. I look forward to engaging with diverse perspectives,
        stepping outside my comfort zone, and continuing to develop as a leader
        — one who values growth, adaptability, and the ability to uplift others.
      </p>
      <p>
        This mindset will guide me through the challenges and opportunities that
        lie ahead. In university, I plan to seek out spaces where I can
        contribute meaningfully — whether by mentoring peers, leading
        discussions, or supporting initiatives that align with my values. I now
        understand that leadership is not about a title; it’s about the
        willingness to step up, support others, and grow alongside them.
      </p>
      <p>
        Ultimately, losing the debate team leadership position was not a
        failure, but a turning point. It redefined my understanding of success
        and helped me recognize that impact is not measured by status, but by
        the influence I have on those around me. Carrying this lesson forward, I
        am excited to embrace new experiences, knowing that true leadership is
        found in the everyday moments of learning, supporting, and making a
        difference.
      </p>
    </div>
    <div class="h-px bg-[#E9EAEB] mx-auto my-[42px]"></div>
    <div class="flex items-start gap-6">
      <div class="flex gap-4">
        <IconTabSophie
          width="56"
          height="56"
          class="text-[#ED77FF] flex-shrink-0"
        />
        <p class="text-[#181D27] font-medium text-justify">
          This is far from good though. Want to know how to customise it even
          more and make it 10x better?
        </p>
      </div>
      <button
        class="border border-[#D5D7DA] rounded-lg text-sm text-[#414651] font-semibold px-3.5 py-2 flex-shrink-0"
      >
        Make my essay 10x better
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["updateStep"]);
</script>
