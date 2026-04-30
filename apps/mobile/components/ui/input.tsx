import { useState } from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';

import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
}: InputProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, style]}>
      {label && (
        <ThemedText style={[styles.label, { color: Colors.light.icon }]}>{label}</ThemedText>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.icon}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? Colors.dark.background : '#fff',
            borderColor: error
              ? '#ef4444'
              : isDark
              ? Colors.dark.icon + '30'
              : Colors.light.icon + '20',
            color: isDark ? Colors.dark.text : Colors.light.text,
          },
          multiline && { height: numberOfLines * 24 + 24, textAlignVertical: 'top' },
        ]}
      />
      {error && (
        <ThemedText style={[styles.error, { color: '#ef4444' }]}>{error}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});