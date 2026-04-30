import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { IconSymbol } from './icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  rightContent?: React.ReactNode;
  onPress?: () => void;
}

export function ListItem({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  rightContent,
  onPress,
}: ListItemProps) {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const Wrapper = onPress ? require('react-native').TouchableOpacity : View;

  return (
    <Wrapper
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      {leftIcon && (
        <View style={[styles.iconContainer, { backgroundColor: isDark ? Colors.dark.icon + '20' : Colors.light.icon + '10' }]}>
          <IconSymbol
            name={leftIcon as any}
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
        </View>
      )}
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
        {subtitle && (
          <ThemedText style={[styles.subtitle, { color: Colors.light.icon }]}>
            {subtitle}
          </ThemedText>
        )}
      </View>
      {rightContent}
      {rightIcon && !rightContent && (
        <IconSymbol
          name={rightIcon as any}
          size={18}
          color={Colors.light.icon}
        />
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
});