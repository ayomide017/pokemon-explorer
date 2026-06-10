import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  mjh
  
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(13, 17, 23, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          height: '60px',
          gap: '12px',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          {/* Mini pokéball */}
          <svg width="26" height="26" viewBox="0 0 26 26">
            <path d="M2 13 A11 11 0 0 1 24 13 Z" fill="#e53935" />
            <path d="M2 13 A11 11 0 0 0 24 13 Z" fill="#f5f5f5" />
            <circle cx="13" cy="13" r="11" fill="none" stroke="#333" strokeWidth="1.5" />
            <line x1="2" y1="13" x2="24" y2="13" stroke="#333" strokeWidth="1.5" />
            <circle cx="13" cy="13" r="4" fill="#fff" stroke="#333" strokeWidth="1.5" />
            <circle cx="13" cy="13" r="2" fill="#ffd700" />
          </svg>

          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              color: 'var(--text-primary)',
              letterSpacing: '0.05em',
              lineHeight: 1.3,
            }}
          >
            Pokédex
          </span>
        </Link>

        <div style={{ flex: 1 }} />

        {/* Show back-to-list hint on detail pages */}
        {location.pathname.startsWith('/pokemon/') && (
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'color var(--transition)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10.5 3L5.5 8l5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Pokémon
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
