import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
}

export function Badge({ label, variant = 'default', size = 'medium' }: BadgeProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const getColors = () => {
    const colorMap = {
      default: {
        bg: isDark ? Colors.dark.icon + '20' : Colors.light.icon + '15',
        text: isDark ? Colors.dark.text : Colors.light.text,
      },
      success: {
        bg: '#22c55e20',
        text: '#22c55e',
      },
      warning: {
        bg: '#f59e0b20',
        text: '#f59e0b',
      },
      error: {
        bg: '#ef444420',
        text: '#ef4444',
      },
      info: {
        bg: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20',
        text: isDark ? Colors.dark.tint : Colors.light.tint,
      },
    };
    return colorMap[variant];
  };

  const colors = getColors();
  const isSmall = size === 'small';

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }, isSmall && styles.small]}>
      <ThemedText style={[styles.text, { color: colors.text }, isSmall && styles.smallText]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 10,
  },
});