/**
 * Maps Pokémon type names to brand colors.
 * Used for type badges, card accents, and glow effects.
 */
export const TYPE_COLORS = {
  normal:   { bg: '#9e9e9e', text: '#fff' },
  fire:     { bg: '#ff6434', text: '#fff' },
  water:    { bg: '#448aff', text: '#fff' },
  electric: { bg: '#ffd600', text: '#111' },
  grass:    { bg: '#00c853', text: '#fff' },
  ice:      { bg: '#80deea', text: '#111' },
  fighting: { bg: '#e53935', text: '#fff' },
  poison:   { bg: '#ab47bc', text: '#fff' },
  ground:   { bg: '#d4a056', text: '#fff' },
  flying:   { bg: '#82b1ff', text: '#111' },
  psychic:  { bg: '#e91e8c', text: '#fff' },
  bug:      { bg: '#8bc34a', text: '#fff' },
  rock:     { bg: '#9e8a59', text: '#fff' },
  ghost:    { bg: '#5c6bc0', text: '#fff' },
  dragon:   { bg: '#4527a0', text: '#fff' },
  dark:     { bg: '#37474f', text: '#fff' },
  steel:    { bg: '#78909c', text: '#fff' },
  fairy:    { bg: '#f48fb1', text: '#111' },
}

/**
 * Returns the bg color for a Pokémon type, falling back to a neutral.
 * @param {string} type
 * @returns {{ bg: string, text: string }}
 */
export const getTypeColor = (type) =>
  TYPE_COLORS[type?.toLowerCase()] ?? { bg: '#555', text: '#fff' }

/**
 * Returns the primary type color from an array of type objects.
 * @param {Array<{ type: { name: string } }>} types
 * @returns {string} hex color
 */
export const getPrimaryColor = (types) => {
  const primary = types?.[0]?.type?.name
  return getTypeColor(primary).bg
}

/**
 * Pads a Pokémon ID to 3 digits for display (e.g. 7 → #007).
 * @param {number} id
 * @returns {string}
 */
export const formatId = (id) => `#${String(id).padStart(3, '0')}`

/**
 * Capitalises the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export const capitalise = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

/**
 * Converts a raw stat value (0–255) into a percentage width for progress bars.
 * Caps at 255.
 * @param {number} value
 * @returns {number} percentage 0–100
 */
export const statPercent = (value) => Math.min((value / 255) * 100, 100)
