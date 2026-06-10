import React from 'react'
import { statPercent } from '../utils/typeColors'

const STAT_LABELS = {
  hp:              'HP',
  attack:          'Attack',
  defense:         'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense':'Sp. Def',
  speed:           'Speed',
}

const getStatColor = (value) => {
  if (value >= 100) return '#00c853'
  if (value >= 70)  return '#64dd17'
  if (value >= 50)  return '#ffd600'
  if (value >= 30)  return '#ff6d00'
  return '#e53935'
}

const StatBar = ({ stat }) => {
  const label = STAT_LABELS[stat.stat.name] || stat.stat.name
  const value = stat.base_stat
  const pct   = statPercent(value)
  const color = getStatColor(value)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 36px', alignItems: 'center', gap: '12px' }}>
      <span
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.78rem',
          fontWeight: 700,
          textAlign: 'right',
          letterSpacing: '0.03em',
        }}
      >
        {label}
      </span>

      {/* Bar track */}
      <div
        style={{
          height: '8px',
          background: 'var(--bg-surface)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color,
            borderRadius: '4px',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>

      <span
        style={{
          color: 'var(--text-primary)',
          fontSize: '0.85rem',
          fontWeight: 800,
        }}
      >
        {value}
      </span>
    </div>
  )
}

export default StatBar
