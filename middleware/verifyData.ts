export default defineNuxtRouteMiddleware((to, from) => {
    const route = useRoute();
    const localePath = useLocalePath();


    if (route.query.email) {
        if (route.query.email) {
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
