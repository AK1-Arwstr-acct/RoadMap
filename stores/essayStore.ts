import { defineStore } from "pinia";

const useEssayStore = defineStore("essayStore", () => {


    const finalEssay = ref<{ title: string, essayText: string }>()

    const setFinalEssay = () => {
        finalEssay.value = {
            title: 'Beyond the Title: How Embracing Setbacks Transformed My Understanding of Leadership and Success',
            essayText: 'Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, questioning whether I was good enough. However, as time passed, I realized that leadership is not just about holding a title—it’s about contributing to a team in meaningful ways.Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, questioning whether I was good enough. However, as time passed, I realized that leadership is not just about holding a title—it’s about contributing to a team in meaningful ways.Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, questioning whether I was good enough. However, as time passed, I realized that leadership is not just about holding a title—it’s about contributing to a team in meaningful ways.Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, questioning whether I was good enough. However, as time passed, I realized that leadership is not just about holding a title—it’s about contributing to a team in meaningful ways.Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, questioning whether I was good enough. However, as time passed, I realized that leadership is not just about holding a title—it’s about contributing to a team in meaningful ways.Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, questioning whether I was good enough. However, as time passed, I realized that leadership is not just about holding a title—it’s about contributing to a team in meaningful ways.Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, questioning whether I was good enough. However, as time passed, I realized that leadership is not just about holding a title—it’s about contributing to a team in meaningful ways.Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, questioning whether I was good enough. However, as time passed, I realized that leadership is not just about holding a title—it’s about contributing to a team in meaningful ways.'
        }
    }

    return {
        finalEssay,
        setFinalEssay
    }
});

export default useEssayStore;