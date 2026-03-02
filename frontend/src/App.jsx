import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import SolutionSection from '@/components/sections/SolutionSection'
import DashboardPreviewSection from '@/components/sections/DashboardPreviewSection'
import EmergencyModeSection from '@/components/sections/EmergencyModeSection'
import PerformanceMetricsSection from '@/components/sections/PerformanceMetricsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import SecurityComplianceSection from '@/components/sections/SecurityComplianceSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FinalCTASection from '@/components/sections/FinalCTASection'
import ChatBubble from '@/components/ui/ChatBubble'
import BookingModal from '@/components/ui/BookingModal'
import AuthPage from '@/pages/AuthPage'
import DashboardLayout from '@/layouts/DashboardLayout'
import PatientDashboard from '@/pages/dashboards/PatientDashboard'
import DoctorDashboard from '@/pages/dashboards/DoctorDashboard'
import StaffDashboard from '@/pages/dashboards/StaffDashboard'

function LandingPage({ onOpenBooking }) {
  return (
    <>
      <main>
        <HeroSection onOpenBooking={onOpenBooking} />
        <ProblemSection />
        <SolutionSection />
        <DashboardPreviewSection />
        <EmergencyModeSection />
        <PerformanceMetricsSection />
        <HowItWorksSection />
        <SecurityComplianceSection />
        <TestimonialsSection />
        <FinalCTASection onOpenBooking={onOpenBooking} />
      </main>
      <ChatBubble />
      <Footer />
    </>
  )
}

function App() {
  const [isDark, setIsDark] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem('darkMode', String(newDarkMode))
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-foreground transition-colors duration-500">
        <Routes>
          <Route path="/" element={
            <>
              <Navigation isDark={isDark} onToggleDarkMode={toggleDarkMode} onOpenBooking={() => setIsBookingOpen(true)} />
              <LandingPage onOpenBooking={() => setIsBookingOpen(true)} />
              <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
            </>
          } />
          <Route path="/auth" element={<AuthPage />} />

          {/* Dashboards */}
          <Route path="/dashboard/patient/*" element={
            <DashboardLayout role="Patient">
              <PatientDashboard />
            </DashboardLayout>
          } />
          <Route path="/dashboard/doctor/*" element={
            <DashboardLayout role="Doctor">
              <DoctorDashboard />
            </DashboardLayout>
          } />
          <Route path="/dashboard/staff/*" element={
            <DashboardLayout role="Staff">
              <StaffDashboard />
            </DashboardLayout>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
