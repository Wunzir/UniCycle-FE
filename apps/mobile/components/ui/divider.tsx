import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface DividerProps {
  spacing?: number;
}

export function Divider({ spacing = 16 }: DividerProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  return (
    <View
      style={[
        styles.divider,
        {
          marginVertical: spacing,
          backgroundColor: isDark ? Colors.dark.icon + '20' : Colors.light.icon + '15',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
});