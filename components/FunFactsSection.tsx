import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { FunFactItem } from '@/constants/FunFactIconDefinitions';
import FunFactIcons from './ui/FunFactIcon';

const funFacts: FunFactItem[] = [
  { title: 'Loves coding, web hosting, cloud, and user interface design', icon: 'computer', iconType: 'MaterialIcons' },
  { title: 'Disciplined weightlifter and fan of strength training', icon: 'weight-lifter', iconType:'MaterialCommunityIcons' },
  { title: 'Experienced outdoorsman who loves hiking', icon: 'mountains', iconType: 'Foundation' },
  { title: 'Lifelong gamer - enjoys Japanese RPGs and first-person shooters', icon: 'videogame-asset', iconType: 'MaterialIcons' },
  { title: 'Amateur musician - produces, arranges, and plays instruments', icon: 'music', iconType: 'Foundation' },
  { title: 'Passionate, thrillseeking snowboarder', icon: 'snowboarding', iconType: 'MaterialIcons' },
  { title: 'Weekend home gardener with a penchant for landscaping', icon: 'grass', iconType: 'MaterialIcons' },
  { title: 'Enjoys car and home maintenence projects', icon: 'build', iconType: 'MaterialIcons' },
];

export default function FunFactsSection() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, isDarkMode && styles.headingDark]}>✨ Fun Facts</Text>
      <View style={styles.grid}>
        <FunFactIcons items={funFacts}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1D3D47',
  },
  headingDark: {
    color: '#90CAF9', // Lighter blue for dark mode
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});
