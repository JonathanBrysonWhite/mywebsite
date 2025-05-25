import { StyleSheet, Platform, View, useWindowDimensions } from 'react-native';
import { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { WebView } from 'react-native-webview';
import { ResumeButton } from '@/components/ResumeDownload';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';


export default function ResumeScreen() {
    const resumeUri = process.env.EXPO_PUBLIC_RESUME_URL!;
    const { width, height } = useWindowDimensions();
    const resumeWidth = width > 1000 ? '50%' : '100%';
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
                <LinearGradient
                  colors={['#1D3D47', '#A1CEDC']}
                  style={styles.gradientBackground}
                  >
                <Image source={require('@/assets/images/DoodleBob.webp')} style={styles.profileImage} />
                </LinearGradient>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">📄 My Resume </ThemedText>
      </ThemedView>
      <ThemedText style={styles.caption}>View or download my resume here:</ThemedText>
      {Platform.OS == 'web' ? (
        <View style={[styles.iframeContainer, {height: height * 0.8}]}>
        <iframe 
            src={ resumeUri}
            allow="autoplay"
            title="My Resume"
            style={StyleSheet.flatten([styles.iframe, {width: resumeWidth}])}
            />
        </View>
      ) : Platform.OS == 'ios' ? (
        <View style={styles.webViewContainer}>
            <WebView
                source={{uri: resumeUri}}
                originWhitelist={["*"]}
            />
        </View>
      ) : null
    }
    <ResumeButton/>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
    gradientBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
    profileImage: {
    left: "20%",
    width: 300, // Adjust as needed
    height: 300, // Should be the same as width for a perfect circle
    borderRadius: 125, // Half of width/height for a circular shape
    borderWidth: 2, // Optional: adds a subtle border
    borderColor: "#fff", // White border for contrast
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  caption: {
    fontSize: 16, 
    paddingHorizontal: 16, 
    marginVertical: 8
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  iframeContainer: {
    paddingHorizontal: 16,
    marginTop: 12
  },
  iframe: {
    height: '100%',
    borderWidth: 0,
    borderRadius: 8,
    boxShadow: '0 4px 12px rga(0, 0, 0, 0.1)',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  webViewContainer: {
    height: 600,
    width: '100%',
    paddingHorizontal: 16, 
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden'
  },
  webView: {
    flex: 1,
    borderRadius: 8
  }
});
