import { Image, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import SkillsSection from "@/components/SkillsSection";
import FunFactsSection from "@/components/FunFactsSection";
import { ResumeButton } from "@/components/ResumeDownload"
import { ContactButton } from "@/components/ui/ContactButton";

export default function AboutMeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <LinearGradient
          colors={['#1D3D47', '#A1CEDC']}
          style={styles.gradientBackground}
        >
          <View style={styles.imageContainer}>
            <Image source={require('@/assets/images/headshot.jpg')} style={styles.profileImage} />
          </View>
        </LinearGradient>
      }>
      {/* Hero Section */}
      <View className="items-center">
        <ThemedText type="title" className="mt-4 text-center">
          About Me
        </ThemedText>
        <ThemedText className="text-center text-gray-600 dark:text-gray-400">
          Full Stack Developer | IT Professional | DevOps Engineer
        </ThemedText>
      </View>

      {/* Background Section */}
      <View className="mt-8">
        <ThemedText type="subtitle">My Journey</ThemedText>
        <ThemedText className="text-gray-700 dark:text-gray-300">
          Originally from Tennessee, I moved to Arizona to pursue my passion for software engineering.
          With experience in the domains of healthcare, government, pharmaceutical, GIS, and AI / ML, I specialize in building
          robust applications and optimizing IT infrastructure.
        </ThemedText>
      </View>

      {/* Skills Section */}
      <ThemedText type="subtitle" style={styles.titleText}>Skills & Technologies</ThemedText>
      <SkillsSection />

      {/* Fun Facts Section */}
      <FunFactsSection />

      {/* Call to Action */}
      <View className="mt-8 items-center">
        <View style={styles.contactButtonContainer}>
          <ContactButton buttonText="📩 Contact Me" />
        </View>
        <ResumeButton />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 305,
    height: 305,
    borderRadius: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 8,
    left: '20%',
    position: 'absolute'
  },
  contactButtonContainer: {
    padding: 8,
    alignItems: 'center'
  },
  titleText: {
    marginBottom: 4
  },
  gradientBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: '100%',
    overflow: 'hidden',
    resizeMode: 'cover',
  }
})
