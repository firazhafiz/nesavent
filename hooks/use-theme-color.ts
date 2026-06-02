import { colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: 'text' | 'background' | 'tint' | 'icon' | 'tabIconDefault' | 'tabIconSelected'
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    switch (colorName) {
      case 'text': return colors.foreground;
      case 'background': return colors.background;
      case 'tint': return colors.primary.DEFAULT;
      case 'icon': return colors.muted.foreground;
      case 'tabIconDefault': return colors.muted.foreground;
      case 'tabIconSelected': return colors.primary.DEFAULT;
      default: return colors.foreground;
    }
  }
}
