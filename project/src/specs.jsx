// Property specs card — share link + key stats with animated counters
function SpecsCard({ delay = 0 }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const stats = [
    { icon: 'bed', label: 'Bedrooms', value: property.beds, suffix: '' },
    { icon: 'bath', label: 'Bathrooms', value: property.baths, suffix: '' },
    { icon: 'ruler', label: 'Floor area', value: property.floor, suffix: ' m²' },
    { icon: 'tree', label: 'Land area', value: property.land, suffix: ' m²' },
    { icon: 'car', label: 'Garage', value: property.garage, suffix: '' },
    { icon: 'calendar', label: 'Built', value: property.year, suffix: '', noAnim: true },
  ];

  return (
    <Card delay={delay} style={{ padding: 0 }}>
      {/* Share bar */}
      <div style={{
        padding: '16px 22px',
        borderBottom: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        background: 'linear-gradient(180deg, #faf7f1 0%, #fff 100%)',
      }}>
        <div style={{
          fontSize: 10.5, color: 'var(--ink-4)', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>Public link</div>
        <div style={{
          flex: 1, minWidth: 200,
          padding: '7px 12px',
          background: '#fff', border: '1px solid var(--line)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5, color: 'var(--ink-2)',
        }}>
          <Icon name="zap" size={13} style={{ color: 'var(--accent)' }}/>
          {property.shareUrl}
        </div>
        <Btn size="sm" variant={copied ? 'default' : 'accent'} icon={copied ? 'check' : 'copy'} onClick={copy}>
          {copied ? 'Copied' : 'Copy link'}
        </Btn>
        <Btn size="sm" variant="default" icon="qr">QR</Btn>
      </div>

      {/* Price + description */}
      <div style={{ padding: '22px 22px 4px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 280px', minWidth: 260 }}>
          <div style={{ fontSize: 10.5, color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Asking price</div>
          <div className="serif" style={{ fontSize: 44, lineHeight: 1, letterSpacing: '-0.02em' }}>
            {property.price}
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 4, fontStyle: 'italic' }}>
            {property.priceNote}
          </div>
        </div>
        <div style={{ flex: '2 1 420px', minWidth: 280 }}>
          <div style={{ fontSize: 10.5, color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>About this home</div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', textWrap: 'pretty' }}>
            {property.description}
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 1,
        background: 'var(--line)',
        borderTop: '1px solid var(--line)',
        marginTop: 22,
      }}>
        {stats.map((s, i) => <StatTile key={s.label} {...s} delay={delay + 0.3 + i * 0.06} />)}
      </div>
    </Card>
  );
}

function StatTile({ icon, label, value, suffix, noAnim, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '18px 20px',
        background: hov ? '#faf7f1' : '#fff',
        transition: 'background 200ms',
        position: 'relative',
        animation: `floatIn 0.6s ${delay}s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
      }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: 9,
        background: hov ? 'var(--ink)' : 'var(--bg)',
        color: hov ? '#fff' : 'var(--ink-2)',
        transition: 'all 260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hov ? 'rotate(-8deg) scale(1.1)' : 'rotate(0)',
        marginBottom: 10,
      }}>
        <Icon name={icon} size={16}/>
      </div>
      <div style={{ fontSize: 10.5, color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
      <div className="serif" style={{ fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
        {noAnim ? value : <AnimatedNumber value={value} format={(v) => Math.round(v).toLocaleString()} />}
        <span style={{ fontSize: 16, color: 'var(--ink-3)' }}>{suffix}</span>
      </div>
    </div>
  );
}

window.SpecsCard = SpecsCard;
