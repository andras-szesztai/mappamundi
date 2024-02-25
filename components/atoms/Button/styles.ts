import { tv } from 'tailwind-variants';
import colors from 'tailwindcss/colors';

export const defaultVariants = {
  color: 'primary',
  size: 'md',
} as const;

export const buttonVariants = tv({
  base: 'flex flex-row items-center justify-center',
  variants: {
    color: {
      primary: 'bg-teal-950',
      error: 'bg-rose-950',
    },
    size: {
      sm: 'px-4 py-2 gap-2',
      md: 'px-8 py-4 gap-3',
      lg: 'px-12 py-6 gap-4',
    },
  },
  defaultVariants,
});

export const buttonTextVariants = tv({
  base: 'font-medium ',
  variants: {
    color: {
      primary: ' text-teal-50 ',
      error: ' text-rose-50 ',
    },
    size: {
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-3xl',
    },
  },
  defaultVariants,
});

export const iconStyles = {
  size: {
    sm: 16,
    md: 20,
    lg: 24,
  },
  color: {
    primary: colors.teal[50],
    error: colors.rose[50],
  },
};
