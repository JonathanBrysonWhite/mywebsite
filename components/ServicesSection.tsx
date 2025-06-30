import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type MaterialIconName =
  | 'language'
  | 'smartphone'
  | 'computer'
  | 'settings'
  | 'cloud'
  | 'public'
  | 'storage'
  | 'build';

const services: {title: string, icon: MaterialIconName }[] = [
  { title: 'Web Development', icon: 'language' },
  { title: 'Mobile Development', icon: 'smartphone' },
  { title: 'IT Consulting', icon: 'computer' },
  { title: 'DevOps', icon: 'settings' },
  { title: 'Cloud Infrastructure', icon: 'cloud' },
  { title: 'Web Hosting', icon: 'public' },
  { title: 'Back-End Development', icon: 'storage' },
  { title: 'Business IT Troubleshooting', icon: 'build' },
];

export default function ServicesSection() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, isDarkMode && styles.headingDark]}>💼 Services I Offer</Text>
      <View style={styles.grid}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            onPress={() => router.push({ pathname: '/services', params: { expand: index } })}
            style={[
              styles.card,
              isDarkMode ? styles.cardDark : styles.cardLight
            ]}
          >
            <MaterialIcons
              name={service.icon}
              size={32}
              color={isDarkMode ? '#90CAF9' : '#1D3D47'}
            />
            <Text style={[styles.cardText, isDarkMode && styles.cardTextDark]}>{service.title}</Text>
          </TouchableOpacity>
        ))}
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
  },
  card: {
    width: '48%', // Makes it a two-column grid
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardLight: {
    backgroundColor: '#E3F2FD',
    shadowColor: '#000',
  },
  cardDark: {
    backgroundColor: '#1E1E1E', // Darker background for dark mode
    shadowColor: '#222',
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1D3D47',
  },
  cardTextDark: {
    color: '#E3F2FD', // Lighter text for dark mode
  },
});
