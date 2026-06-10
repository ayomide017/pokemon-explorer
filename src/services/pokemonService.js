import axios from 'axios'

// ── Base client ──────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
})

// ── Response interceptor: normalise errors ────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a non-2xx status
      const message =
        error.response.status === 404
          ? 'Pokémon not found. It may not exist or the ID is invalid.'
          : `Server error (${error.response.status}). Please try again.`
      return Promise.reject(new Error(message))
    }
    if (error.request) {
      // Request was made but no response received
      return Promise.reject(
        new Error('Unable to reach the Pokémon API. Check your internet connection.')
      )
    }
    // Something else went wrong
    return Promise.reject(new Error('An unexpected error occurred.'))
  }
)

// ── Service methods ───────────────────────────────────────────────────────────

/**
 * Fetch a paginated list of Pokémon with their basic details.
 * @param {number} limit   - number of results to return
 * @param {number} offset  - pagination offset
 * @returns {Promise<{ count: number, results: Array<{ name: string, url: string }> }>}
 */
export const getPokemonList = async (limit = 20, offset = 0) => {
  const { data } = await api.get('/pokemon', { params: { limit, offset } })
  return data
}

/**
 * Fetch details for a single Pokémon by name or numeric ID.
 * @param {string|number} nameOrId
 * @returns {Promise<Object>} full Pokémon detail object from PokéAPI
 */
export const getPokemonDetail = async (nameOrId) => {
  const { data } = await api.get(`/pokemon/${nameOrId}`)
  return data
}

/**
 * Fetch multiple Pokémon details in parallel.
 * Useful for enriching a list page with sprite images.
 * @param {Array<{ name: string, url: string }>} pokemonRefs
 * @returns {Promise<Object[]>}
 */
export const getPokemonBatch = async (pokemonRefs) => {
  const requests = pokemonRefs.map(({ name }) => getPokemonDetail(name))
  return Promise.all(requests)
}

export default api
