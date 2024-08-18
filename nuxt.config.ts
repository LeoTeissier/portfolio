import { defineNuxtConfig } from'nuxt/config';
import { resolve } from 'path';
import config from'./src/developer.json';

const siteTitle = `${config.name} | ${config.role}`;

export default defineNuxtConfig({
    srcDir: 'src/',
    buildDir: '.nuxt/',
    ssr: false,

    vite: {
        resolve: {
            alias: {
                '@src': resolve(__dirname, 'src'),
                '~/assets': resolve(__dirname, 'src/assets'),
            },
        },
    },

    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-aos',
    ],

    app: {
        head: {
            title: siteTitle,
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'An awesome developer portfolio design.' },
                { hid: 'og:title', property: 'og:title', content: siteTitle },
                { hid: 'og:description', property: 'og:description', content: 'An awesome developer portfolio design.' },
                { hid: 'og:image', property: 'og:image', content: 'demo-share.jpg' },
                { hid: 'og:url', property: 'og:url', content: 'https://developer-portfolio-v1.netlify.app/' },
                { name: 'theme-color', content: '#010C15' },
            ],
        },
    },

    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },

    css: [
        '@/assets/css/main.css',
    ],

});
