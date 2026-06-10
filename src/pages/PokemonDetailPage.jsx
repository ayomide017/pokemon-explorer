import React from 'react'
import { useParams, Link } from 'react-router-dom'
import usePokemonDetail from '../hooks/usePokemonDetail'
import TypeBadge from '../components/TypeBadge'
import StatBar from '../components/StatBar'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import { formatId, getPrimaryColor, capitalise } from '../utils/typeColors'

const InfoPill = ({ label, value }) => (
  <div
    style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 20px',
      flex: '1 1 120px',
      textAlign: 'center',
    }}
  >
    <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
      {label}
    </p>
    <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 800 }}>
      {value}
    </p>
  </div>
)

const PokemonDetailPage = () => {
  const { id } = useParams()
  const { pokemon, loading, error } = usePokemonDetail(id)

  if (loading) return <Loader message={`Looking up Pokémon #${id}…`} fullPage />

  if (error) {
    return (
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <ErrorMessage message={error} fullPage />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <Link
            to="/"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
          >
            ← Back to Pokémon list
          </Link>
        </div>
      </main>
    )
  }

  if (!pokemon) return null

  const primaryColor = getPrimaryColor(pokemon.types)
  const artwork =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Back link */}
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '32px',
          textDecoration: 'none',
          transition: 'color var(--transition)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = primaryColor)}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10.5 3L5.5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All Pokémon
      </Link>

      {/* Hero card */}
      <div
        className="animate-in"
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${primaryColor}40`,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: `0 0 60px ${primaryColor}20`,
          marginBottom: '32px',
        }}
      >
        {/* Top accent */}
        <div style={{ height: '5px', background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}44)` }} />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
          }}
        >
          {/* Left: artwork */}
          <div
            style={{
              flex: '0 0 auto',
              width: 'clamp(200px, 40%, 320px)',
              background: `radial-gradient(ellipse at center, ${primaryColor}22 0%, transparent 70%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              minHeight: '260px',
            }}
          >
            {artwork ? (
              <img
                src={artwork}
                alt={pokemon.name}
                style={{ width: '100%', maxWidth: '200px', objectFit: 'contain' }}
              />
            ) : (
              <div style={{ width: 160, height: 160, borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'var(--text-muted)' }}>?</div>
            )}
          </div>

          {/* Right: info */}
          <div style={{ flex: '1 1 280px', padding: '32px 32px 32px 24px' }}>
            <p
              style={{
                color: primaryColor,
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '6px',
              }}
            >
              {formatId(pokemon.id)}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 4vw, 1.8rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.3,
                marginBottom: '16px',
                textTransform: 'capitalize',
              }}
            >
              {capitalise(pokemon.name)}
            </h1>

            {/* Types */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {pokemon.types.map(({ type }) => (
                <TypeBadge key={type.name} type={type.name} size="lg" />
              ))}
            </div>

            {/* Height / Weight / Abilities */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <InfoPill label="Height" value={`${(pokemon.height / 10).toFixed(1)} m`} />
              <InfoPill label="Weight" value={`${(pokemon.weight / 10).toFixed(1)} kg`} />
            </div>

            {/* Abilities */}
            <div>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                }}
              >
                Abilities
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <span
                    key={ability.name}
                    style={{
                      background: is_hidden ? `${primaryColor}20` : 'var(--bg-surface)',
                      border: `1px solid ${is_hidden ? primaryColor + '50' : 'var(--border)'}`,
                      color: is_hidden ? primaryColor : 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '6px 14px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                    }}
                  >
                    {capitalise(ability.name.replace('-', ' '))}
                    {is_hidden && (
                      <span style={{ fontSize: '0.65rem', marginLeft: '6px', opacity: 0.7 }}>(hidden)</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <section
        className="animate-in"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px 28px 32px',
          animationDelay: '100ms',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.7rem',
            color: primaryColor,
            letterSpacing: '0.1em',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}
        >
          Base Stats
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.stat.name} stat={stat} />
          ))}
        </div>
      </section>

      {/* Navigation: prev / next */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '32px',
          gap: '12px',
        }}
      >
        {pokemon.id > 1 && (
          <Link
            to={`/pokemon/${pokemon.id - 1}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 18px',
              textDecoration: 'none',
              transition: 'border-color var(--transition), color var(--transition)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = primaryColor; e.currentTarget.style.color = primaryColor }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            ← {formatId(pokemon.id - 1)}
          </Link>
        )}
        <div style={{ flex: 1 }} />
        <Link
          to={`/pokemon/${pokemon.id + 1}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 18px',
            textDecoration: 'none',
            transition: 'border-color var(--transition), color var(--transition)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = primaryColor; e.currentTarget.style.color = primaryColor }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          {formatId(pokemon.id + 1)} →
        </Link>
      </div>
    </main>
  )
}

export default PokemonDetailPage
