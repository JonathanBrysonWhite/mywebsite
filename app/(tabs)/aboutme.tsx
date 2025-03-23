import { Image, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { Link } from "expo-router";

export default function AboutMeScreen() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900 px-6 py-8">
      {/* Hero Section */}
      <View className="items-center">
        <Image
          source={require('@/assets/images/headshot.jpg')}
          className="w-40 h-40 rounded-full border-4 border-gray-300 dark:border-gray-700"
        />
        <ThemedText type="title" className="mt-4 text-center">
          Hi, I'm [Your Name] 👋
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
          With experience in healthcare, government, and pharmaceutical tech, I specialize in building
          robust applications and optimizing IT infrastructure.
        </ThemedText>
      </View>

      {/* Skills Section */}
      <View className="mt-8">
        <ThemedText type="subtitle">Skills & Technologies</ThemedText>
        <ThemedText className="text-gray-700 dark:text-gray-300">
          React, React Native, Node.js, Docker, Kubernetes, DevOps, Cloud Infrastructure, IT Consulting
        </ThemedText>
      </View>

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
    </ScrollView>
  );
}
