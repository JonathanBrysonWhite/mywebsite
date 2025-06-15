import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking, Platform, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LinearGradient } from 'expo-linear-gradient';
import ReCaptcha, { GoogleRecaptchaRefAttributes } from '@valture/react-native-recaptcha-v3';
import { getRecaptchaToken } from '../utils/getRecaptchaToken';
import { injectRecaptchaBadgeStyles } from '../utils/injectGlobalStyles';

const SITE_KEY = process.env.EXPO_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY ?? "";
const DOMAIN = process.env.EXPO_PUBLIC_SITE_DNS ?? "";

export default function ContactMeScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const recaptchaRef = useRef<GoogleRecaptchaRefAttributes>(null);


    useEffect(() => {
        if (Platform.OS === 'web') {
            injectRecaptchaBadgeStyles();
        }
    }, []);

    const handleVerify = (token: string) => {
        console.log('reCAPTCHA Token:', token);
        Alert.alert('Verification success', `Token: ${token}`);
        //send token to backend
    }

    const handleError = (error: string) => {
        console.log('reCAPTCHA Error:', error);
        Alert.alert('Verification Error', error);
    };


    const handleSend = async () => {
        try {
            setSubmitting(true);

            if (Platform.OS === 'web' || Platform.OS === 'ios') {
                var token = await getRecaptchaToken(SITE_KEY, 'submit_contact_form');
            } else {
                var token = await recaptchaRef.current?.getToken('login');
            }
            if (token) {
                handleVerify(token);
            } else {
                Alert.alert('Token Request Failed', 'No token received');
            }


            setSubmitting(false);
            setName('');
            setEmail('');
            setMessage('');
            Alert.alert('Thanks!', 'Your message has been sent.');
        } catch (err) {
            console.error(err);
            setSubmitting(false);
            Alert.alert('Oops', 'Something went wrong. Please try again.');
        }
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <LinearGradient
                    colors={['#1D3D47', '#A1CEDC']}
                    style={styles.gradientBackground}
                >

                </LinearGradient>
            }>
            <View style={styles.container}>
                <Text style={styles.heading}>📬 Let's Connect</Text>
                <Text style={styles.subtext}>
                    Have a project idea or just want to chat? Fill out the form below or connect with me on social.
                </Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name} onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email} onChangeText={setEmail}
                    />
                    <TextInput
                        style={[styles.input, styles.messageInput]}
                        placeholder="Message"
                        multiline
                        numberOfLines={4}
                        value={message}
                        onChangeText={setMessage}
                    />
                    {Platform.OS === 'android' &&

                        <ReCaptcha
                            ref={recaptchaRef}
                            siteKey={SITE_KEY}
                            baseUrl={DOMAIN}
                            action="homepage"
                            onVerify={handleVerify}
                            onError={handleError}
                        />
                    }


                    <TouchableOpacity
                        style={[styles.button, submitting && styles.buttonDisabled]}
                        onPress={handleSend}
                        disabled={submitting}
                    >
                        <Text style={styles.buttonText}>{submitting ? 'Sending...' : 'Send Message'}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, color: '#888', marginTop: 16, textAlign: 'center' }}>
                        This site is protected by reCAPTCHA and the Google{' '}
                        <Text onPress={() => Linking.openURL('https://policies.google.com/privacy')} style={{ color: '#0077B5' }}>
                            Privacy Policy
                        </Text>{' '}
                        and{' '}
                        <Text onPress={() => Linking.openURL('https://policies.google.com/terms')} style={{ color: '#0077B5' }}>
                            Terms of Service
                        </Text>{' '}
                        apply.
                    </Text>
                </View>

                <Text style={styles.socialHeading}>🔗 Connect With Me</Text>
                <View style={styles.socialRow}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/bryson-white-7b0586198/')}>
                        <MaterialCommunityIcons name="linkedin" size={32} color="#0077B5" style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://github.com/JonathanBrysonWhite')}>
                        <MaterialCommunityIcons name="github" size={32} color="#333" style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:contact@brysonw.net')}>
                        <MaterialCommunityIcons name="email" size={32} color="#D44638" style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1D3D47'
    },
    subtext: {
        fontSize: 16,
        marginBottom: 20,
        color: '#4F5A65'
    },
    form: {
        marginBottom: 30
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    messageInput: {
        height: 120,
        textAlignVertical: 'top'
    },
    button: {
        backgroundColor: '#1D3D47',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#7a7a7a'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    socialHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1D3D47'
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    socialIcon: {
        marginHorizontal: 15
    },
});
