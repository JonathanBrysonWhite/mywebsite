import { Platform, Pressable, Text, Linking, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const LOCAL_RESUME_PATH_WEB = '/my-resume.pdf';
const LOCAL_RESUME_PATH_MOBILE = 'file:///android_asset/my-resume.pdf';

export function ResumeButton() {
  const handlePress = async () => {
    try {
      if (Platform.OS === 'web') {
        // On web, simulate a link click to local asset
        const link = document.createElement('a');
        link.href = LOCAL_RESUME_PATH_WEB;
        link.download = 'resume-bryson-white.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // On mobile, open the local PDF in browser or PDF viewer
        await WebBrowser.openBrowserAsync(LOCAL_RESUME_PATH_MOBILE);
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
