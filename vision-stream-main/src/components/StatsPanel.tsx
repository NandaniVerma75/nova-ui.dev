import { FrameStats } from '@/types/frame';
import { Card } from '@/components/ui/card';
import { Activity, Zap, Video, AlertCircle } from 'lucide-react';

interface StatsPanelProps {
  stats: FrameStats;
}

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  const statItems = [
    {
      icon: Activity,
      label: 'FPS',
      value: stats.fps.toFixed(1),
      color: 'text-primary',
      glow: 'glow-cyan',
    },
    {
      icon: Zap,
      label: 'Avg Processing',
      value: `${stats.avgProcessingTime.toFixed(2)}ms`,
      color: 'text-secondary',
      glow: 'glow-green',
    },
    {
      icon: Video,
      label: 'Total Frames',
      value: stats.totalFrames.toString(),
      color: 'text-accent',
    },
    {
      icon: AlertCircle,
      label: 'Dropped',
      value: stats.droppedFrames.toString(),
      color: 'text-destructive',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <Card
          key={item.label}
          className={`p-4 border-2 border-border bg-card/80 backdrop-blur ${item.glow || ''}`}
        >
          <div className="flex items-center gap-3">
            <item.icon className={`w-8 h-8 ${item.color}`} />
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                {item.label}
              </div>
              <div className={`text-2xl font-bold ${item.color}`}>
                {item.value}
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      <Card className="col-span-2 md:col-span-4 p-4 border-2 border-border bg-card/80 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Resolution
            </div>
            <div className="text-xl font-bold text-foreground">
              {stats.resolution.width} × {stats.resolution.height}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Aspect Ratio
            </div>
            <div className="text-xl font-bold text-foreground">
              {(stats.resolution.width / stats.resolution.height).toFixed(2)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
