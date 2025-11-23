import { ProcessingPipeline } from '@/types/frame';
import { Card } from '@/components/ui/card';
import { Camera, Code2, Scan, Box, Monitor, ChevronRight } from 'lucide-react';

interface PipelineVisualizerProps {
  pipelines: ProcessingPipeline[];
}

export const PipelineVisualizer = ({ pipelines }: PipelineVisualizerProps) => {
  const stageConfig = {
    camera: { icon: Camera, label: 'Camera', color: 'text-primary' },
    jni: { icon: Code2, label: 'JNI Bridge', color: 'text-secondary' },
    opencv: { icon: Scan, label: 'OpenCV C++', color: 'text-tech-green' },
    opengl: { icon: Box, label: 'OpenGL ES', color: 'text-accent' },
    display: { icon: Monitor, label: 'Display', color: 'text-primary' },
  };

  return (
    <Card className="p-6 border-2 border-border bg-card/80 backdrop-blur">
      <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wide">
        Processing Pipeline
      </h3>
      <div className="flex items-center justify-between gap-2">
        {pipelines.map((pipeline, index) => {
          const config = stageConfig[pipeline.stage];
          const Icon = config.icon;
          
          return (
            <div key={pipeline.stage} className="flex items-center gap-2">
              <div
                className={`flex flex-col items-center gap-2 transition-all ${
                  pipeline.active ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div
                  className={`p-3 rounded-lg border-2 ${
                    pipeline.active
                      ? 'border-primary bg-primary/10 glow-cyan'
                      : 'border-border bg-muted'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div className="text-center">
                  <div className={`text-xs font-bold ${config.color}`}>
                    {config.label}
                  </div>
                  {pipeline.active && (
                    <div className="text-[10px] text-muted-foreground mt-1">
                      {pipeline.latency.toFixed(1)}ms
                    </div>
                  )}
                </div>
              </div>
              
              {index < pipelines.length - 1 && (
                <ChevronRight
                  className={`w-5 h-5 ${
                    pipeline.active ? 'text-primary animate-pulse' : 'text-muted-foreground'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
