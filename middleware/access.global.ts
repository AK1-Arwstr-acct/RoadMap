export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("token");
    const allowedPaths = ["/signup", "/login", "/reset-password"]

    if (allowedPaths.includes(to.path)) {
        return;
    }

    if (to.path.startsWith("/forget-password")) {
        return;
      }

    if (!token.value) {
        return navigateTo("/signup");
    }
});
