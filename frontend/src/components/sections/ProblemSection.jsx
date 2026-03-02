import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { AlertCircle, Clock, Users } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: 'Long Patient Waiting Times',
    stat: '4-6 hours',
    description: 'Average emergency department wait times exceed industry standards significantly.',
  },
  {
    icon: Users,
    title: 'Manual Inter-Department Coordination',
    stat: '60+ staff touchpoints',
    description: 'Physical transfers and phone calls create bottlenecks in patient workflows.',
  },
  {
    icon: AlertCircle,
    title: 'Emergency Workflow Errors',
    stat: '25% error rate',
    description: 'Manual processes lead to miscommunications and critical care delays.',
  },
]

export default function ProblemSection() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <section id="why" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#0E2A47]/5 border border-[#0E2A47]/10 mb-6 glass-effect">
            <p className="text-sm font-medium text-[#0D9488]">
              Current Limitations
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#0E2A47] dark:text-white">
            Hospital Workflows Face{' '}
            <span className="bg-gradient-to-r from-[#61DAFB] to-[#0D9488] bg-clip-text text-transparent">
              Critical Challenges
            </span>
          </h2>
          <p className="text-lg text-[#1F4E6F] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Traditional hospital coordination methods create bottlenecks, delay critical care, and compromise patient outcomes.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="h-full border-[#0E2A47]/10 dark:border-white/10 glass-effect bg-white/40 dark:bg-zinc-900/40 hover:translate-y-[-4px] transition-all duration-300 shadow-xl">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#61DAFB]/20 to-[#0D9488]/20 flex items-center justify-center mb-6 shadow-sm">
                      <Icon className="w-7 h-7 text-[#0D9488] dark:text-[#61DAFB]" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-[#0E2A47] dark:text-white leading-tight">
                      {problem.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-black text-[#0D9488] dark:text-[#61DAFB]">
                        {problem.stat.split(' ')[0]}
                      </span>
                      <span className="text-lg font-medium text-[#1F4E6F] dark:text-gray-400">
                        {problem.stat.split(' ').slice(1).join(' ')}
                      </span>
                    </div>
                    <CardDescription className="text-base text-[#1F4E6F]/80 dark:text-gray-400 leading-relaxed font-medium">
                      {problem.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
