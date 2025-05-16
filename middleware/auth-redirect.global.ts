export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie("token");
    const localePath = useLocalePath();

    // Define public paths where authenticated users should not stay
    const publicPaths = ["/", "/login", "/signup", "/auth", "/forgot-password"];

    if (token.value && publicPaths.includes(to.path)) {
        return navigateTo(localePath("/school-list"));
    } 
    else if (!token.value && !publicPaths.includes(to.path) ) { //temp middleware to block public path
        return navigateTo(localePath("/"));
    }
});
