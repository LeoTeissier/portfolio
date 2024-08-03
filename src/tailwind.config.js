/** @type {import('tailwindcss').Config} */
export const theme = {
    screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '976px',
        'xl': '1440px',
    },
    colors: {
        primary: {
            DEFAULT: '#01080E',
            light: '#011627',
            dark: '#011221'
        },
        secondary: {
            DEFAULT: '#607B96',
            light: '#3C9D93',
            dark: '#4D5BCE',
            extra: '#FFFFFF'
        },
        accent: {
            DEFAULT: '#FEA55F',
            light: '#43D9AD',
            dark: '#E99287',
            extra: '#C98BDF'
        },
        border: {
            DEFAULT: '#1E2D3D',
        },
        text: {
            DEFAULT: '#607B96',
            light: '#E5E9F0',
            dark: '#121313',
        },
    },
    extend: {
        textColor: {
            'primary': '#607B96',
            'secondary': '#FEA55F',
            'accent': '#5565E8FF',
            'extra': '#C98BDF',
            'border': '#1E2D3D',
            'text': '#E5E9F0',
        },
    },
};