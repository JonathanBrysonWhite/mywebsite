import { StyleSheet, Platform, View, useWindowDimensions, Text, Pressable } from 'react-native';
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
    // Use public asset for resume on web
    const resumeUri = Platform.OS === 'web'
        ? '/my-resume.pdf'
        : 'file:///android_asset/my-resume.pdf#zoom=500';
    const { width, height } = useWindowDimensions();
    const isMobile = width < 768; // Define mobile breakpoint
    const resumeWidth = width > 1000 ? '50%' : '100%';
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <LinearGradient
                    colors={['#1D3D47', '#A1CEDC']}
                    style={styles.gradientBackground}
                >
                    <View style={styles.profileImage}>
                        <Image source={require('@/assets/images/workspace.jpg')} style={styles.profileImage}/>
                    </View>
                </LinearGradient>
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">📄 My Resume </ThemedText>
            </ThemedView>
            <ThemedText style={styles.caption}>View or download my resume here:</ThemedText>
            {Platform.OS == 'web' && !isMobile ?(
                <View style={[styles.iframeContainer, {height: height * 0.8}]}> 
                    <iframe 
                        src={resumeUri}
                        allow="autoplay"
                        title="My Resume"
                        style={StyleSheet.flatten([styles.iframe, {width: resumeWidth}])}
                    />
                </View>
            ) : Platform.OS === 'web' ? 
            (
    <Pressable
      onPress={() => window.open(resumeUri, '_blank')}
      style={{
        backgroundColor: '#1D3D47',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        width: 240,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 45,
      }}>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto' }}>
        📄 View My Resume
      </Text>
    </Pressable>
                  )
            : Platform.OS == 'ios' ? (
                <View style={styles.webViewContainer}>
                    <WebView
                        source={{uri: resumeUri}}
                        originWhitelist={["*"]}
                    />
                </View>
            ) : null}
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
    width: 200,
    height: 200,
    top: '10%',
    left: "20%",
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
