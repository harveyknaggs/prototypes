// Shared primitives: Card wrapper with springy entrance + hover tilt
const { useEffect, useRef, useState, useMemo, useLayoutEffect } = React;

function useSpringyTilt(enabled = true) {
  const ref = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${-y * 2.2}deg) rotateY(${x * 2.2}deg) translateY(-2px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);
  return ref;
}

function Card({ children, delay = 0, className = '', style = {}, tilt = false, onClick, ...rest }) {
  const tiltRef = useSpringyTilt(tilt);
  return (
    <div
      ref={tiltRef}
      onClick={onClick}
      className={`card ${className}`}
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--line)',
        animation: `floatIn 0.8s ${delay}s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
        willChange: 'transform',
        transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 260ms ease',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

function Chip({ children, tone = 'default', size = 'sm', style = {}, ...rest }) {
  const tones = {
    default: { bg: '#f0ece2', fg: '#3a3832', border: '#e4ddd0' },
    good: { bg: 'var(--good-soft)', fg: 'var(--good)', border: '#b9e2c9' },
    accent: { bg: 'var(--accent-soft)', fg: 'var(--accent-ink)', border: '#d4d2ff' },
    warn: { bg: 'var(--warn-soft)', fg: 'var(--warn)', border: '#f1d1a8' },
    ink: { bg: 'var(--ink)', fg: '#fff', border: 'var(--ink)' },
    muted: { bg: 'transparent', fg: 'var(--ink-3)', border: 'var(--line-2)' },
    hot: { bg: '#ffe9e4', fg: '#c6361d', border: '#f5c8bd' },
  };
  const t = tones[tone] || tones.default;
  const pad = size === 'lg' ? '6px 12px' : '3px 9px';
  const fs = size === 'lg' ? 13 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: pad, borderRadius: 999,
      background: t.bg, color: t.fg, border: `1px solid ${t.border}`,
      fontSize: fs, fontWeight: 600, letterSpacing: '-0.005em',
      ...style,
    }} {...rest}>{children}</span>
  );
}

function Btn({ children, variant = 'default', size = 'md', icon, iconRight, style = {}, ...rest }) {
  const pads = { sm: '6px 10px', md: '9px 14px', lg: '12px 18px' };
  const fs = { sm: 12.5, md: 13.5, lg: 14 };
  const variants = {
    default: { bg: '#fff', fg: 'var(--ink)', border: 'var(--line-2)', hoverBg: '#faf7f1' },
    accent: { bg: 'var(--accent)', fg: '#fff', border: 'var(--accent)', hoverBg: 'var(--accent-ink)' },
    ghost: { bg: 'transparent', fg: 'var(--ink-2)', border: 'transparent', hoverBg: 'var(--bg-deep)' },
    danger: { bg: '#fff', fg: 'var(--danger)', border: '#f1c5c9', hoverBg: '#fdf2f3' },
    dark: { bg: 'var(--ink)', fg: '#fff', border: 'var(--ink)', hoverBg: '#000' },
  };
  const v = variants[variant] || variants.default;
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: pads[size], fontSize: fs[size], fontWeight: 600,
        borderRadius: 10, border: `1px solid ${v.border}`,
        background: hov ? v.hoverBg : v.bg, color: v.fg,
        boxShadow: variant === 'accent' || variant === 'dark' ? '0 1px 0 rgba(0,0,0,0.15), 0 4px 12px -4px rgba(45,43,255,0.3)' : '0 1px 0 rgba(27,26,23,0.04)',
        transition: 'all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hov ? 'translateY(-1px) scale(1.02)' : 'translateY(0)',
        letterSpacing: '-0.005em',
        ...style,
      }}
      {...rest}
    >
      {icon && <Icon name={icon} size={fs[size]} />}
      {children}
      {iconRight && <Icon name={iconRight} size={fs[size]} />}
    </button>
  );
}

function AnimatedNumber({ value, duration = 900, format = (v) => v, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf; const start = performance.now(); const from = 0; const to = value;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // ease out back-ish
      const e = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * e);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span>{format(display)}{suffix}</span>;
}

Object.assign(window, { Card, Chip, Btn, AnimatedNumber, useSpringyTilt });
