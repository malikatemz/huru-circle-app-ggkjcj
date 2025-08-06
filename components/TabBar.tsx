
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';

interface TabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home', icon: 'home' as const },
  { id: 'connect', label: 'Connect', icon: 'people' as const },
  { id: 'resources', label: 'Resources', icon: 'library' as const },
  { id: 'profile', label: 'Profile', icon: 'person' as const },
];

export default function TabBar({ activeTab, onTabPress }: TabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabPress(tab.id)}
          activeOpacity={0.7}
        >
          <Icon
            name={tab.icon}
            size={24}
            color={activeTab === tab.id ? colors.primary : colors.textLight}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.id && styles.activeTabLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 4,
    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTab: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textLight,
    marginTop: 4,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});
