import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 8 }: SkeletonProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: isDark ? Colors.dark.icon + '20' : Colors.light.icon + '15',
          opacity,
        },
      ]}
    />
  );
}

export function SkeletonGroup({ count = 3 }: { count?: number }) {
  return (
    <View style={styles.group}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} height={16} width={i === count - 1 ? '60%' : '100%'} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
  group: {
    gap: 12,
  },
});