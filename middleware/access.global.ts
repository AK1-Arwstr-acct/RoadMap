export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("token");
    const localePath = useLocalePath();

    const allowedPaths = [
        "/onboarding",
        "/profile",
    ];

    // Remove locale prefix from path for comparison
    const pathWithoutLocale = to.path.replace(/^\/[a-z]{2}(?=\/|$)/, "");

    const requiresAuth = allowedPaths.some((path) => pathWithoutLocale.startsWith(path));

    if (requiresAuth && !token.value) {
        return navigateTo(localePath("/login"));
    }
});