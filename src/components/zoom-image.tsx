"use client";

import { type ReactNode, useRef } from "react";

// Tap any image to open it large on a dark backdrop; scroll or pinch to
// zoom, drag to move, tap outside / Esc / the close button to leave. The
// picture on the page is `children`; `src` is the full-size file shown in
// the spotlight. Native <dialog> gives Esc and focus handling for free.
export function ZoomImage({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const img = useRef<HTMLImageElement>(null);
  // scale and offset live outside React state: they change on every pointer
  // move and only ever touch one element's transform.
  const view = useRef({ k: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const moved = useRef(false);

  const paint = () => {
    const { k, x, y } = view.current;
    if (img.current)
      img.current.style.transform = `translate(${x}px, ${y}px) scale(${k})`;
  };

  // Zoom by `factor`, keeping the point under (cx, cy) where it is.
  const zoomAt = (factor: number, cx: number, cy: number) => {
    const v = view.current;
    const k = Math.min(8, Math.max(1, v.k * factor));
    const ox = cx - window.innerWidth / 2;
    const oy = cy - window.innerHeight / 2;
    v.x = ox - ((ox - v.x) * k) / v.k;
    v.y = oy - ((oy - v.y) * k) / v.k;
    v.k = k;
    if (k === 1) {
      v.x = 0;
      v.y = 0;
    }
    paint();
  };

  const open = () => {
    view.current = { k: 1, x: 0, y: 0 };
    pointers.current.clear();
    paint();
    dialog.current?.showModal();
  };

  const spread = () => {
    const [a, b] = [...pointers.current.values()];
    return {
      d: Math.hypot(a.x - b.x, a.y - b.y),
      cx: (a.x + b.x) / 2,
      cy: (a.y + b.y) / 2,
    };
  };

  return (
    <>
      <button
        type="button"
        className="zoom-open"
        onClick={open}
        aria-label={`Open image: ${alt}`}
      >
        {children}
      </button>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Esc and the Close button are the keyboard ways out; the click is backdrop-tap only */}
      <dialog
        ref={dialog}
        className="zoom"
        aria-label={alt}
        onWheel={(e) =>
          zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY)
        }
        onPointerDown={(e) => {
          moved.current = false;
          pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
          (e.target as Element).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          const was = pointers.current.get(e.pointerId);
          if (!was) return;
          const before = pointers.current.size === 2 ? spread() : null;
          pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
          const v = view.current;
          if (before) {
            const after = spread();
            v.x += after.cx - before.cx;
            v.y += after.cy - before.cy;
            zoomAt(after.d / before.d, after.cx, after.cy);
            moved.current = true;
          } else if (pointers.current.size === 1) {
            const dx = e.clientX - was.x;
            const dy = e.clientY - was.y;
            if (Math.abs(dx) + Math.abs(dy) > 2) moved.current = true;
            if (v.k > 1) {
              v.x += dx;
              v.y += dy;
              paint();
            }
          }
        }}
        onPointerUp={(e) => pointers.current.delete(e.pointerId)}
        onPointerCancel={(e) => pointers.current.delete(e.pointerId)}
        onClick={(e) => {
          // a tap on the backdrop closes; a drag or a tap on the picture doesn't
          if (!moved.current && e.target !== img.current)
            dialog.current?.close();
        }}
        onDoubleClick={(e) =>
          zoomAt(view.current.k > 1 ? 0 : 2.5, e.clientX, e.clientY)
        }
      >
        {/* biome-ignore lint/performance/noImgElement: the spotlight shows the original file, moved by a transform */}
        <img ref={img} src={src} alt={alt} draggable={false} />
        <button
          type="button"
          className="zoom-close"
          onClick={() => dialog.current?.close()}
        >
          Close
        </button>
      </dialog>
    </>
  );
}
