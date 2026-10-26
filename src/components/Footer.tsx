"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // ─── Cybernetic Pixel Matrix Canvas (Black to Glowing Gradient Boxes) ───────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const BOX_SIZE = 22;
    const GAP = 4;
    const CELL_SIZE = BOX_SIZE + GAP;

    let cols = 0;
    let rows = 0;

    // Palette of bright neon gradients for the pixel boxes
    const colorPalettes = [
      { start: "#9780FF", end: "#7322F2" }, // Ultraviolet
      { start: "#00F0FF", end: "#3B82F6" }, // Electric Cyan
      { start: "#FF7410", end: "#F43F5E" }, // Radiant Amber / Coral
      { start: "#A855F7", end: "#EC4899" }, // Neon Magenta
    ];

    interface PixelCell {
      alpha: number; // 0 (black/off) to 1 (full bright gradient)
      targetAlpha: number;
      palette: { start: string; end: string };
      decaySpeed: number;
    }

    let grid: PixelCell[][] = [];

    const resize = () => {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      cols = Math.ceil(canvas.width / CELL_SIZE);
      rows = Math.ceil(canvas.height / CELL_SIZE);

      grid = [];
      for (let r = 0; r < rows; r++) {
        const row: PixelCell[] = [];
        for (let c = 0; c < cols; c++) {
          row.push({
            alpha: 0,
            targetAlpha: 0,
            palette: colorPalettes[Math.floor(Math.random() * colorPalettes.length)],
            decaySpeed: 0.01 + Math.random() * 0.02,
          });
        }
        grid.push(row);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frameCount = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      frameCount++;

      // Randomly ignite 4-6 random pixel cubes from black to glowing gradient boxes
      if (frameCount % 2 === 0 && rows > 0 && cols > 0) {
        for (let k = 0; k < 5; k++) {
          // Focus random ignitions in the lower 70% where the wordmark & gradient live
          const startRow = Math.floor(rows * 0.3);
          const r = startRow + Math.floor(Math.random() * (rows - startRow));
          const c = Math.floor(Math.random() * cols);

          if (grid[r] && grid[r][c] && grid[r][c].alpha < 0.1) {
            grid[r][c].targetAlpha = 0.65 + Math.random() * 0.35;
            grid[r][c].palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
          }
        }
      }

      // Mouse proximity interaction: ignite cubes under cursor
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const centerCol = Math.floor(mx / CELL_SIZE);
        const centerRow = Math.floor(my / CELL_SIZE);
        const radius = 3;

        for (let r = centerRow - radius; r <= centerRow + radius; r++) {
          for (let c = centerCol - radius; c <= centerCol + radius; c++) {
            if (grid[r] && grid[r][c]) {
              const d = Math.sqrt((r - centerRow) ** 2 + (c - centerCol) ** 2);
              if (d <= radius) {
                grid[r][c].targetAlpha = Math.max(grid[r][c].targetAlpha, (1 - d / radius) * 0.9);
              }
            }
          }
        }
      }

      // Draw all pixel cubes
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r][c];
          if (!cell) continue;

          // Smoothly approach targetAlpha, then decay back to dark/off
          if (cell.targetAlpha > cell.alpha) {
            cell.alpha += (cell.targetAlpha - cell.alpha) * 0.25;
            if (cell.alpha >= cell.targetAlpha - 0.05) {
              cell.targetAlpha = 0; // begin fading out
            }
          } else {
            cell.alpha = Math.max(0, cell.alpha - cell.decaySpeed);
          }

          const x = c * CELL_SIZE;
          const y = r * CELL_SIZE;

          // Draw resting subtle dark border box
          ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, BOX_SIZE, BOX_SIZE);

          // If cell is active, draw glowing gradient box!
          if (cell.alpha > 0.02) {
            ctx.save();
            ctx.globalAlpha = cell.alpha;

            // Gradient fill from top-left to bottom-right
            const grad = ctx.createLinearGradient(x, y, x + BOX_SIZE, y + BOX_SIZE);
            grad.addColorStop(0, cell.palette.start);
            grad.addColorStop(1, cell.palette.end);

            ctx.fillStyle = grad;
            ctx.shadowColor = cell.palette.start;
            ctx.shadowBlur = 12 * cell.alpha;

            // Rounded rectangle box
            const rad = 3;
            ctx.beginPath();
            ctx.roundRect(x, y, BOX_SIZE, BOX_SIZE, rad);
            ctx.fill();

            // Inner bright specular highlight on the box
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
          }
        }
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      id="contacts"
      className="relative bg-[#07060A] pt-32 pb-12 overflow-hidden border-t border-white/[0.06]"
    >
      {/* ── 1. Intense, Vivid Multi-Color Glowing Horizon Gradient ───────────── */}
      {/* Ultra-saturated Electric Purple & Cyan & Coral glow blooming from bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: 520,
          background:
            "radial-gradient(ellipse 140% 100% at 50% 100%, rgba(115, 34, 242, 0.85) 0%, rgba(151, 128, 255, 0.6) 28%, rgba(0, 240, 255, 0.35) 50%, rgba(255, 116, 16, 0.25) 70%, transparent 95%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary Cyan/Magenta volumetric flare */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: 340,
          background:
            "radial-gradient(circle at 35% 100%, rgba(0, 240, 255, 0.4) 0%, transparent 55%), radial-gradient(circle at 65% 100%, rgba(255, 116, 16, 0.35) 0%, transparent 55%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── 2. Random Moving Pixel Cubes Canvas (Black to Gradient Boxes) ─────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* ── 3. TOP SECTION: Direct Inquiries & Sprint Commission (Wide & Spaced) ── */}
      <div className="relative z-20 max-w-[1560px] mx-auto px-6 sm:px-12 md:px-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 lg:gap-36 mb-36 sm:mb-44">
        {/* Left: Email in one single clean line with generous breathing room */}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs uppercase tracking-widest text-[#9780FF] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span>INITIATE COLLABORATION // DIRECT CHANNEL</span>
          </p>
          <a
            href="mailto:hello.commerceagents@gmail.com"
            className="inline-block font-light text-white tracking-tight leading-none hover:text-[#9780FF] transition-colors duration-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            style={{
              fontSize: "clamp(22px, 2.7vw, 44px)",
              whiteSpace: "nowrap",
            }}
          >
            hello.commerceagents@gmail.com
          </a>
        </div>

        {/* Right: Upgrade / Commission Callout */}
        <div className="shrink-0 flex flex-col items-start lg:items-end">
          <h4 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-2">
            Upgrade Your Commerce Reality
          </h4>
          <p className="text-xs text-zinc-400 font-light mb-6 lg:text-right max-w-sm leading-relaxed">
            Commission a dedicated 0→1 build sprint with Santhosh A. Bespoke design &amp; engineering.
          </p>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2 group shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-105"
          >
            <span>COMMISSION SPRINT</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── 4. Brand Wordmark: Big Width, Spanning Edge to Edge Naturally ───────── */}
      <div className="relative z-20 w-full max-w-[1700px] mx-auto px-4 sm:px-8 text-center select-none pb-14">
        <h2
          className="font-bold text-white uppercase leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] tracking-[0.10em] sm:tracking-[0.12em]"
          style={{
            fontSize: "clamp(46px, 10.4vw, 172px)",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          COMMERCE AGENTS
        </h2>
      </div>

      {/* ── 5. FOOTER DOWN INFO: Copyright & Policy Links ─────────────────────── */}
      <div className="relative z-20 max-w-[1560px] mx-auto px-6 sm:px-12 md:px-20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 border-t border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span>© 2026 COMMERCE AGENTS STUDIO. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
          <span className="text-zinc-600">|</span>
          <span className="hover:text-white transition-colors cursor-pointer">TERMS OF SERVICE</span>
        </div>
      </div>
    </footer>
  );
}
