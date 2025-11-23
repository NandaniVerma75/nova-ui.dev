import { FrameData, FrameStats } from '@/types/frame';

export class FrameProcessor {
  private frameHistory: FrameData[] = [];
  private maxHistory = 60;
  private frameCount = 0;
  private droppedCount = 0;
  private lastTimestamp = 0;

  processFrame(frameData: FrameData): void {
    this.frameHistory.push(frameData);
    if (this.frameHistory.length > this.maxHistory) {
      this.frameHistory.shift();
    }
    this.frameCount++;
  }

  getStats(): FrameStats {
    const now = performance.now();
    const timeDelta = (now - this.lastTimestamp) / 1000;
    this.lastTimestamp = now;

    const recentFrames = this.frameHistory.slice(-30);
    const avgProcessingTime = recentFrames.length > 0
      ? recentFrames.reduce((sum, f) => sum + f.processingTime, 0) / recentFrames.length
      : 0;

    const fps = recentFrames.length > 0 && timeDelta > 0
      ? Math.min(60, Math.round(recentFrames.length / timeDelta))
      : 0;

    const resolution = recentFrames.length > 0
      ? { width: recentFrames[0].width, height: recentFrames[0].height }
      : { width: 1920, height: 1080 };

    return {
      fps,
      avgProcessingTime,
      totalFrames: this.frameCount,
      droppedFrames: this.droppedCount,
      resolution,
    };
  }

  getLatestFrame(): FrameData | null {
    return this.frameHistory[this.frameHistory.length - 1] || null;
  }

  reset(): void {
    this.frameHistory = [];
    this.frameCount = 0;
    this.droppedCount = 0;
  }
}
