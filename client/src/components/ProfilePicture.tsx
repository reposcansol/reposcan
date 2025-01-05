import { useEffect, useRef } from 'react';

export function ProfilePicture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions for X.com profile picture (400x400)
    canvas.width = 400;
    canvas.height = 400;

    // Create gradient background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, '#1e1b4b'); // Deep indigo center
    gradient.addColorStop(1, '#0f0f0f'); // Dark edges

    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle glow effect
    ctx.shadowColor = '#818cf8';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw main text (R logo)
    ctx.font = 'bold 200px "Inter", system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Create text gradient
    const textGradient = ctx.createLinearGradient(
      canvas.width / 2 - 100,
      0,
      canvas.width / 2 + 100,
      0
    );
    textGradient.addColorStop(0, '#818cf8'); // indigo-400
    textGradient.addColorStop(0.5, '#e879f9'); // fuchsia-400
    textGradient.addColorStop(1, '#818cf8'); // indigo-400

    ctx.fillStyle = textGradient;
    ctx.fillText('R', canvas.width / 2, canvas.height / 2);

  }, []);

  return (
    <div className="w-full flex justify-center bg-black/50 backdrop-blur rounded-lg p-4">
      <canvas
        ref={canvasRef}
        className="profile-canvas w-full max-w-[400px] h-auto rounded-lg shadow-2xl"
        style={{
          maxHeight: '400px',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}