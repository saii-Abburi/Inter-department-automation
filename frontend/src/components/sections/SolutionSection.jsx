import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  ArrowRight,
  Stethoscope,
  Microscope,
  CreditCard,
  ShieldCheck,
  Activity,
  Building2,
  Zap,
  Layers,
  BarChart3,
  Lock
} from 'lucide-react'

const steps = [
  { title: 'Emergency Admission', icon: Activity, color: '#61DAFB' },
  { title: 'Doctor Approval', icon: Stethoscope, color: '#0D9488' },
  { title: 'Lab Automation', icon: Microscope, color: '#61DAFB' },
  { title: 'Smart Billing', icon: CreditCard, color: '#0D9488' },
  { title: 'Insurance Verification', icon: ShieldCheck, color: '#61DAFB' },
  { title: 'AI Discharge', icon: Building2, color: '#0D9488' },
]

export default function SolutionSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

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
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden text-foreground">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#61DAFB]/10 border border-[#61DAFB]/20 mb-6 glass-effect">
            <p className="text-sm font-medium text-[#0D9488]">
              Platform Capabilities
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#0E2A47] dark:text-white">
            Intelligent Automation{' '}
            <span className="bg-gradient-to-r from-[#61DAFB] to-[#0D9488] bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
          <p className="text-lg text-[#1F4E6F] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Watch how HospitalFlow orchestrates perfect coordination across your entire hospital ecosystem in real-time.
          </p>
        </motion.div>

        {/* Desktop workflow - Grid-based, no scroll */}
        <div className="hidden lg:block mb-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-3 lg:grid-cols-6 gap-4 p-8 rounded-[2.5rem] bg-gradient-to-br from-[#0E2A47]/5 to-transparent border border-[#0E2A47]/5 glass-effect relative"
          >
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex flex-col items-center group relative">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex flex-col items-center gap-5"
                  >
                    <div
                      className="w-16 h-16 xl:w-20 xl:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}20, ${step.color}40)`,
                        border: `1px solid ${step.color}30`
                      }}
                    >
                      <Icon className="w-8 h-8 xl:w-10 xl:h-10" style={{ color: step.color }} />

                      {/* Pulsing glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-20 transition-opacity blur-xl" style={{ color: step.color }} />
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] xl:text-xs font-black text-[#1F4E6F]/40 dark:text-white/20 uppercase tracking-[0.2em] mb-1">
                        Step 0{index + 1}
                      </p>
                      <p className="text-xs xl:text-sm font-bold text-[#0E2A47] dark:text-white uppercase tracking-wider leading-tight">
                        {step.title}
                      </p>
                    </div>
                  </motion.div>

                  {/* Connector lines between items */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 xl:top-10 -right-[15%] w-[30%] h-[2px] opacity-20 z-0">
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-[#0D9488] to-transparent" />
                    </div>
                  )}
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Mobile workflow - Vertical timeline */}
        <div className="lg:hidden mb-20 relative">
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#0D9488]/20 to-transparent" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6 relative"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 shadow-lg shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}20, ${step.color}40)`,
                      border: `1px solid ${step.color}30`
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-[#1F4E6F]/40 dark:text-white/20 uppercase tracking-widest mb-1">
                      Step 0{index + 1}
                    </p>
                    <p className="text-lg font-bold text-[#0E2A47] dark:text-white leading-tight">
                      {step.title}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Benefits grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="p-8 rounded-2xl border border-[#0E2A47]/10 dark:border-white/10 glass-effect bg-white/40 dark:bg-zinc-900/40 hover:translate-y-[-4px] transition-all duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#61DAFB]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-[#61DAFB]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#0E2A47] dark:text-white">
              Real-Time Intelligence
            </h3>
            <p className="text-[#1F4E6F]/80 dark:text-gray-400 leading-relaxed">
              AI makes decisions instantly, eliminating delays from manual approvals and phone tags.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#0E2A47]/10 dark:border-white/10 glass-effect bg-white/40 dark:bg-zinc-900/40 hover:translate-y-[-4px] transition-all duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#0D9488]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6 text-[#0D9488]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#0E2A47] dark:text-white">
              Seamless Integration
            </h3>
            <p className="text-[#1F4E6F]/80 dark:text-gray-400 leading-relaxed">
              Works with your existing hospital systems (HIS, EMR) without process disruption.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#0E2A47]/10 dark:border-white/10 glass-effect bg-white/40 dark:bg-zinc-900/40 hover:translate-y-[-4px] transition-all duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#61DAFB]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 text-[#61DAFB]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#0E2A47] dark:text-white">
              Complete Transparency
            </h3>
            <p className="text-[#1F4E6F]/80 dark:text-gray-400 leading-relaxed">
              Track every step of patient journey with detailed, immutable audit trails.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#0E2A47]/10 dark:border-white/10 glass-effect bg-white/40 dark:bg-zinc-900/40 hover:translate-y-[-4px] transition-all duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#0D9488]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6 text-[#0D9488]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#0E2A47] dark:text-white">
              Enterprise Security
            </h3>
            <p className="text-[#1F4E6F]/80 dark:text-gray-400 leading-relaxed">
              Full HIPAA compliance with advanced AES-256 encryption and role-based access.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
