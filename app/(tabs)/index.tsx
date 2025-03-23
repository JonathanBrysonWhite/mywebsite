import { Image, StyleSheet, Platform, View, TouchableOpacity, Linking } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import ServicesSection from '@/components/ServicesSection';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <LinearGradient
          colors={['#1D3D47', '#A1CEDC']}
          style={styles.gradientBackground}
          >
        <Image source={require('@/assets/images/bryson-headshot.png')} style={styles.profileImage} />
        </LinearGradient>
      }>
      
      {/* Intro Section */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hi, I'm Bryson!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText style={styles.bioText}>
        A full-stack developer & IT consultant specializing in web & backend development, cloud infrastructure, and business IT solutions. Let's build something amazing together!
      </ThemedText>

      {/* Services Section */}
      <ServicesSection />

      {/* Portfolio Preview */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">🚀 My Portfolio</ThemedText>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/yourgithub')}>
          <ThemedText style={styles.link}>🔗 Check out my GitHub</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Contact CTA */}
      <ThemedView style={styles.ctaContainer}>
        <ThemedText type="subtitle">📩 Let's Work Together</ThemedText>
        <ThemedText>Contact me for a free consultation.</ThemedText>
        <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL('mailto:your@email.com')}>
          <ThemedText style={styles.contactButtonText}>Get in Touch</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bioText: {
    fontSize: 16,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  section: {
    padding: 16,
    marginVertical: 8,
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  ctaContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#A1CEDC',
    borderRadius: 8,
    margin: 16,
  },
  contactButton: {
    marginTop: 8,
    backgroundColor: '#1D3D47',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 5, 
  },
  contactButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  profileImage: {
    left: "20%",
    width: 300, // Adjust as needed
    height: 300, // Should be the same as width for a perfect circle
    borderRadius: 125, // Half of width/height for a circular shape
    borderWidth: 2, // Optional: adds a subtle border
    borderColor: "#fff", // White border for contrast
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
});
