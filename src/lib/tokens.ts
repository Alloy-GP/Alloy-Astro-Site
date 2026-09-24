// src/lib/tokens.ts
// Brand color constants used across components.
// These mirror the CSS custom properties in colors_and_type.css
// (--alloy-purple, --alloy-pink, etc.) — kept here as JS constants
// so React components can use them in inline styles without round-tripping
// through getComputedStyle.

export const PURPLE = '#381c4f';
export const PINK = '#d9356e';
export const YELLOW = '#f5d880';
export const BLUE = '#a1c8e7';
export const GREEN = '#aed7d0';
export const BLUE_DEEP = '#0d2d45';

// Engine ink colors — readable on white. Mirror --engine-* in colors_and_type.css.
export const REACH_INK = '#d9356e';
export const MATCH_INK = '#b8942a';
export const RETAIN_INK = '#3f8f83';
export const ENGINE_INK = { reach: REACH_INK, match: MATCH_INK, retain: RETAIN_INK } as const;

export const SUCCESS = '#16a34a';
export const SUCCESS_HOVER = '#15803d';
export const MAP_BASE = '#2a1440';
