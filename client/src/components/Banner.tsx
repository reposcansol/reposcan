import { useEffect, useRef } from 'react';

export function Banner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions for X.com banner (1500x500)
    canvas.width = 1500;
    canvas.height = 500;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f0f0f'); // Near black
    gradient.addColorStop(0.5, '#1e1b4b'); // Deep indigo
    gradient.addColorStop(1, '#0f0f0f');

    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle glow effect
    ctx.shadowColor = '#818cf8';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw main text
    ctx.font = 'bold 160px "Inter", system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Create text gradient
    const textGradient = ctx.createLinearGradient(
      canvas.width / 2 - 300,
      0,
      canvas.width / 2 + 300,
      0
    );
    textGradient.addColorStop(0, '#818cf8'); // indigo-400
    textGradient.addColorStop(0.5, '#e879f9'); // fuchsia-400
    textGradient.addColorStop(1, '#818cf8'); // indigo-400

    ctx.fillStyle = textGradient;
    ctx.fillText('REPOSCAN', canvas.width / 2, canvas.height / 2 - 60);

    // Draw subtitle with better contrast and spacing
    ctx.font = '500 42px "Inter", system-ui';
    ctx.fillStyle = 'rgba(226, 232, 240, 0.95)'; // Brighter text
    ctx.fillText('Instantly evaluate GitHub repositories', canvas.width / 2, canvas.height / 2 + 40);
    ctx.fillStyle = '#818cf8'; // Indigo
    ctx.fillText('with confidence', canvas.width / 2, canvas.height / 2 + 100);

  }, []);

  return (
    <div className="w-full flex justify-center bg-black/50 backdrop-blur rounded-lg p-4">
      <canvas
        ref={canvasRef}
        className="banner-canvas w-full max-w-[1500px] h-auto rounded-lg shadow-2xl"
        style={{
          maxHeight: '500px',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}