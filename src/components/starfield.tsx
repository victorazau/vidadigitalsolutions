"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const NUM_STARS = 600;
    const SPEED = 0.5;
    const stars: Star[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < NUM_STARS; i++) {
        stars.push({
          x: Math.random() * canvas!.width - canvas!.width / 2,
          y: Math.random() * canvas!.height - canvas!.height / 2,
          z: Math.random() * canvas!.width,
          prevX: 0,
          prevY: 0,
        });
      }
    }

    function animate() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx!.fillStyle = "rgba(3, 0, 20, 0.15)";
      ctx!.fillRect(0, 0, w, h);

      for (const star of stars) {
        star.prevX = (star.x / star.z) * w + cx;
        star.prevY = (star.y / star.z) * h + cy;

        star.z -= SPEED;

        if (star.z <= 0) {
          star.x = Math.random() * w - cx;
          star.y = Math.random() * h - cy;
          star.z = w;
          star.prevX = (star.x / star.z) * w + cx;
          star.prevY = (star.y / star.z) * h + cy;
        }

        const sx = (star.x / star.z) * w + cx;
        const sy = (star.y / star.z) * h + cy;

        if (sx < 0 || sx >= w || sy < 0 || sy >= h) {
          star.x = Math.random() * w - cx;
          star.y = Math.random() * h - cy;
          star.z = w;
          continue;
        }

        const size = Math.max(0.5, (1 - star.z / w) * 2.5);
        const brightness = 1 - star.z / w;

        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(180, 200, 255, ${brightness})`;
        ctx!.lineWidth = size;
        ctx!.moveTo(star.prevX, star.prevY);
        ctx!.lineTo(sx, sy);
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.fillStyle = `rgba(220, 230, 255, ${brightness})`;
        ctx!.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    resize();
    initStars();

    // Initial fill with dark background
    ctx.fillStyle = "rgb(3, 0, 20)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    window.addEventListener("resize", () => {
      resize();
      initStars();
      ctx.fillStyle = "rgb(3, 0, 20)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
