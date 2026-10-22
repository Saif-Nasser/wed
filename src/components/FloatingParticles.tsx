"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  alphaSpeed: number;
  type: "dust" | "petal";
  angle?: number;
  spinSpeed?: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const particleCount = 45;

    const goldHues = [
      "rgba(255, 235, 170, ",
      "rgba(212, 175, 55, ",
      "rgba(235, 200, 100, ",
      "rgba(255, 255, 255, ",
    ];

    const petalColors = [
      "rgba(244, 187, 194, ", // soft rose
      "rgba(255, 228, 225, ", // misty rose
      "rgba(226, 170, 180, ", // vintage blush
    ];

    for (let i = 0; i < particleCount; i++) {
      const isPetal = i % 4 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isPetal ? Math.random() * 4 + 3 : Math.random() * 1.8 + 0.8,
        color: isPetal
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : goldHues[Math.floor(Math.random() * goldHues.length)],
        vx: (Math.random() - 0.5) * 0.4 + (isPetal ? 0.2 : 0),
        vy: isPetal ? Math.random() * 0.7 + 0.3 : Math.random() * -0.5 - 0.1,
        alpha: Math.random() * 0.7 + 0.2,
        alphaSpeed: (Math.random() - 0.5) * 0.008,
        type: isPetal ? "petal" : "dust",
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.angle !== undefined && p.spinSpeed !== undefined) {
          p.angle += p.spinSpeed;
        }

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.save();
        ctx.fillStyle = `${p.color}${p.alpha})`;

        if (p.type === "petal") {
          ctx.translate(p.x, p.y);
          if (p.angle !== undefined) ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 1.8, p.radius, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(212, 175, 55, 0.6)";
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
      aria-hidden="true"
    />
  );
}
