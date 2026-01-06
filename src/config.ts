/**
 * Central configuration for the Warehouse Flow Visualization App
 * All magic numbers and constants should be defined here
 */

// =============================================================================
// GRID DIMENSIONS
// =============================================================================

/** Size of each grid cell in pixels */
export const CELL_SIZE = 40;

/** Size of pallet rendering within a cell (smaller than cell for visual margin) */
export const PALLET_SIZE = 30;

/** Offset to center pallet within cell */
export const PALLET_OFFSET = (CELL_SIZE - PALLET_SIZE) / 2;

/** Space reserved for coordinate labels (A, B, C... and 1, 2, 3...) */
export const COORD_MARGIN = 30;

/** Padding around the grid canvas */
export const CANVAS_PADDING = 20;

/** Pixels per meter for distance calculations (40px = 1 meter) */
export const PIXELS_PER_METER = 40;

// =============================================================================
// ANIMATION SETTINGS
// =============================================================================

/** Base movement speed in pixels per second */
export const BASE_SPEED = 200;

/** Number of pallets to animate in each simulation run */
export const NUM_PALLETS_TO_MOVE = 15;

/** Minimum speed multiplier */
export const MIN_SPEED = 0.5;

/** Maximum speed multiplier */
export const MAX_SPEED = 2.0;

/** Default speed multiplier */
export const DEFAULT_SPEED = 1.0;

/** React state update interval in ms (~30fps) */
export const RENDER_INTERVAL = 33;

// =============================================================================
// COLORS
// =============================================================================

export const COLORS = {
  /** Background color for canvas */
  background: '#ffffff',

  /** Grid line stroke color */
  gridStroke: '#ced4da',

  /** Coordinate label color (A, B, C... and 1, 2, 3...) */
  coordLabel: '#ced4da',

  /** Dock fill color (light grey) */
  dockFill: '#e9ecef',

  /** Pallet fill color (brown/waiting) */
  palletFill: '#d2bab0',

  /** Pallet stroke color */
  palletStroke: '#a89080',

  /** Active/moving pallet fill color (yellow) */
  palletActiveFill: '#ffeb3b',

  /** Active/moving pallet stroke color */
  palletActiveStroke: '#fbc02d',

  /** Glow effect around active pallet */
  palletActiveGlow: 'rgba(255, 200, 0, 0.4)',
} as const;
