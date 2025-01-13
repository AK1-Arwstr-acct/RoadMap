export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("token");
    const allowedPaths = ["/signup", "/login", "/reset-password"]

    if (to.path === "/auth") {
        return;
    }

    if (allowedPaths.includes(to.path)) {
        if (to.path === "/login" && token.value) {
            return navigateTo("/");
        } else {
            return;
        }
    }

    if (to.path.startsWith("/forget-password")) {
        return;
      }

    if (!token.value) {
        return navigateTo("/signup");
    }
});
