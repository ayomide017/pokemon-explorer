import React from 'react'

const Loader = ({ message = 'Loading…', fullPage = false }) => {
  const containerStyle = fullPage
    ? {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '24px',
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '48px 24px',
      }

  return (
    <div style={containerStyle} role="status" aria-label={message}>
      {/* Pokéball spinner */}
      <div style={{ position: 'relative', width: 56, height: 56 }}>
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          style={{ animation: 'pokeball-spin 1s linear infinite' }}
        >
          {/* Top half — red */}
          <path d="M4 28 A24 24 0 0 1 52 28 Z" fill="#e53935" />
          {/* Bottom half — white */}
          <path d="M4 28 A24 24 0 0 0 52 28 Z" fill="#f5f5f5" />
          {/* Full circle outline */}
          <circle cx="28" cy="28" r="24" fill="none" stroke="#222" strokeWidth="2.5" />
          {/* Center band */}
          <line x1="4" y1="28" x2="52" y2="28" stroke="#222" strokeWidth="2.5" />
          {/* Center button */}
          <circle cx="28" cy="28" r="7" fill="#fff" stroke="#222" strokeWidth="2.5" />
          <circle cx="28" cy="28" r="3.5" fill="#ffd700" />
        </svg>
      </div>
      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}
      >
        {message}
      </p>
    </div>
  )
}

export default Loader
