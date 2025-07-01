import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking, Platform, useColorScheme } from 'react-native';
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
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    useEffect(() => {
        if (Platform.OS === 'web') {
            injectRecaptchaBadgeStyles();
        }
    }, []);

    const handleVerify = async (token: string) => {
        console.log('reCAPTCHA Token:', token);
        try {
            const response = await fetch('/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    recaptchaToken: token,
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                Alert.alert('Error', errorText || 'Failed to send message.');
                return;
            }
            Alert.alert('Thanks!', 'Your message has been sent.');
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            console.error(err);
            Alert.alert('Oops', 'Something went wrong. Please try again.');
        }
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
                    colors={isDarkMode ? ['#1D3D47', '#223344'] : ['#1D3D47', '#A1CEDC']}
                    style={styles.gradientBackground}
                >
                    <MaterialCommunityIcons
                        name="email-outline"
                        size={250}
                        color="#fff"
                        style={{ left: '20%', marginTop: 20 }}/>
                </LinearGradient>
            }>
            <View style={[styles.container, isDarkMode && styles.containerDark]}>
                <Text style={[styles.heading, isDarkMode && styles.headingDark]}>📬 Let's Connect</Text>
                <Text style={[styles.subtext, isDarkMode && styles.subtextDark]}>
                    Have a project idea or just want to chat? Fill out the form below or connect with me on social.
                </Text>

                <View style={styles.form}>
                    <TextInput
                        style={[styles.input, isDarkMode && styles.inputDark]}
                        placeholder="Name"
                        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
                        value={name} onChangeText={setName}
                    />
                    <TextInput
                        style={[styles.input, isDarkMode && styles.inputDark]}
                        placeholder="Email"
                        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email} onChangeText={setEmail}
                    />
                    <TextInput
                        style={[styles.input, styles.messageInput, isDarkMode && styles.inputDark]}
                        placeholder="Message"
                        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
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
                    <Text style={{ fontSize: 12, color: isDarkMode ? '#aaa' : '#888', marginTop: 16, textAlign: 'center' }}>
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

                <Text style={[styles.socialHeading, isDarkMode && styles.headingDark]}>🔗 Connect With Me</Text>
                <View style={styles.socialRow}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/bryson-white-7b0586198/')}>
                        <MaterialCommunityIcons name="linkedin" size={32} color="#0077B5" style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://github.com/JonathanBrysonWhite')}>
                        <MaterialCommunityIcons name="github" size={32} color={isDarkMode ? '#eee' : '#333'} style={styles.socialIcon} />
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
        padding: 0,
        backgroundColor: '#fff'
    },
    containerDark: {
        backgroundColor: '#181C20',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1D3D47'
    },
    headingDark: {
        color: '#90CAF9',
    },
    subtext: {
        fontSize: 16,
        marginBottom: 20,
        color: '#4F5A65'
    },
    subtextDark: {
        color: '#B0B8C1',
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
        color: '#1D3D47',
        backgroundColor: '#fff',
    },
    inputDark: {
        borderColor: '#333',
        color: '#E3F2FD',
        backgroundColor: '#23272B',
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
