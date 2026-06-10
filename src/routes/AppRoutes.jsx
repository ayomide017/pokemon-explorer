import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PokemonListPage from '../pages/PokemonListPage'
import PokemonDetailPage from '../pages/PokemonDetailPage'
import NotFoundPage from '../pages/NotFoundPage'

const AppRoutes = () => (
  <Routes>
    <Route path="/"             element={<PokemonListPage />} />
    <Route path="/pokemon/:id"  element={<PokemonDetailPage />} />
    <Route path="*"             element={<NotFoundPage />} />
  </Routes>
)

export default AppRoutes


