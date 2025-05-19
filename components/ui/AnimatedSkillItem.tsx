import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import SkillItem from "./SkillItem";

interface AnimatedSkillItemProps {
    name: string;
    icon: any;
    index: number;
    delayPerItem?: number; //Optional
}

export default function AnimatedSkillItem({
    name,
    icon,
    index,
    delayPerItem = 100,
}: AnimatedSkillItemProps) {
    const translateY = useRef(new Animated.Value(10)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                delay: index * delayPerItem,
                useNativeDriver: true
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 400,
                delay: index * delayPerItem,
                useNativeDriver: true
            })
        ]).start();
    });

    return (
        <Animated.View style={{ opacity: fadeAnim, transform:[{translateY}] }}>
          <SkillItem name={name} icon={icon}/>
        </Animated.View>
      );
}