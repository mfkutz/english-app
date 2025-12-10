import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "success" | "danger" | "disabled";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  icon?: string;
  iconPosition?: "left" | "right";
  className?: string;
  textClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  icon,
  iconPosition = "left",
  className = "",
  textClassName = "",
}) => {
  // Clases base
  const baseClasses = "flex-row items-center justify-center rounded-xl";

  // Clases por variant
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 active:bg-blue-600";
      case "secondary":
        return "bg-gray-500 active:bg-gray-600";
      case "outline":
        return "bg-transparent border-2 border-blue-500 active:bg-blue-50";
      case "success":
        return "bg-green-500 active:bg-green-600";
      case "danger":
        return "bg-red-500 active:bg-red-600";
      case "disabled":
        return "bg-gray-300";
      default:
        return "bg-blue-500 active:bg-blue-600";
    }
  };

  // Clases por tamaño
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "py-2 px-4";
      case "medium":
        return "py-3 px-6";
      case "large":
        return "py-4 px-8";
      default:
        return "py-3 px-6";
    }
  };

  // Clases de texto por tamaño
  const getTextSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-base";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  // Clases de texto por variant
  const getTextColorClasses = () => {
    if (variant === "outline") return "text-blue-500";
    if (variant === "disabled") return "text-gray-500";
    return "text-white";
  };

  // Color del icono
  const getIconColor = () => {
    if (variant === "outline") return "#007AFF";
    if (variant === "disabled") return "#8E8E93";
    return "#FFFFFF";
  };

  // Tamaño del icono
  const getIconSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "medium":
        return 18;
      case "large":
        return 20;
      default:
        return 18;
    }
  };

  // Espaciado del icono
  const getIconSpacingClass = () => {
    return iconPosition === "left" ? "mr-2" : "ml-2";
  };

  // Combinar todas las clases
  const containerClasses = `
    ${baseClasses}
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${disabled || loading ? "opacity-50" : ""}
    ${className}
  `;

  const textClasses = `
    font-semibold
    ${getTextSizeClasses()}
    ${getTextColorClasses()}
    ${textClassName}
  `;

  const iconSize = getIconSize();
  const iconColor = getIconColor();
  const iconSpacingClass = getIconSpacingClass();

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={iconColor} />;
    }

    const iconElement = icon && (
      <MaterialCommunityIcons name={icon as any} size={iconSize} color={iconColor} className={iconSpacingClass} />
    );

    const textElement = <Text className={textClasses}>{title}</Text>;

    return (
      <>
        {iconPosition === "left" && iconElement}
        {textElement}
        {iconPosition === "right" && iconElement}
      </>
    );
  };

  return (
    <TouchableOpacity
      className={containerClasses}
      style={style}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};
