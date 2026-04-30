import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { IconSymbol } from './icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={[
          styles.header,
          {
            backgroundColor: isDark ? Colors.dark.icon + '10' : Colors.light.icon + '08',
          },
        ]}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={isDark ? Colors.dark.icon : Colors.light.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
      </Pressable>
      {isOpen && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

interface AccordionProps extends PropsWithChildren {
  items: { title: string; content: React.ReactNode }[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  item: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  title: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
});