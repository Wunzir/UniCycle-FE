import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export function ProgressBar({
  progress,
  height = 8,
  color,
  backgroundColor,
}: ProgressBarProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const fillColor = color || (isDark ? Colors.dark.tint : Colors.light.tint);
  const bgColor = backgroundColor || (isDark ? Colors.dark.icon + '20' : Colors.light.icon + '15');

  return (
    <View style={[styles.container, { height, backgroundColor: bgColor }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: fillColor,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 100,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 100,
  },
});