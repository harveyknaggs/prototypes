// Leads card — collapsed by default, click to expand enquiry list
function LeadsCard({ delay = 0 }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = leads.filter((l) => {
    if (filter === 'all') return true;
    if (filter === 'hot') return l.hot;
    if (filter === 'new') return l.stage === 'New';
    return true;
  });

  const hotCount = leads.filter((l) => l.hot).length;

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
        {/* Animated avatar cluster */}
        <LeadAvatarCluster open={open} />

        {/* Title + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>Leads</h3>
            <Chip tone="default">{leads.length}</Chip>
            {hotCount > 0 && (
              <Chip tone="hot">
                <Icon name="flame" size={10}/> {hotCount} hot
              </Chip>
            )}
          </div>
          {open ? (
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>
              Enquiries from buyers who've viewed your listing.
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>
                {leads.filter(l => l.stage === 'New').length} new · {property.shareClicks} share clicks this week
              </span>
            </div>
          )}
        </div>

        {/* Chevron */}
        <div style={{
          width: 28, height: 28, borderRadius: 9,
          display: 'grid', placeItems: 'center',
          background: 'var(--bg-deep)', flexShrink: 0,
        }}>
          <Icon name="chevron-right" size={14} style={{
            color: 'var(--ink-3)',
            transition: 'transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          }}/>
        </div>
      </button>

      {/* Expandable content */}
      <div style={{
        maxHeight: open ? 1100 : 0,
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 550ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 320ms ease',
      }}>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {/* Filter pills */}
          <div style={{ padding: '14px 22px 10px', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              display: 'flex', padding: 3, background: 'var(--bg)',
              borderRadius: 10, border: '1px solid var(--line)',
            }}>
              {[{k:'all',l:'All'}, {k:'hot',l:'Hot'}, {k:'new',l:'New'}].map(({k, l}) => (
                <button key={k} onClick={(e) => { e.stopPropagation(); setFilter(k); }} style={{
                  padding: '5px 12px', fontSize: 12, fontWeight: 600,
                  borderRadius: 7,
                  background: filter === k ? '#fff' : 'transparent',
                  color: filter === k ? 'var(--ink)' : 'var(--ink-3)',
                  boxShadow: filter === k ? '0 1px 2px rgba(27,26,23,0.08)' : 'none',
                  transition: 'all 200ms',
                }}>{l}</button>
              ))}
            </div>
          </div>

          {/* Lead rows */}
          <div style={{ padding: '0 10px 16px' }}>
            {filtered.map((l, i) => (
              <LeadRow key={l.id} lead={l}
                delay={0.05 + i * 0.08}
                expanded={expanded === l.id}
                onToggle={() => setExpanded(expanded === l.id ? null : l.id)}
              />
            ))}
          </div>

          {/* Footer summary */}
          <div style={{
            padding: '14px 22px',
            borderTop: '1px solid var(--line)',
            background: 'var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12,
            borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Sparkline/>
              <div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Enquiries this week</div>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em' }}>
                  5 leads · {property.shareClicks} share clicks
                </div>
              </div>
            </div>
            <Btn size="sm" variant="dark" icon="sparkles" iconRight="arrow-right">
              Send follow-up form
            </Btn>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Overlapping avatar circles for the collapsed header
function LeadAvatarCluster({ open }) {
  const [hov, setHov] = useState(false);
  const active = open || hov;
  return (
    <div
      style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {leads.map((l, i) => {
        // fan out positions
        const fanAngles = [-40, -20, 0, 20, 40];
        const fanRadius = 18;
        const angle = (fanAngles[i] * Math.PI) / 180;
        const fx = Math.sin(angle) * fanRadius;
        const fy = -Math.abs(Math.cos(angle)) * fanRadius * 0.4;

        // stacked positions (slight offset)
        const sx = (i - 2) * 3;
        const sy = 0;

        return (
          <div key={l.id} style={{
            position: 'absolute',
            left: '50%', top: '50%',
            width: 30, height: 30,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${l.accent} 0%, ${l.accent}cc 100%)`,
            border: '2px solid #fff',
            boxShadow: active ? `0 6px 14px -4px ${l.accent}55` : '0 1px 2px rgba(27,26,23,0.1)',
            display: 'grid', placeItems: 'center',
            color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '-0.01em',
            transition: 'transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 280ms ease',
            transform: active
              ? `translate(calc(-50% + ${fx}px), calc(-50% + ${fy}px))`
              : `translate(calc(-50% + ${sx}px), calc(-50% + ${sy}px))`,
            zIndex: i + 1,
          }}>
            {l.initials}
            {l.hot && (
              <div style={{
                position: 'absolute', top: -2, right: -2,
                width: 10, height: 10, borderRadius: '50%',
                background: '#ff5a3c', border: '1.5px solid #fff',
              }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LeadRow({ lead, delay, expanded, onToggle }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 14,
        background: hov || expanded ? 'var(--bg)' : 'transparent',
        transition: 'background 200ms',
        animation: `floatIn 0.6s ${delay}s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
        overflow: 'hidden',
        marginBottom: 2,
      }}
    >
      <button onClick={onToggle} style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '12px 14px',
        width: '100%', textAlign: 'left',
        transition: 'transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hov && !expanded ? 'translateX(3px)' : 'translateX(0)',
      }}>
        {/* Avatar */}
        <div style={{
          position: 'relative',
          width: 42, height: 42, borderRadius: '50%',
          background: `linear-gradient(135deg, ${lead.accent} 0%, ${lead.accent}aa 100%)`,
          display: 'grid', placeItems: 'center', color: '#fff',
          fontWeight: 600, fontSize: 14, letterSpacing: '-0.01em',
          boxShadow: hov ? `0 8px 16px -6px ${lead.accent}66` : '0 1px 2px rgba(27,26,23,0.1)',
          transition: 'all 260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: hov ? 'scale(1.06) rotate(-4deg)' : 'scale(1)',
          flexShrink: 0,
        }}>
          {lead.initials}
          {lead.hot && (
            <div style={{
              position: 'absolute', top: -2, right: -2,
              width: 16, height: 16, borderRadius: '50%',
              background: '#ff5a3c', color: '#fff',
              display: 'grid', placeItems: 'center',
              border: '2px solid #fff',
              animation: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
            }}>
              <Icon name="flame" size={8}/>
            </div>
          )}
        </div>

        {/* Name + preview */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em' }}>{lead.name}</span>
            <Chip tone={stageTone(lead.stage)}>{lead.stage}</Chip>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '44ch' }}>
            {lead.message}
          </div>
        </div>

        {/* Time + chevron */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11.5, color: 'var(--ink-4)', fontVariantNumeric: 'tabular-nums' }}>{lead.when}</span>
          <Icon name="chevron-right" size={14} style={{
            color: 'var(--ink-4)',
            transition: 'transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
          }}/>
        </div>
      </button>

      {/* Expanded detail */}
      <div style={{
        maxHeight: expanded ? 180 : 0,
        opacity: expanded ? 1 : 0,
        transition: 'max-height 360ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 280ms',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '6px 16px 16px 70px',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{
            padding: 12, background: '#fff',
            borderRadius: 12, border: '1px solid var(--line)',
            fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)',
          }}>
            "{lead.message}"
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--ink-3)' }}>
              <Icon name="mail" size={12}/> {lead.email}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--ink-3)' }}>
              <Icon name="phone" size={12}/> {lead.phone}
            </div>
            <div style={{ flex: 1 }}/>
            <Btn size="sm" variant="ghost" icon="mail">Reply</Btn>
            <Btn size="sm" variant="accent" icon="send">Send form</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function stageTone(s) {
  if (s === 'New') return 'accent';
  if (s === 'Qualified') return 'good';
  if (s === 'Following up') return 'warn';
  if (s === 'Closed') return 'muted';
  return 'default';
}

function Sparkline() {
  const data = [2, 1, 3, 2, 4, 3, 5];
  const max = Math.max(...data);
  return (
    <svg width="78" height="34" viewBox="0 0 78 34">
      <defs>
        <linearGradient id="sp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.25"/>
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {(() => {
        const pts = data.map((v, i) => [i * (78 / (data.length - 1)), 30 - (v / max) * 24]);
        const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
        const area = path + ` L78,34 L0,34 Z`;
        return (
          <>
            <path d={area} fill="url(#sp)"/>
            <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 3 : 1.8} fill="var(--accent)"/>
            ))}
          </>
        );
      })()}
    </svg>
  );
}

window.LeadsCard = LeadsCard;
