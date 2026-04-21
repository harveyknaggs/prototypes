// Documents card — upload row + 3 doc rows with springy hover
function DocumentsCard({ delay = 0 }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <Card delay={delay} style={{ padding: 0 }}>
      <div style={{ padding: '18px 22px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>Documents</h3>
            <Chip tone="default">{documents.length}</Chip>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 3 }}>
            Uploaded files buyers can request during enquiry.
          </div>
        </div>
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
      <div style={{ padding: '0 10px 10px' }}>
        {documents.map((d, i) => (
          <DocRow key={d.id} doc={d}
            delay={delay + 0.25 + i * 0.08}
            hovered={hoveredRow === d.id}
            onEnter={() => setHoveredRow(d.id)}
            onLeave={() => setHoveredRow(null)}
          />
        ))}
      </div>
    </Card>
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
        {/* folded corner */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 14, height: 14,
          background: 'linear-gradient(225deg, transparent 50%, #e4ddd0 50%)',
        }}/>
        {/* lines */}
        <div style={{ padding: '10px 6px 0', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[90, 70, 85, 60, 75].map((w, i) => (
            <div key={i} style={{ height: 2, width: `${w}%`, background: '#e4ddd0', borderRadius: 1 }}/>
          ))}
        </div>
        {/* color accent bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 4, background: doc.tone,
        }}/>
        {/* PDF badge */}
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

      {/* Actions (shown on hover) */}
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
