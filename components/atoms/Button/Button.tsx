import { icons } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';
import { VariantProps } from 'tailwind-variants';

import { buttonTextVariants, buttonVariants, defaultVariants, iconStyles } from './styles';

type Props = {
  onPress: () => void;
  label: string;
  icon: keyof typeof icons;
} & VariantProps<typeof buttonVariants>;

export const Button = ({
  onPress,
  icon,
  label,
  size = defaultVariants.size,
  color = defaultVariants.color,
}: Props) => {
  const LucideIcon = icons[icon];
  return (
    <Pressable className={buttonVariants({ size, color })} onPress={onPress}>
      <Text className={buttonTextVariants({ color, size })}>{label}</Text>
      <LucideIcon size={iconStyles.size[size]} color={iconStyles.color[color]} />
    </Pressable>
  );
};
