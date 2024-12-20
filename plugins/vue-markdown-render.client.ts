import VueMarkdown from "vue-markdown-render";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('VueMarkdown', VueMarkdown);
});
