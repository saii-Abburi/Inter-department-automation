import { useState } from 'react'
import { Menu, X, Moon, Sun, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function Navigation({ isDark, onToggleDarkMode, onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const navItems = [
    { label: 'Why HospitalFlow', id: 'why' },
    { label: 'How It Works', id: 'how' },
    { label: 'Security', id: 'security' },
    { label: 'Testimonials', id: 'testimonials' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-medical-dark to-medical-light rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">HF</span>
              </div>
              <span className="hidden sm:inline font-semibold text-foreground">HospitalFlow</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Link to="/auth">
              <Button variant="outline" size="sm" className="hidden lg:flex items-center gap-2 border-[#61DAFB]/20 dark:text-white dark:hover:bg-white/5">
                <Lock className="w-3 h-3" />
                Portal Sign In
              </Button>
            </Link>

            <Button variant="default" size="sm" className="hidden sm:inline-flex" onClick={onOpenBooking}>
              Request Demo
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-smooth"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border pb-4"
          >
            <div className="pt-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-muted rounded transition-smooth"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full mb-2">
                    Portal Sign In
                  </Button>
                </Link>
                <Button variant="default" className="w-full" onClick={onOpenBooking}>
                  Request Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
