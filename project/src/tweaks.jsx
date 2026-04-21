// Tweaks panel
function TweaksPanel({ state, setState, visible }) {
  if (!visible) return null;
  const accents = {
    indigo: '#2d2bff',
    forest: '#0f7a4d',
    amber:  '#b4530a',
    slate:  '#1b1a17',
    rose:   '#c6361d',
  };
  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20,
      width: 280, zIndex: 50,
      background: '#fff', borderRadius: 18,
      border: '1px solid var(--line)',
      boxShadow: '0 24px 48px -16px rgba(27,26,23,0.25)',
      padding: 16,
      animation: 'floatIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <Icon name="sparkles" size={15} style={{ color: 'var(--accent)' }}/>
        <div style={{ fontSize: 14, fontWeight: 700 }}>Tweaks</div>
      </div>

      <Row label="Motion">
        <Pills opts={['subtle', 'lively', 'off']} value={state.motion}
          onChange={(v) => setState({ ...state, motion: v })}/>
      </Row>

      <Row label="Accent">
        <div style={{ display: 'flex', gap: 6 }}>
          {Object.entries(accents).map(([k, c]) => (
            <button key={k} onClick={() => setState({ ...state, accent: k })} title={k} style={{
              width: 24, height: 24, borderRadius: 7,
              background: c,
              border: state.accent === k ? '2px solid var(--ink)' : '2px solid transparent',
              outline: state.accent === k ? '2px solid var(--bg-deep)' : 'none',
              transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: state.accent === k ? 'scale(1.1)' : 'scale(1)',
            }}/>
          ))}
        </div>
      </Row>

      <Row label="Density">
        <Pills opts={['comfortable', 'compact']} value={state.density}
          onChange={(v) => setState({ ...state, density: v })}/>
      </Row>

      <Row label="Hover tilt" last>
        <button onClick={() => setState({ ...state, hoverTilt: !state.hoverTilt })} style={{
          width: 34, height: 20, borderRadius: 12,
          background: state.hoverTilt ? 'var(--accent)' : 'var(--bg-deep)',
          position: 'relative', transition: 'background 200ms',
        }}>
          <span style={{
            position: 'absolute', top: 2, left: state.hoverTilt ? 16 : 2,
            width: 16, height: 16, borderRadius: '50%', background: '#fff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            transition: 'left 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}/>
        </button>
      </Row>
    </div>
  );
}

function Row({ label, last, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: last ? 'none' : '1px solid var(--line)',
    }}>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500 }}>{label}</div>
      {children}
    </div>
  );
}

function Pills({ opts, value, onChange }) {
  return (
    <div style={{ display: 'flex', padding: 3, background: 'var(--bg)', borderRadius: 9, border: '1px solid var(--line)' }}>
      {opts.map((o) => (
        <button key={o} onClick={() => onChange(o)} style={{
          padding: '3px 10px', fontSize: 11, fontWeight: 600,
          borderRadius: 7,
          background: value === o ? '#fff' : 'transparent',
          color: value === o ? 'var(--ink)' : 'var(--ink-3)',
          boxShadow: value === o ? '0 1px 2px rgba(27,26,23,0.08)' : 'none',
          textTransform: 'capitalize',
        }}>{o}</button>
      ))}
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
