export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie("token");
    const localePath = useLocalePath();

    // Define public paths where authenticated users should not stay
    const publicPaths = ["/", "/login", "/signup", "/auth", "/forgot-password"];

    // Remove locale prefix from path for comparison
    const pathWithoutLocale = to.path.replace(/^\/[a-z]{2}(?=\/|$)/, "");

    if (token.value && publicPaths.includes(pathWithoutLocale)) {
        return navigateTo(localePath("/school-list"));
    } 
    else if (!token.value && !publicPaths.includes(pathWithoutLocale) ) { //temp middleware to block public path
        return navigateTo(localePath("/"));
    }
});
