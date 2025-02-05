export default defineNuxtRouteMiddleware((to, from) => {
    const localePath = useLocalePath();
    if (to.query.email) {
        if (to.query.email) {
            return;
        }
        else {
            return navigateTo(localePath('/signup'));
        }
    } else {
        const data = useCookie("signupInfo");
        if (!data.value) {
            return navigateTo(localePath('/signup'));
        }
    }
});
