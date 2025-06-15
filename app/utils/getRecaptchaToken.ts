import { loadRecaptcha } from "./LoadRecaptcha"

export const getRecaptchaToken = async (siteKey: string, action: string): Promise<string> => {
    await loadRecaptcha(siteKey);
    return new Promise((resolve, reject) => {
        if(!window.grecaptcha) return reject('reCAPTCHA not loaded');

        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(siteKey, { action })
                .then(resolve)
                .catch(reject);
        });
    });
}