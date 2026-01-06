import { useState, useEffect, useCallback } from 'react';
import { GridCanvas } from './components/GridCanvas';
import { Controls } from './components/Controls';
import { Legend } from './components/Legend';
import { ExcalidrawEditor } from './components/ExcalidrawEditor';
import { useSimulation } from './hooks/useSimulation';
import {
  loadExcalidrawElements,
  parseElements,
  ExcalidrawElement,
} from './utils/parseExcalidraw';
import { GridData } from './types';
import { PIXELS_PER_METER } from './config';
import './App.css';

type AppMode = 'edit' | 'simulate';

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${seconds}.${milliseconds.toString().padStart(2, '0')}s`;
}

function App() {
  const [mode, setMode] = useState<AppMode>('simulate');
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [gridData, setGridData] = useState<GridData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { state, start, stop, reset, speed, setSpeed } = useSimulation(gridData);

  // Load initial elements from file
  useEffect(() => {
    loadExcalidrawElements('/prototype v2.excalidraw')
      .then((loadedElements) => {
        console.log('Elements loaded:', loadedElements.length);
        setElements(loadedElements);
        // Parse to grid data for simulation
        const data = parseElements(loadedElements);
        console.log('Grid data parsed:', data);
        console.log('Pallets:', data.pallets.length);
        console.log('Docks:', data.docks.length);
        setGridData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load:', err);
        setError(`Failed to load grid: ${err.message}`);
        setLoading(false);
      });
  }, []);

  // Handle element changes from editor (called when user clicks Save)
  const handleElementsChange = useCallback(
    (newElements: ExcalidrawElement[]) => {
      console.log('Elements saved from editor:', newElements.length);
      setElements(newElements);
    },
    []
  );

  // Switch to simulate mode and re-parse elements
  const handleSwitchToSimulate = useCallback(() => {
    const data = parseElements(elements);
    console.log('Switching to simulate, parsed:', data);
    setGridData(data);
    reset(); // Reset simulation state with new data
    setMode('simulate');
  }, [elements, reset]);

  // Switch to edit mode
  const handleSwitchToEdit = useCallback(() => {
    stop(); // Stop any running simulation
    setMode('edit');
  }, [stop]);

  if (loading) {
    return <div className="app loading">Loading grid...</div>;
  }

  if (error) {
    return <div className="app error">{error}</div>;
  }

  const filledDocks = state.docks.filter((d) => d.isFilled).length;
  const totalDocks = state.docks.length;
  const distanceMeters = Math.round(state.totalDistancePx / PIXELS_PER_METER);

  return (
    <div className="app">
      <header className="header">
        <h1>Warehouse Flow Visualization</h1>
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === 'edit' ? 'active' : ''}`}
            onClick={handleSwitchToEdit}
          >
            Edit Layout
          </button>
          <button
            className={`mode-btn ${mode === 'simulate' ? 'active' : ''}`}
            onClick={handleSwitchToSimulate}
          >
            Run Simulation
          </button>
        </div>
        {mode === 'simulate' && (
          <div className="status">
            <span className="timer">Time: {formatTime(state.elapsedMs)}</span>
            <span className="distance">Distance: {distanceMeters} m</span>
            <span className="progress">
              Docks filled: {filledDocks} / {totalDocks}
            </span>
            {state.isComplete && <span className="complete">Complete!</span>}
          </div>
        )}
      </header>

      <main className="main">
        {mode === 'edit' ? (
          <ExcalidrawEditor
            initialElements={elements}
            onElementsChange={handleElementsChange}
          />
        ) : (
          <>
            <GridCanvas
              gridData={gridData}
              pallets={state.pallets}
              docks={state.docks}
              currentPalletIndex={state.currentPalletIndex}
            />
            <Legend />
          </>
        )}
      </main>

      {mode === 'simulate' && (
        <footer className="footer">
          <Controls
            isRunning={state.isRunning}
            isComplete={state.isComplete}
            onStart={start}
            onStop={stop}
            onReset={reset}
            speed={speed}
            onSpeedChange={setSpeed}
          />
        </footer>
      )}
    </div>
  );
}

export default App;
