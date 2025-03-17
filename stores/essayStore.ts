import axios from "axios";
import { defineStore } from "pinia";

const useEssayStore = defineStore("essayStore", () => {
    const { api } = useApi();
    const { showToast } = useToast();

    const essayProgress = ref<number>(0);
    const usereEssayList = ref([
        {
            any_regrets: "dc",
            core_message: "212",
            dob: "2008",
            dream_school: "d",
            generated_essay: "Title: Embracing Authenticity: A Journey of Self-Discovery\n\nEssay: From the moment I took my first breath, the path before me seemed predetermined – a linear trajectory carved out by societal expectations and familial aspirations. Born in 2008, I was raised to believe that academic excellence was the sole measure of success, a relentless pursuit that consumed every waking hour. Yet, as I navigated the labyrinth of extracurricular classes and mountains of homework, a nagging sense of emptiness gnawed at my soul.\n\nIt wasn't until I dared to step outside the confines of this rigid mold that I truly began to awaken. A spontaneous trip to the cinema with friends, a fleeting moment of rebellion that sparked a firestorm of parental disapproval, became the catalyst for my transformation. In that brief respite from the incessant pressure, I tasted the exhilarating freedom of living on my own terms, and the weight of expectations that had shackled me for so long began to dissipate.\n\nThe path to self-discovery was arduous, a relentless battle against deeply ingrained habits and the fear of disappointing those whose approval I craved. Yet, with each small act of defiance – cutting back on unnecessary classes, initiating conversations, and embracing my imperfections – I chipped away at the invisible burden that had suffocated my authentic self.\n\nAs I stand on the precipice of a new chapter, my dream of attending d and pursuing aa as my intended major is no longer a mere aspiration but a testament to the transformative power of self-acceptance. The regrets that once weighed heavily upon me, dc, have become invaluable lessons, teaching me zcz – a wisdom that will guide me through the challenges that lie ahead.\n\nThis is not a story of success as conventionally defined, but rather a tale of a soul's awakening. It is the chronicle of a journey towards embracing my authentic self, shedding the shackles of external expectations, and learning to live life on my own terms. For it is only when we have the courage to confront our fears and embrace our imperfections that we can truly soar.",
            lesson_from_regrets: "zcz",
            major: "aa",
            personal_statement: "Growth and Transformation: Before-and-after snapshots of the soul",
        },
        {
            any_regrets: "dc",
            core_message: "212",
            dob: "2008",
            dream_school: "d",
            generated_essay: "Title: Embracing Authenticity: A Journey of Self-Discovery\n\nEssay: From the moment I took my first breath, the path before me seemed predetermined – a linear trajectory carved out by societal expectations and familial aspirations. Born in 2008, I was raised to believe that academic excellence was the sole measure of success, a relentless pursuit that consumed every waking hour. Yet, as I navigated the labyrinth of extracurricular classes and mountains of homework, a nagging sense of emptiness gnawed at my soul.\n\nIt wasn't until I dared to step outside the confines of this rigid mold that I truly began to awaken. A spontaneous trip to the cinema with friends, a fleeting moment of rebellion that sparked a firestorm of parental disapproval, became the catalyst for my transformation. In that brief respite from the incessant pressure, I tasted the exhilarating freedom of living on my own terms, and the weight of expectations that had shackled me for so long began to dissipate.\n\nThe path to self-discovery was arduous, a relentless battle against deeply ingrained habits and the fear of disappointing those whose approval I craved. Yet, with each small act of defiance – cutting back on unnecessary classes, initiating conversations, and embracing my imperfections – I chipped away at the invisible burden that had suffocated my authentic self.\n\nAs I stand on the precipice of a new chapter, my dream of attending d and pursuing aa as my intended major is no longer a mere aspiration but a testament to the transformative power of self-acceptance. The regrets that once weighed heavily upon me, dc, have become invaluable lessons, teaching me zcz – a wisdom that will guide me through the challenges that lie ahead.\n\nThis is not a story of success as conventionally defined, but rather a tale of a soul's awakening. It is the chronicle of a journey towards embracing my authentic self, shedding the shackles of external expectations, and learning to live life on my own terms. For it is only when we have the courage to confront our fears and embrace our imperfections that we can truly soar.",
            lesson_from_regrets: "zcz",
            major: "aa",
            personal_statement: "Growth and Transformation: Before-and-after snapshots of the soul",
        },
        {
            any_regrets: "dc",
            core_message: "212",
            dob: "2008",
            dream_school: "d",
            generated_essay: "Title: Embracing Authenticity: A Journey of Self-Discovery\n\nEssay: From the moment I took my first breath, the path before me seemed predetermined – a linear trajectory carved out by societal expectations and familial aspirations. Born in 2008, I was raised to believe that academic excellence was the sole measure of success, a relentless pursuit that consumed every waking hour. Yet, as I navigated the labyrinth of extracurricular classes and mountains of homework, a nagging sense of emptiness gnawed at my soul.\n\nIt wasn't until I dared to step outside the confines of this rigid mold that I truly began to awaken. A spontaneous trip to the cinema with friends, a fleeting moment of rebellion that sparked a firestorm of parental disapproval, became the catalyst for my transformation. In that brief respite from the incessant pressure, I tasted the exhilarating freedom of living on my own terms, and the weight of expectations that had shackled me for so long began to dissipate.\n\nThe path to self-discovery was arduous, a relentless battle against deeply ingrained habits and the fear of disappointing those whose approval I craved. Yet, with each small act of defiance – cutting back on unnecessary classes, initiating conversations, and embracing my imperfections – I chipped away at the invisible burden that had suffocated my authentic self.\n\nAs I stand on the precipice of a new chapter, my dream of attending d and pursuing aa as my intended major is no longer a mere aspiration but a testament to the transformative power of self-acceptance. The regrets that once weighed heavily upon me, dc, have become invaluable lessons, teaching me zcz – a wisdom that will guide me through the challenges that lie ahead.\n\nThis is not a story of success as conventionally defined, but rather a tale of a soul's awakening. It is the chronicle of a journey towards embracing my authentic self, shedding the shackles of external expectations, and learning to live life on my own terms. For it is only when we have the courage to confront our fears and embrace our imperfections that we can truly soar.",
            lesson_from_regrets: "zcz",
            major: "aa",
            personal_statement: "Growth and Transformation: Before-and-after snapshots of the soul",
        },
    ])
    const finalEssay = ref<{ title: string, essayText: string }>()
    const essayPayload = ref()

    const setFinalEssay = (data: { title: string, essayText: string }) => {
        finalEssay.value = data;
    }

    const getEssayList = async () => {
        try {
            const response = await api.get("/api/v1/student/get-my-generated-essay");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    }

    return {
        essayPayload,
        essayProgress,
        finalEssay,
        usereEssayList,
        setFinalEssay,
        getEssayList
    }
});

export default useEssayStore;