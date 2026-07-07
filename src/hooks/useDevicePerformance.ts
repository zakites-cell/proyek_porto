import { useState, useEffect } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

interface DevicePerformance {
  tier: PerformanceTier;
  isMobile: boolean;
  gpu: string;
}

function detectGPU(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');
    if (gl && gl instanceof WebGLRenderingContext) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
      }
    }
  } catch {
    // WebGL not available
  }
  return 'unknown';
}

function detectTier(isMobile: boolean, gpu: string): PerformanceTier {
  if (isMobile) return 'low';

  const lowEndKeywords = ['intel', 'mesa', 'llvmpipe', 'swiftshader'];
  const gpuLower = gpu.toLowerCase();
  const isLowEnd = lowEndKeywords.some((keyword) => gpuLower.includes(keyword));

  if (isLowEnd) return 'medium';

  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores <= 2) return 'low';
  if (cores <= 4) return 'medium';

  return 'high';
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    tier: 'high',
    isMobile: false,
    gpu: 'unknown',
  });

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
      navigator.userAgent,
    ) || window.innerWidth < 768;

    const gpu = detectGPU();
    const tier = detectTier(isMobile, gpu);

    setPerformance({ tier, isMobile, gpu });
  }, []);

  return performance;
}
