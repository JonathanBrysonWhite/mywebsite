import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons, Foundation } from "@expo/vector-icons";
import {FunFactItem} from "@/constants/FunFactIconDefinitions";
import { View } from "react-native";
import { StyleSheet, useColorScheme, Text } from "react-native";


type FunFactIconsProps = {
    items: FunFactItem[]
}
export default function FunFactIcons({items}: FunFactIconsProps) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme == "dark";
    return(
        items.map((item, index) => (
            <View key={index} style={[
                styles.card,
                isDarkMode ? styles.cardDark : styles.cardLight
            ]}>
                {item.iconType === 'MaterialIcons' ? (
                    <MaterialIcons name={item.icon} size={32} color={isDarkMode ? "#90CAF9" : "#1D3D47"}/>
                ) : item.iconType === 'Foundation' ? (
                    <Foundation name={item.icon} size={32} color={isDarkMode ? "#90CAF9" : "#1D3D47"}/>
                ) :
                (
                    <MaterialCommunityIcons name={item.icon} size={32} color={isDarkMode ? "#90CAF9" : "#1D3D47"}/>                    
                )}
                <Text style={[styles.cardText, isDarkMode && styles.cardTextDark]}>
                    {item.title}
                </Text>
            </View>
        ))
    );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#E5E7EB', // match FunFactsSection
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: 'transparent', // Remove shadow
    elevation: 0, // Remove shadow
    borderWidth: 0, // Remove border
  },
  cardLight: {
    backgroundColor: '#E5E7EB',
    shadowColor: 'transparent',
  },
  cardDark: {
    backgroundColor: '#23272B', // subtle dark grey for dark mode
    shadowColor: 'transparent',
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#1D3D47',
    opacity: 0.85,
  },
  cardTextDark: {
    color: '#E3F2FD',
    opacity: 0.85,
  },
});