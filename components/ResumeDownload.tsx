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
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 16,
        alignSelf: 'center',
      }}>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
        📥 Download My Resume
      </Text>
    </Pressable>
  );
}
