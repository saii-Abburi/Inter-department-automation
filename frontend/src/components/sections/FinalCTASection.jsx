import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Button from '@/components/ui/Button'
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, MessageSquare } from 'lucide-react'

export default function FinalCTASection({ onOpenBooking }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section ref={ref} className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#61DAFB]/10 border border-[#61DAFB]/20 mb-8 glass-effect">
            <p className="text-sm font-black text-[#61DAFB] flex items-center gap-3 uppercase tracking-[0.2em]">
              <Sparkles className="w-4 h-4" />
              Start Your Optimization
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 text-[#0E2A47] dark:text-white leading-[1.1] tracking-tighter">
            Ready to Forge the{' '}
            <span className="bg-gradient-to-r from-[#0E2A47] to-[#61DAFB] bg-clip-text text-transparent italic">
              Future of Care?
            </span>
          </h2>

          <p className="text-xl text-[#1F4E6F] dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Join 500+ elite medical centers already scaling with HospitalFlow. Deploy autonomous workflows in under 8 weeks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button
              variant="default"
              size="lg"
              className="bg-[#0E2A47] hover:bg-[#0b2138] text-white px-12 h-16 rounded-[2rem] text-lg font-bold group shadow-2xl transition-all duration-300 flex items-center justify-center"
              onClick={onOpenBooking}
            >
              Book Enterprise Demo
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#0E2A47]/10 dark:border-white/10 dark:text-white dark:hover:bg-zinc-800/20 px-12 h-16 rounded-[2rem] text-lg font-bold glass-effect transition-all duration-300"
            >
              Start Trial Sync
            </Button>
          </div>
        </motion.div>

        {/* Value Proposition Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="p-10 md:p-16 rounded-[4rem] border border-[#0E2A47]/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 glass-effect mb-20 relative overflow-hidden group shadow-3xl"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
            <Zap className="w-48 h-48 text-[#61DAFB]" />
          </div>

          <p className="text-[#0E2A47] dark:text-[#61DAFB] font-black text-sm uppercase tracking-[0.3em] mb-12">
            The Enterprise Advantage
          </p>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 text-left max-w-3xl mx-auto">
            {[
              { text: 'Custom AI Workflow Design', icon: <Zap className="w-5 h-5" /> },
              { text: 'Full BAA & HIPAA Shield', icon: <ShieldCheck className="w-5 h-5" /> },
              { text: 'EHR / Epic Sync Support', icon: <Sparkles className="w-5 h-5" /> },
              { text: '24/7 Priority Ops Center', icon: <MessageSquare className="w-5 h-5" /> },
              { text: 'Real-time Predictive Guard', icon: <CheckCircle2 className="w-5 h-5" /> },
              { text: 'Dedicated Success Architect', icon: <CheckCircle2 className="w-5 h-5" /> },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                className="flex items-center gap-4 group/item"
              >
                <div className="text-[#61DAFB] group-hover/item:scale-125 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[#1F4E6F] dark:text-gray-200 font-bold text-base">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick FAQ summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="grid sm:grid-cols-2 gap-6"
        >
          <QuickFAQ
            q="Integration Time?"
            a="6-8 weeks from audit to global hospital-wide go-live."
          />
          <QuickFAQ
            q="EHR Compatibility?"
            a="Native sync with Epic, Cerner, Allscripts, and custom APIs."
          />
          <QuickFAQ
            q="Compliance Ready?"
            a="HIPAA, HITRUST, SOC 2 Type II, and ISO 27001 out-of-the-box."
          />
          <QuickFAQ
            q="Custom Automations?"
            a="Unlimited neural rules adapted to your specific clinical logic."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-20 pt-12 border-t border-[#0E2A47]/5 dark:border-white/5"
        >
          <p className="text-sm font-bold text-[#1F4E6F]/40 dark:text-gray-500 uppercase tracking-widest">
            Trusted by 500+ Institutions • ISO Certified • BAA Ready
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function QuickFAQ({ q, a }) {
  return (
    <div className="p-8 rounded-[2.5rem] border border-[#0E2A47]/5 dark:border-white/5 bg-white/30 dark:bg-zinc-900/20 glass-effect text-left hover:border-[#61DAFB]/30 transition-all duration-300">
      <p className="font-black text-[#0E2A47] dark:text-white mb-2 tracking-tight">{q}</p>
      <p className="text-sm text-[#1F4E6F]/60 dark:text-gray-400 font-medium leading-relaxed">{a}</p>
    </div>
  )
}
