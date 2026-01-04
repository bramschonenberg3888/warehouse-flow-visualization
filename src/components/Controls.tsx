interface ControlsProps {
  isRunning: boolean;
  isComplete: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export function Controls({ isRunning, isComplete, onStart, onStop, onReset, speed, onSpeedChange }: ControlsProps) {
  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      <button
        onClick={onStart}
        disabled={isRunning || isComplete}
        style={{
          padding: '10px 24px',
          fontSize: '16px',
          backgroundColor: isRunning || isComplete ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isRunning || isComplete ? 'not-allowed' : 'pointer',
        }}
      >
        Start
      </button>
      <button
        onClick={onStop}
        disabled={!isRunning}
        style={{
          padding: '10px 24px',
          fontSize: '16px',
          backgroundColor: !isRunning ? '#ccc' : '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: !isRunning ? 'not-allowed' : 'pointer',
        }}
      >
        Stop
      </button>
      <button
        onClick={onReset}
        disabled={isRunning}
        style={{
          padding: '10px 24px',
          fontSize: '16px',
          backgroundColor: isRunning ? '#ccc' : '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isRunning ? 'not-allowed' : 'pointer',
        }}
      >
        Reset
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
        <label style={{ fontSize: '14px', color: '#333' }}>Speed:</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          style={{ width: '100px' }}
        />
        <span style={{ fontSize: '14px', fontWeight: 'bold', minWidth: '40px' }}>{speed.toFixed(1)}x</span>
      </div>
    </div>
  );
}
