import { useState, useEffect, useCallback } from 'react'
import { getPokemonList, getPokemonBatch } from '../services/pokemonService'

const LIMIT = 20

/**
 * Manages fetching and pagination of the Pokémon list.
 * Returns enriched Pokémon data (with sprites) rather than bare list refs.
 */
const usePokemonList = () => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [offset, setOffset] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchPokemon = useCallback(async (currentOffset, append = false) => {
    try {
      if (currentOffset === 0) setLoading(true)
      else setLoadingMore(true)

      setError(null)

      const listData = await getPokemonList(LIMIT, currentOffset)
      setTotalCount(listData.count)

      const detailed = await getPokemonBatch(listData.results)

      setPokemon((prev) => (append ? [...prev, ...detailed] : detailed))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchPokemon(0, false)
  }, [fetchPokemon])

  const loadMore = () => {
    const nextOffset = offset + LIMIT
    setOffset(nextOffset)
    fetchPokemon(nextOffset, true)
  }

  const retry = () => {
    setOffset(0)
    fetchPokemon(0, false)
  }

  const hasMore = pokemon.length < totalCount

  return { pokemon, loading, error, loadMore, loadingMore, hasMore, retry }
}

export default usePokemonList
