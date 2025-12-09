import React from "react";
import { Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  className?: string;
  inputClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  className = "",
  inputClassName = "",
  multiline,
  ...props
}) => {
  return (
    <View style={containerStyle} className={`mb-4 ${className}`}>
      {label && <Text className="text-sm font-medium text-gray-800 mb-1">{label}</Text>}
      <TextInput
        className={`
          border rounded-lg px-3 py-2.5 text-base text-gray-900 bg-white
          ${error ? "border-red-500" : "border-gray-300"}
          ${multiline ? "min-h-25 text-align-vertical-top" : ""}
          ${inputClassName}
        `}
        placeholderTextColor="#999"
        multiline={multiline}
        {...props}
      />
      {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
    </View>
  );
};
