import React from 'react'
import { getTypeColor, capitalise } from '../utils/typeColors'

const TypeBadge = ({ type, size = 'md' }) => {
  const { bg, text } = getTypeColor(type)

  const sizes = {
    sm: { fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px' },
    md: { fontSize: '0.75rem', padding: '4px 12px', borderRadius: '12px' },
    lg: { fontSize: '0.85rem', padding: '6px 16px', borderRadius: '14px' },
  }

  return (
    <span
      style={{
        display: 'inline-block',
        backgroundColor: bg,
        color: text,
        fontWeight: 700,
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        ...sizes[size],
      }}
    >
      {capitalise(type)}
    </span>
  )
}

export default TypeBadge
