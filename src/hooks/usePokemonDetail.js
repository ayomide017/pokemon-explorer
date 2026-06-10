import { useState, useEffect } from 'react'
import { getPokemonDetail } from '../services/pokemonService'

/**
 * Fetches and manages state for a single Pokémon's detail data.
 * @param {string|number} nameOrId
 */
const usePokemonDetail = (nameOrId) => {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!nameOrId) return

    let cancelled = false

    const fetchDetail = async () => {
      setLoading(true)
      setError(null)
      setPokemon(null)

      try {
        const data = await getPokemonDetail(nameOrId)
        if (!cancelled) setPokemon(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchDetail()

    // Cleanup: if component unmounts or nameOrId changes, ignore stale response
    return () => { cancelled = true }
  }, [nameOrId])

  return { pokemon, loading, error }
}

export default usePokemonDetail
