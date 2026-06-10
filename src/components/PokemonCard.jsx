import React from 'react'
import { Link } from 'react-router-dom'
import TypeBadge from './TypeBadge'
import { formatId, getPrimaryColor, capitalise } from '../utils/typeColors'

const PokemonCard = ({ pokemon, index }) => {
  const primaryColor = getPrimaryColor(pokemon.types)
  const sprite =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="animate-in"
      style={{
        '--delay': `${index * 40}ms`,
        animationDelay: `${index * 40}ms`,
        display: 'block',
        textDecoration: 'none',
      }}
    >
      <article
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          transition: 'transform var(--transition), border-color var(--transition), box-shadow var(--transition)',
          cursor: 'pointer',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.borderColor = primaryColor + '80'
          e.currentTarget.style.boxShadow = `0 12px 40px ${primaryColor}30`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Colour accent strip */}
        <div
          style={{
            height: '4px',
            background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}88)`,
          }}
        />

        {/* Sprite area */}
        <div
          style={{
            background: `radial-gradient(ellipse at center, ${primaryColor}18 0%, transparent 70%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px 8px',
            minHeight: '140px',
          }}
        >
          {sprite ? (
            <img
              src={sprite}
              alt={pokemon.name}
              style={{ width: 100, height: 100, imageRendering: 'auto', objectFit: 'contain' }}
              loading="lazy"
            />
          ) : (
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontSize: '2rem',
              }}
            >
              ?
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '12px 16px 18px' }}>
          <p
            style={{
              color: primaryColor,
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '4px',
              fontFamily: 'var(--font-body)',
            }}
          >
            {formatId(pokemon.id)}
          </p>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '10px',
              textTransform: 'capitalize',
            }}
          >
            {capitalise(pokemon.name)}
          </h3>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name} size="sm" />
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PokemonCard
