import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-card border border-border rounded-lg shadow-soft-lg p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">HospitalFlow Support</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              How can we help you today? Ask about our platform, pricing, or security features.
            </p>
            <div className="space-y-2 mb-4">
              <button className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground">
                → Pricing & Plans
              </button>
              <button className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground">
                → Security & Compliance
              </button>
              <button className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground">
                → Schedule a Demo
              </button>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-background"
              />
              <Button variant="default" size="sm" className="w-full">
                Send
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-medical-dark text-white shadow-soft-lg flex items-center justify-center hover:bg-medical-light transition-smooth"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  )
}
