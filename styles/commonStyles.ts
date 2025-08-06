
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Warm African colors - earthy tones, sunset oranges, leafy greens, soft golds
  primary: '#D2691E',      // Sunset orange
  secondary: '#8B4513',    // Saddle brown (earthy)
  accent: '#DAA520',       // Goldenrod (soft gold)
  accentSecondary: '#228B22', // Forest green (leafy)
  tertiary: '#CD853F',     // Peru (warm earth)
  background: '#FFF8DC',   // Cornsilk (warm white)
  backgroundAlt: '#F5DEB3', // Wheat (light earth)
  text: '#2F4F4F',         // Dark slate gray
  textLight: '#696969',    // Dim gray
  white: '#ffffff',
  success: '#32CD32',      // Lime green
  warning: '#FF8C00',      // Dark orange
  error: '#DC143C',        // Crimson
  border: '#DEB887',       // Burlywood
  card: '#FFFAF0',         // Floral white
  explorer: '#FF6347',     // Tomato (HURU Explorer)
  builder: '#4682B4',      // Steel blue (HURU Builder)
  leader: '#9932CC',       // Dark orchid (HURU Leader)
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  secondary: {
    backgroundColor: colors.accent,
    alignSelf: 'center',
    width: '100%',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    width: 'auto',
    paddingHorizontal: 20,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textLight: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textLight,
    lineHeight: 20,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  badge: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
