import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { MessagesProvider } from './context/MessagesContext'
import BottomNav from './components/BottomNav'
import ScannerPage from './pages/ScannerPage'
import MapPage from './pages/MapPage'
import MessagesPage from './pages/MessagesPage'

function Shell() {
  const { pathname } = useLocation()
  const showNav = !pathname.startsWith('/location/')

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/scanner" replace />} />
        <Route path="/scanner" element={<ScannerPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/location/:id" element={<MessagesPage />} />
      </Routes>
      {showNav && <BottomNav />}
    </>
  )
}

export default function App() {
  return (
    <MessagesProvider>
      <Shell />
    </MessagesProvider>
  )
}
