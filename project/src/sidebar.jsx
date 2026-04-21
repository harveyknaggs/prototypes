// Redesigned sidebar — warm ink tone, subtle accent, smooth active pill
function Sidebar() {
  const nav = [
    { icon: 'grid', label: 'Dashboard' },
    { icon: 'users', label: 'Clients', count: 12 },
    { icon: 'home', label: 'Listings', count: 8, active: true },
    { icon: 'send', label: 'Forms Sent' },
    { icon: 'inbox', label: 'Submissions', count: 3 },
    { icon: 'trend', label: 'Analytics' },
  ];
  const bottom = [
    { icon: 'cog', label: 'Settings' },
    { icon: 'shield', label: 'Admin' },
  ];

  return (
    <aside style={{
      width: 232, flexShrink: 0,
      background: 'var(--surface)',
      borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column',
      padding: '22px 14px',
      height: '100vh',
      position: 'sticky', top: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 22px' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: 'var(--ink)', color: '#fff',
          display: 'grid', placeItems: 'center',
          fontFamily: "'Instrument Serif', serif", fontSize: 22, fontStyle: 'italic',
          fontWeight: 400, letterSpacing: '-0.02em',
          boxShadow: '0 2px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}>f</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.015em' }}>Formz</div>
          <div style={{ fontSize: 10.5, color: 'var(--ink-4)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Agent workspace</div>
        </div>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '9px 12px',
        background: 'var(--bg)', borderRadius: 10,
        border: '1px solid var(--line)',
        marginBottom: 18,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-4)" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
        <span style={{ fontSize: 13, color: 'var(--ink-4)', flex: 1 }}>Quick jump</span>
        <span style={{ fontSize: 10.5, color: 'var(--ink-4)', fontFamily: 'JetBrains Mono, monospace', background: '#fff', padding: '1px 5px', borderRadius: 4, border: '1px solid var(--line)' }}>⌘K</span>
      </div>

      {/* Primary nav */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 10.5, color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 10px 8px' }}>Workspace</div>
        {nav.map((n) => <NavItem key={n.label} {...n} />)}

        <div style={{ fontSize: 10.5, color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '20px 10px 8px' }}>Account</div>
        {bottom.map((n) => <NavItem key={n.label} {...n} />)}
      </div>

      {/* Usage card */}
      <div style={{
        margin: '8px 4px 12px',
        padding: '12px 13px',
        background: 'linear-gradient(135deg, #1a18cc 0%, #2d2bff 100%)',
        borderRadius: 14, color: '#fff',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -20, top: -20, width: 80, height: 80,
          borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
        }} />
        <div style={{ fontSize: 11, opacity: 0.75, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>This month</div>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, lineHeight: 1, marginBottom: 8 }}>4<span style={{ opacity: 0.6, fontSize: 20 }}>/10</span></div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ width: '40%', height: '100%', background: '#fff', borderRadius: 10 }} />
        </div>
        <div style={{ fontSize: 11, opacity: 0.8, marginTop: 8 }}>listings used · upgrade</div>
      </div>

      {/* User */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 8px',
        borderTop: '1px solid var(--line)',
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2d2bff, #7a79ff)',
          display: 'grid', placeItems: 'center', color: '#fff',
          fontWeight: 600, fontSize: 13,
          boxShadow: '0 2px 6px rgba(45,43,255,0.3)',
        }}>JM</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em' }}>John Mitchell</div>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>agent@homestoneuniversity</div>
        </div>
        <button style={{ padding: 6, borderRadius: 8, color: 'var(--ink-4)' }} title="Sign out">
          <Icon name="logout" size={16}/>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, count, active }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 10px',
        borderRadius: 10,
        width: '100%', textAlign: 'left',
        background: active ? 'var(--ink)' : (hov ? 'var(--bg-deep)' : 'transparent'),
        color: active ? '#fff' : 'var(--ink-2)',
        fontSize: 13.5, fontWeight: active ? 600 : 500,
        letterSpacing: '-0.005em',
        transition: 'background 180ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hov && !active ? 'translateX(2px)' : 'translateX(0)',
        position: 'relative',
        boxShadow: active ? '0 4px 12px -4px rgba(27,26,23,0.35)' : 'none',
      }}
    >
      <Icon name={icon} size={16} />
      <span style={{ flex: 1 }}>{label}</span>
      {count !== undefined && (
        <span style={{
          fontSize: 11, fontWeight: 600,
          padding: '1px 7px', borderRadius: 999,
          background: active ? 'rgba(255,255,255,0.15)' : 'var(--bg-deep)',
          color: active ? '#fff' : 'var(--ink-3)',
          fontVariantNumeric: 'tabular-nums',
        }}>{count}</span>
      )}
    </button>
  );
}

window.Sidebar = Sidebar;
