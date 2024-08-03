export function checkIfMobile(isMobile: { value: boolean }) {
    isMobile.value = window.innerWidth <= 976;
    return isMobile.value;
}