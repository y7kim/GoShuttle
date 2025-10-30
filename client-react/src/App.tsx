import type { JSX } from 'react'
import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'

import './App.css'


function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
