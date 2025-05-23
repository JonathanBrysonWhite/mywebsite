import { useState, useRef } from "react";
import { View, Image, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";


interface SkillItemProps {
  name: string;
  icon: any; // Adjust this based on your asset import method
}

export default function SkillItem({ name, icon }: SkillItemProps) {
  const [showLabel, setShowLabel] = useState(false);
  const labelOpacity = useRef(new Animated.Value(0)).current;
  const labelTranslateY = useRef(new Animated.Value(40)).current;
  const { width } = useWindowDimensions();
  const size = width <= 600 ? 80 : width <= 1200 ? 100 : 175;
  const itemTranslateY = useRef(new Animated.Value(0)).current;

  const showToolTip = () => {
    setShowLabel(true);
    Animated.parallel([
      Animated.timing(labelOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(labelTranslateY, {
        toValue: 30,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();

  };

  const hideToolTip = () => {
    Animated.parallel([
      Animated.timing(labelOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(labelTranslateY, {
        toValue: 40,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => setShowLabel(false));

  }
  return (
    <Animated.View style={ [styles.container, { transform: [{translateY: itemTranslateY}]}]}>
      {/* Skill Sphere */}
      <Pressable
        onPress={() => {
          showToolTip();
          Animated.sequence([
            Animated.spring(itemTranslateY, {
              toValue: -15,
              friction: 5,
              useNativeDriver: true
            }),
            Animated.spring(itemTranslateY, {
              toValue: 0,
              friction: 5,
              useNativeDriver: true
            })
          ]).start();
          setTimeout(() => hideToolTip(), 1500)
        }}
        onHoverIn={
          () => {
            showToolTip();
            Animated.spring(itemTranslateY, {
              toValue: -15,
              friction: 5,
              useNativeDriver: true
            }).start();
          }
        }
        onHoverOut={
          () => {
            hideToolTip();
            Animated.spring(itemTranslateY, {
              toValue: 0,
              friction: 5,
              useNativeDriver: true
            }).start()
          }
        }
        style={[styles.sphere, {width: size, height: size, borderRadius: size / 2}]}
      >
        <LinearGradient colors={["#ffffff", "#d1d1d1"]} style={[styles.gradient, {borderRadius: size / 2}]}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </LinearGradient>
      </Pressable>

      {/* Tooltip for Skill Name */}
      {showLabel && (
        <Animated.View style={[styles.tooltip,
         {opacity: labelOpacity,
          transform: [{
            translateY: labelTranslateY
          }]
         }]}>
          <Text style={styles.tooltipText} numberOfLines={1}>{name}</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10
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
    bottom: -20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 20,
    borderRadius: '10%',
    pointerEvents: 'none'
  },
  tooltipText: {
    color: "white",
    fontSize: 12,
  },
});
