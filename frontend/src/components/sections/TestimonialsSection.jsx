import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, HeartPulse, ShieldCheck, TrendingUp } from 'lucide-react'

const testimonials = [
  {
    quote:
      'HospitalFlow transformed our emergency department. Patient wait times dropped from 5 hours to 1.5 hours within the first month. The automated coordination between departments is a game-changer.',
    author: 'Dr. Sarah Mitchell',
    role: 'Chief Medical Officer',
    hospital: 'Metropolitan General Hospital',
    rating: 5,
  },
  {
    quote:
      'The implementation was seamless. Our staff barely noticed the transition, yet efficiency improved dramatically. We\'ve seen a 40% reduction in administrative errors and significant cost savings.',
    author: 'James Chen',
    role: 'Hospital Administrator',
    hospital: 'Pacific Medical Center',
    rating: 5,
  },
  {
    quote:
      'In emergency situations, every second counts. HospitalFlow gives us instant coordination across all departments. It\'s like having an extra team member who never makes mistakes.',
    author: 'Dr. Michael Rodriguez',
    role: 'Head of Emergency Medicine',
    hospital: 'Cardinal Health Systems',
    rating: 5,
  },
  {
    quote:
      'The 24/7 support and continuous optimization recommendations keep our operations running at peak efficiency. This is enterprise-grade quality perfect for large hospital networks.',
    author: 'Lisa Thompson',
    role: 'Chief Operations Officer',
    hospital: 'Valley Hospital Network',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="testimonials" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#61DAFB]/5 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#61DAFB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#0E2A47]/10 dark:bg-white/10 border border-[#0E2A47]/20 dark:border-white/20 mb-6 glass-effect">
            <p className="text-sm font-semibold text-[#0E2A47] dark:text-[#61DAFB] flex items-center gap-2">
              <HeartPulse className="w-4 h-4" />
              Trusted by Leadership
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#0E2A47] dark:text-white">
            What Medical{' '}
            <span className="bg-gradient-to-r from-[#0E2A47] to-[#61DAFB] bg-clip-text text-transparent italic">
              Foundations
            </span>{' '}
            Say
          </h2>
          <p className="text-lg text-[#1F4E6F] dark:text-gray-300 max-w-2xl mx-auto">
            Experience the transformation through the voices of clinical leaders and administrators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-[3rem] border border-[#0E2A47]/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 glass-effect relative group hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-[#61DAFB]" />
              </div>

              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#61DAFB] text-[#61DAFB]" />
                ))}
              </div>

              <blockquote className="mb-8">
                <p className="text-lg md:text-xl font-medium leading-relaxed text-[#0E2A47] dark:text-gray-200">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4 pt-8 border-t border-[#0E2A47]/5 dark:border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0E2A47] to-[#61DAFB] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#0E2A47] dark:text-white leading-tight">{testimonial.author}</p>
                  <p className="text-sm text-[#1F4E6F]/60 dark:text-gray-400 font-medium">{testimonial.role}</p>
                  <p className="text-xs text-[#61DAFB] font-black uppercase tracking-widest mt-1">{testimonial.hospital}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* trust ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <TrustCard
            icon={<Star className="w-6 h-6" />}
            value="4.9 / 5.0"
            label="Average Satisfaction"
            desc="Top rated by health admins"
            color="#61DAFB"
          />
          <TrustCard
            icon={<ShieldCheck className="w-6 h-6" />}
            value="98%"
            label="Post-Go-Live Rate"
            desc="Sustained efficiency gains"
            color="#0D9488"
          />
          <TrustCard
            icon={<TrendingUp className="w-6 h-6" />}
            value="6 Months"
            label="Average ROI cycle"
            desc="Rapid value realization"
            color="#0E2A47"
          />
        </motion.div>
      </div>
    </section>
  )
}

function TrustCard({ icon, value, label, desc, color }) {
  return (
    <div className="p-10 rounded-[2.5rem] border border-[#0E2A47]/5 dark:border-white/5 bg-white dark:bg-zinc-900/20 text-center shadow-xl hover:-translate-y-2 transition-transform duration-300">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"
        style={{ backgroundColor: `${color}10`, color }}
      >
        {icon}
      </div>
      <p className="text-3xl font-black text-[#0E2A47] dark:text-white mb-2">{value}</p>
      <p className="text-sm font-bold text-[#1F4E6F] dark:text-[#61DAFB] uppercase tracking-[0.15em] mb-3">{label}</p>
      <p className="text-xs text-[#1F4E6F]/60 dark:text-gray-500 font-medium tracking-tight tracking-wider">{desc}</p>
    </div>
  )
}
