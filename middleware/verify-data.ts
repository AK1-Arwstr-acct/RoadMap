export default defineNuxtRouteMiddleware((to, from) => {
    const localePath = useLocalePath();
    if (to.query.email && to.query.name && to.query.socialId) {
        if (to.query.email && to.query.name && to.query.socialId) {
            return;
        } else {
            return navigateTo(localePath('/signup'));
        }
    } else {
        const data = useCookie("signupInfo");
        if (!data.value) {
            return navigateTo(localePath('/signup'));
        }
    }
});
