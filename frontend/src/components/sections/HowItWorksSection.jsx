import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Plug, Cog, BarChart3, CheckCircle2, ChevronRight, LayoutGrid, Cpu, LineChart } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: LayoutGrid,
    title: 'Seamless Integration',
    description:
      'Connect HospitalFlow to your existing EHR, billing, and operational systems via our secure, high-speed API layer.',
    features: ['EHR Integration', 'Billing System Sync', 'Lab Management', 'Real-time Data'],
    color: '#61DAFB'
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Autonomous Orchestration',
    description:
      'Our AI engine takes over the heavy lifting—automating patient routing, resource allocation, and cross-department alerts.',
    features: ['Neural Rules Engine', 'AI Decision Logic', 'Smart Escalations', 'Predictive Routing'],
    color: '#0D9488'
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Continuous Optimization',
    description:
      'Experience a data-driven transformation with real-time insights and automated performance adjustments.',
    features: ['Live Analytics', 'AI Performance Guard', 'Proactive Alerts', 'Trend Prediction'],
    color: '#0E2A47'
  },
]

export default function HowItWorksSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="how" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#0E2A47]/10 dark:bg-white/10 border border-[#0E2A47]/20 dark:border-white/20 mb-6 glass-effect">
            <p className="text-sm font-semibold text-[#0E2A47] dark:text-[#61DAFB] flex items-center gap-2">
              <Cog className="w-4 h-4 animate-spin-slow" />
              The Implementation Blueprint
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#0E2A47] dark:text-white">
            How We Optimize{' '}
            <span className="bg-gradient-to-r from-[#0E2A47] to-[#61DAFB] bg-clip-text text-transparent">
              Your Hospital
            </span>
          </h2>
          <p className="text-lg text-[#1F4E6F] dark:text-gray-300 max-w-2xl mx-auto">
            A three-phase evolution designed for zero downtime and maximum operational impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Desktop connecting lines */}
          <div className="hidden md:block absolute top-[100px] left-[15%] right-[15%] h-px bg-gradient-to-r from-[#0E2A47]/10 via-[#61DAFB]/30 to-[#0E2A47]/10 dark:from-white/5 dark:via-white/20 dark:to-white/5" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative group mt-8 sm:mt-0"
              >
                {/* Step number badge */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-12 h-12 rounded-full border border-[#0E2A47]/10 dark:border-white/10 bg-white dark:bg-[#0E2A47] flex items-center justify-center font-bold text-[#0E2A47] dark:text-white shadow-xl group-hover:bg-[#61DAFB] group-hover:text-white transition-all duration-500 z-20">
                  {step.number}
                </div>

                <div className="p-8 pb-12 rounded-[2.5rem] border border-[#0E2A47]/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 glass-effect h-full flex flex-col items-center md:items-start text-center md:text-left transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-hover:border-[#61DAFB]/30">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-all duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-[#0E2A47] dark:text-white">{step.title}</h3>
                  <p className="text-base text-[#1F4E6F]/80 dark:text-gray-400 mb-8 leading-relaxed flex-grow">
                    {step.description}
                  </p>

                  <div className="w-full space-y-3 pt-6 border-t border-[#0E2A47]/5 dark:border-white/5">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                        <span className="text-sm font-semibold text-[#1F4E6F] dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* implementation map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-8 md:p-12 rounded-[3rem] border border-[#0E2A47]/10 dark:border-white/10 bg-[#0E2A47]/5 dark:bg-white/5 glass-effect relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#0E2A47] dark:text-white mb-2">Rapid Deployment Map</h3>
              <p className="text-[#1F4E6F]/70 dark:text-gray-400 font-medium">From initial sync to full-scale automation in 8 weeks.</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#61DAFB]/10 border border-[#61DAFB]/20 text-[#61DAFB] font-bold text-sm">
              Standard 8-Week Cycle
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { phase: 'Week 1-2', label: 'Systems Sync', color: '#61DAFB' },
              { phase: 'Week 3-4', label: 'Logic Config', color: '#0D9488' },
              { phase: 'Week 5-6', label: 'Beta Testing', color: '#0E2A47' },
              { phase: 'Week 7-8', label: 'Global Go-Live', color: '#EF4444' },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-1 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-black text-[#1F4E6F]/40 dark:text-gray-500 uppercase tracking-widest">{item.phase}</span>
                </div>
                <p className="text-lg font-bold text-[#0E2A47] dark:text-white group-hover:translate-x-1 transition-transform">{item.label}</p>

                {idx < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 translate-y-2 opacity-20">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
