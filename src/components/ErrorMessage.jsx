import React from 'react'

const ErrorMessage = ({ message, onRetry, fullPage = false }) => {
  const containerStyle = fullPage
    ? {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '20px',
        padding: '24px',
        textAlign: 'center',
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '48px 24px',
        textAlign: 'center',
      }

  return (
    <div style={containerStyle} role="alert">
      {/* Fainted Pokéball icon */}
      <svg width="64" height="64" viewBox="0 0 64 64" style={{ opacity: 0.5 }}>
        <circle cx="32" cy="32" r="28" fill="none" stroke="#e53935" strokeWidth="3" strokeDasharray="8 4" />
        <line x1="4" y1="32" x2="60" y2="32" stroke="#555" strokeWidth="3" />
        <circle cx="32" cy="32" r="9" fill="#1c2330" stroke="#555" strokeWidth="3" />
        <circle cx="32" cy="32" r="4" fill="#555" />
        {/* X marks */}
        <line x1="22" y1="14" x2="26" y2="18" stroke="#e53935" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="14" x2="22" y2="18" stroke="#e53935" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="14" x2="42" y2="18" stroke="#e53935" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="14" x2="38" y2="18" stroke="#e53935" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      <div>
        <p
          style={{
            color: '#e53935',
            fontWeight: 800,
            fontSize: '1rem',
            marginBottom: '8px',
          }}
        >
          Something went wrong
        </p>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            maxWidth: '400px',
          }}
        >
          {message || 'An unexpected error occurred. Please try again.'}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: 'var(--accent)',
            color: '#111',
            fontWeight: 700,
            fontSize: '0.85rem',
            padding: '10px 24px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            cursor: 'pointer',
            transition: 'opacity var(--transition)',
            letterSpacing: '0.03em',
          }}
          onMouseOver={(e) => (e.target.style.opacity = '0.85')}
          onMouseOut={(e) => (e.target.style.opacity = '1')}
        >
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
