import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Camera, Scan } from 'lucide-react';

interface ControlPanelProps {
  isRunning: boolean;
  viewMode: 'raw' | 'processed';
  onToggleRunning: () => void;
  onReset: () => void;
  onViewModeChange: (mode: 'raw' | 'processed') => void;
}

export const ControlPanel = ({
  isRunning,
  viewMode,
  onToggleRunning,
  onReset,
  onViewModeChange,
}: ControlPanelProps) => {
  return (
    <Card className="p-4 border-2 border-border bg-card/80 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={onToggleRunning}
          variant={isRunning ? 'destructive' : 'default'}
          className="gap-2"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              Pause Stream
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start Stream
            </>
          )}
        </Button>

        <Button onClick={onReset} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset Stats
        </Button>

        <div className="flex gap-2 ml-auto">
          <Button
            onClick={() => onViewModeChange('raw')}
            variant={viewMode === 'raw' ? 'default' : 'outline'}
            className="gap-2"
          >
            <Camera className="w-4 h-4" />
            Raw
          </Button>
          <Button
            onClick={() => onViewModeChange('processed')}
            variant={viewMode === 'processed' ? 'default' : 'outline'}
            className="gap-2"
          >
            <Scan className="w-4 h-4" />
            Processed
          </Button>
        </div>
      </div>
    </Card>
  );
};
