import { useState } from "react";
import { View, Image, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


interface SkillItemProps {
  name: string;
  icon: any; // Adjust this based on your asset import method
}

export default function SkillItem({ name, icon }: SkillItemProps) {
  const [showLabel, setShowLabel] = useState(false);
  const { width } = useWindowDimensions();
  const size = width <= 600 ? 80 : width <= 1200 ? 100 : 175
  return (
    <View style={styles.container}>
      {/* Skill Sphere */}
      <Pressable
        onPress={() => setShowLabel(!showLabel)}
        onHoverIn={() => setShowLabel(true)}
        onHoverOut={() => setShowLabel(false)}
        style={[styles.sphere, {width: size, height: size, borderRadius: size / 2}]}
      >
        <LinearGradient colors={["#ffffff", "#d1d1d1"]} style={[styles.gradient, {borderRadius: size / 2}]}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </LinearGradient>
      </Pressable>

      {/* Tooltip for Skill Name */}
      {showLabel && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
  },
  sphere: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: '80%',
    height: '80%',
  },
  tooltip: {
    position: "absolute",
    bottom: -25,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 20
  },
  tooltipText: {
    color: "white",
    fontSize: 12,
  },
});
