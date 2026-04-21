// Documents card — collapsed by default, click to expand file list
function DocumentsCard({ delay = 0 }) {
  const [open, setOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <Card
      delay={delay}
      style={{ padding: 0, overflow: 'hidden' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Toggle header — hover anywhere on the card to expand */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '20px 22px', width: '100%', textAlign: 'left',
          background: open ? 'var(--bg)' : 'transparent',
          borderRadius: open ? 'var(--radius-lg) var(--radius-lg) 0 0' : 'var(--radius-lg)',
          transition: 'background 200ms ease',
        }}
      >
        {/* Animated stacked document thumbnails */}
        <DocIconStack open={open} />

        {/* Title + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>Documents</h3>
            <Chip tone="default">{documents.length}</Chip>
          </div>
          {open ? (
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>
              Uploaded files buyers can request during enquiry.
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {documents.map((d) => (
                <Chip key={d.id} style={{
                  background: d.tone + '18', color: d.tone, borderColor: d.tone + '33',
                  fontSize: 11,
                }}>
                  {d.type}
                </Chip>
              ))}
            </div>
          )}
        </div>

        {/* Right side: download tally + chevron */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {!open && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 999,
              background: 'var(--bg-deep)', fontSize: 11.5, fontWeight: 600, color: 'var(--ink-3)',
            }}>
              <Icon name="download" size={12}/>
              {documents.reduce((s, d) => s + d.downloads, 0)} downloads
            </div>
          )}
          <div style={{
            width: 28, height: 28, borderRadius: 9,
            display: 'grid', placeItems: 'center',
            background: 'var(--bg-deep)',
          }}>
            <Icon name="chevron-right" size={14} style={{
              color: 'var(--ink-3)',
              transition: 'transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            }}/>
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div style={{
        maxHeight: open ? 900 : 0,
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 320ms ease',
      }}>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {/* Header actions */}
          <div style={{ padding: '16px 22px 10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Btn size="sm" icon="plus" variant="default">Upload</Btn>
          </div>

          {/* Upload strip */}
          <div style={{
            margin: '0 22px 14px',
            padding: '14px 16px',
            background: 'var(--bg)',
            border: '1.5px dashed var(--line-2)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          }}>
            <select style={{
              padding: '8px 12px', fontSize: 13, fontWeight: 500,
              borderRadius: 10, border: '1px solid var(--line)',
              background: '#fff', color: 'var(--ink)', fontFamily: 'inherit',
              minWidth: 160,
            }}>
              <option>LIM Report</option>
              <option>Title</option>
              <option>Builders Report</option>
              <option>Council Records</option>
            </select>
            <input placeholder="e.g. LIM Report 2026" style={{
              flex: 1, minWidth: 180,
              padding: '8px 12px', fontSize: 13,
              borderRadius: 10, border: '1px solid var(--line)',
              background: '#fff', fontFamily: 'inherit',
              color: 'var(--ink)', outline: 'none',
            }}/>
            <button style={{
              padding: '8px 12px', fontSize: 12.5, fontWeight: 600,
              borderRadius: 10, border: '1px solid var(--line-2)',
              background: '#fff', color: 'var(--ink-2)',
            }}>Choose file</button>
            <Btn size="sm" variant="accent" icon="download" style={{ transform: 'scaleX(-1)' }}>Upload</Btn>
          </div>

          {/* Doc rows */}
          <div style={{ padding: '0 10px 14px' }}>
            {documents.map((d, i) => (
              <DocRow key={d.id} doc={d}
                delay={0.05 + i * 0.08}
                hovered={hoveredRow === d.id}
                onEnter={() => setHoveredRow(d.id)}
                onLeave={() => setHoveredRow(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// Decorative stacked miniature document icons
function DocIconStack({ open }) {
  const [hov, setHov] = useState(false);
  const active = open || hov;
  return (
    <div
      style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {documents.map((d, i) => {
        const offsets = [
          { x: -8, y: 4, r: -10 },
          { x:  0, y: 0, r:  0  },
          { x:  8, y: 4, r:  10 },
        ];
        const o = offsets[i];
        return (
          <div key={d.id} style={{
            position: 'absolute',
            left: '50%', top: '50%',
            width: 32, height: 40,
            background: '#fff',
            borderRadius: 6,
            border: '1px solid var(--line)',
            boxShadow: active
              ? `0 8px 16px -6px ${d.tone}55`
              : '0 2px 4px rgba(27,26,23,0.07)',
            transition: 'transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 280ms ease',
            transform: active
              ? `translate(calc(-50% + ${o.x}px), calc(-50% + ${o.y}px)) rotate(${o.r}deg)`
              : `translate(calc(-50% + ${i * 2 - 2}px), calc(-50% - ${i * 1}px))`,
            zIndex: i + 1,
            overflow: 'hidden',
          }}>
            {/* folded corner */}
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 10, height: 10,
              background: 'linear-gradient(225deg, transparent 50%, #e4ddd0 50%)',
            }}/>
            {/* lines */}
            <div style={{ padding: '8px 4px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[90, 70, 85, 60].map((w, j) => (
                <div key={j} style={{ height: 2, width: `${w}%`, background: '#e4ddd0', borderRadius: 1 }}/>
              ))}
            </div>
            {/* color accent bar */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 4, background: d.tone,
            }}/>
          </div>
        );
      })}
    </div>
  );
}

function DocRow({ doc, delay, hovered, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '12px 14px',
        borderRadius: 14,
        background: hovered ? 'var(--bg)' : 'transparent',
        transition: 'all 260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        cursor: 'pointer',
        animation: `floatIn 0.6s ${delay}s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
      }}
    >
      {/* Document thumbnail */}
      <div style={{
        position: 'relative',
        width: 52, height: 64,
        background: '#fff', borderRadius: 6,
        border: '1px solid var(--line)',
        boxShadow: hovered ? `0 10px 18px -8px ${doc.tone}55` : '0 2px 4px rgba(27,26,23,0.06)',
        transition: 'all 260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'rotate(-4deg) translateY(-2px)' : 'rotate(0)',
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 14, height: 14,
          background: 'linear-gradient(225deg, transparent 50%, #e4ddd0 50%)',
        }}/>
        <div style={{ padding: '10px 6px 0', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[90, 70, 85, 60, 75].map((w, i) => (
            <div key={i} style={{ height: 2, width: `${w}%`, background: '#e4ddd0', borderRadius: 1 }}/>
          ))}
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 4, background: doc.tone,
        }}/>
        <div style={{
          position: 'absolute', bottom: 8, left: 4,
          fontSize: 7, fontWeight: 700,
          color: doc.tone, letterSpacing: '0.05em',
        }}>PDF</div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em' }}>{doc.label}</span>
          <Chip tone="default" style={{ background: doc.tone + '15', color: doc.tone, borderColor: doc.tone + '33' }}>
            {doc.type}
          </Chip>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--ink-3)' }}>
          <span>{doc.pages} pages</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-4)' }}/>
          <span>{doc.size}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-4)' }}/>
          <span>Uploaded {doc.uploaded}</span>
        </div>
      </div>

      {/* Downloads mini-stat */}
      <div style={{
        display: hovered ? 'none' : 'flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 999,
        background: 'var(--bg-deep)',
        fontSize: 11.5, fontWeight: 600, color: 'var(--ink-3)',
      }}>
        <Icon name="download" size={11}/> {doc.downloads}
      </div>

      {/* Actions (on hover) */}
      <div style={{
        display: 'flex', gap: 6,
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(10px)',
        transition: 'all 260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: hovered ? 'auto' : 'none',
      }}>
        <Btn size="sm" variant="ghost" icon="eye">Preview</Btn>
        <Btn size="sm" variant="default" icon="download">Download</Btn>
      </div>
    </div>
  );
}

window.DocumentsCard = DocumentsCard;
