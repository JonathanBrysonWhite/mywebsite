import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Pressable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const isSmallScreen = width < 900;

  if (isSmallScreen) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={({ navigation }) => ({
            headerLeft: () => (
              <Pressable onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
                <Ionicons name="menu" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
              </Pressable>
            ),
          })}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: 'Home',
              drawerIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
          />
          <Drawer.Screen
            name="portfolio"
            options={{
              title: 'Portfolio',
              drawerIcon: ({ color }) => <IconSymbol size={28} name="briefcase.fill" color={color} />
            }}
          />
          <Drawer.Screen
            name="services"
            options={{
              title: 'Services',
              drawerIcon: ({ color }) => <IconSymbol size={28} name="wrench.fill" color={color} />,
            }}
          />
          <Drawer.Screen
            name="aboutme"
            options={{
              title: 'About Me',
              drawerIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
            }}
          />
          <Drawer.Screen
            name="resume"
            options={{
              title: 'Resume',
              drawerIcon: ({ color }) => <IconSymbol size={28} name="person.text.rectangle.fill" color={color} />
            }}
          />
          <Drawer.Screen
            name="contactme"
            options={{
              title: 'Contact Me',
              drawerIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    );
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="briefcase.fill" color={color} />
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="wrench.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="aboutme"
        options={{
          title: 'About Me',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="resume"
        options={{
          title: 'Resume',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.text.rectangle.fill" color={color} />
        }}
      />
      <Tabs.Screen
        name="contactme"
        options={{
          title: 'Contact Me',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />
        }}
      />
    </Tabs>
  );
}
