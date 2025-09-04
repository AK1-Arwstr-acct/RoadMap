import useAppStore from "~/stores/AppStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("token");
    const userRole = useCookie("userRole");
    const isStudentnboarded = useCookie("isStudentnboarded");
    const localePath = useLocalePath();
    const lastRoute = useLastRoute();

    const counselorPaths = [
        "/counselor/students",
        "/vi/counselor/students",
        "/counselor/schools",
        "/vi/counselor/schools",
        "/counselor/referral",
        "/vi/counselor/referral"
    ];

    const protectedPaths = [
        "/vi/onboarding",
        "/onboarding",
        "/profile",
        "/vi/profile",
        // "/school-list",
        // "/sophie",
        // "/ai-essay",
        ...counselorPaths,
    ];

    if (from.fullPath && from.fullPath !== to.fullPath) {
        lastRoute.value = from.fullPath
    }

    // const notAllowedPathsIfLoggedIn = ["/", "/login", "/signup", "/auth", "/forgot-password"];
    const notAllowedPathsIfLoggedIn = ["/login", "/signup", "/auth", "/forgot-password"];
    // Check if the current path is public and user is logged in
    if (notAllowedPathsIfLoggedIn.includes(to.path) && token.value) {
        // If user is logged in, redirect to school list (handle different languages)
        return navigateTo(localePath("/school-list"));
    }
    // If the user is not logged in, prevent access to protected paths
    if (!token.value && protectedPaths.includes(to.path)) {
        // Redirect to login if they are not logged in but trying to access restricted paths
        return navigateTo(localePath("/login"));
    }

    // --- Counselor access logic ---
    if (token.value && userRole.value) {
        const isCounselor = userRole.value.includes("counselor");
        if (isCounselor) {
            // Block home route for counselors
            if (to.path === "/") {
                return navigateTo(localePath("/counselor/students"));
            }
            // Counselor can only access counselorPaths
            if (!counselorPaths.includes(to.path)) {
                return navigateTo(localePath("/counselor/students"));
            }
        } else {
            // Non-counselor cannot access counselorPaths
            if (counselorPaths.includes(to.path)) {
                return navigateTo(localePath("/"));
            }
            if (!isStudentnboarded.value && to.path != localePath("/onboarding")) {
                return navigateTo(localePath("/onboarding"));
            }
        }
    }
});