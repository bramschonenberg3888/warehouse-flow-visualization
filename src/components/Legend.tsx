const LEGEND_ITEM_SIZE = 24;

// Same colors as GridCanvas
const GRID_STROKE = '#ced4da';
const DOCK_FILL = '#e9ecef';
const PALLET_FILL = '#d2bab0';
const PALLET_STROKE = '#a89080';
const PALLET_ACTIVE_FILL = '#ffeb3b';
const PALLET_ACTIVE_STROKE = '#fbc02d';

interface LegendItemProps {
  label: string;
  fillColor: string;
  strokeColor: string;
  isGlow?: boolean;
  isDimmed?: boolean;
}

function LegendItem({ label, fillColor, strokeColor, isGlow, isDimmed }: LegendItemProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          width: LEGEND_ITEM_SIZE,
          height: LEGEND_ITEM_SIZE,
          backgroundColor: fillColor,
          border: `2px solid ${strokeColor}`,
          borderRadius: '2px',
          boxShadow: isGlow ? '0 0 8px rgba(255, 200, 0, 0.6)' : 'none',
          opacity: isDimmed ? 0.5 : 1,
        }}
      />
      <span style={{ fontSize: '13px', color: '#555' }}>{label}</span>
    </div>
  );
}

export function Legend() {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>
        Legend
      </span>
      <LegendItem label="Dock" fillColor={DOCK_FILL} strokeColor={GRID_STROKE} />
      <LegendItem label="Pallet (waiting)" fillColor={PALLET_FILL} strokeColor={PALLET_STROKE} />
      <LegendItem label="Pallet (moving)" fillColor={PALLET_ACTIVE_FILL} strokeColor={PALLET_ACTIVE_STROKE} isGlow />
    </div>
  );
}
