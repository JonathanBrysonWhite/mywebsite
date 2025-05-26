import { Platform, Pressable, Text, Linking, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const GOOGLE_DRIVE_DOWNLOAD_URL = process.env.EXPO_PUBLIC_RESUME_DOWNLOAD_URL!;

export function ResumeButton() {
  const handlePress = async () => {
    try {
      if (Platform.OS === 'web') {
        // On web, simulate a link click
        const link = document.createElement('a');
        link.href = GOOGLE_DRIVE_DOWNLOAD_URL;
        link.download = 'resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // On mobile, open the link in browser
        await WebBrowser.openBrowserAsync(GOOGLE_DRIVE_DOWNLOAD_URL);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to download resume.");
      console.error(error);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
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
        📥 Download My Resume
      </Text>
    </Pressable>
  );
}
