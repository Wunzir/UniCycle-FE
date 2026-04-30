import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: string;
}

export function Chip({ label, selected = false, onPress, icon }: ChipProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        selected && {
          backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint,
        },
        !selected && {
          backgroundColor: isDark ? Colors.dark.icon + '15' : Colors.light.icon + '10',
        },
      ]}>
      {icon && (
        <ThemedText
          style={[
            styles.icon,
            { color: selected ? '#fff' : isDark ? Colors.dark.text : Colors.light.text },
          ]}>
          {icon}
        </ThemedText>
      )}
      <ThemedText
        style={[
          styles.label,
          { color: selected ? '#fff' : isDark ? Colors.dark.text : Colors.light.text },
        ]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});