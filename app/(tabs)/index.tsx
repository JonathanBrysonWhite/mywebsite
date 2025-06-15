import { Image, StyleSheet, TouchableOpacity, Linking, Text, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import ServicesSection from '@/components/ServicesSection';
import { ContactButton } from '@/components/ui/ContactButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <LinearGradient
          colors={['#1D3D47', '#A1CEDC']}
          style={styles.gradientBackground}
        >
          <View style={styles.imageContainer}>
            <Image source={require('@/assets/images/bryson-headshot.png')} style={styles.profileImage} />
          </View>
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
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => Linking.openURL('https://github.com/JonathanBrysonWhite')}
        >
          <Text style={styles.buttonText}>Check Out My Github! </Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Contact CTA */}
      <ThemedView style={styles.ctaContainer}>
        <ThemedText type="subtitle">📩 Let's Work Together</ThemedText>
        <ThemedText>Contact me for a free consultation.</ThemedText>
        <ContactButton buttonText="Get in Touch" />
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 125,
    borderColor: '#fff',
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    left: '20%',
    overflow: 'hidden', // Ensures child image is clipped
  },
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
  profileImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#1D3D47',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
});
