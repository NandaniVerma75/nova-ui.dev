import { FrameData } from '@/types/frame';

export class MockFrameGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width = 640;
  private height = 480;
  private frameId = 0;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d')!;
  }

  generateRawFrame(): FrameData {
    const startTime = performance.now();
    
    // Generate mock camera frame with gradient
    const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Add some "noise" for realism
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const size = Math.random() * 3;
      this.ctx.fillStyle = `rgba(100, 200, 255, ${Math.random() * 0.3})`;
      this.ctx.fillRect(x, y, size, size);
    }
    
    // Add timestamp text
    this.ctx.fillStyle = '#00d4ff';
    this.ctx.font = '16px monospace';
    this.ctx.fillText(`Frame ${this.frameId} - RAW`, 10, 30);
    this.ctx.fillText(`${Date.now()}`, 10, 50);

    const processingTime = performance.now() - startTime;
    const data = this.canvas.toDataURL('image/png');

    this.frameId++;
    
    return {
      id: `frame-${this.frameId}`,
      timestamp: Date.now(),
      width: this.width,
      height: this.height,
      data,
      processingTime,
      type: 'raw',
    };
  }

  generateProcessedFrame(): FrameData {
    const startTime = performance.now();
    
    // Simulate edge detection effect
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw edge-like patterns
    this.ctx.strokeStyle = '#00ff88';
    this.ctx.lineWidth = 2;
    
    for (let i = 0; i < 20; i++) {
      this.ctx.beginPath();
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const radius = Math.random() * 50 + 20;
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    
    // Add some random lines
    for (let i = 0; i < 15; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(Math.random() * this.width, Math.random() * this.height);
      this.ctx.lineTo(Math.random() * this.width, Math.random() * this.height);
      this.ctx.stroke();
    }
    
    // Add processing info
    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = '16px monospace';
    this.ctx.fillText(`Frame ${this.frameId} - CANNY EDGE`, 10, 30);
    this.ctx.fillText(`OpenCV C++ Processing`, 10, 50);

    // Simulate realistic processing time
    const processingTime = performance.now() - startTime + Math.random() * 10 + 5;
    const data = this.canvas.toDataURL('image/png');

    this.frameId++;
    
    return {
      id: `frame-${this.frameId}`,
      timestamp: Date.now(),
      width: this.width,
      height: this.height,
      data,
      processingTime,
      type: 'processed',
    };
  }
}
