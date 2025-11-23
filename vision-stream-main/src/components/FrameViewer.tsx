import { useEffect, useRef } from 'react';
import { FrameData } from '@/types/frame';
import { Card } from '@/components/ui/card';

interface FrameViewerProps {
  frame: FrameData | null;
  className?: string;
}

export const FrameViewer = ({ frame, className = '' }: FrameViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!frame || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = frame.width;
      canvas.height = frame.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = frame.data;
  }, [frame]);

  return (
    <Card className={`relative overflow-hidden border-2 border-primary/30 bg-card ${className}`}>
      <div className="aspect-video w-full relative">
        {frame ? (
          <>
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
            />
            <div className="absolute top-2 right-2 bg-black/80 px-3 py-1 rounded text-xs">
              <span className="text-primary">{frame.type.toUpperCase()}</span>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/80 px-3 py-1 rounded text-xs font-mono">
              {frame.width}x{frame.height}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/50">
            <div className="text-center">
              <div className="text-muted-foreground text-sm mb-2">No Frame Data</div>
              <div className="text-xs text-muted-foreground/60">Waiting for input...</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
