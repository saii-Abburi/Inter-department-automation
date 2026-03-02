import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Activity, ShieldCheck, Users, Clock, Zap, Building2, CheckCircle } from 'lucide-react'

const metrics = [
  {
    label: 'Faster Discharge',
    value: 40,
    unit: '%',
    icon: <Zap className="w-5 h-5" />,
    color: '#61DAFB',
    description: 'Optimized patient movement and bed turnover'
  },
  {
    label: 'Safety Accuracy',
    value: 60,
    unit: '%',
    icon: <ShieldCheck className="w-5 h-5" />,
    color: '#0D9488',
    description: 'Significant reduction in clinical errors'
  },
  {
    label: 'Resource Efficiency',
    value: 35,
    unit: '%',
    icon: <Activity className="w-5 h-5" />,
    color: '#3B82F6',
    description: 'Lower administrative and operational load'
  },
  {
    label: 'Continuous Flow',
    value: 24,
    unit: '/7',
    icon: <Clock className="w-5 h-5" />,
    color: '#8B5CF6',
    description: 'Real-time AI-driven hospital monitoring'
  },
]

export default function PerformanceMetricsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#0E2A47]/10 dark:bg-white/10 border border-[#0E2A47]/20 dark:border-white/20 mb-8 glass-effect">
            <p className="text-sm font-bold text-[#0E2A47] dark:text-[#61DAFB] flex items-center gap-2 tracking-tight">
              <Activity className="w-4 h-4" />
              Impact Methodology
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 text-[#0E2A47] dark:text-white leading-[1.1]">
            Enterprise-Grade{' '}
            <span className="bg-gradient-to-r from-[#0E2A47] via-[#61DAFB] to-[#0D9488] bg-clip-text text-transparent italic">
              Performance
            </span>
          </h2>
          <p className="text-lg text-[#1F4E6F] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Aggregated performance data from leading global medical centers.
            We deliver measurable clinical and operational transformations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <AnimatedMetricCard
              key={index}
              metric={metric}
              inView={inView}
              index={index}
            />
          ))}
        </div>

        {/* Global Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-10 md:p-14 rounded-[3rem] border border-[#0E2A47]/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 glass-effect relative overflow-hidden shadow-3xl"
        >
          <div className="grid md:grid-cols-4 gap-12 text-center relative z-10">
            <TrustItem
              icon={<Building2 className="w-7 h-7 text-[#61DAFB]" />}
              value="500+"
              label="Institutions"
            />
            <TrustItem
              icon={<Users className="w-7 h-7 text-[#0D9488]" />}
              value="2.5M+"
              label="Patients Annually"
            />
            <TrustItem
              icon={<CheckCircle className="w-7 h-7 text-[#0E2A47] dark:text-[#61DAFB]" />}
              value="99.99%"
              label="System Reliability"
            />
            <TrustItem
              icon={<ShieldCheck className="w-7 h-7 text-[#61DAFB]" />}
              value="24/7"
              label="Live Support"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AnimatedMetricCard({
  metric,
  inView,
  index,
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const startValue = 0
    const endValue = metric.value
    const startTime = performance.now()

    let animationFrameId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const currentCount = Math.floor(progress * (endValue - startValue) + startValue)

      if (countRef.current !== currentCount) {
        setDisplayValue(currentCount)
        countRef.current = currentCount
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setDisplayValue(endValue)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [inView, metric.value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="p-10 rounded-[2.5rem] border border-[#0E2A47]/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 glass-effect group transition-all duration-500 relative overflow-hidden shadow-xl"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundColor: `${metric.color}15`, color: metric.color }}
      >
        {metric.icon}
      </div>

      <div className="space-y-2 mb-6">
        <p className="text-xs font-black text-[#1F4E6F] dark:text-gray-400 opacity-60 uppercase tracking-[0.2em]">{metric.label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl lg:text-5xl font-black text-[#0E2A47] dark:text-white tracking-tighter">
            {displayValue}
          </span>
          <span className="text-2xl font-black text-[#61DAFB]">{metric.unit}</span>
        </div>
      </div>

      <p className="text-sm text-[#1F4E6F] dark:text-gray-400 opacity-80 font-medium leading-relaxed">{metric.description}</p>

      <motion.div
        className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-[#0E2A47] to-[#61DAFB]"
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : { width: 0 }}
        transition={{ delay: index * 0.1 + 0.6, duration: 1.2 }}
      />
    </motion.div>
  )
}

function TrustItem({ icon, value, label }) {
  return (
    <div className="group px-4">
      <div className="flex justify-center mb-6 transition-transform duration-300 group-hover:scale-125">
        {icon}
      </div>
      <p className="text-3xl md:text-4xl font-black text-[#0E2A47] dark:text-white mb-2 group-hover:text-[#61DAFB] transition-colors tracking-tight">{value}</p>
      <p className="text-xs font-black text-[#1F4E6F] dark:text-gray-400 opacity-60 uppercase tracking-[0.25em]">{label}</p>
    </div>
  )
}
