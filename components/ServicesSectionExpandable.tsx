import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

type MaterialIconName =
  | 'language'
  | 'smartphone'
  | 'computer'
  | 'settings'
  | 'cloud'
  | 'public'
  | 'storage'
  | 'build';

const services: {title: string, icon: MaterialIconName, description: string }[] = [
  { title: 'Web Development', icon: 'language', description: 'Beautiful, modern websites that look great on any device. Whether you need a simple landing page or a full-featured web app, I use the latest tools like React and Next.js to bring your vision to life.' },
  { title: 'Mobile Development', icon: 'smartphone', description: 'I build mobile apps that work seamlessly on both iPhone and Android devices. From idea to app store, I will help you reach your customers wherever they are.' },
  { title: 'IT Consulting', icon: 'computer', description: 'Not sure what technology your business needs? I offer clear, expert guidance to help you choose the right tools, improve efficiency, and avoid costly mistakes.' },
  { title: 'DevOps', icon: 'settings', description: 'I streamline your development and deployment process so updates happen faster, with fewer bugs. Think of it as putting your software team into high gear.' },
  { title: 'Cloud Infrastructure', icon: 'cloud', description: 'I set up and manage your apps on secure, scalable cloud platforms like AWS and Azure - so your systems stay fast, reliable, and always available.' },
  { title: 'Web Hosting', icon: 'public', description: 'Fast and secure web hosting for your business. I take care of everything so your site stays online, loads quickly, and is protected from threats.' },
  { title: 'Back-End Development', icon: 'storage', description: 'Let me build the behind-the-scenes systems that power your app or website. Secure, scalable, and built to handle your business\'s needs with tools like Node.js and C#.' },
  { title: 'Business IT Troubleshooting', icon: 'build', description: 'When tech problems slow you down, I\'m here to fix them fast. From internet issues to computer bugs, I will keep your business running smoothly.' },
];

export default function ServicesSection() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const params = useLocalSearchParams();
  const expandParam = params.expand !== undefined ? Number(params.expand) : null;
  const [expandedIdx, setExpandedIdx] = useState<number | null>(expandParam);
  // Animated values for each card
  const CARD_COLLAPSED_HEIGHT = 150;
  const CARD_EXPANDED_HEIGHT = 210;
  const CARD_COLLAPSED_WIDTH = '48%';
  const CARD_EXPANDED_WIDTH = '100%';
  const animatedHeights = useRef(services.map(() => new Animated.Value(CARD_COLLAPSED_HEIGHT))).current;
  const animatedWidths = useRef(services.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    services.forEach((_, idx) => {
      if (expandedIdx === idx) {
        Animated.parallel([
          Animated.timing(animatedHeights[idx], {
            toValue: CARD_EXPANDED_HEIGHT,
            duration: 350,
            useNativeDriver: false,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(animatedWidths[idx], {
            toValue: 1,
            duration: 350,
            useNativeDriver: false,
            easing: Easing.out(Easing.cubic),
          })
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(animatedHeights[idx], {
            toValue: CARD_COLLAPSED_HEIGHT,
            duration: 250,
            useNativeDriver: false,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(animatedWidths[idx], {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
            easing: Easing.out(Easing.cubic),
          })
        ]).start();
      }
    });
  }, [expandedIdx]);

  useEffect(() => {
    setExpandedIdx(expandParam);
  }, [expandParam]);

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, isDarkMode && styles.headingDark]}>💼 Services I Offer</Text>
      <View style={styles.grid}>
        {services.map((service, index) => {
          const expanded = expandedIdx === index;
          // Interpolate width between 48% and 100%
          const width = animatedWidths[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['48%', '100%'],
          });
          return (
            <Animated.View
              key={index}
              style={[
                expanded ? styles.expandedCard : styles.card,
                { height: animatedHeights[index], width, overflow: 'hidden' },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                style={{ flex: 1, width: '100%' }}
                onPress={() => setExpandedIdx(expanded ? null : index)}
              >
                <View style={{ marginTop: 'auto', marginBottom: 'auto'}}>
                <MaterialIcons
                  name={service.icon}
                  size={expanded ? 48 : 32}
                  color={isDarkMode ? '#90CAF9' : '#1D3D47'}
                  style={[styles.cardIcon]}
                />
                <Text style={[styles.cardText, isDarkMode && styles.cardTextDark, expanded && styles.expandedCardText]}>{service.title}</Text>
               
                </View>
                 {expanded && (
                  <Animated.View style={{ opacity: animatedHeights[index].interpolate({
                    inputRange: [CARD_COLLAPSED_HEIGHT, CARD_EXPANDED_HEIGHT],
                    outputRange: [0, 1],
                  }) }}>
                    <Text style={[styles.cardDescription, isDarkMode && styles.cardDescriptionDark]}>{service.description}</Text>
                  </Animated.View>
                )}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
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
    color: '#90CAF9',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
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
  expandedCard: {
    width: '100%',
    backgroundColor: '#A1CEDC',
    padding: 24,
    borderRadius: 14,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  cardIcon: {

    marginBottom: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardText: {
    marginTop: 0,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1D3D47',
  },
  expandedCardText: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardTextDark: {
    color: '#E3F2FD',
  },
  cardDescription: {
    marginTop: 6,
    fontSize: 15,
    color: '#1D3D47',
    textAlign: 'center',
  },
  cardDescriptionDark: {
    color: '#E3F2FD',
  },
});
