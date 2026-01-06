import { useRef, useCallback } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import type { ExcalidrawElement } from '../utils/parseExcalidraw';

// Using any for Excalidraw API to avoid type import issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExcalidrawAPI = any;

interface Props {
  initialElements: ExcalidrawElement[];
  onElementsChange: (elements: ExcalidrawElement[]) => void;
}

export function ExcalidrawEditor({ initialElements, onElementsChange }: Props) {
  const excalidrawAPIRef = useRef<ExcalidrawAPI | null>(null);
  const hasScrolledToContent = useRef(false);

  // Get current elements from Excalidraw API (called when switching modes)
  const getCurrentElements = useCallback(() => {
    if (excalidrawAPIRef.current) {
      const elements = excalidrawAPIRef.current.getSceneElements();
      onElementsChange(elements as unknown as ExcalidrawElement[]);
    }
  }, [onElementsChange]);

  // Store ref to API and scroll to content when ready
  const handleExcalidrawAPI = useCallback((api: ExcalidrawAPI) => {
    excalidrawAPIRef.current = api;
    // Scroll to fit all content after a short delay
    setTimeout(() => {
      if (api && !hasScrolledToContent.current) {
        api.scrollToContent(undefined, { fitToContent: true });
        hasScrolledToContent.current = true;
      }
    }, 200);
  }, []);

  return (
    <div className="excalidraw-wrapper">
      <Excalidraw
        excalidrawAPI={handleExcalidrawAPI}
        initialData={{ elements: initialElements as never[] }}
        gridModeEnabled={true}
      />
      <button
        className="save-layout-btn"
        onClick={getCurrentElements}
      >
        Save Layout Changes
      </button>
    </div>
  );
}
