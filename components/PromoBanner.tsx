import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface PromoBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  duration?: string;
  badgeText?: string;
  variant?: "dark" | "amber" | "gradient";
  onPress?: () => void;
  showIcon?: boolean;
  compact?: boolean;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title = "Try Premium for 7 days free!",
  subtitle = "Unlock all lessons and features",
  ctaText = "Try Free",
  duration = "7 days free",
  badgeText = "PRO",
  variant = "dark",
  onPress,
  showIcon = true,
  compact = false,
}) => {
  // Configuración de colores según variante
  const getVariantStyles = () => {
    switch (variant) {
      case "amber":
        return {
          bg: "bg-amber-500",
          text: "text-white",
          badgeBg: "bg-amber-600",
          badgeText: "text-white",
          ctaBg: "bg-amber-600",
          ctaText: "text-white",
          iconColor: "#FFFFFF",
        };
      case "gradient":
        return {
          bg: "bg-gradient-to-r from-gray-900 to-amber-900",
          text: "text-white",
          badgeBg: "bg-amber-500",
          badgeText: "text-gray-900",
          ctaBg: "bg-amber-500",
          ctaText: "text-gray-900",
          iconColor: "#F59E0B",
        };
      case "dark":
      default:
        return {
          bg: "bg-gray-900",
          text: "text-white",
          badgeBg: "bg-amber-500",
          badgeText: "text-gray-900",
          ctaBg: "bg-amber-500",
          ctaText: "text-gray-900",
          iconColor: "#F59E0B",
        };
    }
  };

  const styles = getVariantStyles();

  // Versión compacta (2 líneas, balanceada)
  if (compact) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        className={`${styles.bg} rounded-xl overflow-hidden shadow-lg shadow-black/20 mx-5`}
      >
        <View className="p-4">
          <View className="flex-row items-center">
            {/* Badge y contenido principal */}
            <View className="flex-row items-center flex-1">
              <View className={`${styles.badgeBg} px-2.5 py-1 rounded-md mr-3`}>
                <Text className={`${styles.badgeText} text-md font-bold`}>{badgeText}</Text>
              </View>

              <View className="flex-1">
                <Text className={`${styles.text} text-xl font-bold`} numberOfLines={1}>
                  {title}
                </Text>
                <View className="flex-row items-center mt-0.5">
                  <MaterialCommunityIcons name="clock-outline" size={12} color="#F59E0B" />
                  <Text className={`${styles.text} text-base font-medium ml-1`}>{duration}</Text>
                  <Text className={`${styles.text} text-base opacity-80 ml-2`} numberOfLines={1}>
                    {subtitle}
                  </Text>
                </View>
              </View>
            </View>

            {/* Icono y flecha */}
            <View className="flex-row items-center ml-2">
              {showIcon && <MaterialCommunityIcons name="crown" size={35} color={styles.iconColor} />}
              <Ionicons name="chevron-forward" size={18} color="#F59E0B" className="ml-1" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Versión normal (más detallada)
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className={`${styles.bg} rounded-2xl overflow-hidden shadow-xl shadow-black/20 mx-5 my-4`}
    >
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <View className={`${styles.badgeBg} px-3 py-1.5 rounded-full`}>
              <Text className={`${styles.badgeText} text-sm font-bold`}>{badgeText}</Text>
            </View>

            <View className="ml-3 flex-row items-center">
              <MaterialCommunityIcons name="clock-outline" size={16} color="#F59E0B" />
              <Text className={`${styles.text} text-sm font-medium ml-2`}>{duration}</Text>
            </View>
          </View>

          {showIcon && <MaterialCommunityIcons name="crown" size={24} color={styles.iconColor} />}
        </View>

        {/* Contenido */}
        <View className="mb-4">
          <Text className={`${styles.text} text-lg font-bold mb-1`}>{title}</Text>
          <Text className={`${styles.text} text-sm opacity-90`}>{subtitle}</Text>
        </View>

        {/* Botón CTA */}
        <TouchableOpacity
          className={`${styles.ctaBg} py-3 rounded-xl active:opacity-90`}
          activeOpacity={0.8}
          onPress={onPress}
        >
          <Text className={`${styles.ctaText} text-center font-bold text-base`}>{ctaText}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PromoBanner;
