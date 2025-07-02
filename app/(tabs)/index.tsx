import { Image, StyleSheet, TouchableOpacity, Linking, Text, View, useWindowDimensions, useColorScheme } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import ServicesSection from '@/components/ServicesSection';
import { ContactButton } from '@/components/ui/ContactButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <LinearGradient
          colors={['#1D3D47', '#A1CEDC']}
          style={[styles.gradientBackground]}
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          <TouchableOpacity
            style={[styles.button, !isMobile && { width: 240 }]}
            onPress={() => router.push('/portfolio')}
          >
            <Text style={styles.buttonText}>💼 View My Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !isMobile && { width: 240 }]}
            onPress={() => Linking.openURL('https://github.com/JonathanBrysonWhite')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="github" size={24} />
              <Text style={styles.buttonText}> Check Out My GitHub</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Contact CTA */}
      <ThemedView style={[styles.ctaContainer, { backgroundColor: isDarkMode ? '#1E1E1E' : '#A1CEDC' }]}>
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
    borderRadius: 8,
    margin: 16,
  },
  profileImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#1D3D47',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    width: 240,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
});
  