import { Resend } from 'resend';
const GOOGLE_SECRET = process.env.GOOGLE_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
    const body = await request.json();
    const recaptchaToken = body.recaptchaToken;

    if (!body.name || !body.email || !body.message) {
        return new Response('Name, email, and message are required', { status: 400 });
    }
    if (!recaptchaToken) {
        return new Response('reCAPTCHA token is required', { status: 400 });
    }
    if (!GOOGLE_SECRET) {
        return new Response('Google secret key is not set', { status: 500 });
    }

    try {
        const isValid = await verifyRecaptcha(recaptchaToken);
        if (!isValid) {
            return new Response('Invalid reCAPTCHA token', { status: 400 });
        }
    } catch (error) {
        console.error('reCAPTCHA verification failed:', error);
        return new Response('reCAPTCHA verification failed', { status: 500 });
    }

    try {
        const resend = new Resend(RESEND_API_KEY || '');
        const {data, error} = await resend.emails.send({
            from: `Test <onboarding@resend.dev>`,
            to: 'admin@brysonw.net',
            subject: `Contact Form Submission from ${body.name}`,
            html: '<p>You have received a new contact form submission:</p>' +
                  `<p><strong>Name:</strong> ${body.name}</p>` + 
                    `<p><strong>Email:</strong> ${body.email}</p>` +
                    `<p><strong>Message:</strong> ${body.message}</p>`,
        });
        if (error) {
            console.error('Error sending email:', error);
            return new Response('Failed to send email ', { status: 500 });
        }
    } catch (error) {
        console.error('Failed to send email:', error);
        return new Response('Failed to send email', { status: 500 });
    }
    return new Response("Email successfuly sent!");
}

function verifyRecaptcha(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: GOOGLE_SECRET || '',
                response: token,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resolve(true);
            } else {
                reject(new Error('reCAPTCHA verification failed'));
            }
        })
        .catch(reject);
    });
}
