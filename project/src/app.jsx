const { useState, useEffect, useMemo } = React;

function App() {
  const initialTweaks = JSON.parse(
    document.getElementById('tweak-defaults').textContent
      .replace(/\/\*EDITMODE-BEGIN\*\//, '')
      .replace(/\/\*EDITMODE-END\*\//, '')
      .trim()
  );
  const [tweaks, setTweaks] = useState(initialTweaks);
  const [tweaksVisible, setTweaksVisible] = useState(false);

  // Apply accent CSS variable
  useEffect(() => {
    const accents = {
      indigo: { accent: '#2d2bff', soft: '#eeedff', ink: '#1a18cc' },
      forest: { accent: '#0f7a4d', soft: '#dff3e7', ink: '#0a5836' },
      amber:  { accent: '#b4530a', soft: '#fbe8d4', ink: '#8a3f06' },
      slate:  { accent: '#1b1a17', soft: '#ebe5d9', ink: '#000' },
      rose:   { accent: '#c6361d', soft: '#ffe9e4', ink: '#8a230f' },
    };
    const a = accents[tweaks.accent] || accents.indigo;
    document.documentElement.style.setProperty('--accent', a.accent);
    document.documentElement.style.setProperty('--accent-soft', a.soft);
    document.documentElement.style.setProperty('--accent-ink', a.ink);
  }, [tweaks.accent]);

  // Tweaks protocol
  useEffect(() => {
    const handler = (ev) => {
      const d = ev.data;
      if (!d || typeof d !== 'object') return;
      if (d.type === '__activate_edit_mode') setTweaksVisible(true);
      if (d.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const updateTweaks = (next) => {
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
  };

  const lively = tweaks.motion === 'lively';
  const off = tweaks.motion === 'off';
  const tilt = tweaks.hoverTilt && lively;
  const pad = tweaks.density === 'compact' ? 20 : 32;

  // motion "off" — remove animations
  useEffect(() => {
    const style = document.getElementById('motion-off-style') || document.createElement('style');
    style.id = 'motion-off-style';
    style.textContent = off ? `.card, .card * { animation: none !important; }` : '';
    if (!style.parentElement) document.head.appendChild(style);
  }, [off]);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--ink)',
    }}>
      <Sidebar/>
      <main style={{
        flex: 1, minWidth: 0,
        padding: `${pad}px ${pad + 8}px ${pad + 20}px`,
        maxWidth: 1280, margin: '0 auto', width: '100%',
      }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 22, fontSize: 12.5, color: 'var(--ink-3)',
          animation: 'floatIn 0.5s 0s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        }}>
          <a style={{ color: 'var(--ink-3)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Icon name="arrow-left" size={13}/> Back to listings
          </a>
          <span style={{ color: 'var(--ink-4)' }}>/</span>
          <span style={{ color: 'var(--ink-2)', fontWeight: 500 }}>{property.title}</span>
          <div style={{ flex: 1 }}/>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 9px', borderRadius: 999,
            background: '#fff', border: '1px solid var(--line)',
            fontSize: 11.5, fontWeight: 500, color: 'var(--ink-3)',
          }}>
            <Icon name="bell" size={11}/> Notify me on new leads
          </button>
          <Btn size="sm" variant="ghost" icon="trash" style={{ color: 'var(--danger)' }}>Delete</Btn>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Hero delay={0.05}/>
          <SpecsCard delay={0.15}/>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            gap: 20,
          }}>
            <DocumentsCard delay={0.25}/>
            <LeadsCard delay={0.3}/>
          </div>

          {/* Footer */}
          <div style={{
            padding: '16px 4px',
            fontSize: 11.5, color: 'var(--ink-4)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            animation: 'floatIn 0.6s 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
          }}>
            <span>Listing ID · <span className="mono">#d8ksv-rangitoto</span></span>
            <span>Last edited yesterday · autosaved</span>
          </div>
        </div>
      </main>

      {/* Apply hover tilt override */}
      <HoverTiltContext.Provider value={tilt}>
        <span/>
      </HoverTiltContext.Provider>

      <TweaksPanel state={tweaks} setState={updateTweaks} visible={tweaksVisible}/>
    </div>
  );
}

// small no-op context to keep tree happy (tilt wiring is per-card via data)
const HoverTiltContext = React.createContext(false);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
