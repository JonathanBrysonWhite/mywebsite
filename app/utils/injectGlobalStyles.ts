export const injectRecaptchaBadgeStyles = () => {
    if (typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.innerHTML = `
        .grecaptcha-badge {
            visibility: hidden
        }
    `
    document.head.appendChild(style);
}