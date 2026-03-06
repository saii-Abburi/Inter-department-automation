import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { chatbotApi } from '../../services/api'

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your HospitalFlow AI assistant. How can I help you with your healthcare needs today?" }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Create history in the format the backend expects
      // Note: Backend controller converts this to OpenAI format
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }))

      const response = await chatbotApi.chat(input, history)
      const botMessage = { role: 'assistant', content: response.data.reply }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat Error:', error)
      const errorMessage = error.response?.data?.error || error.message || "I'm sorry, I'm having trouble connecting to my brain right now.";
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[380px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[600px] ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="bg-zinc-900 dark:bg-zinc-950 p-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-inner">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">HospitalFlow AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-[11px] text-zinc-400 font-medium">Online & Ready</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-all duration-200"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            {/* Chat Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-5 min-h-[350px] bg-zinc-50 dark:bg-zinc-900/50 scroll-smooth custom-scrollbar"
            >
              <div className="text-[10px] text-center text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold mb-4">
                Healthcare Dedicated Assistant
              </div>

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-tr-none shadow-md'
                        : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-tl-none shadow-sm'
                      }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-xs text-zinc-500 font-medium italic">Generating response...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a medical question..."
                  className="w-full pl-5 pr-14 py-3.5 bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-zinc-900 dark:bg-blue-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all shadow-lg shadow-black/10"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-zinc-400 dark:text-zinc-500 mt-3 font-medium">
                AI information should be verified by medical professionals.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`w-16 h-16 rounded-3xl ${isOpen ? 'bg-zinc-900 dark:bg-zinc-800' : 'bg-blue-600 shadow-blue-500/30'
          } text-white shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-white dark:border-zinc-950 relative overflow-hidden`}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center justify-center"
            >
              <MessageCircle className="w-8 h-8" />
              <div className="absolute top-0 right-0 p-1">
                <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
