import { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { ThemedView } from './themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CardProps extends PropsWithChildren {
  style?: ViewStyle;
  variant?: 'default' | 'outlined' | 'elevated';
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const cardStyle = [
    styles.card,
    variant === 'outlined' && styles.outlined,
    variant === 'elevated' && styles.elevated,
    isDark && variant === 'default' && styles.cardDark,
    style,
  ];

  return <ThemedView style={cardStyle}>{children}</ThemedView>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  cardDark: {
    backgroundColor: Colors.dark.background,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.light.icon + '30',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});