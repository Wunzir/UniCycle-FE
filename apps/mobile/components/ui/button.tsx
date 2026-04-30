import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ButtonProps extends PropsWithChildren {
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}: ButtonProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const getButtonStyle = () => {
    const baseStyle = [styles.button, sizes[size]];

    if (disabled) {
      return [...baseStyle, styles.disabled];
    }

    switch (variant) {
      case 'primary':
        return [
          ...baseStyle,
          { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint },
        ];
      case 'secondary':
        return [
          ...baseStyle,
          { backgroundColor: isDark ? Colors.dark.icon + '30' : Colors.light.icon + '15' },
        ];
      case 'outline':
        return [
          ...baseStyle,
          {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: isDark ? Colors.dark.tint : Colors.light.tint,
          },
        ];
      case 'ghost':
        return [...baseStyle, { backgroundColor: 'transparent' }];
      default:
        return baseStyle;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.light.icon;

    switch (variant) {
      case 'primary':
        return '#fff';
      case 'secondary':
        return isDark ? Colors.dark.text : Colors.light.text;
      case 'outline':
      case 'ghost':
        return isDark ? Colors.dark.tint : Colors.light.tint;
      default:
        return Colors.light.text;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        getButtonStyle(),
        pressed && styles.pressed,
        style,
      ]}>
      <ThemedText style={[styles.text, { color: getTextColor() }, textSizes[size]]}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

const sizes = {
  small: { paddingVertical: 8, paddingHorizontal: 16 },
  medium: { paddingVertical: 12, paddingHorizontal: 24 },
  large: { paddingVertical: 16, paddingHorizontal: 32 },
};

const textSizes = {
  small: { fontSize: 14 },
  medium: { fontSize: 16 },
  large: { fontSize: 18 },
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
});