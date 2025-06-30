import { StyleSheet, Image, Platform, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ServicesSection from '@/components/ServicesSectionExpandable';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function ServicesScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <LinearGradient
          colors={['#1D3D47', '#A1CEDC']}
          style={styles.gradientBackground}
        >
          <MaterialIcons
            name="build"
            size={250}
            color="#fff"
            style={{ left: '20%', marginTop: 20 }} />
        </LinearGradient>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Services</ThemedText>
      </ThemedView>
      <ThemedText style={styles.intro}>
        I offer a range of services to help you build, launch, and grow your digital presence.
      </ThemedText>
      <View style={styles.servicesList}>
        <ServicesSection />
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
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  intro: {
    fontSize: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  servicesList: {
    paddingHorizontal: 8,
    gap: 16,
  },
  serviceCard: {
    backgroundColor: '#A1CEDC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 8,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceIcon: {
    marginBottom: 8,
  },
  serviceTitle: {
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 15,
    color: '#1D3D47',
  },
});
