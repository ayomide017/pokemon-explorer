import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <main
    style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '80px 24px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    }}
  >
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.4 }}>
      <circle cx="40" cy="40" r="36" fill="none" stroke="#ffd700" strokeWidth="3" strokeDasharray="12 6" />
      <text x="40" y="52" textAnchor="middle" fill="#ffd700" fontSize="32" fontWeight="bold">?</text>
    </svg>

    <div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          color: 'var(--text-primary)',
          marginBottom: '12px',
          letterSpacing: '0.05em',
        }}
      >
        404 — Page Not Found
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        This page doesn't exist. The Pokémon you're looking for may have fled.
      </p>
    </div>

    <Link
      to="/"
      style={{
        background: 'var(--accent)',
        color: '#111',
        fontWeight: 700,
        padding: '12px 28px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.9rem',
        textDecoration: 'none',
        transition: 'opacity var(--transition)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      Back to Pokédex
    </Link>
  </main>
)

export default NotFoundPage

