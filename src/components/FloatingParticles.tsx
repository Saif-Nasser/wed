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

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    // Optimized particle count for silky-smooth 60-120fps on all devices
    const particleCount = 20;

    const goldHues = [
      "rgba(255, 235, 170, ",
      "rgba(212, 175, 55, ",
      "rgba(245, 222, 147, ",
    ];

    const petalColors = [
      "rgba(244, 187, 194, ", // soft rose
      "rgba(238, 196, 203, ", // blush
    ];

    for (let i = 0; i < particleCount; i++) {
      const isPetal = i % 4 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isPetal ? Math.random() * 3 + 2.5 : Math.random() * 1.5 + 0.8,
        color: isPetal
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : goldHues[Math.floor(Math.random() * goldHues.length)],
        vx: (Math.random() - 0.5) * 0.3 + (isPetal ? 0.15 : 0),
        vy: isPetal ? Math.random() * 0.5 + 0.2 : Math.random() * -0.4 - 0.1,
        alpha: Math.random() * 0.5 + 0.2,
        alphaSpeed: (Math.random() - 0.5) * 0.005,
        type: isPetal ? "petal" : "dust",
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.alphaSpeed;

          if (p.alpha > 0.75 || p.alpha < 0.15) {
            p.alphaSpeed = -p.alphaSpeed;
          }

          if (p.angle !== undefined && p.spinSpeed !== undefined) {
            p.angle += p.spinSpeed;
          }

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          ctx.fillStyle = `${p.color}${p.alpha})`;

          if (p.type === "petal") {
            ctx.save();
            ctx.translate(p.x, p.y);
            if (p.angle !== undefined) ctx.rotate(p.angle);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.radius * 1.6, p.radius, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 transform-gpu"
      aria-hidden="true"
    />
  );
}
