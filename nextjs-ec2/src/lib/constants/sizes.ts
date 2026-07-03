/**
 * Size constants for the application
 *
 * This file contains standardized size definitions for UI elements like typography, buttons, and icons.
 * Using these constants ensures consistent sizing across the application based on semantic meaning.
 */

// Icon sizes based on context
export const ICON_SIZES = {
  // Extra small icons (16px) - Used in small buttons, badges, or as indicators
  xs: 'h-4 w-4 size-4',

  // Small icons (20px) - Used in medium buttons or compact UI elements
  sm: 'h-5 w-5 size-5',

  // Medium icons (24px) - Default size for most UI contexts
  md: 'h-6 w-6 size-6',

  // Large icons (32px) - Used for emphasis or primary actions
  lg: 'h-8 w-8 size-8',

  // Extra large icons (40px) - Used for hero elements or major focal points
  xl: 'h-10 w-10 size-10',
}

// Button sizes
export const BUTTON_SIZES = {
  // Small buttons
  sm: {
    height: 'h-8',
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    icon: ICON_SIZES.xs,
    rounded: 'rounded-md',
  },

  // Default/medium buttons
  md: {
    height: 'h-9',
    padding: 'px-4 py-2',
    text: 'text-md',
    icon: ICON_SIZES.sm,
    rounded: 'rounded-md',
  },

  // Large buttons
  lg: {
    height: 'h-10',
    padding: 'px-6 py-2.5',
    text: 'text-lg',
    icon: ICON_SIZES.md,
    rounded: 'rounded-md',
  },

  // Icon-only buttons (square)
  icon: {
    sm: 'size-8 rounded-md',
    md: 'size-9 rounded-md',
    lg: 'size-10 rounded-md',
  },

  // Floating action buttons (circular)
  floating: {
    sm: 'size-10 rounded-full',
    md: 'size-12 rounded-full',
    lg: 'size-14 rounded-full',
  },
}

// Typography sizes
export const TEXT_SIZES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
}

// Badge sizes
export const BADGE_SIZES = {
  sm: {
    padding: 'px-1.5 py-0.5',
    text: TEXT_SIZES.xs,
    icon: ICON_SIZES.xs,
  },
  md: {
    padding: 'px-2 py-1',
    text: TEXT_SIZES.sm,
    icon: ICON_SIZES.xs,
  },
  lg: {
    padding: 'px-2.5 py-1.5',
    text: TEXT_SIZES.md,
    icon: ICON_SIZES.sm,
  },
}
