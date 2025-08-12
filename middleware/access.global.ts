export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("token");
    const localePath = useLocalePath();
    const lastRoute = useLastRoute()

    const protectedPaths = [
        "/vi/onboarding",
        "/onboarding",
        "/profile",
        "/vi/profile",
        // "/school-list",
        // "/sophie",
        // "/ai-essay",
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
});