import { useRef, useEffect } from 'react';
import { GridData, Pallet, Dock } from '../types';
import {
  CELL_SIZE,
  PALLET_SIZE,
  PALLET_OFFSET,
  COORD_MARGIN,
  CANVAS_PADDING,
  COLORS,
} from '../config';

interface GridCanvasProps {
  gridData: GridData | null;
  pallets: Pallet[];
  docks: Dock[];
  currentPalletIndex: number;
}

export function GridCanvas({ gridData, pallets, docks, currentPalletIndex }: GridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gridData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate canvas size from grid bounds
    const { bounds } = gridData;
    const width = bounds.maxX - bounds.minX + CANVAS_PADDING * 2 + COORD_MARGIN;
    const height = bounds.maxY - bounds.minY + CANVAS_PADDING * 2 + COORD_MARGIN;

    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, width, height);

    // Offset for drawing (translate grid to start at padding + margin for labels)
    const offsetX = CANVAS_PADDING - bounds.minX + COORD_MARGIN;
    const offsetY = CANVAS_PADDING - bounds.minY + COORD_MARGIN;

    // Calculate grid dimensions in cells
    const gridWidthCells = Math.round((bounds.maxX - bounds.minX) / CELL_SIZE);
    const gridHeightCells = Math.round((bounds.maxY - bounds.minY) / CELL_SIZE);

    // Draw coordinate labels
    ctx.fillStyle = COLORS.coordLabel;
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Horizontal letters (A, B, C, ...) at the top - columns
    for (let i = 0; i < gridWidthCells; i++) {
      const x = bounds.minX + i * CELL_SIZE + CELL_SIZE / 2 + offsetX;
      const y = CANVAS_PADDING / 2 + COORD_MARGIN / 2;
      const letter = String.fromCharCode(65 + i); // A=65
      ctx.fillText(letter, x, y);
    }

    // Vertical numbers (1, 2, 3, ...) on the left - rows
    for (let i = 0; i < gridHeightCells; i++) {
      const x = CANVAS_PADDING / 2 + COORD_MARGIN / 2;
      const y = bounds.minY + i * CELL_SIZE + CELL_SIZE / 2 + offsetY;
      ctx.fillText((i + 1).toString(), x, y);
    }

    // Draw empty cells
    ctx.strokeStyle = COLORS.gridStroke;
    ctx.lineWidth = 1;
    gridData.emptyCells.forEach((cell) => {
      ctx.strokeRect(
        cell.x + offsetX,
        cell.y + offsetY,
        CELL_SIZE,
        CELL_SIZE
      );
    });

    // Draw docks (grey background)
    docks.forEach((dock) => {
      ctx.fillStyle = COLORS.dockFill;
      ctx.fillRect(dock.x + offsetX, dock.y + offsetY, CELL_SIZE, CELL_SIZE);
      ctx.strokeStyle = COLORS.gridStroke;
      ctx.strokeRect(dock.x + offsetX, dock.y + offsetY, CELL_SIZE, CELL_SIZE);
    });

    // Draw pallets that haven't moved yet (at their start positions)
    gridData.pallets.forEach((cell) => {
      // Only draw if this pallet is not in our active pallets list
      const activePallet = pallets.find((p) => p.startX === cell.x && p.startY === cell.y);
      if (activePallet) return; // Will be drawn as moving pallet

      ctx.fillStyle = COLORS.palletFill;
      ctx.fillRect(
        cell.x + offsetX + PALLET_OFFSET,
        cell.y + offsetY + PALLET_OFFSET,
        PALLET_SIZE,
        PALLET_SIZE
      );
      ctx.strokeStyle = COLORS.palletStroke;
      ctx.strokeRect(
        cell.x + offsetX + PALLET_OFFSET,
        cell.y + offsetY + PALLET_OFFSET,
        PALLET_SIZE,
        PALLET_SIZE
      );
    });

    // Draw active/moving pallets
    pallets.forEach((pallet, index) => {
      const isCurrentPallet = index === currentPalletIndex && pallet.isMoving;
      const x = pallet.x + offsetX + PALLET_OFFSET;
      const y = pallet.y + offsetY + PALLET_OFFSET;

      // Draw glow effect for current pallet
      if (isCurrentPallet) {
        ctx.shadowColor = COLORS.palletActiveGlow;
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      ctx.fillStyle = isCurrentPallet ? COLORS.palletActiveFill : COLORS.palletFill;
      ctx.fillRect(x, y, PALLET_SIZE, PALLET_SIZE);

      // Reset shadow before stroke
      ctx.shadowBlur = 0;

      ctx.strokeStyle = isCurrentPallet ? COLORS.palletActiveStroke : COLORS.palletStroke;
      ctx.lineWidth = isCurrentPallet ? 2 : 1;
      ctx.strokeRect(x, y, PALLET_SIZE, PALLET_SIZE);
      ctx.lineWidth = 1;
    });
  }, [gridData, pallets, docks, currentPalletIndex]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
      }}
    />
  );
}
