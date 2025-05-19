import { StyleSheet, View, Image, FlatList, useWindowDimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { LogBox } from "react-native";
import AnimatedSkillItem from "./ui/AnimatedSkillItem";
const skills = [
  { name: "C#", icon: require("@/assets/icons/csharp.png") },
  { name: "Java", icon: require("@/assets/icons/java.png") },
  { name: "Python", icon: require("@/assets/icons/python.png") },
  { name: "React", icon: require("@/assets/icons/react.png") },
  { name: "Azure", icon: require("@/assets/icons/azure.png") },
  { name: "AWS", icon: require("@/assets/icons/aws.png") },
  { name: "Docker", icon: require("@/assets/icons/docker.png") },
  { name: "Postgres", icon: require("@/assets/icons/postgres.png") },
];

export default function SkillsSection() {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  const { width } = useWindowDimensions();
  const numColumns = width <= 400 ? 2 : width <= 700 ? 3 : 4;
  const skillRows = chunkArray(skills, numColumns);
  return (
    <View style={styles.container}>
      {skillRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((skill, skillIndex) => {
            const globalIndex = rowIndex * numColumns + skillIndex;
            return (
              <AnimatedSkillItem
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                index={globalIndex}
              />
            );
          })}
        </View>
      ))}        
    </View>
  );
}

function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size)}, (_, index) => 
    array.slice(index * size, index * size + size)
  );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        width: '80%',
        marginRight: 'auto',
        marginLeft: 'auto',
        flex: 4
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap'
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

