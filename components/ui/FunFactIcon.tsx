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
            <View key={index} style={[styles.card, isDarkMode ? styles.cardDark : styles.cardLight ]}>
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