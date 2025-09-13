import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Details from './pages/details/Details'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Search from './pages/search/Search'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import ResetPassword from './pages/resetPassword/ResetPassword'
const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <AuthProvider>
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-1 p-5 max-w-[1440px] mx-auto w-full'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-gig" element={<Create />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </div>
    </AuthProvider>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App