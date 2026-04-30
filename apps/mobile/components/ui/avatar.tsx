import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

export function Avatar({ source, name, size = 'medium' }: AvatarProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const getInitials = (fullName?: string) => {
    if (!fullName) return '?';
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const dimensions = sizes[size];

  return (
    <View
      style={[
        styles.avatar,
        {
          width: dimensions.size,
          height: dimensions.size,
          borderRadius: dimensions.size / 2,
          backgroundColor: isDark ? Colors.dark.icon + '30' : Colors.light.icon + '20',
        },
      ]}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={[
            styles.image,
            {
              width: dimensions.size,
              height: dimensions.size,
              borderRadius: dimensions.size / 2,
            },
          ]}
        />
      ) : (
        <ThemedText
          style={[
            styles.initials,
            { fontSize: dimensions.fontSize },
          ]}>
          {getInitials(name)}
        </ThemedText>
      )}
    </View>
  );
}

const sizes = {
  small: { size: 32, fontSize: 12 },
  medium: { size: 48, fontSize: 18 },
  large: { size: 64, fontSize: 24 },
  xlarge: { size: 96, fontSize: 36 },
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    fontWeight: '600',
    color: Colors.light.tint,
  },
});