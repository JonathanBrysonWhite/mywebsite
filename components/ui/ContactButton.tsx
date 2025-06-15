
import { useRouter } from "expo-router"
import { Pressable } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { StyleSheet } from "react-native"


type ContactButtonProps = {
    buttonText: string
}
export function ContactButton({buttonText}:ContactButtonProps) {
    const router = useRouter();
    return(
        <Pressable  style={styles.contactButton} onPress={() => router.navigate('/(tabs)/contactme')}>
          <ThemedText style={styles.contactButtonText}> {buttonText}</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contactButton: {
        marginTop: 8,
        backgroundColor: '#1D3D47',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        width: 240,
    },
    contactButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});