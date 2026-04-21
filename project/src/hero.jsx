// Hero banner + interactive photo gallery card
function Hero({ delay = 0 }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const current = photos[active];

  return (
    <Card delay={delay} style={{ padding: 0, overflow: 'hidden' }}>
      {/* Banner */}
      <div style={{
        position: 'relative',
        height: 320,
        background: `linear-gradient(135deg, ${current.tone} 0%, ${shift(current.tone, 30)} 100%)`,
        transition: 'background 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        overflow: 'hidden',
      }}>
        {/* Decorative shapes to simulate a photo */}
        <PhotoScene hue={current.hue} />

        {/* Top overlay: back + actions */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          padding: 18, display: 'flex', justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(27,26,23,0.28) 0%, transparent 100%)',
        }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
            fontSize: 12.5, fontWeight: 600, color: 'var(--ink)',
          }}>
            <Icon name="arrow-left" size={13}/> All listings
          </button>
          <div style={{ display: 'flex', gap: 6 }}>
            <IconPill><Icon name="share" size={14}/></IconPill>
            <IconPill><Icon name="more" size={14}/></IconPill>
          </div>
        </div>

        {/* Bottom overlay: title + status + meta */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '28px 28px 24px',
          background: 'linear-gradient(0deg, rgba(27,26,23,0.68) 0%, transparent 100%)',
          color: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '3px 9px', borderRadius: 999,
              background: 'rgba(15,122,77,0.95)', color: '#fff',
              fontSize: 11, fontWeight: 600, letterSpacing: '-0.005em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b1f0c9', animation: 'pulseDot 1.6s infinite' }} />
              {property.status}
            </span>
            <span style={{ fontSize: 12, opacity: 0.9 }}>Listed {property.listedDays} days ago · {property.views.toLocaleString()} views</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <h1 className="serif" style={{ margin: 0, fontSize: 46, lineHeight: 1.02, letterSpacing: '-0.02em' }}>
                {property.title}
              </h1>
              <div style={{ fontSize: 14.5, opacity: 0.92, marginTop: 6, fontWeight: 500 }}>
                {property.suburb}, {property.city} · {property.subtitle}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn icon="edit" size="md" variant="default">Edit</Btn>
              <Btn icon="eye" size="md" variant="dark">Preview</Btn>
            </div>
          </div>
        </div>

        {/* Photo indicators */}
        <div style={{
          position: 'absolute', top: 20, right: 90,
          display: 'flex', gap: 4,
        }}>
          {photos.slice(0, 4).map((_, i) => (
            <div key={i} style={{
              height: 3, width: i === active ? 22 : 10,
              borderRadius: 3,
              background: i === active ? '#fff' : 'rgba(255,255,255,0.5)',
              transition: 'width 320ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}/>
          ))}
        </div>
      </div>

      {/* Thumbnail strip / gallery */}
      <div style={{ padding: '18px 22px 20px', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em' }}>Gallery</span>
            <span style={{ fontSize: 12, color: 'var(--ink-4)' }}>{active + 1} / {photos.length} · {current.label}</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Btn icon="plus" size="sm" variant="ghost">Upload photo</Btn>
            <Btn size="sm" variant="ghost" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Collapse' : 'View all'}
            </Btn>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: expanded ? 'repeat(8, 1fr)' : 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: 10,
          transition: 'all 400ms ease',
        }}>
          {photos.map((p, i) => (
            <Thumb key={p.id} photo={p} active={i === active} onClick={() => setActive(i)} delay={i * 0.04} />
          ))}
          <button style={{
            aspectRatio: '4/3', borderRadius: 12,
            border: '2px dashed var(--line-2)',
            background: 'var(--bg)',
            display: 'grid', placeItems: 'center',
            color: 'var(--ink-4)', fontSize: 11, fontWeight: 600,
            transition: 'all 200ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-2)'; e.currentTarget.style.color = 'var(--ink-4)'; }}
          >
            <div style={{ textAlign: 'center' }}>
              <Icon name="plus" size={18}/>
              <div style={{ marginTop: 2 }}>Add</div>
            </div>
          </button>
        </div>
      </div>
    </Card>
  );
}

function Thumb({ photo, active, onClick, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        aspectRatio: '4/3', borderRadius: 12,
        background: `linear-gradient(135deg, ${photo.tone} 0%, ${shift(photo.tone, 30)} 100%)`,
        border: active ? '2px solid var(--accent)' : '2px solid transparent',
        outline: active ? '3px solid var(--accent-soft)' : 'none',
        padding: 0, overflow: 'hidden',
        transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), outline 200ms',
        transform: hov ? 'translateY(-3px) scale(1.03) rotate(-0.4deg)' : 'translateY(0)',
        boxShadow: hov ? '0 12px 22px -10px rgba(27,26,23,0.35)' : '0 1px 2px rgba(27,26,23,0.06)',
        animation: `floatIn 0.6s ${delay}s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
        cursor: 'pointer',
      }}
    >
      <PhotoScene hue={photo.hue} compact />
      <div style={{
        position: 'absolute', bottom: 6, left: 6, right: 6,
        fontSize: 9.5, fontWeight: 600, color: '#fff',
        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        textAlign: 'left', letterSpacing: '-0.005em',
      }}>{photo.label}</div>
    </button>
  );
}

// Decorative "photo" rendered from gradients + shapes based on hue
function PhotoScene({ hue, compact = false }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, display: 'block' }}>
      <defs>
        <linearGradient id={`sky-${hue}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={`hsl(${hue}, 30%, 75%)`} />
          <stop offset="1" stopColor={`hsl(${hue}, 25%, 60%)`} />
        </linearGradient>
        <linearGradient id={`grd-${hue}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={`hsl(${hue}, 20%, 55%)`} />
          <stop offset="1" stopColor={`hsl(${hue}, 25%, 35%)`} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky-${hue})`} />
      {/* subtle hills */}
      <path d={`M0 ${200 + (hue%40)} Q 100 ${180 + (hue%30)} 200 ${210 + (hue%20)} T 400 ${200 + (hue%25)} L 400 300 L 0 300 Z`}
        fill={`url(#grd-${hue})`} opacity="0.9" />
      {/* sun/moon */}
      <circle cx={70 + (hue%120)} cy={60 + (hue%40)} r={compact ? 14 : 24} fill="#fff" opacity="0.6"/>
      {/* rectangle "building" */}
      <rect x={130 + (hue%80)} y={140 + (hue%40)} width={120} height={90}
        fill={`hsl(${hue}, 15%, 25%)`} opacity="0.45" rx="2"/>
      <rect x={140 + (hue%80)} y={160 + (hue%40)} width={20} height={28}
        fill={`hsl(${hue}, 60%, 85%)`} opacity="0.8"/>
      <rect x={180 + (hue%80)} y={160 + (hue%40)} width={20} height={28}
        fill={`hsl(${hue}, 60%, 85%)`} opacity="0.8"/>
    </svg>
  );
}

function IconPill({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 32, height: 32, borderRadius: 999,
        background: hov ? '#fff' : 'rgba(255,255,255,0.92)',
        color: 'var(--ink)',
        display: 'grid', placeItems: 'center',
        transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hov ? 'scale(1.1)' : 'scale(1)',
        backdropFilter: 'blur(6px)',
      }}>{children}</button>
  );
}

function shift(hex, amt) {
  // approximate darken by mixing toward black
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  const f = (v) => Math.max(0, v - amt).toString(16).padStart(2, '0');
  return `#${f(r)}${f(g)}${f(b)}`;
}

Object.assign(window, { Hero });
