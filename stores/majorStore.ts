import { defineStore } from "pinia";
import type { MajorsTabs, MajorsSelectionChat } from "~/types/home";

const useMajorStore = defineStore("majorStore", () => {
    // tabs
    const activeTab = ref<MajorsTabs>("chat");
    const navigateFromTabInside = ref<boolean>(false);
    const inputText = ref<string>("");

    // chat
    const firstRun = ref<boolean>(true); //to triger the mounted function at chat
    const showQuiz = ref<boolean>(false);
    const isQuizStart = ref<boolean>(false);
    const initialChat = ref<MajorsSelectionChat[]>([]);
    const completeChat = ref<MajorsSelectionChat[]>([]);

    // quiz stepper
    const currentStep = ref(0);
    const quiz = [
        {
            question: "Which statement best describes you (Select all that apply)",
            options: [
                "I am comfortable with numbers or math",
                "I am great with people or social skills",
                "I can withstand hard physical work",
                "I enjoy written and verbal communication",
            ],
        },
        {
            question: "What type of environment do you prefer?",
            options: [
                "Quiet and focused",
                "Collaborative and social",
                "Active and outdoors",
                "Creative and expressive",
            ],
        },
    ];
    const answers = ref<string[]>(Array(quiz.length).fill(""));
    const extraQuestion = ref<{ mbti: string, activities: string }>({
        mbti: "",
        activities: ""
    })
    const isStepperSubmitted = ref<boolean>(false);
    const isQuizSubmitting = ref<boolean>(false);

    // cluster
    const cluster = ref<{ heading: string, summary: string }>({
        heading: "N/A",
        summary: ""
    })

    const clearStoreData = () => {
        activeTab.value = "chat"
        inputText.value = ""
        navigateFromTabInside.value = false
        firstRun.value = true
        showQuiz.value = false
        isQuizStart.value = false
        initialChat.value = []
        completeChat.value = []
        currentStep.value = 0
        answers.value = Array(quiz.length).fill("")
        extraQuestion.value = {
            mbti: "",
            activities: ""
        }
        isStepperSubmitted.value = false
        isQuizSubmitting.value = false
        cluster.value = {
            heading: "N/A",
            summary: ""
        }
    }

    return {
        activeTab,
        navigateFromTabInside,
        inputText,
        firstRun,
        showQuiz,
        isQuizStart,
        initialChat,
        completeChat,

        // quiz variables
        currentStep,
        quiz,
        answers,
        extraQuestion,
        isStepperSubmitted,
        isQuizSubmitting,
        cluster,
        clearStoreData
    }
})

export default useMajorStore;