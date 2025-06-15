declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: {action:string}) => Promise<string>;
        }
    }
}
export const loadRecaptcha = (siteKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if(typeof window === 'undefined') return reject('no window');

        if (window.grecaptcha) {
            return resolve();
        }

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject('Failed to load reCAPTCHA');
        document.body.appendChild(script);
    });
}