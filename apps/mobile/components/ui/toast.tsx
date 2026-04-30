import { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  visible: boolean;
  onHide: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, visible, onHide }: ToastProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';
  const opacity = useState(new Animated.Value(0))[0];
  const translateY = useState(new Animated.Value(-50))[0];

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onHide());
  };

  if (!visible) return null;

  const getColors = () => {
    const colors = {
      success: '#22c55e',
      error: '#ef4444',
      warning: '#f59e0b',
      info: isDark ? Colors.dark.tint : Colors.light.tint,
    };
    return colors[type];
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? Colors.dark.background : '#fff',
          borderLeftColor: getColors(),
          opacity,
          transform: [{ translateY }],
        },
      ]}>
      <ThemedText style={styles.message}>{message}</ThemedText>
    </Animated.View>
  );
}

// Helper to show toast (use with useState)
export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
  };

  const hideToast = () => setToast(null);

  return { toast, showToast, hideToast };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  message: {
    fontSize: 14,
  },
});