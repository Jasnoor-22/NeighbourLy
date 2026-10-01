import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import ServiceDetails from './pages/ServiceDetails'
import ProviderProfile from './pages/ProviderProfile'
import BecomeSeller from './pages/BecomeSeller'
import Messages from './pages/Messages'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import { FavoritesProvider } from './context/FavoritesContext'
import { ServicesProvider } from './context/ServicesContext'

export default function App() {
  return (
    <FavoritesProvider>
      <ServicesProvider>
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/provider/:id" element={<ProviderProfile />} />
            <Route path="/become-a-seller" element={<BecomeSeller />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ServicesProvider>
    </FavoritesProvider>
  )
}
