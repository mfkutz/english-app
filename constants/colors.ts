// constants/colors.ts
export const colors = {
  // Paleta principal inspirada en Loora/Duolingo
  primary: {
    50: "#E8F0FF",
    100: "#D0E0FF",
    200: "#A3C6FF",
    300: "#75ABFF",
    400: "#4A6FFF", // Primary main
    500: "#3A5CE8",
    600: "#2A4AD1",
    700: "#1A38BA",
    800: "#0A26A3",
    900: "#00148C",
  },

  secondary: {
    50: "#FFF8E6",
    100: "#FFF1CC",
    200: "#FFE399",
    300: "#FFD566",
    400: "#FFC633",
    500: "#FF9F1C", // Secondary main - naranja vibrante
    600: "#FF8C00",
    700: "#E67A00",
    800: "#CC6800",
    900: "#B35600",
  },

  // Estados
  success: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#2ECC71", // Verde éxito
    600: "#16A34A",
    700: "#15803D",
    800: "#166534",
    900: "#14532D",
  },

  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#FFD166", // Amarillo advertencia
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },

  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#FF6B6B", // Rojo error
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },

  // Neutros modernos (gris azulado)
  neutral: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },

  // Sistema de estrellas/recompensas
  star: {
    filled: "#FFD700", // Oro
    unfilled: "#E2E8F0", // Gris claro
  },

  // Colores semánticos (para usar directamente)
  background: "#F8FAFC",
  card: "#FFFFFF",
  text: {
    primary: "#1E293B",
    secondary: "#475569",
    tertiary: "#64748B",
    disabled: "#94A3B8",
  },
  border: "#E2E8F0",
  divider: "#F1F5F9",

  // Gradientes (opcionales, para secciones especiales)
  gradients: {
    primary: ["#4A6FFF", "#3A5CE8"],
    success: ["#2ECC71", "#16A34A"],
    premium: ["#FF9F1C", "#FF6B6B"],
  },

  // Sombras (para usar con elevation/shadow)
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

// Exportar valores por defecto para facilitar el uso
export default {
  // Colores principales
  primary: colors.primary[400],
  primaryLight: colors.primary[50],
  secondary: colors.secondary[500],

  // Estados
  success: colors.success[500],
  warning: colors.warning[500],
  error: colors.error[500],

  // Neutros
  background: colors.background,
  card: colors.card,
  textPrimary: colors.text.primary,
  textSecondary: colors.text.secondary,
  textTertiary: colors.text.tertiary,
  border: colors.border,

  // Especiales
  starFilled: colors.star.filled,
  starUnfilled: colors.star.unfilled,

  // Sombras
  shadow: colors.shadow,
};
