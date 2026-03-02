import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AlertCircle, Zap, Radio, ShieldAlert, Cpu, Timer } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function EmergencyModeSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <section
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/20 mb-6 glass-effect">
            <p className="text-sm font-medium text-[#EF4444] flex items-center gap-2">
              <Radio className="w-4 h-4 animate-pulse" />
              Emergency Response Protocol
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#0E2A47] dark:text-white">
            Built for the{' '}
            <span className="bg-gradient-to-r from-[#EF4444] to-[#F97316] bg-clip-text text-transparent">
              Critical Moments
            </span>
          </h2>
          <p className="text-lg text-[#1F4E6F] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            When lives are at stake, every millisecond counts. Our AI-driven emergency mode
            bypasses manual coordination for instantaneous hospital-wide orchestration.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Instant Prioritization"
            description="AI identifies critical code events and automatically surges resources to required units."
            color="#EF4444"
          />
          <FeatureCard
            icon={<Cpu className="w-6 h-6" />}
            title="Logic Bypassing"
            description="Accelerated protocols that eliminate administrative approval chains in life-threatening scenarios."
            color="#61DAFB"
          />
          <FeatureCard
            icon={<ShieldAlert className="w-6 h-6" />}
            title="Total Synchronization"
            description="Instant hardware and software lockstep across Surgery, Lab, and Emergency units."
            color="#0D9488"
          />
        </motion.div>

        {/* High-fidelity response timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.4 }}
          className="bg-white/40 dark:bg-zinc-900/40 border border-[#0E2A47]/10 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 glass-effect relative overflow-hidden"
        >
          <h3 className="text-xl font-bold text-[#0E2A47] dark:text-white mb-12 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-ping" />
            AI Crisis Orchestration Sequence
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { time: '0.0s', action: 'Signal Detected', desc: 'Code Blue system trigger' },
              { time: '1.2s', action: 'Mass Broadcast', desc: 'Teams initialized' },
              { time: '2.5s', action: 'Pathflow Surge', desc: 'Diagnostics cleared' },
              { time: '4.8s', action: 'Resource Lock', desc: 'Critical unit reserved' },
              { time: '7.5s', action: 'Ready Status', desc: 'Intervention team active' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="relative group"
              >
                <div className="flex flex-row md:flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0E2A47]/5 dark:bg-white/5 border border-[#0E2A47]/10 dark:border-white/10 flex items-center justify-center font-bold text-[#0E2A47] dark:text-white shadow-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-[#EF4444] font-bold text-xs uppercase tracking-widest mb-1">{item.time}</p>
                    <p className="text-[#0E2A47] dark:text-white font-bold text-base mb-1">{item.action}</p>
                    <p className="text-[#1F4E6F]/60 dark:text-gray-400 text-xs leading-tight font-medium">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <Button variant="default" size="lg" className="bg-[#0E2A47] hover:bg-[#0b2138] text-white px-8">
            See Emergency Case Studies
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -8 }}
      className="p-8 rounded-[2rem] border border-[#0E2A47]/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 transition-all duration-300 glass-effect group"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-sm"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#0E2A47] dark:text-white mb-3 leading-tight">{title}</h3>
      <p className="text-sm text-[#1F4E6F]/80 dark:text-gray-400 leading-relaxed font-medium">{description}</p>
    </motion.div>
  )
}
