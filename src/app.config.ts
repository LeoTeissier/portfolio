import { defineAppConfig } from 'nuxt/app';

const defineAppConfig1 = defineAppConfig({
    title: 'Hello Nuxt',
    blog:{
        enabled: true,
    },
    theme: {
        dark: true,
        colors: {
            primary: '#ff0000'
        }
    }
});

export default defineAppConfig1