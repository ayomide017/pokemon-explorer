import React from 'react'
import usePokemonList from '../hooks/usePokemonList'
import PokemonCard from '../components/PokemonCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const PokemonListPage = () => {
  const { pokemon, loading, error, loadMore, loadingMore, hasMore, retry } =
    usePokemonList()

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Page header */}
      <header style={{ marginBottom: '40px' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.55rem',
            color: 'var(--accent)',
            letterSpacing: '0.12em',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          Generation I — Kanto
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 3vw, 1.6rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            marginBottom: '16px',
          }}
        >
          Pokémon Explorer
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', fontSize: '0.95rem' }}>
          Browse the Pokédex — click any Pokémon to view its stats, abilities, and details.
        </p>
      </header>

      {/* Full-page loader on first fetch */}
      {loading && <Loader message="Fetching Pokémon data…" fullPage />}

      {/* Error state */}
      {!loading && error && (
        <ErrorMessage message={error} onRetry={retry} fullPage />
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          {pokemon.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '80px 0' }}>
              No Pokémon found.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                gap: '20px',
              }}
            >
              {pokemon.map((poke, index) => (
                <PokemonCard key={poke.id} pokemon={poke} index={index} />
              ))}
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
              {loadingMore ? (
                <Loader message="Loading more…" />
              ) : (
                <button
                  onClick={loadMore}
                  style={{
                    background: 'transparent',
                    border: '2px solid var(--accent)',
                    color: 'var(--accent)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    padding: '12px 36px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'background var(--transition), color var(--transition)',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent)'
                    e.currentTarget.style.color = '#111'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                >
                  Load 20 more
                </button>
              )}
            </div>
          )}

          {/* End of list message */}
          {!hasMore && pokemon.length > 0 && (
            <p
              style={{
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                marginTop: '48px',
              }}
            >
              You've caught 'em all — {pokemon.length} Pokémon loaded.
            </p>
          )}
        </>
      )}
    </main>
  )
}

export default PokemonListPage
