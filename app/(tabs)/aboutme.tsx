import { Image, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import SkillsSection from "@/components/SkillsSection";

export default function AboutMeScreen() {
  return (
    <ParallaxScrollView 
    headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
    headerImage={
      <LinearGradient
      colors={['#1D3D47', '#A1CEDC']}
      style={styles.gradientBackground}
      >
      <Image source={require('@/assets/images/headshot.jpg')} style={styles.profileImage}/>
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
      <SkillsSection/>

      {/* Fun Facts Section */}
      <View className="mt-8">
        <ThemedText type="subtitle">Fun Facts</ThemedText>
        <ThemedText className="text-gray-700 dark:text-gray-300">
          - I love building cool front-end components 🎨  
          - I enjoy DevOps automation ⚙️  
          - Big fan of self-hosting and VPS setups 🚀  
        </ThemedText>
      </View>

      {/* Call to Action */}
      <View className="mt-8 items-center">
        <Link href="about:blank">
          <Button label="Contact Me" />
        </Link>
        <Button label="Download Resume" variant="secondary" className="mt-4" onPress={() => {}} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 4
  },
  gradientBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  profileImage: {
    left: '20%',
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150, // Correctly rounding the image
    borderWidth: 5, // Adding border width for visibility,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 1.0, // Controls the shadow intensity
    shadowRadius: 5, // Controls the blur radius for iOS
    elevation: 5, // For Android shadow
    borderColor: '#fff'
  }
})
