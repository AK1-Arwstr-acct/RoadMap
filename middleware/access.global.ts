export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("token");
    const localePath = useLocalePath();

    const allowedPaths = [
        "/onboarding",
        "/profile",
    ];

    const requiresAuth = allowedPaths.some((path) => to.path.startsWith(path));

    if (requiresAuth && !token.value) {
        return navigateTo(localePath("/login"));
    }
});
