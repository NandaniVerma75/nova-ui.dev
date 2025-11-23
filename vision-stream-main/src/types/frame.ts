export interface FrameData {
  id: string;
  timestamp: number;
  width: number;
  height: number;
  data: string; // base64 encoded image
  processingTime: number; // milliseconds
  type: 'raw' | 'processed';
}

export interface FrameStats {
  fps: number;
  avgProcessingTime: number;
  totalFrames: number;
  droppedFrames: number;
  resolution: {
    width: number;
    height: number;
  };
}

export interface ProcessingPipeline {
  stage: 'camera' | 'jni' | 'opencv' | 'opengl' | 'display';
  active: boolean;
  latency: number;
}
