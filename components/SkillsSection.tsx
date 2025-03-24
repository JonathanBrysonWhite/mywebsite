import { StyleSheet, View, Image, FlatList, useWindowDimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import SkillItem from "./ui/SkillItem";
const skills = [
  { name: "C#", icon: require("@/assets/icons/csharp.svg") },
  { name: "Java", icon: require("@/assets/icons/java.svg") },
  { name: "Python", icon: require("@/assets/icons/python.png") },
  { name: "React", icon: require("@/assets/icons/react.svg") },
  { name: "Azure", icon: require("@/assets/icons/azure.png") },
  { name: "AWS", icon: require("@/assets/icons/aws.png") },
  { name: "Docker", icon: require("@/assets/icons/docker.svg") },
  { name: "PostgreSQL", icon: require("@/assets/icons/postgres.svg") },
];

export default function SkillsSection() {
    const { width } = useWindowDimensions();
    const numColumns = width <= 400 ? 2 : width <= 700 ? 3 : 4;
  return (
    <View style={styles.container}>
        <FlatList
          key={numColumns}
          data={skills}
          keyExtractor={(item) => item.name}
          numColumns={numColumns}
          contentContainerStyle={styles.skillList}
          renderItem={({ item }) => <SkillItem name={item.name} icon={item.icon} />}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        width: '75%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    bubble: {
        margin: 20,
        width: 100,
        height: 100,
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {width: 4, height: 2},
        shadowRadius: 4,
        shadowOpacity: 0.5,
        alignItems: 'center',
    },
    skillList: {
        marginTop: 10,
        alignItems: "center",
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
});

