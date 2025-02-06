export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("token");
    const localePath = useLocalePath();

    const allowedPaths = ["/onboarding", "/dashboard",]

    if (allowedPaths.includes(to.path) && !token.value) {
        return navigateTo(localePath("/login"));
    }
});
