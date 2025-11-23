import { useState, useEffect, useCallback } from 'react';
import { FrameViewer } from '@/components/FrameViewer';
import { StatsPanel } from '@/components/StatsPanel';
import { PipelineVisualizer } from '@/components/PipelineVisualizer';
import { ControlPanel } from '@/components/ControlPanel';
import { FrameProcessor } from '@/lib/frameProcessor';
import { MockFrameGenerator } from '@/lib/mockFrameGenerator';
import { FrameData, FrameStats, ProcessingPipeline } from '@/types/frame';

const frameProcessor = new FrameProcessor();
const frameGenerator = new MockFrameGenerator();

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [viewMode, setViewMode] = useState<'raw' | 'processed'>('processed');
  const [currentFrame, setCurrentFrame] = useState<FrameData | null>(null);
  const [stats, setStats] = useState<FrameStats>({
    fps: 0,
    avgProcessingTime: 0,
    totalFrames: 0,
    droppedFrames: 0,
    resolution: { width: 640, height: 480 },
  });

  const [pipelines, setPipelines] = useState<ProcessingPipeline[]>([
    { stage: 'camera', active: false, latency: 0 },
    { stage: 'jni', active: false, latency: 0 },
    { stage: 'opencv', active: false, latency: 0 },
    { stage: 'opengl', active: false, latency: 0 },
    { stage: 'display', active: false, latency: 0 },
  ]);

  const generateFrame = useCallback(() => {
    const startTime = performance.now();
    
    // Simulate pipeline stages
    const frame = viewMode === 'raw' 
      ? frameGenerator.generateRawFrame()
      : frameGenerator.generateProcessedFrame();
    
    frameProcessor.processFrame(frame);
    setCurrentFrame(frame);
    
    const totalLatency = performance.now() - startTime;
    
    // Update pipeline visualization with realistic latencies
    setPipelines([
      { stage: 'camera', active: true, latency: totalLatency * 0.2 },
      { stage: 'jni', active: true, latency: totalLatency * 0.1 },
      { stage: 'opencv', active: true, latency: totalLatency * 0.4 },
      { stage: 'opengl', active: true, latency: totalLatency * 0.2 },
      { stage: 'display', active: true, latency: totalLatency * 0.1 },
    ]);
  }, [viewMode]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      generateFrame();
      setStats(frameProcessor.getStats());
    }, 33); // ~30 FPS

    return () => clearInterval(interval);
  }, [isRunning, generateFrame]);

  const handleReset = () => {
    frameProcessor.reset();
    setCurrentFrame(null);
    setStats({
      fps: 0,
      avgProcessingTime: 0,
      totalFrames: 0,
      droppedFrames: 0,
      resolution: { width: 640, height: 480 },
    });
    setPipelines(pipelines.map(p => ({ ...p, active: false, latency: 0 })));
  };

  return (
    <div className="min-h-screen bg-background tech-grid p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary uppercase tracking-wider glow-cyan">
            OpenCV Web Viewer
          </h1>
          <p className="text-muted-foreground text-sm">
            TypeScript Frame Processing Dashboard • Camera → JNI → OpenCV C++ → OpenGL ES → Display
          </p>
        </div>

        {/* Control Panel */}
        <ControlPanel
          isRunning={isRunning}
          viewMode={viewMode}
          onToggleRunning={() => setIsRunning(!isRunning)}
          onReset={handleReset}
          onViewModeChange={setViewMode}
        />

        {/* Stats Panel */}
        <StatsPanel stats={stats} />

        {/* Pipeline Visualizer */}
        <PipelineVisualizer pipelines={pipelines} />

        {/* Frame Viewer */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide">
              Live Frame Output
            </h2>
            <FrameViewer frame={currentFrame} />
          </div>
        </div>

        {/* Integration Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border-2 border-border rounded-lg bg-card/80 backdrop-blur">
            <h3 className="text-lg font-bold text-secondary mb-3 uppercase tracking-wide">
              WebSocket Integration
            </h3>
            <code className="block bg-muted p-3 rounded text-xs text-muted-foreground font-mono">
              ws://localhost:8080/frames
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Ready to receive base64 frames from Android app via WebSocket
            </p>
          </div>

          <div className="p-6 border-2 border-border rounded-lg bg-card/80 backdrop-blur">
            <h3 className="text-lg font-bold text-secondary mb-3 uppercase tracking-wide">
              HTTP Endpoint
            </h3>
            <code className="block bg-muted p-3 rounded text-xs text-muted-foreground font-mono">
              POST /api/frame
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Accepts JSON with base64 image data and metadata
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border">
          <p>Android + OpenCV C++ + OpenGL ES + TypeScript Web Viewer</p>
          <p className="mt-1">R&D Intern Assessment Project • Modular Architecture</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
