import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react'

export default function HeroSection({ onOpenBooking }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#61DAFB]/10 border border-[#61DAFB]/20 mb-8 glass-effect">
                <p className="text-sm font-black text-[#61DAFB] flex items-center gap-3 uppercase tracking-[0.2em]">
                  <Zap className="w-4 h-4 fill-[#61DAFB]" />
                  Enterprise Automation 2.0
                </p>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter mb-8 text-[#0E2A47] dark:text-white"
            >
              The Neural Engine for{' '}
              <span className="bg-gradient-to-r from-[#61DAFB] via-[#0D9488] to-[#0E2A47] bg-clip-text text-transparent italic">
                Modern Care
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-[#1F4E6F] dark:text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Bridge the coordination gap. Reduce discharge latency by 40% with autonomous department orchestration. Built for the world's most demanding clinical environments.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-16 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                className="bg-[#0E2A47] hover:bg-[#0b2138] text-white px-10 h-16 rounded-[2rem] text-lg font-bold group shadow-2xl transition-all duration-300 flex items-center justify-center"
                onClick={onOpenBooking}
              >
                Request Enterprise Demo
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#0E2A47]/10 dark:border-white/10 dark:text-white dark:hover:bg-white/5 px-10 h-16 rounded-[2rem] text-lg font-bold glass-effect transition-all duration-300"
              >
                Explore High-Fidelity Docs
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0">
              <HeroStat value="500+" label="Institutions" />
              <HeroStat value="99.99%" label="Uptime SLA" />
              <HeroStat value="24/7" label="Ops Center" />
            </motion.div>
          </motion.div>

          {/* Right side - 3D React Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            {/* Decorative glows around the frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#61DAFB]/20 to-transparent blur-3xl rounded-full opacity-50" />

            <div className="h-[550px] w-full rounded-[3rem] overflow-hidden border border-[#61DAFB]/20 shadow-[0_0_50px_rgba(97,218,251,0.15)] bg-white/40 dark:bg-zinc-900/40 glass-effect relative z-10 group">
              <div className="sketchfab-embed-wrapper w-full h-full transform transition-transform duration-700 group-hover:scale-105">
                <img src="./src/assets/hospital.png" className='w-full h-full ' alt="" />
              </div>

              {/* Overlay glass decoration */}
              <div className="absolute top-8 right-8 p-4 rounded-2xl bg-white/10 dark:bg-black/10 glass-effect border border-white/20 pointer-events-none">
                <Activity className="w-6 h-6 text-[#61DAFB] animate-pulse" />
              </div>
            </div>

            {/* Visual accent blocks */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0D9488]/10 rounded-[2rem] blur-2xl pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#61DAFB]/10 rounded-[2rem] blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-50 hidden lg:block"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#61DAFB] to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}

function HeroStat({ value, label }) {
  return (
    <div>
      <p className="text-2xl sm:text-3xl font-black text-[#0E2A47] dark:text-white tracking-tighter mb-1">{value}</p>
      <p className="text-[10px] font-black text-[#1F4E6F]/40 dark:text-gray-500 uppercase tracking-widest leading-none">{label}</p>
    </div>
  )
}
