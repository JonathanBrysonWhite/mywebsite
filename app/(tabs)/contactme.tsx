import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import emailjs from '@emailjs/browser';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LinearGradient } from 'expo-linear-gradient';

const SERVICE_ID = process.env.EXPO_PUBLIC_MAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.EXPO_PUBLIC_MAILJS_TEMPLATE_ID;
const USER_ID = process.env.EXPO_PUBLIC_MAILJS_PUBLIC_KEY;

export default function ContactMeScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSend = async () => {
    if (!name || !email || !message) return Alert.alert('All fields are required');

    setSubmitting(true);
    try {
      await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, { name, email, message }, USER_ID);
      setSubmitting(false);
      setName(''); setEmail(''); setMessage('');
      Alert.alert('Thanks!', 'Your message has been sent.');
    } catch (err) {
      setSubmitting(false);
      Alert.alert('Oops', 'Something went wrong. Please try again later.');
      console.error(err);
    }
  };

  return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47'}}
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

        <TouchableOpacity
          style={[styles.button, submitting && styles.buttonDisabled]}
          onPress={handleSend}
          disabled={submitting}
        >
          <Text style={styles.buttonText}>{submitting ? 'Sending...' : 'Send Message'}</Text>
        </TouchableOpacity>
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
        fontWeight: '600' },
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
