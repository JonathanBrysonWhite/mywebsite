import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ label, onPress, variant = "primary", className = "" }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold items-center";
  const primaryStyles = "bg-blue-600 dark:bg-blue-500 text-white";
  const secondaryStyles = "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white";

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variant === "primary" ? primaryStyles : secondaryStyles} ${className}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text className="text-center">{label}</Text>
    </TouchableOpacity>
  );
}
