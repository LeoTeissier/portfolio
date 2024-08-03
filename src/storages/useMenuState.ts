import { ref } from 'vue';

const menuOpen = ref(false);

export function useMenuState() {
    function toggleMobileMenu() {
        menuOpen.value = !menuOpen.value;
    }

    return { menuOpen, toggleMobileMenu };
}
